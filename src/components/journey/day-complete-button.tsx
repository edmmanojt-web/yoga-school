"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

interface DayCompleteButtonProps {
  journeyId: string;
  dayId: string;
  dayNumber: number;
  totalDays: number;
  isAlreadyCompleted: boolean;
}

export function DayCompleteButton({
  journeyId,
  dayId,
  dayNumber,
  totalDays,
  isAlreadyCompleted,
}: DayCompleteButtonProps) {
  const router = useRouter();
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(isAlreadyCompleted);
  const isLastDay = dayNumber === totalDays;

  async function handleComplete() {
    setCompleting(true);
    try {
      const res = await fetch(
        `/api/journeys/${journeyId}/days/${dayId}/complete`,
        { method: "POST" }
      );

      if (res.ok) {
        setCompleted(true);
        setTimeout(() => {
          if (isLastDay) {
            router.push("/dashboard/journey");
          } else {
            router.push(`/dashboard/journey/${dayNumber + 1}`);
          }
          router.refresh();
        }, 1500);
      }
    } finally {
      setCompleting(false);
    }
  }

  if (completed) {
    return (
      <div
        className="flex items-center gap-3 text-sage-600"
        role="status"
        aria-live="polite"
      >
        <CheckCircle size={20} aria-hidden="true" />
        <span className="text-sm font-medium">
          {isLastDay ? "Journey complete!" : `Day ${dayNumber} complete`}
        </span>
        {!isLastDay && (
          <Link href={`/dashboard/journey/${dayNumber + 1}`}>
            <Button variant="ghost" size="sm">
              Continue to Day {dayNumber + 1}
              <ArrowRight size={13} aria-hidden="true" />
            </Button>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Button
        variant="primary"
        size="lg"
        loading={completing}
        onClick={handleComplete}
        className="w-full sm:w-auto"
      >
        <CheckCircle size={16} aria-hidden="true" />
        {isLastDay ? "Complete the Journey" : `Mark Day ${dayNumber} complete`}
      </Button>
      <p className="text-xs text-muted-foreground">
        You can always come back to read or edit your reflection.
      </p>
    </div>
  );
}
