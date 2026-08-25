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
        style={{ background: "linear-gradient(135deg, #FBF7F2 0%, #F2E8DA 100%)" }}
        aria-labelledby="about-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p
                className="font-semibold mb-4"
                style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#B87D3B" }}
              >
                The School
              </p>
              <h1
                id="about-heading"
                className="font-heading mb-6"
                style={{ color: "#231E1A" }}
              >
                About {siteConfig.name}
              </h1>
              <p className="leading-relaxed mb-4" style={{ color: "#7B6B5B" }}>
                {siteConfig.name} is a yoga school offering online and
                in-person sessions in yoga, breathwork, mindfulness, and
                meditation.
              </p>
              <p className="leading-relaxed" style={{ color: "#7B6B5B" }}>
                Our central belief: yoga is not only something we practice on a
                mat. It is the quality of awareness we bring to ordinary
                moments.
              </p>
            </div>
            <div
              className="aspect-square rounded-3xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #E4D8C8, #D4C8B0)" }}
              role="img"
              aria-label="Yoga school image"
            >
              <div className="text-center">
                <div className="text-6xl mb-3" aria-hidden="true">🌿</div>
                <p className="text-sm" style={{ color: "#B0A090" }}>[School Photo]</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teacher */}
      <section className="section-padding bg-[#FEFCF9]" aria-labelledby="teacher-about">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div
              className="aspect-[4/5] rounded-3xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #E4D8C8, #D4C8B0)" }}
              role="img"
              aria-label={`Photo of ${teacherConfig.name}`}
            >
              <div className="text-center">
                <div className="text-6xl mb-3" aria-hidden="true">🧘</div>
                <p className="text-sm" style={{ color: "#B0A090" }}>[Teacher Photo]</p>
              </div>
            </div>
            <div>
              <p
                className="font-semibold mb-4"
                style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#B87D3B" }}
              >
                The Teacher
              </p>
              <h2
                id="teacher-about"
                className="font-heading mb-2"
                style={{ color: "#231E1A" }}
              >
                {teacherConfig.name}
              </h2>
              <p className="mb-6" style={{ color: "#B0A090" }}>{teacherConfig.title}</p>
              <p className="leading-relaxed mb-4" style={{ color: "#7B6B5B" }}>
                {teacherConfig.bio}
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {teacherConfig.specialties.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-full text-xs border"
                    style={{ background: "#F6EFE6", color: "#7B6B5B", borderColor: "#E4D8C8" }}
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
        className="section-padding"
        style={{ background: "#F6EFE6" }}
        aria-labelledby="philosophy-heading"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2
            id="philosophy-heading"
            className="font-heading mb-8"
            style={{ color: "#231E1A" }}
          >
            Our approach
          </h2>
          <div className="space-y-6 text-left">
            <p className="leading-relaxed" style={{ color: "#7B6B5B" }}>
              We don&rsquo;t believe in a one-size-fits-all approach to yoga. Some
              people come wanting to move their body. Others come wanting to
              calm their mind. Some come because they&rsquo;re curious what yoga
              actually is.
            </p>
            <p className="leading-relaxed" style={{ color: "#7B6B5B" }}>
              All of these are welcome starting points. Our job is to meet you
              where you are and help you find what&rsquo;s useful.
            </p>
            <p className="leading-relaxed" style={{ color: "#7B6B5B" }}>
              The deeper intention behind everything we offer is the same —
              cultivating awareness. The capacity to notice what&rsquo;s actually
              happening in this moment, without immediately reacting.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[#FEFCF9]" aria-label="About page CTA">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="font-heading mb-6"
            style={{ color: "#231E1A" }}
          >
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
