import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { SessionForm } from "@/components/admin/session-form";

export default async function EditSessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [session, offerings, teachers] = await Promise.all([
    db.session.findUnique({ where: { id } }),
    db.offering.findMany({
      where: { published: true },
      select: { id: true, title: true, category: true },
      orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
    }),
    db.teacher.findMany({
      where: { published: true },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  if (!session) notFound();

  // Format datetimes for datetime-local input (no seconds, no Z)
  function toLocalInput(d: Date) {
    return d.toISOString().slice(0, 16);
  }

  const defaultValues = {
    offeringId: session.offeringId,
    teacherId: session.teacherId ?? "",
    title: session.title,
    description: session.description ?? "",
    startTime: toLocalInput(session.startTime),
    endTime: toLocalInput(session.endTime),
    mode: session.mode,
    capacity: session.capacity,
    location: session.location ?? "",
    meetingUrl: session.meetingUrl ?? "",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-charcoal-700 text-2xl">Edit Session</h1>
        <p className="text-sm text-muted-foreground mt-1">{session.title}</p>
      </div>
      <SessionForm
        offerings={offerings}
        teachers={teachers}
        defaultValues={defaultValues}
        sessionId={id}
      />
    </div>
  );
}
