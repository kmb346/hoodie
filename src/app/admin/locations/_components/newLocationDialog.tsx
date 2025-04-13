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
import { type Location } from "~/actions/schemas";
import { useRouter } from "next/navigation";
import { createLocation } from "~/actions/locations/mutations";

export function NewLocationDialog() {

  const form = useForm<Location>({
    defaultValues: {
      name: "",
      postal_code: "",
      prefecture: "",
      city: "",
      address: "",
      building: "",
      phone: "",
    },
  });

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router =  useRouter();

  async function onSubmit(data: Location) {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      if (!data.name || !data.phone) {
        setError("Missing required fields");
        setIsSubmitting(false);
        return;
      }

      const location = await createLocation(data);
      if (location) {
        setSuccess("Location created successfully");
        form.reset();
        
        setTimeout(() => {
          setOpen(false);
          router.refresh();
          setSuccess(null);
        },2000);
      } else {
        setError("Failed to create location");
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
        <Button variant="outline"><UserIcon /> Add Location</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Location</DialogTitle>
          <DialogDescription>
            Add a school location.
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
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
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
                  name="postal_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
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
                  name="prefecture"
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
                  name="city"
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
                  name="address"
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
                {isSubmitting ? "Adding..." : "Add Location"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}