import { db } from "@/lib/db";
import { MarkReadButton } from "@/components/admin/mark-read-button";

export default async function AdminContactPage() {
  const submissions = await db.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-charcoal-700 text-2xl">Contact Enquiries</h1>

      <div className="space-y-3">
        {submissions.map((s) => (
          <div
            key={s.id}
            className={`bg-white rounded-xl border p-5 ${
              !s.read ? "border-terracotta-200" : "border-border"
            }`}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="font-medium text-charcoal-700">{s.name}</p>
                <p className="text-sm text-charcoal-500">{s.email}</p>
                {s.phone && <p className="text-xs text-muted-foreground">{s.phone}</p>}
              </div>
              <div className="text-right">
                <span className="text-xs bg-sage-100 text-sage-700 px-2 py-0.5 rounded-full">
                  {s.interest}
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(s.createdAt).toLocaleDateString("en-IN")}
                </p>
                {!s.read && (
                  <div className="flex flex-col items-end gap-1 mt-1">
                    <span className="text-xs text-terracotta font-medium">Unread</span>
                    <MarkReadButton id={s.id} initialRead={s.read} />
                  </div>
                )}
              </div>
            </div>
            <p className="text-sm text-charcoal-600 leading-relaxed">{s.message}</p>
            {s.preferredLanguage && (
              <p className="text-xs text-muted-foreground mt-2">
                Language preference: {s.preferredLanguage}
              </p>
            )}
          </div>
        ))}
        {submissions.length === 0 && (
          <p className="text-center py-12 text-muted-foreground">No enquiries yet.</p>
        )}
      </div>
    </div>
  );
}
