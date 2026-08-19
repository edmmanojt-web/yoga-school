import { OfferingForm } from "@/components/admin/offering-form";

export default function NewOfferingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-charcoal-700 text-2xl">New Offering</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Create a new offering that will appear on the website.
        </p>
      </div>
      <OfferingForm />
    </div>
  );
}
