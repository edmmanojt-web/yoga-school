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
        style={{ background: "linear-gradient(135deg, #FAF7F0 0%, #F4EFE3 100%)" }}
        aria-labelledby="yoga-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-sage-500 font-medium mb-4">
            Practice
          </p>
          <h1 id="yoga-heading" className="font-heading text-charcoal-700 mb-6">
            Yoga
          </h1>
          <p className="text-lg text-charcoal-500 max-w-2xl mx-auto leading-relaxed">
            Yoga as a practice of movement, breath, and awareness. Classes for
            beginners through to regular practitioners — online and in-person.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-white" aria-labelledby="yoga-philosophy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="yoga-philosophy" className="font-heading text-charcoal-700 mb-4">
                The approach
              </h2>
              <p className="text-charcoal-500 leading-relaxed mb-4">
                Our approach to yoga is grounded and unhurried. We are less
                interested in achieving a perfect posture, and more interested
                in what happens when you pay careful attention to the process of
                moving and breathing.
              </p>
              <p className="text-charcoal-500 leading-relaxed">
                Classes are designed to be accessible — regardless of your
                flexibility, experience level, or how yoga looks on your body.
              </p>
            </div>
            <div
              className="aspect-square rounded-3xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #E8DFC8, #D9CDB4)" }}
              role="img"
              aria-label="Yoga practice image placeholder"
            >
              <div className="text-center">
                <div className="text-6xl mb-3" aria-hidden="true">🧘</div>
                <p className="text-charcoal-400 text-sm">[Photo]</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Classes */}
      <section className="section-padding bg-muted" aria-labelledby="yoga-classes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="yoga-classes" className="font-heading text-charcoal-700 mb-3">
              Classes & sessions
            </h2>
            <p className="text-charcoal-500">
              [Actual class schedule and pricing to be added]
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {classes.map((c) => (
              <Card key={c.title} variant="elevated">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-heading text-charcoal-700 text-xl">{c.title}</h3>
                    <span className="text-xs bg-sage-100 text-sage-700 px-2.5 py-1 rounded-full">
                      {c.level}
                    </span>
                  </div>
                  <p className="text-sm text-charcoal-500 leading-relaxed mb-5">
                    {c.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
      <section className="section-padding bg-white" aria-labelledby="yoga-teacher">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 id="yoga-teacher" className="font-heading text-charcoal-700 mb-4">
            Your teacher
          </h2>
          <p className="text-xl font-heading text-sage-600 mb-3">{teacherConfig.name}</p>
          <p className="text-charcoal-500 leading-relaxed mb-8">
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
        style={{ background: "linear-gradient(135deg, #334B2C, #26231E)" }}
        aria-label="Call to action"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-ivory mb-6">Ready to begin?</h2>
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
