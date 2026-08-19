import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { OfferingForm } from "@/components/admin/offering-form";

export default async function EditOfferingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const offering = await db.offering.findUnique({ where: { id } });
  if (!offering) notFound();

  const defaultValues = {
    title: offering.title,
    slug: offering.slug,
    category: offering.category,
    shortDescription: offering.shortDescription,
    description: offering.description,
    imageUrl: offering.imageUrl ?? "",
    mode: offering.mode,
    level: offering.level ?? "",
    durationMinutes: offering.durationMinutes ?? undefined,
    featured: offering.featured,
    published: offering.published,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-charcoal-700 text-2xl">Edit Offering</h1>
        <p className="text-sm text-muted-foreground mt-1">{offering.title}</p>
      </div>
      <OfferingForm defaultValues={defaultValues} offeringId={id} />
    </div>
  );
}
