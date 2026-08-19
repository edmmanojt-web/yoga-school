import type { Metadata } from "next";
import { db } from "@/lib/db";
import { siteConfig } from "@/config/site";
import { ScheduleClient } from "@/components/schedule/schedule-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Schedule — ${siteConfig.name}`,
  description: "Browse upcoming yoga, breathwork, and mindfulness sessions. Book online or in-person.",
};

export default async function SchedulePage() {
  let sessionData: Array<{
    id: string;
    startTime: Date;
    endTime: Date;
    capacity: number;
    enrolled: number;
    location: string | null;
    spotsLeft: number;
    offering: { title: string; category: string; slug: string };
    teacher: { name: string | null; photoUrl: string | null };
  }> = [];

  if (process.env.DATABASE_URL) {
    try {
      const sessions = await db.session.findMany({
        where: {
          status: "SCHEDULED",
          startTime: { gte: new Date() },
        },
        include: {
          offering: { select: { title: true, category: true, slug: true } },
          teacher: { select: { name: true, photoUrl: true } },
        },
        orderBy: { startTime: "asc" },
        take: 50,
      });

      sessionData = sessions.map((s) => ({
        ...s,
        spotsLeft: Math.max(0, s.capacity - s.enrolled),
      }));
    } catch {
      // DB unavailable in local dev — render page with no sessions
    }
  }

  return (
    <>
      {/* Hero */}
      <section
        className="py-16 px-4"
        style={{ background: "linear-gradient(135deg, #FAF7F0 0%, #F4EFE3 100%)" }}
        aria-labelledby="schedule-heading"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-sage-600 mb-3">Upcoming</p>
          <h1 id="schedule-heading" className="font-heading text-4xl text-charcoal-700 mb-3">
            Schedule
          </h1>
          <p className="text-charcoal-500 text-lg">
            Browse upcoming sessions and book your place.
          </p>
          {sessionData.length === 0 && (
            <p className="text-sm text-muted-foreground mt-3">
              No sessions are currently scheduled — check back soon or{" "}
              <a href="/contact" className="text-forest underline underline-offset-2">
                get in touch
              </a>{" "}
              to request one.
            </p>
          )}
        </div>
      </section>

      {/* Sessions */}
      <section className="py-12 px-4 bg-white" aria-label="Session listings">
        <div className="max-w-5xl mx-auto">
          <ScheduleClient sessions={sessionData} />
        </div>
      </section>
    </>
  );
}
