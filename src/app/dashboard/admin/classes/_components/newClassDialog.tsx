"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { PlusIcon } from '@heroicons/react/24/solid';
import { Input } from "~/components/ui/input";
import { type ClassSchema, DAYS, TIMES } from "~/actions/schemas";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "~/convex/_generated/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useTranslations } from "next-intl";

export function NewClassDialog() {

  const t = useTranslations("dashboard.admin.class");
  const u = useTranslations("dashboard.general");

  const form = useForm<ClassSchema>({
    defaultValues: {
      name: "",
      def_day: "",
      def_time: "",
      teacher_id: undefined,
      student_limit: 0n,
    },
  });

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router =  useRouter();

  const createClass = useMutation(api.mutations.class.createClass);

  async function onSubmit(data: ClassSchema) {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      if (!data.name) {
        setError("Missing required fields");
        setIsSubmitting(false);
        return;
      }

      const location = await createClass(data);
      if (location) {
        setSuccess("Staff member created successfully");
        form.reset();
        
        setTimeout(() => {
          setOpen(false);
          router.refresh();
          setSuccess(null);
        },2000);
      } else {
        setError("Failed to create staff member");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred while creating the staff member");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="mb-4" asChild>
        <Button variant="outline"><PlusIcon /> {t("add_class_button")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("add_class")}</DialogTitle>
          <DialogDescription>
            {t("add_new_class")}
          </DialogDescription>
        </DialogHeader>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-4"
          >
            <div className="grid gap-4 py-4">
              <h4 className="font-semibold">{u("required")}</h4>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("class_name")}<span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid gap-4 py-4">
              <h4 className="font-semibold">{u("optional")}</h4>
              <div>
                <FormField
                  control={form.control}
                  name="def_day"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("day")}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t("day_select_button")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {DAYS.map((day) => (
                              <SelectItem key={day} value={day}>
                                {day}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="def_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("time")}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("time_select_button")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {TIMES.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="teacher_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("teacher")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="student_limit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("student_limit")}</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          min="0"
                          max="20"
                          {...field} 
                          value={field.value ? Number(field.value) : ''} 
                          onChange={(e) => field.onChange(BigInt(e.target.value || '0'))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? t("adding") : t("add_class")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}