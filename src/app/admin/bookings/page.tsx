import { db } from "@/lib/db";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatTime } from "@/lib/utils";
import { BookingStatusButtons } from "@/components/admin/booking-status-buttons";

const statusLabels: Record<string, { label: string; variant: "sage" | "terracotta" | "forest" | "default" }> = {
  CONFIRMED: { label: "Confirmed", variant: "sage" },
  PENDING: { label: "Pending", variant: "default" },
  CANCELLED: { label: "Cancelled", variant: "terracotta" },
  COMPLETED: { label: "Completed", variant: "forest" },
};

export default async function AdminBookingsPage() {
  const bookings = await db.booking.findMany({
    include: {
      user: { select: { name: true, email: true } },
      session: {
        include: { offering: { select: { title: true } } },
      },
    },
    orderBy: { bookedAt: "desc" },
    take: 100,
  });

  const pending = bookings.filter((b) => b.status === "PENDING");
  const confirmed = bookings.filter((b) => b.status === "CONFIRMED");
  const other = bookings.filter((b) => b.status !== "PENDING" && b.status !== "CONFIRMED");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-charcoal-700 text-2xl">Bookings</h1>
        <div className="flex items-center gap-3 text-sm text-charcoal-500">
          <span>
            <strong className="text-terracotta">{pending.length}</strong> pending
          </span>
          <span>
            <strong className="text-sage-600">{confirmed.length}</strong> confirmed
          </span>
          <span>
            <strong>{bookings.length}</strong> total
          </span>
        </div>
      </div>

      {pending.length > 0 && (
        <section aria-labelledby="pending-bookings">
          <h2 id="pending-bookings" className="font-heading text-lg text-charcoal-700 mb-3">
            Pending approval
          </h2>
          <BookingTable bookings={pending} />
        </section>
      )}

      <section aria-labelledby="all-bookings">
        <h2 id="all-bookings" className="font-heading text-lg text-charcoal-700 mb-3">
          All bookings
        </h2>
        {bookings.length === 0 ? (
          <p className="text-center py-12 text-muted-foreground bg-white rounded-2xl border border-border">
            No bookings yet.
          </p>
        ) : (
          <BookingTable bookings={bookings} />
        )}
      </section>
    </div>
  );
}

function BookingTable({ bookings }: { bookings: any[] }) {
  return (
    <div className="bg-white rounded-2xl border border-border overflow-x-auto">
      <table className="w-full text-sm min-w-[700px]" aria-label="Bookings table">
        <thead className="bg-muted border-b border-border">
          <tr>
            <th className="text-left px-4 py-3 font-medium text-charcoal-600">User</th>
            <th className="text-left px-4 py-3 font-medium text-charcoal-600">Session</th>
            <th className="text-left px-4 py-3 font-medium text-charcoal-600">Date & time</th>
            <th className="text-left px-4 py-3 font-medium text-charcoal-600">Status</th>
            <th className="text-left px-4 py-3 font-medium text-charcoal-600">Actions</th>
            <th className="text-left px-4 py-3 font-medium text-charcoal-600">Booked</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {bookings.map((booking) => {
            const status = statusLabels[booking.status] ?? { label: booking.status, variant: "default" as const };
            return (
              <tr key={booking.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium text-charcoal-700">{booking.user.name ?? "—"}</p>
                  <p className="text-xs text-charcoal-500">{booking.user.email}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-charcoal-700">{booking.session.offering.title}</p>
                  <p className="text-xs text-charcoal-500">{booking.session.title}</p>
                </td>
                <td className="px-4 py-3 text-charcoal-500">
                  <p>{formatDate(booking.session.startTime)}</p>
                  <p className="text-xs">{formatTime(booking.session.startTime)}</p>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={status.variant}>{status.label}</Badge>
                </td>
                <td className="px-4 py-3">
                  <BookingStatusButtons bookingId={booking.id} currentStatus={booking.status} />
                </td>
                <td className="px-4 py-3 text-charcoal-500 text-xs">
                  {new Date(booking.bookedAt).toLocaleDateString("en-IN")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
