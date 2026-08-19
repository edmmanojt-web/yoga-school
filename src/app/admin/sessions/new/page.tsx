import { db } from "@/lib/db";
import { SessionForm } from "@/components/admin/session-form";

export default async function NewSessionPage() {
  const [offerings, teachers] = await Promise.all([
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-charcoal-700 text-2xl">New Session</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Schedule a new session for an existing offering.
        </p>
      </div>
      <SessionForm offerings={offerings} teachers={teachers} />
    </div>
  );
}
