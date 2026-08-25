import { db } from "@/lib/db";

export default async function AdminAnalyticsPage() {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    totalEvents,
    eventsLast7Days,
    eventsLast30Days,
    topPages,
    topEvents,
    newUsersLast7Days,
    newUsersLast30Days,
    bookingsLast30Days,
    enrollmentsLast30Days,
    recentGuideEvents,
  ] = await Promise.all([
    db.analyticsEvent.count(),
    db.analyticsEvent.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    db.analyticsEvent.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    db.analyticsEvent.groupBy({
      by: ["page"],
      _count: { id: true },
      where: { page: { not: null }, createdAt: { gte: thirtyDaysAgo } },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    }),
    db.analyticsEvent.groupBy({
      by: ["event"],
      _count: { id: true },
      where: { createdAt: { gte: thirtyDaysAgo } },
      orderBy: { _count: { id: "desc" } },
      take: 10,
    }),
    db.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    db.user.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    db.booking.count({ where: { bookedAt: { gte: thirtyDaysAgo } } }),
    db.journeyEnrollment.count({ where: { startedAt: { gte: thirtyDaysAgo } } }),
    db.analyticsEvent.findMany({
      where: {
        createdAt: { gte: thirtyDaysAgo },
        event: {
          in: [
            "guide_opened",
            "guide_message_sent",
            "guide_cta_clicked",
            "guide_card_clicked",
            "guide_question_answered",
            "guide_knowledge_gap",
            "guide_handoff",
          ],
        },
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
  ]);

  const guideEvents = recentGuideEvents.filter((event) => event.event === "guide_question_answered");
  const guideGaps = recentGuideEvents.filter((event) => event.event === "guide_knowledge_gap");
  const guideHandoffs = recentGuideEvents.filter((event) => event.event === "guide_handoff");

  const topGuideIntents = Object.entries(
    guideEvents.reduce<Record<string, number>>((acc, item) => {
      const intent = typeof (item.properties as Record<string, unknown> | null)?.intent === "string"
        ? String((item.properties as Record<string, unknown>).intent)
        : "unknown";
      acc[intent] = (acc[intent] ?? 0) + 1;
      return acc;
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const topKnowledgeGaps = Object.entries(
    guideGaps.reduce<Record<string, number>>((acc, item) => {
      const gap = typeof (item.properties as Record<string, unknown> | null)?.gap === "string"
        ? String((item.properties as Record<string, unknown>).gap)
        : "unknown_gap";
      acc[gap] = (acc[gap] ?? 0) + 1;
      return acc;
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const statCards = [
    { label: "Events (last 7 days)", value: eventsLast7Days, sub: `${totalEvents} total` },
    { label: "Events (last 30 days)", value: eventsLast30Days },
    { label: "New users (7 days)", value: newUsersLast7Days, sub: `${newUsersLast30Days} in 30 days` },
    { label: "Bookings (30 days)", value: bookingsLast30Days },
    { label: "Journey enrollments (30 days)", value: enrollmentsLast30Days },
    { label: "Guide questions (30 days)", value: guideEvents.length, sub: `${guideGaps.length} knowledge gaps` },
    { label: "Guide handoffs (30 days)", value: guideHandoffs.length },
  ];

  return (
    <div className="space-y-8">
      <h1 className="font-heading text-charcoal-700 text-2xl">Analytics</h1>

      {/* Stat cards */}
      <section aria-labelledby="analytics-stats">
        <h2 id="analytics-stats" className="font-heading text-lg text-charcoal-700 mb-4">
          Key metrics
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {statCards.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-border p-4">
              <p className="font-heading text-3xl text-charcoal-700">{stat.value}</p>
              <p className="text-xs text-charcoal-500 mt-1 leading-tight">{stat.label}</p>
              {stat.sub && (
                <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top pages */}
        <section aria-labelledby="top-pages">
          <h2 id="top-pages" className="font-heading text-lg text-charcoal-700 mb-4">
            Top pages (30 days)
          </h2>
          {topPages.length === 0 ? (
            <p className="text-sm text-muted-foreground bg-white rounded-xl border border-border p-6 text-center">
              No page data yet.
            </p>
          ) : (
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm" aria-label="Top pages">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-2.5 font-medium text-charcoal-600">Page</th>
                    <th className="text-right px-4 py-2.5 font-medium text-charcoal-600">Views</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {topPages.map((row) => (
                    <tr key={row.page} className="hover:bg-muted/30">
                      <td className="px-4 py-2.5 text-charcoal-600 font-mono text-xs truncate max-w-[200px]">
                        {row.page}
                      </td>
                      <td className="px-4 py-2.5 text-right font-medium text-charcoal-700">
                        {row._count.id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Top events */}
        <section aria-labelledby="top-events">
          <h2 id="top-events" className="font-heading text-lg text-charcoal-700 mb-4">
            Top events (30 days)
          </h2>
          {topEvents.length === 0 ? (
            <p className="text-sm text-muted-foreground bg-white rounded-xl border border-border p-6 text-center">
              No event data yet.
            </p>
          ) : (
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm" aria-label="Top events">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-2.5 font-medium text-charcoal-600">Event</th>
                    <th className="text-right px-4 py-2.5 font-medium text-charcoal-600">Count</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {topEvents.map((row) => (
                    <tr key={row.event} className="hover:bg-muted/30">
                      <td className="px-4 py-2.5 text-charcoal-600 font-mono text-xs">
                        {row.event}
                      </td>
                      <td className="px-4 py-2.5 text-right font-medium text-charcoal-700">
                        {row._count.id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section aria-labelledby="guide-intents">
          <h2 id="guide-intents" className="font-heading text-lg text-charcoal-700 mb-4">
            Guide intents (30 days)
          </h2>
          {topGuideIntents.length === 0 ? (
            <p className="text-sm text-muted-foreground bg-white rounded-xl border border-border p-6 text-center">
              No guide intent data yet.
            </p>
          ) : (
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm" aria-label="Guide intents">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-2.5 font-medium text-charcoal-600">Intent</th>
                    <th className="text-right px-4 py-2.5 font-medium text-charcoal-600">Count</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {topGuideIntents.map(([intent, count]) => (
                    <tr key={intent} className="hover:bg-muted/30">
                      <td className="px-4 py-2.5 text-charcoal-600 font-mono text-xs">{intent}</td>
                      <td className="px-4 py-2.5 text-right font-medium text-charcoal-700">{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section aria-labelledby="guide-gaps">
          <h2 id="guide-gaps" className="font-heading text-lg text-charcoal-700 mb-4">
            Guide knowledge gaps (30 days)
          </h2>
          {topKnowledgeGaps.length === 0 ? (
            <p className="text-sm text-muted-foreground bg-white rounded-xl border border-border p-6 text-center">
              No guide knowledge gaps yet.
            </p>
          ) : (
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm" aria-label="Guide knowledge gaps">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-2.5 font-medium text-charcoal-600">Gap</th>
                    <th className="text-right px-4 py-2.5 font-medium text-charcoal-600">Count</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {topKnowledgeGaps.map(([gap, count]) => (
                    <tr key={gap} className="hover:bg-muted/30">
                      <td className="px-4 py-2.5 text-charcoal-600 font-mono text-xs">{gap}</td>
                      <td className="px-4 py-2.5 text-right font-medium text-charcoal-700">{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <p className="text-xs text-muted-foreground">
        Analytics are collected via our built-in event tracker. To integrate a third-party tool
        (e.g. PostHog, Plausible), update <code className="font-mono bg-muted px-1 rounded">src/lib/analytics.ts</code>.
      </p>
    </div>
  );
}
