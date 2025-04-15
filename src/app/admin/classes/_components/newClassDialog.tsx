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
import { UserIcon } from '@heroicons/react/24/solid';
import { Input } from "~/components/ui/input";
import { type ClassSchema, DAYS, TIMES } from "~/actions/schemas";
import { useRouter } from "next/navigation";
import { createClass } from "~/actions/classes/mutations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

export function NewClassDialog() {

  const form = useForm<ClassSchema>({
    defaultValues: {
      name: "",
      def_day: "",
      def_time: "",
      teacher_id: undefined,
      student_limit: 0,
    },
  });

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router =  useRouter();

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

  // Define available roles
  const roles = [
    { id: "admin", label: "Admin" },
    { id: "teacher", label: "Teacher" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="mb-4" asChild>
        <Button variant="outline"><UserIcon /> Add Class</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Class</DialogTitle>
          <DialogDescription>
            Add a new class to the school.
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
              <h4 className="font-semibold">Required Fields</h4>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name <span className="text-red-500">*</span></FormLabel>
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
              <h4 className="font-semibold">Optional Fields</h4>
              <div>
                <FormField
                  control={form.control}
                  name="def_day"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Day</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a day" />
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
                      <FormLabel>Time</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time" />
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
                      <FormLabel>Teacher</FormLabel>
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
                      <FormLabel>Student Limit</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                {isSubmitting ? "Adding..." : "Add Class"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}