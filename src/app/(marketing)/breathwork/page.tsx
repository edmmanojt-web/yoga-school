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
        style={{ background: "linear-gradient(135deg, #FAF7F0 0%, #EEF2EC 100%)" }}
        aria-labelledby="breathwork-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-sage-500 font-medium mb-4">
            Practice
          </p>
          <h1 id="breathwork-heading" className="font-heading text-charcoal-700 mb-6">
            Breathwork
          </h1>
          <p className="text-lg text-charcoal-500 max-w-2xl mx-auto leading-relaxed">
            The breath is always with us. Learning to notice it — and work with
            it — is one of the simplest and most powerful practices available.
          </p>
        </div>
      </section>

      {/* What to expect */}
      <section className="section-padding bg-white" aria-labelledby="breathwork-expect">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div
              className="aspect-square rounded-3xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #EEF2EC, #D4DDD0)" }}
              role="img"
              aria-label="Breathwork practice image"
            >
              <div className="text-center">
                <div className="text-6xl mb-3" aria-hidden="true">💨</div>
                <p className="text-charcoal-400 text-sm">[Photo]</p>
              </div>
            </div>
            <div>
              <h2 id="breathwork-expect" className="font-heading text-charcoal-700 mb-4">
                What to expect
              </h2>
              <div className="space-y-4 text-charcoal-500 leading-relaxed text-sm">
                <p>
                  Breathwork sessions are calm and guided. You don't need any
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
      <section className="section-padding bg-muted" aria-labelledby="breathwork-sessions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="breathwork-sessions" className="font-heading text-charcoal-700 mb-3">
              Sessions available
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessions.map((s) => (
              <Card key={s.title} variant="elevated">
                <CardContent className="p-6">
                  <h3 className="font-heading text-charcoal-700 text-xl mb-2">{s.title}</h3>
                  <p className="text-sm text-charcoal-500 leading-relaxed mb-4">{s.description}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
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
        style={{ background: "linear-gradient(135deg, #334B2C, #26231E)" }}
        aria-label="Breathwork call to action"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-ivory mb-6">Explore breathwork</h2>
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
                className="border-ivory/30 text-ivory hover:bg-white/10"
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
