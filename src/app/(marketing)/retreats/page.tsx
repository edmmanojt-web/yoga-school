import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Retreats",
  description: "Immersive yoga and mindfulness retreats. Step away, slow down, and come back to yourself.",
};

export default function RetreatsPage() {
  return (
    <>
      <section
        className="section-padding"
        style={{ background: "linear-gradient(135deg, #334B2C 0%, #2A4020 100%)" }}
        aria-labelledby="retreats-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-terracotta-300 font-medium mb-4">
            Immersive Experience
          </p>
          <h1
            id="retreats-heading"
            className="font-heading text-ivory mb-6"
            style={{ fontStyle: "italic" }}
          >
            Retreats
          </h1>
          <p className="text-ivory/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Step away from ordinary routine. Create the space to practice more
            deeply, rest more fully, and return to yourself.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white" aria-label="Retreat information">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h2 className="font-heading text-charcoal-700 mb-4">
                The intention
              </h2>
              <div className="space-y-4 text-charcoal-500 leading-relaxed">
                <p>
                  Retreats offer something that regular weekly sessions
                  cannot — uninterrupted time. Time to practice without rushing
                  to the next thing. Time to let things settle.
                </p>
                <p>
                  Our retreats are small, unhurried, and grounded in the same
                  philosophy as everything we offer — yoga, breath, awareness,
                  and everyday life.
                </p>
              </div>
            </div>
            <div
              className="aspect-[4/3] rounded-3xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #D4DDD0, #A8B9A1)" }}
              role="img"
              aria-label="Retreat location image"
            >
              <div className="text-center">
                <div className="text-6xl mb-3" aria-hidden="true">🌄</div>
                <p className="text-charcoal-400 text-sm">[Retreat Photo]</p>
              </div>
            </div>
          </div>

          <div className="text-center py-10 bg-muted rounded-3xl">
            <h2 className="font-heading text-charcoal-700 text-2xl mb-2">
              Retreats coming soon
            </h2>
            <p className="text-charcoal-500 mb-6">
              The next retreat is being planned. Get in touch to express
              interest and be notified when dates are announced.
            </p>
            <Link href="/contact?interest=Retreat">
              <Button variant="primary">
                Express Interest
                <ArrowRight size={14} aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
