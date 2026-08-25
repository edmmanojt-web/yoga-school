import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Leaf, Wind, Brain, Compass, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Offerings — ${siteConfig.name}`,
  description: "Explore our full range of yoga, breathwork, mindfulness, and journey offerings — online and in-person.",
};

const offerings = [
  {
    icon: <Leaf size={24} style={{ color: "#B87D3B" }} aria-hidden="true" />,
    category: "YOGA",
    badge: "Live classes",
    title: "Yoga",
    subtitle: "Movement as a mirror",
    description:
      "Hatha, Vinyasa, Yin, and Restorative classes that build body awareness and inner steadiness — not just flexibility. Every class ends with space to simply be.",
    highlights: ["Hatha & Vinyasa", "Yin & Restorative", "Beginner-friendly", "Online & in-person"],
    href: "/yoga",
    cta: "Explore yoga",
  },
  {
    icon: <Wind size={24} style={{ color: "#6B4A2A" }} aria-hidden="true" />,
    category: "BREATHWORK",
    badge: "Guided sessions",
    title: "Breathwork",
    subtitle: "Breath as your anchor",
    description:
      "Conscious breathing practices that regulate the nervous system, clear mental fog, and restore a sense of groundedness. Suitable for all levels — no experience needed.",
    highlights: ["Pranayama basics", "Box breathing", "Coherence breathing", "Stress regulation"],
    href: "/breathwork",
    cta: "Explore breathwork",
  },
  {
    icon: <Brain size={24} style={{ color: "#C8913A" }} aria-hidden="true" />,
    category: "MINDFULNESS",
    badge: "Guided practice",
    title: "Mindfulness & Meditation",
    subtitle: "Presence as a practice",
    description:
      "Secular, evidence-inspired mindfulness and meditation sessions. Learn to observe rather than react — and carry that quality into your everyday moments.",
    highlights: ["Seated meditation", "Body scan", "Walking mindfulness", "MBSR-informed"],
    href: "/mindfulness",
    cta: "Explore mindfulness",
  },
  {
    icon: <Compass size={24} style={{ color: "#5A4E44" }} aria-hidden="true" />,
    category: "JOURNEY",
    badge: "Flagship experience",
    title: "Yoga Beyond the Mat",
    subtitle: "7 days of awareness",
    description:
      "Our flagship 7-Day Journey weaves movement, breath, and reflection into a cohesive daily practice. Each day builds on the last — guiding you from the mat into the texture of your ordinary life.",
    highlights: ["7 daily practices", "Reflections journal", "Community polls", "Self-paced"],
    href: "/yoga-beyond-the-mat",
    cta: "Learn about the journey",
    featured: true,
  },
  {
    icon: <Calendar size={24} style={{ color: "#B87D3B" }} aria-hidden="true" />,
    category: "WORKSHOP",
    badge: "Coming soon",
    title: "Workshops",
    subtitle: "Deep dives on specific topics",
    description:
      "Occasional half-day and full-day workshops that go deeper into specific themes — yoga philosophy, breathwork science, posture workshops, and seasonal practices.",
    highlights: ["Half-day intensives", "Philosophy talks", "Seasonal themes", "Limited seats"],
    href: "/workshops",
    cta: "View workshops",
  },
  {
    icon: <Users size={24} style={{ color: "#C8913A" }} aria-hidden="true" />,
    category: "COMMUNITY",
    badge: "Members only",
    title: "Community",
    subtitle: "Practice together",
    description:
      "A warm, intentional online community for practitioners at all stages. Share reflections, ask questions, and find accountability with others on the same path.",
    highlights: ["Discussion forums", "Journey sharing", "Monthly Q&A", "Peer support"],
    href: "/community",
    cta: "Join the community",
  },
];

export default function OfferingsPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="py-20 px-4 text-center"
        style={{ background: "linear-gradient(135deg, #FBF7F2 0%, #F2E8DA 100%)" }}
        aria-labelledby="offerings-hero-heading"
      >
        <div className="max-w-3xl mx-auto">
          <p
            className="font-semibold mb-4"
            style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#B87D3B" }}
          >
            What we offer
          </p>
          <h1
            id="offerings-hero-heading"
            className="font-heading text-4xl md:text-5xl mb-6"
            style={{ color: "#231E1A" }}
          >
            Practices for the whole person
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "#7B6B5B" }}>
            Everything here begins on the mat — and continues into the rest of your life.
            Choose what resonates, or start with the journey.
          </p>
        </div>
      </section>

      {/* Offerings grid */}
      <section className="py-20 px-4 max-w-6xl mx-auto" aria-label="All offerings">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offerings.map((offering) => (
            <article
              key={offering.title}
              className={`relative rounded-2xl overflow-hidden group ${
                offering.featured ? "md:col-span-2" : ""
              }`}
              style={{ background: "#FEFCF9", border: "1px solid #E4D8C8" }}
            >
              {offering.featured && (
                <div className="absolute top-4 right-4">
                  <Badge variant="forest">Flagship offering</Badge>
                </div>
              )}
              <div className={`p-8 ${offering.featured ? "md:flex md:gap-10" : ""}`}>
                <div className={offering.featured ? "md:flex-1" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="p-2 rounded-xl shadow-sm"
                      style={{ background: "#FBF7F2" }}
                    >
                      {offering.icon}
                    </div>
                    <Badge variant="default" className="text-xs">
                      {offering.badge}
                    </Badge>
                  </div>
                  <h2 className="font-heading text-2xl mb-1" style={{ color: "#231E1A" }}>
                    {offering.title}
                  </h2>
                  <p className="text-sm font-medium mb-3" style={{ color: "#B87D3B" }}>
                    {offering.subtitle}
                  </p>
                  <p className="leading-relaxed mb-6" style={{ color: "#7B6B5B" }}>
                    {offering.description}
                  </p>
                  <Link href={offering.href}>
                    <Button
                      variant="outline"
                      size="sm"
                      style={{ borderColor: "#E4D8C8", color: "#6B4A2A" }}
                    >
                      {offering.cta}
                      <ArrowRight size={14} className="ml-1.5" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
                {offering.highlights && (
                  <div
                    className={offering.featured ? "md:w-64 mt-6 md:mt-0" : "mt-6 pt-6 border-t"}
                    style={{ borderColor: "#E4D8C8" }}
                  >
                    <p
                      className="text-xs uppercase tracking-widest mb-3"
                      style={{ color: "#B0A090" }}
                    >
                      Includes
                    </p>
                    <ul className="space-y-2" role="list">
                      {offering.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-sm" style={{ color: "#5A4E44" }}>
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: "#C8913A" }}
                            aria-hidden="true"
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 px-4 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #3A2616 0%, #4A3220 50%, #5C4432 100%)" }}
        aria-labelledby="offerings-cta"
      >
        <div className="max-w-xl mx-auto relative">
          <h2
            id="offerings-cta"
            className="font-heading text-3xl mb-4"
            style={{ color: "#FBF7F2" }}
          >
            Not sure where to start?
          </h2>
          <p className="mb-8" style={{ color: "rgba(251,247,242,0.65)" }}>
            The 7-Day Journey is designed for exactly that — a gentle, structured beginning that touches all of our practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/yoga-beyond-the-mat">
              <Button variant="accent">Start the journey</Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                style={{ borderColor: "rgba(251,247,242,0.4)", color: "#FBF7F2" }}
              >
                Ask us anything
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
