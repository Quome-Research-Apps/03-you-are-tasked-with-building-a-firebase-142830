"use client";

import { useState, useEffect } from 'react';
import type { Medication } from '@/types/medication';
import MedicationForm from '@/components/medication-form';
import MedicationList from '@/components/medication-list';
import { Pill } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    try {
      const savedMeds = localStorage.getItem('pillbox-pal-meds');
      if (savedMeds) {
        setMedications(JSON.parse(savedMeds));
      }
    } catch (error) {
      console.error("Failed to parse medications from localStorage", error);
    } finally {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem('pillbox-pal-meds', JSON.stringify(medications));
      } catch (error) {
        console.error("Failed to save medications to localStorage", error);
      }
    }
  }, [medications, isMounted]);

  const addMedication = (name: string, time: string) => {
    const newMedication: Medication = {
      id: crypto.randomUUID(),
      name,
      time,
    };
    setMedications(prev => [...prev, newMedication]);
  };

  const deleteMedication = (id: string) => {
    setMedications(prev => prev.filter(med => med.id !== id));
  };
  
  if (!isMounted) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex items-center justify-center h-16 w-16 rounded-full bg-accent">
            <Pill className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground">Pillbox Pal</h1>
          <p className="mt-2 text-lg text-muted-foreground">Your simple, private medication reminder.</p>
        </header>
        
        <main className="space-y-12">
          <MedicationForm onAddMedication={addMedication} />
          <MedicationList medications={medications} onDeleteMedication={deleteMedication} />
        </main>
      </div>
    </div>
  );
}
