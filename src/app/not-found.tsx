import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #FAF7F0 0%, #E8DFC8 100%)" }}
    >
      <div className="text-center max-w-md">
        <p
          className="font-heading text-8xl text-sage-300 leading-none mb-6"
          aria-hidden="true"
        >
          404
        </p>
        <h1 className="font-heading text-3xl text-charcoal-700 mb-4">
          Page not found
        </h1>
        <p className="text-charcoal-500 leading-relaxed mb-8">
          The page you were looking for doesn&apos;t exist, or may have moved.
          Sometimes the right path appears when we stop looking so hard.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button variant="primary">Return home</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline">Contact us</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
