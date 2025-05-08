"use client";

import { useEffect, useRef, useState } from "react";
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
import { Checkbox } from "~/components/ui/checkbox";
import { MONTHS, type AdminUser } from "~/actions/schemas";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "~/convex/_generated/api";

import { calculateTimestamp } from "~/lib/calculateTimestamp";
import { generateSalt, hashPassword } from "~/auth/core/passwordHasher";
import { useTranslations } from "next-intl";

export function NewStaffDialog() {

  const t = useTranslations("dashboard.admin.staff");

  const form = useForm<AdminUser & { 
    role: string[]; 
    postalPart1: string; 
    postalPart2: string; 
    birthdate: number 
  }>({

    defaultValues: {
      user_id: undefined,
      userData: {
        first_name: "",
        last_name: "",
        email: "",
        postal_code: "",
        prefecture: "",
        city: "",
        address: ""
      },
      postalPart1: "",
      postalPart2: "",
      birthdate: 0,
    },
  });

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router =  useRouter();

  //For postal code
  const postalPart2Ref = useRef<HTMLInputElement>(null);

  //For birthdate calculation
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  const createUser = useMutation(api.mutations.user.createUser);
  const createStaff = useMutation(api.mutations.staff.createStaff);

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

  async function onSubmit(
    data: AdminUser &
    { 
      role: string[],
      postalPart1: string, 
      postalPart2: string,
      birthdate: number,
    }
  ) {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      if (!data.userData.first_name || 
          !data.userData.last_name || 
          !data.userData.email || 
          !data.role.length
        ) {
        setError("Missing required fields");
        setIsSubmitting(false);
        return;
      }

      const combinedData = {
        ...data,
        postal_code: data.postalPart1 && data.postalPart2 
          ? `${data.postalPart1}-${data.postalPart2}` 
          : "",
      };

      const { postalPart1, postalPart2, birthdate, ...staffData } = combinedData;

      const salt = await generateSalt();
      const pwd = await hashPassword("password", salt);

      const user = await createUser({
        first_name: data.userData.first_name,
        last_name: data.userData.last_name,
        email: data.userData.email,
        password: pwd,
        pwSalt: salt,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        last_login: Date.now(),
        postal_code: data.userData.postal_code,
        prefecture: data.userData.prefecture,
        city: data.userData.city,
        address: data.userData.address,
      });

      if (user) {
        const newStaffData = { 
          user_id: user,
          birthdate: calculateTimestamp(selectedYear, selectedMonth, selectedDay),
          role: data.role
        };
        const newStaff = await createStaff(newStaffData);
        if(newStaff) {
          setSuccess("Staff member created successfully");
          form.reset();
          setSelectedYear("");
          setSelectedMonth("");
          setSelectedDay("");
          
          setTimeout(() => {
            setOpen(false);
            router.refresh();
            setSuccess(null);
          },2000);
        }
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
        <Button variant="outline"><PlusIcon />{t("add_staff_button")}</Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-scroll max-h-screen min-w-[50%]">
        <DialogHeader>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <DialogTitle>Add Staff</DialogTitle>
          <DialogDescription>
            Add a new staff member to the database
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-4"
          >
            <div className="grid gap-4 py-4">
            <h4 className="font-semibold">Required Fields</h4>
              <div className="flex gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="userData.first_name"
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
                    name="userData.last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("last_name")}<span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="userData.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email")}<span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormLabel>{t("roles")}<span className="text-red-500">*</span></FormLabel>
                {roles.map((role) => (
                  <FormField
                    key={role.id}
                    control={form.control}
                    name="role"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={role.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(role.id)}
                              onCheckedChange={(checked) => {
                                const updatedValue = checked
                                ? [...(field.value || []), role.id]
                                : (field.value || []).filter(
                                  value => value !== role.id
                                );
                                field.onChange(updatedValue);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {role.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </div>
            </div>
            <div className="grid gap-4 py-4">
              <h4 className="font-semibold">Optional Fields</h4>
              <div>
                <Controller
                  control={form.control}
                  name="birthdate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Birthdate</FormLabel>
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
                            <SelectValue placeholder="Year" />
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
                            <SelectValue placeholder="Month" />
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
                            <SelectValue placeholder="Day" />
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
              <div>
                <FormLabel>Postal Code</FormLabel>
                <div className="flex items-center gap-2">
                  <Controller
                    name="postalPart1"
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        className="w-20"
                        maxLength={3}
                        placeholder="123"
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          field.onChange(value.slice(0, 3));
                          // Auto-focus to second input when first part is complete
                          if (value.length >= 3 && postalPart2Ref.current) {
                            postalPart2Ref.current.focus();
                          }
                        }}
                      />
                    )}
                  />
                  <span className="text-lg font-medium">-</span>
                  <Controller
                    name="postalPart2"
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        ref={postalPart2Ref}
                        className="w-24"
                        maxLength={4}
                        placeholder="4567"
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          field.onChange(value.slice(0, 4));
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="userData.prefecture"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prefecture</FormLabel>
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
                  name="userData.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
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
                  name="userData.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
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
                {isSubmitting ? "Adding..." : "Add Staff"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}