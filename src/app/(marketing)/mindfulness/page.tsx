import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Mindfulness & Meditation",
  description:
    "Mindfulness and meditation sessions. Guided awareness practices for everyday life.",
};

export default function MindfulnessPage() {
  const practices = [
    {
      title: "Mindfulness Basics",
      description:
        "An introduction to mindfulness — what it is, what it isn't, and how to begin noticing.",
      mode: "Online",
      duration: "45 min",
    },
    {
      title: "Guided Meditation",
      description:
        "Structured guided meditations exploring breath, body, and awareness.",
      mode: "Online & In-Person",
      duration: "45 min",
    },
    {
      title: "Mindfulness for Everyday Life",
      description:
        "Bringing awareness into ordinary activities — eating, walking, working, listening.",
      mode: "Online",
      duration: "60 min",
    },
    {
      title: "Private Mindfulness Session",
      description:
        "One-on-one guidance tailored to your situation and questions.",
      mode: "Online & In-Person",
      duration: "[Duration]",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section
        className="section-padding"
        style={{ background: "linear-gradient(135deg, #FAF7F0 0%, #F2F5F0 100%)" }}
        aria-labelledby="mindfulness-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-sage-500 font-medium mb-4">
            Practice
          </p>
          <h1 id="mindfulness-heading" className="font-heading text-charcoal-700 mb-6">
            Mindfulness & Meditation
          </h1>
          <p className="text-lg text-charcoal-500 max-w-2xl mx-auto leading-relaxed">
            The practice of paying attention to what is actually happening —
            without judgment, without agenda. A skill that improves with
            patient practice.
          </p>
        </div>
      </section>

      {/* What is mindfulness */}
      <section className="section-padding bg-white" aria-labelledby="mindfulness-about">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="mindfulness-about" className="font-heading text-charcoal-700 mb-4">
                Not emptying the mind
              </h2>
              <div className="space-y-4 text-charcoal-500 leading-relaxed text-sm">
                <p>
                  A common misconception about mindfulness and meditation is
                  that the goal is to stop thinking. It isn't.
                </p>
                <p>
                  The practice is about noticing — the breath, the body, the
                  thoughts, the sensations. And then gently returning attention
                  to where you chose to put it.
                </p>
                <p>
                  This noticing is the practice. And like any practice, it
                  strengthens with repetition.
                </p>
              </div>
            </div>
            <div
              className="aspect-square rounded-3xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #F2F5F0, #E0E8DB)" }}
              role="img"
              aria-label="Mindfulness practice image"
            >
              <div className="text-center">
                <div className="text-6xl mb-3" aria-hidden="true">🌿</div>
                <p className="text-charcoal-400 text-sm">[Photo]</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practices */}
      <section className="section-padding bg-muted" aria-labelledby="mindfulness-practices">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="mindfulness-practices" className="font-heading text-charcoal-700">
              Sessions & practices
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practices.map((p) => (
              <Card key={p.title} variant="elevated">
                <CardContent className="p-6">
                  <h3 className="font-heading text-charcoal-700 text-xl mb-2">{p.title}</h3>
                  <p className="text-sm text-charcoal-500 leading-relaxed mb-4">{p.description}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{p.duration}</span>
                    <span>·</span>
                    <span>{p.mode}</span>
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
        aria-label="Mindfulness call to action"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-ivory mb-6">Begin the practice</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/schedule">
              <Button variant="accent" size="lg">
                View Schedule & Book
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/yoga-beyond-the-mat">
              <Button
                variant="outline"
                size="lg"
                className="border-ivory/30 text-ivory hover:bg-white/10"
              >
                Try the 7-Day Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
