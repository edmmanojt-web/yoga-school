import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";

const statusColors: Record<string, "sage" | "forest" | "terracotta" | "default"> = {
  ACTIVE: "sage",
  COMPLETED: "forest",
  ARCHIVED: "terracotta",
};

export default async function AdminJourneysPage() {
  const [journeys, enrollments] = await Promise.all([
    db.journey.findMany({
      include: {
        days: { select: { id: true } },
        _count: { select: { enrollments: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    db.journeyEnrollment.findMany({
      include: {
        user: { select: { name: true, email: true } },
        journey: { select: { title: true } },
      },
      orderBy: { startedAt: "desc" },
      take: 50,
    }),
  ]);

  // Count day progress per user+journey via JourneyDayProgress
  const progressCounts = await db.journeyDayProgress.groupBy({
    by: ["userId"],
    _count: { id: true },
  });
  const progressByUser = Object.fromEntries(
    progressCounts.map((p) => [p.userId, p._count.id])
  );

  const stats = {
    total: enrollments.length,
    active: enrollments.filter((e) => e.status === "ACTIVE").length,
    completed: enrollments.filter((e) => e.status === "COMPLETED").length,
    archived: enrollments.filter((e) => e.status === "ARCHIVED").length,
  };

  return (
    <div className="space-y-8">
      <h1 className="font-heading text-charcoal-700 text-2xl">Journeys</h1>

      {/* Journey overview */}
      <section aria-labelledby="journey-list">
        <h2 id="journey-list" className="font-heading text-lg text-charcoal-700 mb-4">
          Available journeys
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {journeys.map((j) => (
            <div
              key={j.id}
              className="bg-white rounded-2xl border border-border p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-heading text-charcoal-700">{j.title}</h3>
                  {j.subtitle && (
                    <p className="text-sm text-charcoal-500 mt-0.5">{j.subtitle}</p>
                  )}
                </div>
                <Badge variant={j.published ? "sage" : "default"}>
                  {j.published ? "Published" : "Draft"}
                </Badge>
              </div>
              <div className="flex items-center gap-6 text-sm text-charcoal-500">
                <span>
                  <strong className="text-charcoal-700">{j.days.length}</strong> days
                </span>
                <span>
                  <strong className="text-charcoal-700">{j._count.enrollments}</strong> enrollments
                </span>
              </div>
            </div>
          ))}
        </div>
        {journeys.length === 0 && (
          <p className="text-center py-8 text-muted-foreground bg-white rounded-2xl border border-border">
            No journeys yet.
          </p>
        )}
      </section>

      {/* Enrollment stats */}
      <section aria-labelledby="enrollment-stats">
        <h2 id="enrollment-stats" className="font-heading text-lg text-charcoal-700 mb-4">
          Enrollment overview
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total enrollments", value: stats.total, color: "text-charcoal-700" },
            { label: "Active", value: stats.active, color: "text-sage-600" },
            { label: "Completed", value: stats.completed, color: "text-forest" },
            { label: "Archived", value: stats.archived, color: "text-terracotta" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-border p-4 text-center">
              <p className={`font-heading text-3xl ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-charcoal-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent enrollments */}
      <section aria-labelledby="recent-enrollments">
        <h2 id="recent-enrollments" className="font-heading text-lg text-charcoal-700 mb-4">
          Recent enrollments
        </h2>
        <div className="bg-white rounded-2xl border border-border overflow-x-auto">
          <table className="w-full text-sm" aria-label="Enrollments table">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-charcoal-600">User</th>
                <th className="text-left px-4 py-3 font-medium text-charcoal-600">Journey</th>
                <th className="text-left px-4 py-3 font-medium text-charcoal-600">Progress</th>
                <th className="text-left px-4 py-3 font-medium text-charcoal-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-charcoal-600">Enrolled</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {enrollments.map((e) => (
                <tr key={e.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-charcoal-700">{e.user.name ?? "—"}</p>
                    <p className="text-xs text-charcoal-500">{e.user.email}</p>
                  </td>
                  <td className="px-4 py-3 text-charcoal-600">{e.journey.title}</td>
                  <td className="px-4 py-3 text-charcoal-600">
                    <span className="text-xs text-muted-foreground">
                      {progressByUser[e.userId] ?? 0} days completed
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={statusColors[e.status] ?? "default"}>{e.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-charcoal-500 text-xs">
                    {new Date(e.startedAt).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {enrollments.length === 0 && (
            <p className="text-center py-12 text-muted-foreground">No enrollments yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
