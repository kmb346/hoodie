"use client";

import { useRef, useState } from "react";
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
import { UserIcon } from '@heroicons/react/24/solid';
import { Input } from "~/components/ui/input";
import { type Location } from "~/actions/schemas";
import { useRouter } from "next/navigation";
import { createLocation } from "~/actions/locations/mutations";

export function NewLocationDialog() {

  const form = useForm<Location & { postalPart1: string; postalPart2: string }>({
    defaultValues: {
      name: "",
      postalPart1: "",
      postalPart2: "",
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
  const postalPart2Ref = useRef<HTMLInputElement>(null);

  async function onSubmit(data: Location & { postalPart1: string; postalPart2: string }) {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      if (!data.name || !data.phone) {
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

      const { postalPart1, postalPart2, ...locationData } = combinedData;

      const location = await createLocation(locationData);
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
            <div>
                <FormField
                  control={form.control}
                  name="building"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Building</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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