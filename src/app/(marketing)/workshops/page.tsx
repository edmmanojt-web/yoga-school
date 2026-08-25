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
        style={{ background: "linear-gradient(135deg, #FBF7F2 0%, #F2E8DA 100%)" }}
        aria-labelledby="workshops-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p
            className="font-semibold mb-4"
            style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#B87D3B" }}
          >
            Deeper Exploration
          </p>
          <h1 id="workshops-heading" className="font-heading mb-6" style={{ color: "#231E1A" }}>
            Workshops & Programs
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#7B6B5B" }}>
            For those who want to go deeper. Focused workshops, short programs,
            and multi-day explorations of yoga, breathwork, and awareness.
          </p>
        </div>
      </section>

      <section className="section-padding bg-[#FEFCF9]" aria-label="Workshop listings">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workshops.map((w) => (
              <Card key={w.title} variant="elevated" className="relative">
                {w.status === "coming-soon" && (
                  <div className="absolute top-4 right-4">
                    <span
                      className="text-xs px-2.5 py-1 rounded-full border"
                      style={{ background: "#F6EFE6", color: "#7B6B5B", borderColor: "#E4D8C8" }}
                    >
                      Coming soon
                    </span>
                  </div>
                )}
                <CardContent className="p-6">
                  <span
                    className="text-xs font-medium uppercase tracking-wider"
                    style={{ color: "#B87D3B" }}
                  >
                    {w.type}
                  </span>
                  <h3 className="font-heading text-xl mt-2 mb-3" style={{ color: "#231E1A" }}>{w.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#7B6B5B" }}>{w.description}</p>
                  <div className="flex items-center gap-3 text-xs" style={{ color: "#B0A090" }}>
                    <span>{w.duration}</span>
                    <span>·</span>
                    <span>{w.mode}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div
            className="text-center mt-12 py-10 rounded-3xl"
            style={{ background: "#F6EFE6" }}
          >
            <p className="font-heading text-xl mb-2" style={{ color: "#231E1A" }}>
              Interested in a workshop or program?
            </p>
            <p className="mb-6" style={{ color: "#7B6B5B" }}>
              Get in touch and we&rsquo;ll let you know when the next one is scheduled.
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
