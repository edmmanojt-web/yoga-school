import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, BookOpen, MessageSquare, ArrowRight } from "lucide-react";

export default async function AdminOverviewPage() {
  // Fetch overview stats
  const [
    totalUsers,
    activeJourneys,
    completedJourneys,
    upcomingSessions,
    pendingBookings,
    unreadContacts,
  ] = await Promise.all([
    db.user.count({ where: { role: { in: ["USER", "TEACHER"] } } }),
    db.journeyEnrollment.count({ where: { status: "ACTIVE" } }),
    db.journeyEnrollment.count({ where: { status: "COMPLETED" } }),
    db.session.count({
      where: { status: "SCHEDULED", startTime: { gte: new Date() } },
    }),
    db.booking.count({ where: { status: "PENDING" } }),
    db.contactSubmission.count({ where: { read: false } }),
  ]);

  const stats = [
    {
      label: "Registered users",
      value: totalUsers,
      icon: <Users size={20} className="text-sage-500" />,
      href: "/admin/users",
    },
    {
      label: "Active journeys",
      value: activeJourneys,
      icon: <BookOpen size={20} className="text-sage-500" />,
      href: "/admin/journeys",
    },
    {
      label: "Journey completions",
      value: completedJourneys,
      icon: <BookOpen size={20} className="text-terracotta" />,
      href: "/admin/journeys",
    },
    {
      label: "Upcoming sessions",
      value: upcomingSessions,
      icon: <Calendar size={20} className="text-sage-500" />,
      href: "/admin/sessions",
    },
    {
      label: "Pending bookings",
      value: pendingBookings,
      icon: <Calendar size={20} className="text-terracotta" />,
      href: "/admin/bookings",
    },
    {
      label: "Unread enquiries",
      value: unreadContacts,
      icon: <MessageSquare size={20} className="text-terracotta" />,
      href: "/admin/contact",
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="font-heading text-charcoal-700 text-2xl">Admin Overview</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="block">
            <Card variant="elevated" className="hover:border-sage-200 transition-colors bg-white">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  {stat.icon}
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
                <p className="font-heading text-3xl text-charcoal-700">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div>
        <h2 className="font-heading text-charcoal-700 text-xl mb-4">Quick actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: "Add new offering", href: "/admin/offerings/new" },
            { label: "Create a session", href: "/admin/sessions/new" },
            { label: "View contact enquiries", href: "/admin/contact" },
            { label: "Manage journey days", href: "/admin/journeys" },
            { label: "View bookings", href: "/admin/bookings" },
            { label: "Manage community", href: "/admin/community" },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center justify-between p-4 bg-white rounded-xl border border-border hover:border-sage-300 transition-colors text-sm text-charcoal-700"
            >
              {action.label}
              <ArrowRight size={13} className="text-muted-foreground" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
