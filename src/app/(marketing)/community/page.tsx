import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Community",
  description: "A space for practitioners to share, ask questions and learn together.",
};

export default function CommunityPage() {
  return (
    <>
      <section
        className="section-padding"
        style={{ background: "linear-gradient(135deg, #FAF7F0 0%, #F4EFE3 100%)" }}
        aria-labelledby="community-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-sage-500 font-medium mb-4">
            Together
          </p>
          <h1 id="community-heading" className="font-heading text-charcoal-700 mb-6">
            Community
          </h1>
          <p className="text-charcoal-500 text-lg max-w-xl mx-auto">
            A place to share observations, ask questions, and learn from each
            other's practice. No rankings. No streaks. No performance.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white" aria-label="Community principles">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
            {[
              {
                title: "Observe",
                description: "Notice what comes up in your practice — and in daily life.",
              },
              {
                title: "Share",
                description: "When you choose to, share honestly. No performance needed.",
              },
              {
                title: "Learn",
                description: "Other people's observations are often mirrors for our own.",
              },
            ].map((p) => (
              <div key={p.title} className="p-6 bg-muted rounded-2xl">
                <h2 className="font-heading text-2xl text-forest mb-3">{p.title}</h2>
                <p className="text-sm text-charcoal-500">{p.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center p-10 bg-muted rounded-3xl">
            <h2 className="font-heading text-charcoal-700 text-2xl mb-2">
              Join to participate
            </h2>
            <p className="text-charcoal-500 mb-6 max-w-lg mx-auto">
              Community discussions, reflections, and shared experiences are
              available after creating an account. Your private reflections
              remain private unless you choose to share them.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <Button variant="primary">
                  Create Account
                  <ArrowRight size={14} aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
