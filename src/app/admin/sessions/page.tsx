import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatTime } from "@/lib/utils";
import { Plus } from "lucide-react";

export default async function AdminSessionsPage() {
  const sessions = await db.session.findMany({
    include: {
      offering: { select: { title: true, category: true } },
      teacher: { select: { name: true } },
    },
    orderBy: { startTime: "asc" },
    take: 50,
  });

  const statusVariant: Record<string, "sage" | "terracotta" | "default" | "forest"> = {
    SCHEDULED: "sage",
    DRAFT: "default",
    CANCELLED: "terracotta",
    COMPLETED: "forest",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-charcoal-700 text-2xl">Sessions</h1>
        <Link href="/admin/sessions/new">
          <Button variant="primary" size="sm">
            <Plus size={14} aria-hidden="true" />
            Create Session
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm" aria-label="Sessions table">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">Session</th>
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">Date & Time</th>
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">Teacher</th>
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">Enrolled</th>
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">Status</th>
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sessions.map((s) => (
              <tr key={s.id} className="hover:bg-muted/50">
                <td className="px-4 py-3">
                  <p className="font-medium text-charcoal-700">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.offering.category}</p>
                </td>
                <td className="px-4 py-3 text-charcoal-500">
                  <p>{formatDate(s.startTime)}</p>
                  <p className="text-xs">{formatTime(s.startTime)}</p>
                </td>
                <td className="px-4 py-3 text-charcoal-500">
                  {s.teacher?.name ?? "—"}
                </td>
                <td className="px-4 py-3 text-charcoal-500">
                  {s.enrolled}/{s.capacity}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={statusVariant[s.status] ?? "default"}>{s.status}</Badge>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/sessions/${s.id}/edit`}>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sessions.length === 0 && (
          <p className="text-center py-12 text-muted-foreground">No sessions yet.</p>
        )}
      </div>
    </div>
  );
}
