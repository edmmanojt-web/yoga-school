import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { YogaGuide } from "@/components/guide/yoga-guide";
import { auth } from "@/lib/auth";

type LayoutUser = {
  name?: string | null;
  role?: string;
};

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const sessionUser = session?.user as LayoutUser | undefined;
  const user = sessionUser
    ? {
        name: sessionUser.name,
        role: sessionUser.role ?? "USER",
      }
    : null;

  return (
    <>
      <Navbar user={user} />
      <main id="main-content" className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
      <YogaGuide />
    </>
  );
}
