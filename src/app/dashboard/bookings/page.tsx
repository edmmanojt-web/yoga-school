import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { Calendar, Clock, MapPin, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatTime } from "@/lib/utils";

const statusLabels: Record<string, { label: string; variant: "sage" | "terracotta" | "forest" | "default" }> = {
  CONFIRMED: { label: "Confirmed", variant: "sage" },
  PENDING: { label: "Pending", variant: "default" },
  CANCELLED: { label: "Cancelled", variant: "terracotta" },
  COMPLETED: { label: "Completed", variant: "forest" },
};

export default async function BookingsPage() {
  const session = await auth();
  const userId = (session!.user as any).id as string;

  const bookings = await db.booking.findMany({
    where: { userId },
    include: {
      session: {
        include: {
          offering: { select: { title: true, category: true } },
          teacher: { select: { name: true } },
        },
      },
    },
    orderBy: { session: { startTime: "desc" } },
  });

  const upcoming = bookings.filter(
    (b) => b.status === "CONFIRMED" && new Date(b.session.startTime) > new Date()
  );
  const past = bookings.filter(
    (b) => b.status === "COMPLETED" || new Date(b.session.startTime) <= new Date()
  );

  return (
    <div className="max-w-2xl space-y-8">
      <h1 className="font-heading text-charcoal-700 text-2xl">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-border">
          <p className="text-charcoal-500 mb-4">You haven't booked any sessions yet.</p>
          <Link href="/schedule">
            <Button variant="primary">Browse Schedule</Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Upcoming */}
          {upcoming.length > 0 && (
            <section aria-labelledby="upcoming-bookings">
              <h2 id="upcoming-bookings" className="font-heading text-charcoal-700 text-xl mb-4">
                Upcoming
              </h2>
              <div className="space-y-4">
                {upcoming.map((booking) => {
                  const s = booking.session;
                  const status = statusLabels[booking.status] ?? statusLabels.CONFIRMED;
                  return (
                    <Card key={booking.id} variant="elevated">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium text-sage-600 uppercase tracking-wider">
                                {s.offering.category}
                              </span>
                              <Badge variant={status.variant}>{status.label}</Badge>
                            </div>
                            <h3 className="font-heading text-charcoal-700 text-lg">
                              {s.offering.title}
                            </h3>
                            <div className="space-y-1 mt-2 text-sm text-charcoal-500">
                              <div className="flex items-center gap-1.5">
                                <Calendar size={13} aria-hidden="true" />
                                {formatDate(s.startTime)}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Clock size={13} aria-hidden="true" />
                                {formatTime(s.startTime)}
                              </div>
                              <div className="flex items-center gap-1.5">
                                {s.mode === "ONLINE" ? (
                                  <Monitor size={13} aria-hidden="true" />
                                ) : (
                                  <MapPin size={13} aria-hidden="true" />
                                )}
                                {s.mode === "ONLINE"
                                  ? "Online — details sent before class"
                                  : s.location ?? "In-Person"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          )}

          {/* Past */}
          {past.length > 0 && (
            <section aria-labelledby="past-bookings">
              <h2 id="past-bookings" className="font-heading text-charcoal-700 text-xl mb-4">
                Past
              </h2>
              <div className="space-y-3">
                {past.slice(0, 10).map((booking) => {
                  const s = booking.session;
                  const status = statusLabels[booking.status] ?? statusLabels.COMPLETED;
                  return (
                    <div
                      key={booking.id}
                      className="flex items-center gap-4 p-4 bg-white rounded-xl border border-border"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-charcoal-700">
                          {s.offering.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(s.startTime)}
                        </p>
                      </div>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}

      <div className="pt-4">
        <Link href="/schedule">
          <Button variant="outline">Browse more sessions</Button>
        </Link>
      </div>
    </div>
  );
}
