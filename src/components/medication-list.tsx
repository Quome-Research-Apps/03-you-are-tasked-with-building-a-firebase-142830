"use client";

import type { Medication } from '@/types/medication';
import MedicationItem from './medication-item';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { BellRing } from 'lucide-react';

type MedicationListProps = {
  medications: Medication[];
  onDeleteMedication: (id: string) => void;
};

export default function MedicationList({ medications, onDeleteMedication }: MedicationListProps) {
  const sortedMedications = [...medications].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <section aria-labelledby="medications-heading">
      <h2 id="medications-heading" className="text-2xl font-bold font-headline mb-4 text-center">My Schedule</h2>
      {sortedMedications.length > 0 ? (
        <div className="space-y-3">
          {sortedMedications.map((med) => (
            <MedicationItem
              key={med.id}
              medication={med}
              onDelete={onDeleteMedication}
            />
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center text-center py-12 px-6 bg-accent/50 border-2 border-dashed">
            <BellRing className="h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle className="mb-2">No Medications Yet</CardTitle>
            <CardDescription>Add a medication using the form above to see it here.</CardDescription>
        </Card>
      )}
    </section>
  );
}
