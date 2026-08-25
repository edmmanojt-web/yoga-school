import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { auth, signOut } from "@/lib/auth";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/dashboard");

  const user = {
    name: session.user.name,
    role: (session.user as any).role ?? "USER",
  };

  const navItems = [
    { label: "Overview", href: "/dashboard" },
    { label: "7-Day Journey", href: "/dashboard/journey" },
    { label: "Sessions", href: "/dashboard/sessions" },
    { label: "Bookings", href: "/dashboard/bookings" },
    { label: "Community", href: "/dashboard/community" },
    { label: "Profile", href: "/dashboard/profile" },
  ];

  return (
    <>
      <Navbar user={user} />
      <div className="min-h-screen pt-16" style={{ background: "#FAF7F0" }}>
        {/* Sidebar nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-56 flex-shrink-0" aria-label="Dashboard navigation">
              <nav>
                <ul className="space-y-1" role="list">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block px-4 py-2.5 rounded-xl text-sm text-charcoal-600 hover:bg-white hover:text-forest transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-[#E4D8C8]">
                  <form
                    action={async () => {
                      "use server";
                      await signOut({ redirectTo: "/" });
                    }}
                  >
                    <button
                      type="submit"
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm text-[#7B6B5B] hover:bg-white hover:text-[#6B4A2A] transition-colors"
                      aria-label="Sign out"
                    >
                      <LogOut size={15} aria-hidden="true" />
                      Sign out
                    </button>
                  </form>
                </div>
              </nav>
            </aside>
            <main
              id="dashboard-content"
              className="flex-1 min-w-0"
            >
              {children}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
