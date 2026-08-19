import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const dynamic = "force-dynamic";

const adminNavItems = [
  { label: "Overview", href: "/admin" },
  { label: "Users", href: "/admin/users" },
  { label: "Offerings", href: "/admin/offerings" },
  { label: "Sessions", href: "/admin/sessions" },
  { label: "Bookings", href: "/admin/bookings" },
  { label: "Journeys", href: "/admin/journeys" },
  { label: "Community", href: "/admin/community" },
  { label: "Contact", href: "/admin/contact" },
  { label: "Analytics", href: "/admin/analytics" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) redirect("/login?callbackUrl=/admin");

  const role = (session.user as any)?.role;
  if (role !== "ADMIN") redirect("/");

  const user = { name: session.user.name, role };

  return (
    <>
      <Navbar user={user} />
      <div className="min-h-screen pt-16 bg-charcoal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Admin sidebar */}
            <aside className="lg:w-56 flex-shrink-0" aria-label="Admin navigation">
              <div className="bg-charcoal-800 rounded-2xl p-4 text-ivory/80">
                <p className="text-xs uppercase tracking-widest text-ivory/40 px-2 mb-3">
                  Admin
                </p>
                <nav>
                  <ul className="space-y-1" role="list">
                    {adminNavItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block px-3 py-2 rounded-lg text-sm hover:bg-white/10 transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Admin content */}
            <main id="admin-content" className="flex-1 min-w-0">
              {children}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
