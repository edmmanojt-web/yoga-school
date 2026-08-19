import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { Calendar, Clock, MapPin, Monitor, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatTime } from "@/lib/utils";

export default async function DashboardSessionsPage() {
  const session = await auth();
  const userId = (session!.user as any).id as string;

  // Sessions the user has booked
  const bookedSessionIds = await db.booking
    .findMany({
      where: { userId, status: { in: ["CONFIRMED", "PENDING"] } },
      select: { sessionId: true },
    })
    .then((rows) => rows.map((r) => r.sessionId));

  // Upcoming sessions (next 30 days)
  const upcoming = await db.session.findMany({
    where: {
      status: "SCHEDULED",
      startTime: { gte: new Date(), lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
    },
    include: {
      offering: { select: { title: true, category: true, slug: true } },
      teacher: { select: { name: true } },
      bookings: { where: { userId }, select: { id: true, status: true } },
    },
    orderBy: { startTime: "asc" },
    take: 20,
  });

  const bookedIds = new Set(bookedSessionIds);

  return (
    <div className="max-w-2xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-charcoal-700 text-2xl">Upcoming Sessions</h1>
        <Link href="/schedule">
          <Button variant="outline" size="sm">
            Full schedule
          </Button>
        </Link>
      </div>

      {upcoming.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-border">
          <Calendar size={32} className="text-muted-foreground mx-auto mb-4" aria-hidden="true" />
          <p className="text-charcoal-500 mb-2">No sessions scheduled in the next 30 days.</p>
          <p className="text-sm text-muted-foreground mb-6">
            Check back soon — we add new sessions regularly.
          </p>
          <Link href="/contact">
            <Button variant="outline" size="sm">Request a session</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {upcoming.map((s) => {
            const isBooked = bookedIds.has(s.id);
            const myBooking = s.bookings[0];
            const spotsLeft = s.capacity - s.enrolled;
            const almostFull = spotsLeft <= 3 && spotsLeft > 0;
            const isFull = spotsLeft <= 0;

            return (
              <Card key={s.id} variant="elevated">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-medium text-sage-600 uppercase tracking-wider">
                          {s.offering.category}
                        </span>
                        {isBooked && (
                          <Badge variant="sage">Booked</Badge>
                        )}
                        {!isBooked && almostFull && (
                          <Badge variant="terracotta">
                            {spotsLeft} spot{spotsLeft !== 1 ? "s" : ""} left
                          </Badge>
                        )}
                        {!isBooked && isFull && (
                          <Badge variant="default">Full</Badge>
                        )}
                      </div>
                      <h2 className="font-heading text-charcoal-700 text-lg mb-2">
                        {s.title}
                      </h2>
                      <div className="space-y-1 text-sm text-charcoal-500">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} aria-hidden="true" />
                          <span>{formatDate(s.startTime)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={13} aria-hidden="true" />
                          <span>
                            {formatTime(s.startTime)} – {formatTime(s.endTime)}
                          </span>
                        </div>
                        {s.mode === "ONLINE" ? (
                          <div className="flex items-center gap-1.5">
                            <Monitor size={13} aria-hidden="true" />
                            <span>Online</span>
                          </div>
                        ) : s.location ? (
                          <div className="flex items-center gap-1.5">
                            <MapPin size={13} aria-hidden="true" />
                            <span>{s.location}</span>
                          </div>
                        ) : null}
                        {s.teacher && (
                          <p className="text-xs text-muted-foreground mt-1">
                            With {s.teacher.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {isBooked && myBooking ? (
                        <>
                          <Badge
                            variant={myBooking.status === "CONFIRMED" ? "sage" : "default"}
                          >
                            {myBooking.status === "CONFIRMED" ? "Confirmed" : "Pending"}
                          </Badge>
                          {s.mode === "ONLINE" && s.meetingUrl && myBooking.status === "CONFIRMED" && (
                            <a
                              href={s.meetingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-forest hover:underline"
                            >
                              Join link
                              <ExternalLink size={11} aria-hidden="true" />
                            </a>
                          )}
                        </>
                      ) : (
                        !isFull && (
                          <Link href={`/schedule?book=${s.id}`}>
                            <Button variant="primary" size="sm">
                              Book
                            </Button>
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <div className="bg-sage-50 rounded-xl p-5 border border-sage-100">
        <p className="text-sm text-charcoal-600">
          <strong>Looking for past sessions?</strong> Your full booking history is in{" "}
          <Link href="/dashboard/bookings" className="text-forest underline underline-offset-2">
            My Bookings
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
