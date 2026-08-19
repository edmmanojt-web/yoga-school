import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowRight, Calendar, BookOpen, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const session = await auth();
  const userId = (session!.user as any).id as string;

  // Fetch user data in parallel
  const [enrollment, upcomingBookings] = await Promise.all([
    db.journeyEnrollment.findFirst({
      where: { userId },
      include: {
        journey: { select: { title: true, totalDays: true } },
      },
      orderBy: { startedAt: "desc" },
    }),
    db.booking.findMany({
      where: {
        userId,
        status: "CONFIRMED",
        session: {
          startTime: { gte: new Date() },
          status: "SCHEDULED",
        },
      },
      include: {
        session: {
          include: { offering: { select: { title: true } } },
        },
      },
      take: 3,
      orderBy: { session: { startTime: "asc" } },
    }),
  ]);

  const completedDays = enrollment
    ? await db.journeyDayProgress.count({
        where: {
          userId,
          day: { journeyId: enrollment.journeyId },
        },
      })
    : 0;

  const userName = session!.user?.name ?? "there";

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="font-heading text-charcoal-700 text-2xl mb-1">
          Hello, {userName.split(" ")[0]}.
        </h1>
        <p className="text-muted-foreground text-sm">
          Welcome to your dashboard.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Journey",
            value: enrollment ? `Day ${completedDays + 1}` : "Not started",
            icon: <BookOpen size={18} className="text-sage-500" />,
            href: "/dashboard/journey",
          },
          {
            label: "Upcoming sessions",
            value: upcomingBookings.length,
            icon: <Calendar size={18} className="text-sage-500" />,
            href: "/dashboard/bookings",
          },
        ].map((stat) => (
          <Link key={stat.label} href={stat.href} className="block">
            <Card variant="elevated" className="hover:border-sage-200 transition-colors">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  {stat.icon}
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
                <p className="font-heading text-xl text-charcoal-700">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Journey status */}
      <Card variant="elevated">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-charcoal-700 text-xl">
              7-Day Awareness Journey
            </h2>
            <Link href="/dashboard/journey">
              <Button variant="ghost" size="sm">
                View
                <ArrowRight size={13} aria-hidden="true" />
              </Button>
            </Link>
          </div>
          {enrollment ? (
            <div>
              <p className="text-sm text-charcoal-500 mb-4">
                {enrollment.status === "COMPLETED"
                  ? "You have completed the 7-Day Journey."
                  : `You're on Day ${completedDays + 1} of ${enrollment.journey.totalDays}.`}
              </p>
              {enrollment.status !== "COMPLETED" && (
                <Link href="/dashboard/journey">
                  <Button variant="primary" size="sm">
                    Continue Journey
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div>
              <p className="text-sm text-charcoal-500 mb-4">
                You haven't started the 7-Day Awareness Journey yet.
              </p>
              <Link href="/yoga-beyond-the-mat">
                <Button variant="primary" size="sm">
                  Start the Journey
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming bookings */}
      <Card variant="elevated">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-charcoal-700 text-xl">
              Upcoming sessions
            </h2>
            <Link href="/dashboard/bookings">
              <Button variant="ghost" size="sm">
                View all
                <ArrowRight size={13} aria-hidden="true" />
              </Button>
            </Link>
          </div>
          {upcomingBookings.length === 0 ? (
            <div>
              <p className="text-sm text-charcoal-500 mb-4">
                No upcoming sessions booked.
              </p>
              <Link href="/schedule">
                <Button variant="outline" size="sm">
                  Browse Schedule
                </Button>
              </Link>
            </div>
          ) : (
            <ul className="space-y-3" role="list">
              {upcomingBookings.map((booking) => (
                <li
                  key={booking.id}
                  className="flex items-center gap-3 py-3 border-b border-border last:border-0"
                >
                  <Calendar size={15} className="text-sage-500 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-charcoal-700">
                      {booking.session.offering.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(booking.session.startTime).toLocaleDateString("en-IN", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
