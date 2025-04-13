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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "~/components/ui/select";
import { UserIcon } from '@heroicons/react/24/solid';
import { Input } from "~/components/ui/input";
import { type Student } from "~/actions/schemas";
import { useRouter } from "next/navigation";
import { createStudent } from "~/actions/student/mutations";

export function NewStudentDialog() {

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
    "Adult"
  ];

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

      const student = await createStudent(data);
      if (student) {
        setSuccess("Student created successfully");
        form.reset();
        
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
        <Button variant="outline"><UserIcon /> Add Student</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
          <DialogDescription>
            Add a new student.
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
              <div className="flex gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name <span className="text-red-500">*</span></FormLabel>
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
                        <FormLabel>Last Name <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <h4 className="font-semibold">Optional Fields</h4>
              <div className="flex gap-x-2">
                <div>
                  <FormField
                    control={form.control}
                    name="default_class"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class</FormLabel>
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
                    name="grade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grade</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Grade"/>
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
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Student"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}