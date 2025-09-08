"use client";

import { useEffect, useState } from 'react';
import type { Medication } from '@/types/medication';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Trash2, Clock } from 'lucide-react';

type MedicationItemProps = {
  medication: Medication;
  onDelete: (id: string) => void;
};

export default function MedicationItem({ medication, onDelete }: MedicationItemProps) {
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    // Format time on client to avoid hydration mismatch
    const [hour, minute] = medication.time.split(':');
    const h = parseInt(hour, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHour = h % 12 === 0 ? 12 : h % 12;
    setFormattedTime(`${formattedHour}:${minute} ${ampm}`);
  }, [medication.time]);

  return (
    <Card className="transition-shadow hover:shadow-md bg-card">
      <CardContent className="p-4 flex items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1 min-w-0">
          <div className="font-semibold text-foreground truncate flex-shrink" title={medication.name}>
            {medication.name}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Clock className="h-4 w-4" />
            <span>{formattedTime || '...'}</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(medication.id)}
          aria-label={`Delete ${medication.name}`}
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  );
}
