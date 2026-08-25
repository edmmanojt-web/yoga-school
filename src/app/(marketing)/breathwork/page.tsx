import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Breathwork",
  description:
    "Guided breathwork and pranayama sessions. Online and in-person. Learn to use the breath as an anchor to presence.",
};

export default function BreathworkPage() {
  const sessions = [
    {
      title: "Breath Awareness",
      description:
        "A simple, accessible session focused on noticing the breath. Suitable for complete beginners.",
      mode: "Online",
      duration: "45 min",
    },
    {
      title: "Pranayama Practice",
      description:
        "An exploration of classical yogic breathing techniques. Calming, energising, and balancing practices.",
      mode: "Online & In-Person",
      duration: "60 min",
    },
    {
      title: "Guided Breathwork",
      description:
        "A deeper guided experience using conscious connected breathing. Please note: not suitable as medical treatment.",
      mode: "Online & In-Person",
      duration: "75 min",
    },
    {
      title: "Private Breathwork",
      description:
        "A one-on-one session designed around your specific needs and goals.",
      mode: "Online & In-Person",
      duration: "[Duration]",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section
        className="section-padding"
        style={{ background: "linear-gradient(135deg, #FBF7F2 0%, #F2E8DA 100%)" }}
        aria-labelledby="breathwork-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p
            className="font-semibold mb-4"
            style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#B87D3B" }}
          >
            Practice
          </p>
          <h1 id="breathwork-heading" className="font-heading mb-6" style={{ color: "#231E1A" }}>
            Breathwork
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "#7B6B5B" }}>
            The breath is always with us. Learning to notice it — and work with
            it — is one of the simplest and most powerful practices available.
          </p>
        </div>
      </section>

      {/* What to expect */}
      <section className="section-padding bg-[#FEFCF9]" aria-labelledby="breathwork-expect">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div
              className="aspect-square rounded-3xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #E4D8C8, #D4C8B0)" }}
              role="img"
              aria-label="Breathwork practice image"
            >
              <div className="text-center">
                <div className="text-6xl mb-3" aria-hidden="true">💨</div>
                <p className="text-sm" style={{ color: "#B0A090" }}>[Photo]</p>
              </div>
            </div>
            <div>
              <h2 id="breathwork-expect" className="font-heading mb-4" style={{ color: "#231E1A" }}>
                What to expect
              </h2>
              <div className="space-y-4 leading-relaxed text-sm" style={{ color: "#7B6B5B" }}>
                <p>
                  Breathwork sessions are calm and guided. You don&rsquo;t need any
                  prior experience — just willingness to pay attention.
                </p>
                <p>
                  We work with different breathing practices depending on the
                  session — from simple breath awareness to more active
                  pranayama techniques.
                </p>
                <p>
                  These sessions are not medical treatment and are not a
                  substitute for healthcare. If you have a medical condition,
                  please consult your doctor before joining.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sessions */}
      <section className="section-padding" style={{ background: "#F6EFE6" }} aria-labelledby="breathwork-sessions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="breathwork-sessions" className="font-heading mb-3" style={{ color: "#231E1A" }}>
              Sessions available
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessions.map((s) => (
              <Card key={s.title} variant="elevated">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl mb-2" style={{ color: "#231E1A" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#7B6B5B" }}>{s.description}</p>
                  <div className="flex items-center gap-3 text-xs" style={{ color: "#B0A090" }}>
                    <span>{s.duration}</span>
                    <span>·</span>
                    <span>{s.mode}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="section-padding-sm"
        style={{ background: "linear-gradient(160deg, #3A2616 0%, #4A3220 50%, #5C4432 100%)" }}
        aria-label="Breathwork call to action"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading mb-6" style={{ color: "#FBF7F2" }}>Explore breathwork</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/schedule">
              <Button variant="accent" size="lg">
                View Schedule & Book
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                style={{ borderColor: "rgba(251,247,242,0.3)", color: "#FBF7F2" }}
              >
                Ask a question
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
