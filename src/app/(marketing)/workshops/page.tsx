import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Workshops & Programs",
  description: "Focused workshops and multi-day programs for deeper exploration of yoga, breathwork, and mindfulness.",
};

const workshops = [
  {
    title: "Introduction to Yoga",
    type: "Workshop",
    description:
      "A single-day workshop covering the essentials of yoga — postures, breath, alignment, and philosophy. Perfect for beginners.",
    duration: "1 day",
    mode: "In-Person",
    status: "coming-soon",
  },
  {
    title: "Breathwork Intensive",
    type: "Workshop",
    description:
      "A half-day immersion in breath practices — from basic awareness to pranayama to guided breathwork.",
    duration: "Half day",
    mode: "Online & In-Person",
    status: "coming-soon",
  },
  {
    title: "Yoga Foundations — 4-Week Program",
    type: "Program",
    description:
      "A structured 4-week journey into yoga for beginners. Covers postures, breath, philosophy and daily practice.",
    duration: "4 weeks",
    mode: "Online",
    status: "coming-soon",
  },
  {
    title: "Mindfulness for Everyday Life — 6-Week Program",
    type: "Program",
    description:
      "A practical exploration of mindfulness outside of formal meditation — at work, in conversation, while eating.",
    duration: "6 weeks",
    mode: "Online",
    status: "coming-soon",
  },
];

export default function WorkshopsPage() {
  return (
    <>
      <section
        className="section-padding"
        style={{ background: "linear-gradient(135deg, #FAF7F0 0%, #F4EFE3 100%)" }}
        aria-labelledby="workshops-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-sage-500 font-medium mb-4">
            Deeper Exploration
          </p>
          <h1 id="workshops-heading" className="font-heading text-charcoal-700 mb-6">
            Workshops & Programs
          </h1>
          <p className="text-charcoal-500 text-lg max-w-2xl mx-auto">
            For those who want to go deeper. Focused workshops, short programs,
            and multi-day explorations of yoga, breathwork, and awareness.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white" aria-label="Workshop listings">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workshops.map((w) => (
              <Card key={w.title} variant="elevated" className="relative">
                {w.status === "coming-soon" && (
                  <div className="absolute top-4 right-4">
                    <span className="text-xs bg-beige-200 text-charcoal-500 px-2.5 py-1 rounded-full border border-border">
                      Coming soon
                    </span>
                  </div>
                )}
                <CardContent className="p-6">
                  <span className="text-xs font-medium text-sage-600 uppercase tracking-wider">
                    {w.type}
                  </span>
                  <h3 className="font-heading text-charcoal-700 text-xl mt-2 mb-3">{w.title}</h3>
                  <p className="text-sm text-charcoal-500 leading-relaxed mb-4">{w.description}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{w.duration}</span>
                    <span>·</span>
                    <span>{w.mode}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 py-10 bg-muted rounded-3xl">
            <p className="font-heading text-charcoal-700 text-xl mb-2">
              Interested in a workshop or program?
            </p>
            <p className="text-charcoal-500 mb-6">
              Get in touch and we'll let you know when the next one is scheduled.
            </p>
            <Link href="/contact?interest=Workshop">
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
