import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { journeyConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Yoga Beyond the Mat — 7-Day Awareness Journey",
  description:
    "A 7-day experiment to explore awareness through ordinary activities. No extra time needed. Start where you are.",
};

const dayThemes = [
  { color: "#5A7A4A" },
  { color: "#7D9F6E" },
  { color: "#C47D49" },
  { color: "#A65E2E" },
  { color: "#334B2C" },
  { color: "#3D3A33" },
  { color: "#26231E" },
];

const frameworkSteps = [
  {
    step: "Receive",
    description: "A short introduction to the day's theme and focus.",
  },
  {
    step: "Practice",
    description: "A simple activity that takes 10–15 minutes in your day.",
  },
  {
    step: "Observe",
    description: "Notice what comes up — without judgment.",
  },
  {
    step: "Reflect",
    description: "A short written reflection (optional, always private).",
  },
  {
    step: "Share",
    description: "Choose to share with the community, or keep it for yourself.",
  },
];

export default function YogaBeyondTheMatPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[80vh] flex items-center"
        style={{ background: "linear-gradient(135deg, #334B2C 0%, #1A1714 100%)" }}
        aria-labelledby="ybtm-heading"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-terracotta-300 font-medium mb-6">
            Featured Experience
          </p>
          <h1
            id="ybtm-heading"
            className="font-heading text-ivory mb-4"
            style={{ fontStyle: "italic" }}
          >
            {journeyConfig.title}
          </h1>
          <p className="text-ivory/60 text-xl mb-8">{journeyConfig.subtitle}</p>
          <blockquote className="max-w-2xl mx-auto mb-10">
            <p className="text-2xl md:text-3xl font-heading italic text-ivory/90">
              &ldquo;{journeyConfig.tagline}&rdquo;
            </p>
          </blockquote>
          <p className="text-ivory/70 max-w-xl mx-auto text-lg leading-relaxed mb-12">
            {journeyConfig.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup?redirect=/dashboard/journey">
              <Button variant="accent" size="xl">
                Start the 7-Day Journey — Free
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </Link>
            <a href="#journey-details">
              <Button
                variant="outline"
                size="xl"
                className="border-ivory/30 text-ivory hover:bg-white/10"
              >
                Learn more
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* What this is */}
      <section
        id="journey-details"
        className="section-padding bg-white"
        aria-labelledby="ybtm-about"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 id="ybtm-about" className="font-heading text-charcoal-700 mb-4">
                What this is
              </h2>
              <div className="space-y-4 text-charcoal-500 leading-relaxed">
                <p>
                  The 7-Day Awareness Journey is a simple experiment. Each day
                  introduces one ordinary activity — and invites you to do it
                  with your full attention.
                </p>
                <p>
                  The first journey starts with walking. Not power walking. Not
                  mindful walking as performance. Just walking — and noticing
                  what is actually happening while you do.
                </p>
                <p>
                  There are no scores. No progress streaks. No right answers.
                  Just seven days of paying attention.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                {[
                  { value: "7 days", label: "of practice" },
                  { value: "10 min", label: "per day" },
                  { value: "Free", label: "to join" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-muted rounded-2xl p-4">
                    <p className="font-heading text-2xl text-forest">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-heading text-charcoal-700 text-xl mb-6">
                How it works
              </h3>
              <ol className="space-y-5" aria-label="Journey daily framework">
                {frameworkSteps.map((step, i) => (
                  <li key={step.step} className="flex gap-4">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium text-ivory flex-shrink-0 mt-0.5"
                      style={{ background: "#334B2C" }}
                      aria-hidden="true"
                    >
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-700">{step.step}</p>
                      <p className="text-sm text-charcoal-500 mt-0.5">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* The 7 Days */}
      <section
        className="section-padding bg-muted"
        aria-labelledby="ybtm-days"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 id="ybtm-days" className="font-heading text-charcoal-700 mb-3">
              The Journey
            </h2>
            <p className="text-charcoal-500">Seven days. Seven moments of attention.</p>
          </div>
          <div className="space-y-4">
            {journeyConfig.days.map((day, i) => (
              <div
                key={day.number}
                className="flex items-center gap-5 bg-white rounded-2xl p-5 border border-border"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-ivory text-sm font-medium flex-shrink-0"
                  style={{ background: dayThemes[i].color }}
                  aria-hidden="true"
                >
                  {day.number}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-charcoal-700">
                    Day {day.number} — {day.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {day.theme} · {day.durationMinutes} min
                  </p>
                </div>
                {i === 0 && (
                  <span className="text-xs bg-sage-100 text-sage-700 px-2.5 py-1 rounded-full">
                    Begins today
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What this is NOT */}
      <section className="section-padding bg-white" aria-labelledby="ybtm-not">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 id="ybtm-not" className="font-heading text-charcoal-700 mb-8 text-center">
            What this is not
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Not a yoga class",
              "Not a meditation app",
              "Not a productivity program",
              "Not a 30-day transformation challenge",
              "Not about being flexible",
              "Not about having a quiet mind",
              "No competition, no scores",
              "No required equipment",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle
                  size={16}
                  className="text-sage-500 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-sm text-charcoal-500">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future journeys */}
      <section className="section-padding bg-muted" aria-labelledby="future-journeys">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 id="future-journeys" className="font-heading text-charcoal-700 mb-4">
            The first journey is walking.
          </h2>
          <p className="text-charcoal-500 mb-8">
            Future journeys will explore:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Conscious Eating",
              "Conscious Sitting",
              "Conscious Conversation",
              "Conscious Working",
              "Everyday Awareness",
            ].map((j) => (
              <span
                key={j}
                className="px-4 py-2 rounded-full border border-border text-sm text-charcoal-500 bg-white"
              >
                {j}
              </span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6">Coming soon</p>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="section-padding"
        style={{ background: "linear-gradient(135deg, #334B2C 0%, #1A1714 100%)" }}
        aria-label="Join journey call to action"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-terracotta-300 text-sm uppercase tracking-widest mb-4">
            An invitation
          </p>
          <h2
            className="font-heading text-ivory mb-6"
            style={{ fontStyle: "italic" }}
          >
            Seven days. Ten minutes a day.
            <br />
            Nothing to buy. Nothing to perform.
          </h2>
          <p className="text-ivory/70 mb-10 max-w-lg mx-auto">
            Just seven days of paying attention to something you already do.
          </p>
          <Link href="/signup?redirect=/dashboard/journey">
            <Button variant="accent" size="xl">
              Start the Journey — Free
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </Link>
          <p className="text-ivory/40 text-xs mt-4">
            Free to join. Takes about 10 minutes a day.
          </p>
        </div>
      </section>
    </>
  );
}
