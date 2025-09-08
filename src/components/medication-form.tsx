"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PlusCircle } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Medication name must be at least 2 characters." }).max(50, { message: "Name must be 50 characters or less." }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Please enter a valid time (HH:MM)." }),
});

type MedicationFormProps = {
  onAddMedication: (name: string, time: string) => void;
};

export default function MedicationForm({ onAddMedication }: MedicationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      time: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddMedication(values.name, values.time);
    form.reset();
  }

  return (
    <section aria-labelledby="add-medication-heading">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle id="add-medication-heading" className="flex items-center gap-2 text-xl">
            <PlusCircle className="h-6 w-6 text-primary" />
            Add New Medication
          </CardTitle>
          <CardDescription>Enter the details below to add a medication to your list.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medication Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Lisinopril" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg">
                Add to List
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
