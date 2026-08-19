import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const dynamic = "force-dynamic";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="flex-1 flex items-center justify-center py-16 px-4"
        style={{ background: "linear-gradient(135deg, #FAF7F0 0%, #E8DFC8 100%)" }}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
