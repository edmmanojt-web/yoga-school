import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PollSection } from "@/components/journey/poll-section";
import { ReflectionForm } from "@/components/journey/reflection-form";
import { DayCompleteButton } from "@/components/journey/day-complete-button";

export default async function JourneyDayPage({
  params,
}: {
  params: Promise<{ dayNumber: string }>;
}) {
  const session = await auth();
  const userId = (session!.user as any).id as string;
  const { dayNumber } = await params;
  const dayNum = parseInt(dayNumber, 10);

  if (isNaN(dayNum) || dayNum < 1 || dayNum > 7) notFound();

  // Load journey and day
  const journey = await db.journey.findFirst({
    where: { published: true, featured: true },
  });

  if (!journey) notFound();

  const enrollment = await db.journeyEnrollment.findUnique({
    where: { userId_journeyId: { userId, journeyId: journey.id } },
  });

  if (!enrollment) redirect("/yoga-beyond-the-mat");

  const day = await db.journeyDay.findFirst({
    where: { journeyId: journey.id, dayNumber: dayNum, published: true },
    include: {
      polls: {
        where: { published: true },
        orderBy: { sortOrder: "asc" },
        include: {
          options: { orderBy: { sortOrder: "asc" } },
          responses: {
            where: { userId },
            select: { optionId: true, pollId: true },
          },
        },
      },
    },
  });

  if (!day) notFound();

  // Get user's existing reflection for this day
  const existingReflection = await db.reflection.findFirst({
    where: { userId, dayId: day.id },
    select: { id: true, content: true, isPrivate: true },
  });

  // Check if this day is already completed
  const isCompleted = await db.journeyDayProgress.findUnique({
    where: { userId_dayId: { userId, dayId: day.id } },
  });

  const pollsWithResponses = day.polls.map((p) => ({
    id: p.id,
    question: p.question,
    sortOrder: p.sortOrder,
    options: p.options,
    userResponse: p.responses[0]?.optionId ?? null,
  }));

  return (
    <div className="max-w-2xl space-y-8">
      {/* Back link */}
      <Link
        href="/dashboard/journey"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-forest transition-colors"
        aria-label="Back to journey overview"
      >
        <ArrowLeft size={14} aria-hidden="true" />
        Journey overview
      </Link>

      {/* Day header */}
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-sage-500 font-medium mb-2">
          Day {day.dayNumber} · {day.theme}
        </p>
        <h1 className="font-heading text-charcoal-700 text-2xl mb-2">{day.title}</h1>
        {day.subtitle && (
          <p className="text-charcoal-400">{day.subtitle}</p>
        )}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2">
          <Clock size={13} aria-hidden="true" />
          About {day.durationMinutes} minutes
        </div>
      </div>

      {/* Intention */}
      <Card variant="outlined">
        <CardContent className="p-6">
          <p className="text-xs uppercase tracking-widest text-sage-500 mb-2">Intention</p>
          <p className="font-heading text-charcoal-700 text-lg italic">{day.intention}</p>
        </CardContent>
      </Card>

      {/* Practice */}
      <div>
        <h2 className="font-heading text-charcoal-700 text-xl mb-4">
          {day.practiceTitle}
        </h2>
        <div className="prose-yoga space-y-4">
          {day.practiceContent.split("\n\n").map((para, i) => (
            <p key={i} className="text-charcoal-500 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Observation note */}
      <Card
        className="border-l-4 border-l-terracotta rounded-l-none rounded-r-2xl border-border"
      >
        <CardContent className="p-5">
          <p className="text-xs uppercase tracking-widest text-terracotta mb-2">
            Observe
          </p>
          <p className="text-charcoal-600 text-sm leading-relaxed">
            {day.observationNote}
          </p>
        </CardContent>
      </Card>

      {/* Polls */}
      {pollsWithResponses.length > 0 && (
        <div>
          <h2 className="font-heading text-charcoal-700 text-xl mb-4">
            Reflect
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            There are no right or wrong answers. Just notice.
          </p>
          <PollSection
            polls={pollsWithResponses}
            journeyId={journey.id}
            dayId={day.id}
          />
        </div>
      )}

      {/* Reflection */}
      <div>
        <h2 className="font-heading text-charcoal-700 text-xl mb-4">
          Write a reflection
        </h2>
        <ReflectionForm
          dayId={day.id}
          existingReflection={existingReflection}
        />
      </div>

      {/* Complete button */}
      <div className="pt-4 border-t border-border">
        <DayCompleteButton
          journeyId={journey.id}
          dayId={day.id}
          dayNumber={day.dayNumber}
          totalDays={journey.totalDays}
          isAlreadyCompleted={!!isCompleted}
        />
      </div>
    </div>
  );
}
