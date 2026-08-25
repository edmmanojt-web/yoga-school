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
        style={{ background: "linear-gradient(135deg, #FBF7F2 0%, #F2E8DA 100%)" }}
        aria-labelledby="schedule-heading"
      >
        <div className="max-w-5xl mx-auto">
          <p
            className="font-semibold mb-3"
            style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#B87D3B" }}
          >Upcoming</p>
          <h1 id="schedule-heading" className="font-heading text-4xl mb-3" style={{ color: "#231E1A" }}>
            Schedule
          </h1>
          <p className="text-lg" style={{ color: "#7B6B5B" }}>
            Browse upcoming sessions and book your place.
          </p>
          {sessionData.length === 0 && (
            <p className="text-sm mt-3" style={{ color: "#B0A090" }}>
              No sessions are currently scheduled — check back soon or{" "}
              <a href="/contact" className="underline underline-offset-2" style={{ color: "#6B4A2A" }}>
                get in touch
              </a>{" "}
              to request one.
            </p>
          )}
        </div>
      </section>

      {/* Sessions */}
      <section className="py-12 px-4 bg-[#FEFCF9]" aria-label="Session listings">
        <div className="max-w-5xl mx-auto">
          <ScheduleClient sessions={sessionData} />
        </div>
      </section>
    </>
  );
}
