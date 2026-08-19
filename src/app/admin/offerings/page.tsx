import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

export default async function AdminOfferingsPage() {
  const offerings = await db.offering.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-charcoal-700 text-2xl">Offerings</h1>
        <Link href="/admin/offerings/new">
          <Button variant="primary" size="sm">
            <Plus size={14} aria-hidden="true" />
            Add Offering
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm" aria-label="Offerings table">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">Title</th>
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">Category</th>
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">Mode</th>
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">Status</th>
              <th className="text-left px-4 py-3 font-medium text-charcoal-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {offerings.map((o) => (
              <tr key={o.id} className="hover:bg-muted/50">
                <td className="px-4 py-3">
                  <p className="font-medium text-charcoal-700">{o.title}</p>
                  <p className="text-xs text-muted-foreground">/{o.slug}</p>
                </td>
                <td className="px-4 py-3 text-charcoal-500">{o.category}</td>
                <td className="px-4 py-3 text-charcoal-500">{o.mode}</td>
                <td className="px-4 py-3">
                  <Badge variant={o.published ? "sage" : "default"}>
                    {o.published ? "Published" : "Draft"}
                  </Badge>
                  {o.featured && (
                    <Badge variant="terracotta" className="ml-2">
                      Featured
                    </Badge>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/offerings/${o.id}/edit`}>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {offerings.length === 0 && (
          <p className="text-center py-12 text-muted-foreground">No offerings yet.</p>
        )}
      </div>
    </div>
  );
}
