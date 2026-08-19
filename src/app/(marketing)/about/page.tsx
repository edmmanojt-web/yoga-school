import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { teacherConfig, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.name} — the school, the teacher, and the approach.`,
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="section-padding"
        style={{ background: "linear-gradient(135deg, #FAF7F0 0%, #E8DFC8 100%)" }}
        aria-labelledby="about-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-sage-500 font-medium mb-4">
                The School
              </p>
              <h1 id="about-heading" className="font-heading text-charcoal-700 mb-6">
                About {siteConfig.name}
              </h1>
              <p className="text-charcoal-500 leading-relaxed mb-4">
                {siteConfig.name} is a yoga school offering online and
                in-person sessions in yoga, breathwork, mindfulness, and
                meditation.
              </p>
              <p className="text-charcoal-500 leading-relaxed">
                Our central belief: yoga is not only something we practice on a
                mat. It is the quality of awareness we bring to ordinary
                moments.
              </p>
            </div>
            <div
              className="aspect-square rounded-3xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #D9CDB4, #C5C3BE)" }}
              role="img"
              aria-label="Yoga school image"
            >
              <div className="text-center">
                <div className="text-6xl mb-3" aria-hidden="true">🌿</div>
                <p className="text-charcoal-400 text-sm">[School Photo]</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teacher */}
      <section className="section-padding bg-white" aria-labelledby="teacher-about">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div
              className="aspect-[4/5] rounded-3xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #E8DFC8, #D9CDB4)" }}
              role="img"
              aria-label={`Photo of ${teacherConfig.name}`}
            >
              <div className="text-center">
                <div className="text-6xl mb-3" aria-hidden="true">🧘</div>
                <p className="text-charcoal-400 text-sm">[Teacher Photo]</p>
              </div>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-sage-500 font-medium mb-4">
                The Teacher
              </p>
              <h2 id="teacher-about" className="font-heading text-charcoal-700 mb-2">
                {teacherConfig.name}
              </h2>
              <p className="text-charcoal-400 mb-6">{teacherConfig.title}</p>
              <p className="text-charcoal-500 leading-relaxed mb-4">
                {teacherConfig.bio}
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {teacherConfig.specialties.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-full bg-muted text-xs text-charcoal-500 border border-border"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section
        className="section-padding bg-muted"
        aria-labelledby="philosophy-heading"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 id="philosophy-heading" className="font-heading text-charcoal-700 mb-8">
            Our approach
          </h2>
          <div className="space-y-6 text-charcoal-500 text-left">
            <p className="leading-relaxed">
              We don't believe in a one-size-fits-all approach to yoga. Some
              people come wanting to move their body. Others come wanting to
              calm their mind. Some come because they're curious what yoga
              actually is.
            </p>
            <p className="leading-relaxed">
              All of these are welcome starting points. Our job is to meet you
              where you are and help you find what's useful.
            </p>
            <p className="leading-relaxed">
              The deeper intention behind everything we offer is the same —
              cultivating awareness. The capacity to notice what's actually
              happening in this moment, without immediately reacting.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white" aria-label="About page CTA">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-charcoal-700 mb-6">
            Ready to explore?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/yoga-beyond-the-mat">
              <Button variant="primary" size="lg">
                Start the 7-Day Journey
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/schedule">
              <Button variant="outline" size="lg">
                Browse Classes
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
