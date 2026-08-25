import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Users, Monitor, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { teacherConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Yoga",
  description:
    "Online and in-person yoga classes for all levels. Beginner sessions, regular group practice, and private sessions.",
};

export default function YogaPage() {
  const classes = [
    {
      title: "Beginner Yoga",
      description:
        "A gentle introduction to yoga — postures, breath, and the basics of mindful movement. No experience needed.",
      duration: "60 min",
      mode: "Online & In-Person",
      level: "Beginner",
    },
    {
      title: "Morning Flow",
      description:
        "A flowing sequence to wake up the body and steady the mind. Suitable for those with some yoga experience.",
      duration: "60 min",
      mode: "Online",
      level: "All levels",
    },
    {
      title: "Deep Practice",
      description:
        "A slower, more explored practice for those who want to move with greater attention and depth.",
      duration: "75 min",
      mode: "Online & In-Person",
      level: "Intermediate",
    },
    {
      title: "Private Yoga Session",
      description:
        "A one-on-one session tailored to where you are and what you need. Online or in-person.",
      duration: "[Duration]",
      mode: "Online & In-Person",
      level: "All levels",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section
        className="section-padding"
        style={{ background: "linear-gradient(135deg, #FBF7F2 0%, #F2E8DA 100%)" }}
        aria-labelledby="yoga-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p
            className="font-semibold mb-4"
            style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#B87D3B" }}
          >
            Practice
          </p>
          <h1 id="yoga-heading" className="font-heading mb-6" style={{ color: "#231E1A" }}>
            Yoga
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "#7B6B5B" }}>
            Yoga as a practice of movement, breath, and awareness. Classes for
            beginners through to regular practitioners — online and in-person.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-[#FEFCF9]" aria-labelledby="yoga-philosophy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="yoga-philosophy" className="font-heading mb-4" style={{ color: "#231E1A" }}>
                The approach
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: "#7B6B5B" }}>
                Our approach to yoga is grounded and unhurried. We are less
                interested in achieving a perfect posture, and more interested
                in what happens when you pay careful attention to the process of
                moving and breathing.
              </p>
              <p className="leading-relaxed" style={{ color: "#7B6B5B" }}>
                Classes are designed to be accessible — regardless of your
                flexibility, experience level, or how yoga looks on your body.
              </p>
            </div>
            <div
              className="aspect-square rounded-3xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #E4D8C8, #D4C8B0)" }}
              role="img"
              aria-label="Yoga practice image placeholder"
            >
              <div className="text-center">
                <div className="text-6xl mb-3" aria-hidden="true">🧘</div>
                <p className="text-sm" style={{ color: "#B0A090" }}>[Photo]</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Classes */}
      <section className="section-padding" style={{ background: "#F6EFE6" }} aria-labelledby="yoga-classes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="yoga-classes" className="font-heading mb-3" style={{ color: "#231E1A" }}>
              Classes & sessions
            </h2>
            <p style={{ color: "#7B6B5B" }}>
              [Actual class schedule and pricing to be added]
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {classes.map((c) => (
              <Card key={c.title} variant="elevated">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-heading text-xl" style={{ color: "#231E1A" }}>{c.title}</h3>
                    <span
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(200,145,58,0.1)", color: "#C8913A" }}
                    >
                      {c.level}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "#7B6B5B" }}>
                    {c.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs" style={{ color: "#B0A090" }}>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} aria-hidden="true" />
                      {c.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Monitor size={12} aria-hidden="true" />
                      {c.mode}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher */}
      <section className="section-padding bg-[#FEFCF9]" aria-labelledby="yoga-teacher">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 id="yoga-teacher" className="font-heading mb-4" style={{ color: "#231E1A" }}>
            Your teacher
          </h2>
          <p className="text-xl font-heading mb-3" style={{ color: "#C8913A" }}>{teacherConfig.name}</p>
          <p className="leading-relaxed mb-8" style={{ color: "#7B6B5B" }}>
            {teacherConfig.shortBio}
          </p>
          <Link href="/about">
            <Button variant="outline">
              Learn more about {teacherConfig.name}
              <ArrowRight size={14} aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section
        className="section-padding-sm"
        style={{ background: "linear-gradient(160deg, #3A2616 0%, #4A3220 50%, #5C4432 100%)" }}
        aria-label="Call to action"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading mb-6" style={{ color: "#FBF7F2" }}>Ready to begin?</h2>
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
