import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { journeyConfig } from "@/config/site";

export default async function JourneyDashboardPage() {
  const session = await auth();
  const userId = (session!.user as any).id as string;

  // Find the primary journey
  const journey = await db.journey.findFirst({
    where: { published: true, featured: true },
    include: {
      days: {
        orderBy: { dayNumber: "asc" },
        select: { id: true, dayNumber: true, title: true, theme: true, durationMinutes: true },
      },
    },
  });

  if (!journey) {
    return (
      <div className="text-center py-16">
        <p className="text-charcoal-500">The journey is not yet available. Check back soon.</p>
      </div>
    );
  }

  const enrollment = await db.journeyEnrollment.findUnique({
    where: { userId_journeyId: { userId, journeyId: journey.id } },
  });

  // Redirect to journey info if not enrolled
  if (!enrollment) {
    redirect("/yoga-beyond-the-mat");
  }

  // Get completed days
  const completedProgress = await db.journeyDayProgress.findMany({
    where: {
      userId,
      day: { journeyId: journey.id },
    },
    select: { dayId: true },
  });

  const completedDayIds = new Set(completedProgress.map((p) => p.dayId));
  const completedCount = completedDayIds.size;
  const isCompleted = enrollment.status === "COMPLETED";

  // Find current day (first not completed)
  const currentDay =
    journey.days.find((d) => !completedDayIds.has(d.id)) ?? journey.days[journey.days.length - 1];

  return (
    <div className="max-w-2xl space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-sage-500 font-medium mb-2">
          Your Journey
        </p>
        <h1 className="font-heading text-charcoal-700 text-2xl mb-1">
          {journey.title}
        </h1>
        <p className="text-muted-foreground text-sm">
          {isCompleted
            ? "Journey completed"
            : `${completedCount} of ${journey.totalDays} days completed`}
        </p>
      </div>

      {/* Days overview */}
      <Card variant="elevated">
        <CardContent className="p-6">
          <ol className="space-y-3" aria-label="Journey days">
            {journey.days.map((day) => {
              const isComplete = completedDayIds.has(day.id);
              const isCurrent = day.id === currentDay?.id && !isCompleted;

              return (
                <li key={day.id}>
                  <Link
                    href={
                      isComplete || isCurrent
                        ? `/dashboard/journey/${day.dayNumber}`
                        : "#"
                    }
                    className={
                      isComplete || isCurrent
                        ? "flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors group"
                        : "flex items-center gap-4 p-3 rounded-xl opacity-50 cursor-not-allowed"
                    }
                    aria-disabled={!isComplete && !isCurrent}
                    aria-current={isCurrent ? "step" : undefined}
                  >
                    {isComplete ? (
                      <CheckCircle
                        size={20}
                        className="text-forest flex-shrink-0"
                        aria-hidden="true"
                      />
                    ) : isCurrent ? (
                      <div
                        className="w-5 h-5 rounded-full bg-terracotta flex-shrink-0"
                        aria-hidden="true"
                      />
                    ) : (
                      <Circle
                        size={20}
                        className="text-border flex-shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${
                          isComplete
                            ? "text-charcoal-500 line-through"
                            : isCurrent
                            ? "text-forest"
                            : "text-charcoal-400"
                        }`}
                      >
                        Day {day.dayNumber} — {day.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {day.theme} · {day.durationMinutes} min
                      </p>
                    </div>
                    {isCurrent && (
                      <ArrowRight
                        size={15}
                        className="text-forest group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ol>
        </CardContent>
      </Card>

      {/* CTA */}
      {!isCompleted && currentDay && (
        <Link href={`/dashboard/journey/${currentDay.dayNumber}`}>
          <Button variant="primary" size="lg">
            Begin Day {currentDay.dayNumber} — {currentDay.title}
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </Link>
      )}

      {isCompleted && (
        <Card
          variant="featured"
          className="p-6 text-center"
        >
          <CheckCircle size={32} className="text-terracotta-300 mx-auto mb-3" aria-hidden="true" />
          <h2 className="font-heading text-ivory text-xl mb-2">
            Journey complete.
          </h2>
          <p className="text-ivory/70 text-sm mb-6">
            You didn't just complete seven walks. You spent seven days observing yourself.
          </p>
          <Link href="/schedule">
            <Button variant="accent">
              Continue Exploring
              <ArrowRight size={14} aria-hidden="true" />
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
