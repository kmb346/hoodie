"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "~/components/ui/select";
import { PlusIcon } from '@heroicons/react/24/solid';
import { Input } from "~/components/ui/input";
import { type Student, MONTHS } from "~/actions/schemas";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "~/convex/_generated/api";
import { calculateTimestamp } from "~/lib/calculateTimestamp";
import { useTranslations } from "next-intl";

export function NewStudentDialog({ classes }: { classes: Record<string, string>[] }) {

  const t = useTranslations("dashboard.admin.student");
  const u = useTranslations("dashboard.general");

  const form = useForm<Student>({
    defaultValues: {
      first_name: "",
      last_name: "",
      default_class: undefined,
      user_id: undefined,
      birthdate: 0,
    },
  });

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router =  useRouter();

  //For birthdate calculation
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  const createStudent = useMutation(api.mutations.student.createStudent);

  const gradeArray = [
    "Pre-k",
    "K",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "Adult",
    "Other"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 100 },
    (_, i) => (currentYear - i).toString()
  );

  // Update days in month when year and month change
  useEffect(() => {
    if (selectedYear && selectedMonth) {
      const year = parseInt(selectedYear);
      const month = parseInt(selectedMonth);
      const daysCount = new Date(year, month, 0).getDate();
      setDaysInMonth(Array.from({ length: daysCount }, (_, i) => i + 1));
    }
  }, [selectedYear, selectedMonth]);


  async function onSubmit(data: Student) {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      if (!data.first_name || !data.last_name || !data.grade) {
        setError("Missing required fields");
        setIsSubmitting(false);
        return;
      }

      const submissionData = {
        ...data,
        birthdate: calculateTimestamp(selectedYear, selectedMonth, selectedDay),
      };

      const student = await createStudent({
        ...submissionData, 
        created_on: 0, 
        updated_on: 0, 
        password: "", 
        last_login: 0,
        status: "active"
      });

      if (student) {
        setSuccess("Student created successfully");
        form.reset();
        setSelectedYear("");
        setSelectedMonth("");
        setSelectedDay("");
        
        setTimeout(() => {
          setOpen(false);
          router.refresh();
          setSuccess(null);
        },2000);
      } else {
        setError("Failed to create student");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred while creating the student");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="mb-4" asChild>
        <Button variant="outline"><PlusIcon />{t('add_student_button')}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("add_student")}</DialogTitle>
          <DialogDescription>
            {t("add_new_student")}
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
              <div className="flex gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("first_name")} <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("last_name")} <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <h4 className="font-semibold">{u("optional")}</h4>
              <div>
                <FormField
                  control={form.control}
                  name="default_class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("class")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("class_select_button")}/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {classes.map((c) => (
                            <SelectItem key={c.id} value={c.id!}>
                              {c.name}
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
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("grade")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("grade_select_button")}/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {gradeArray.map((option:string, index:number) => (
                            <SelectItem key={index} value={option}>
                              {option}
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
                <Controller
                  control={form.control}
                  name="birthdate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{u("birthdate")}</FormLabel>
                      <div className="flex items-center gap-2">
                        {/* Year Select */}
                        <Select
                          value={selectedYear}
                          onValueChange={(value) => {
                            setSelectedYear(value);
                            field.onChange(calculateTimestamp(value, selectedMonth, selectedDay));
                          }}
                        >
                          <SelectTrigger className="w-[110px]">
                            <SelectValue placeholder={u("year")} />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {/* Month Select */}
                        <Select
                          value={selectedMonth}
                          onValueChange={(value) => {
                            setSelectedMonth(value);
                            field.onChange(calculateTimestamp(selectedYear, value, selectedDay));
                          }}
                        >
                          <SelectTrigger className="w-[110px]">
                            <SelectValue placeholder={u("month")} />
                          </SelectTrigger>
                          <SelectContent>
                            {MONTHS.map((month, index) => (
                              <SelectItem
                                key={month}
                                value={(index + 1).toString()}
                              >
                                {month}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {/* Day Select */}
                        <Select
                          value={selectedDay}
                          onValueChange={(value) => {
                            setSelectedDay(value);
                            field.onChange(calculateTimestamp(selectedYear, selectedMonth, value));
                          }}
                          disabled={!selectedMonth || !selectedYear}
                        >
                          <SelectTrigger className="w-[90px]">
                            <SelectValue placeholder={u("day")} />
                          </SelectTrigger>
                          <SelectContent>
                            {daysInMonth.map((day) => (
                              <SelectItem
                                key={day}
                                value={day.toString()}
                              >
                                {day}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
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
                {isSubmitting ? "Adding..." : t("add_student")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}