"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service if configured
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div
          className="min-h-screen flex items-center justify-center px-4"
          style={{ background: "#FAF7F0" }}
        >
          <div className="text-center max-w-md">
            <p className="text-5xl mb-6" aria-hidden="true">🌿</p>
            <h1 className="font-heading text-3xl text-charcoal-700 mb-4">
              Something went wrong
            </h1>
            <p className="text-charcoal-500 leading-relaxed mb-8">
              An unexpected error occurred. Please try again — or{" "}
              <Link href="/contact" className="text-forest underline underline-offset-2">
                contact us
              </Link>{" "}
              if the problem persists.
            </p>
            {process.env.NODE_ENV === "development" && error.message && (
              <pre className="text-left text-xs bg-charcoal-800 text-ivory/80 p-4 rounded-xl mb-6 overflow-auto max-h-40">
                {error.message}
              </pre>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="primary" onClick={reset}>
                Try again
              </Button>
              <Link href="/">
                <Button variant="outline">Return home</Button>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
