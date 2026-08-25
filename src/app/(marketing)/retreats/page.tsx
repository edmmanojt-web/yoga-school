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
        className="section-padding relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #3A2616 0%, #4A3220 50%, #5C4432 100%)" }}
        aria-labelledby="retreats-heading"
      >
        <div
          className="absolute right-0 top-0 w-[400px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(200,145,58,0.09) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p
            className="font-semibold mb-4"
            style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C8913A" }}
          >
            Immersive Experience
          </p>
          <h1
            id="retreats-heading"
            className="font-heading mb-6"
            style={{ fontStyle: "italic", color: "#FBF7F2" }}
          >
            Retreats
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(251,247,242,0.7)" }}>
            Step away from ordinary routine. Create the space to practice more
            deeply, rest more fully, and return to yourself.
          </p>
        </div>
      </section>

      <section className="section-padding bg-[#FEFCF9]" aria-label="Retreat information">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h2 className="font-heading mb-4" style={{ color: "#231E1A" }}>
                The intention
              </h2>
              <div className="space-y-4 leading-relaxed" style={{ color: "#7B6B5B" }}>
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
              style={{ background: "linear-gradient(135deg, #E4D8C8, #D4C8B0)" }}
              role="img"
              aria-label="Retreat location image"
            >
              <div className="text-center">
                <div className="text-6xl mb-3" aria-hidden="true">🌄</div>
                <p className="text-sm" style={{ color: "#B0A090" }}>[Retreat Photo]</p>
              </div>
            </div>
          </div>

          <div
            className="text-center py-10 rounded-3xl"
            style={{ background: "#F6EFE6" }}
          >
            <h2 className="font-heading text-2xl mb-2" style={{ color: "#231E1A" }}>
              Retreats coming soon
            </h2>
            <p className="mb-6" style={{ color: "#7B6B5B" }}>
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
