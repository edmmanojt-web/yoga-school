import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { journeyConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Yoga Beyond the Mat — 7-Day Awareness Journey | SAHAJ",
  description:
    "A 7-day experiment to bring yoga into ordinary life. Walk. Eat. Sit. Notice. No mat required. No experience needed. Free to join.",
};

const activityComparisons = [
  {
    activity: "Walking",
    icon: "🚶",
    unconscious: [
      "Phone in hand, eyes down",
      "Thinking about the next task",
      "Body on autopilot, mind elsewhere",
    ],
    conscious: [
      "Feeling each step land",
      "Noticing temperature, sounds, breath",
      "Present in the body, present in the moment",
    ],
  },
  {
    activity: "Eating",
    icon: "🍽️",
    unconscious: [
      "Scrolling or watching while eating",
      "Taste barely noticed",
      "Finished before hunger signals arrive",
    ],
    conscious: [
      "Tasting the first bite fully",
      "Noticing texture, warmth, satisfaction",
      "Eating ends when the body says so",
    ],
  },
  {
    activity: "Sitting",
    icon: "🪑",
    unconscious: [
      "Slouched, restless, shifting constantly",
      "Half-here, half somewhere else",
      "Sitting, but not resting",
    ],
    conscious: [
      "Aware of the body's contact with the chair",
      "Noticing stillness within movement",
      "Intentional presence, not collapsed posture",
    ],
  },
  {
    activity: "Conversing",
    icon: "💬",
    unconscious: [
      "Waiting for your turn to speak",
      "Half-listening, half-planning the reply",
      "Reacting rather than responding",
    ],
    conscious: [
      "Hearing the full sentence before forming a thought",
      "Present to the person, not just the topic",
      "Responding from clarity, not habit",
    ],
  },
  {
    activity: "Working",
    icon: "💻",
    unconscious: [
      "Tab-switching every 90 seconds",
      "Doing without knowing why",
      "Tired but unable to stop",
    ],
    conscious: [
      "One task at a time, fully met",
      "Choosing what to do and knowing why",
      "Rest that is actually restful",
    ],
  },
];

const dayDetails = [
  {
    question: "Where is your mind right now?",
    description:
      "Walk somewhere you walk every day. This time, leave the phone. Notice what the body does. Notice where the mind goes.",
  },
  {
    question: "What do you actually feel?",
    description:
      "Every breath is a reset available to you at any moment. Most of us have forgotten it. Today, you remember.",
  },
  {
    question: "Who is thinking these thoughts?",
    description:
      "The mind runs on autopilot. Today, you step back and simply watch — without trying to fix or change anything.",
  },
  {
    question: "What are you actually aware of?",
    description:
      "Awareness is what makes experience possible. Today, you practice the art of noticing — the practice behind every practice.",
  },
  {
    question: "What is your actual practice?",
    description:
      "Sadhana means committed practice. Today, you explore what consistency feels like — not as discipline, but as devotion.",
  },
  {
    question: "What does silence feel like?",
    description:
      "Not the absence of sound. The presence of something deeper. Today, you taste what mouna — inner silence — actually is.",
  },
  {
    question: "What did these seven days show you?",
    description:
      "Look back — not at what you did, but at what shifted. This is where practice becomes experience. This is Anubhava.",
  },
];

const frameworkSteps = [
  {
    step: "Receive",
    description: "A short introduction to the day's theme — context, not instruction.",
    example: "Why this moment in the yogic journey matters.",
  },
  {
    step: "Practice",
    description: "One simple activity. Something you already do — done with attention.",
    example: "Walk to a familiar place without your phone.",
  },
  {
    step: "Observe",
    description: "Notice what comes up — thoughts, resistance, ease, surprise.",
    example: "What happened when you actually paid attention?",
  },
  {
    step: "Reflect",
    description: "A short guided reflection. Optional. Always private.",
    example: "Three questions. Five minutes. No right answers.",
  },
  {
    step: "Share",
    description: "Share with the community — or keep it for yourself. Both are valid.",
    example: "What surprised you today?",
  },
];

const reassuranceCards = [
  {
    title: "You don't need a mat",
    body: "Everything in this journey happens in your ordinary life — while walking, eating, working. No dedicated space required.",
  },
  {
    title: "You don't need experience",
    body: "No yoga background. No meditation practice. If you can walk and notice, you have everything you need.",
  },
  {
    title: "You don't need extra time",
    body: "Each day is 10–15 minutes, woven into activities you already do. The practice is the activity — done differently.",
  },
];

const futureJourneys = [
  "Conscious Eating",
  "Conscious Sitting",
  "Conscious Conversation",
  "Conscious Working",
  "Everyday Awareness",
];

export default function YogaBeyondTheMatPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative min-h-[88vh] flex items-center overflow-hidden"
        style={{ background: "linear-gradient(160deg, #FBF7F2 0%, #F2E8DA 100%)" }}
        aria-labelledby="ybtm-heading"
      >
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(200,145,58,0.07) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 py-28 text-center">
          <p
            className="mb-7 font-semibold"
            style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#B87D3B" }}
          >
            Yoga Beyond the Mat · 7-Day Journey
          </p>
          <h1
            id="ybtm-heading"
            className="mb-6"
            style={{
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              color: "#231E1A",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: 1.1,
            }}
          >
            What if yoga didn&rsquo;t
            <br />
            begin on the mat?
          </h1>
          <p className="text-lg mb-4 max-w-2xl mx-auto leading-relaxed" style={{ color: "#5A4E44" }}>
            Most of your day happens off the mat. Walking. Eating. Sitting. Talking. Working.
          </p>
          <p
            className="text-2xl mb-10 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", color: "#6B4A2A" }}
          >
            What if these were the practice?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup?redirect=/dashboard/journey">
              <Button variant="accent" size="xl">
                Start the 7-Day Journey — Free
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button
                variant="outline"
                size="xl"
                style={{ borderColor: "rgba(107,74,42,0.3)", color: "#6B4A2A" }}
              >
                How does it work?
              </Button>
            </a>
          </div>
          <p className="text-xs mt-5" style={{ color: "#B87D3B" }}>
            10–15 minutes a day · No equipment · Free to join
          </p>
        </div>
      </section>

      {/* ── Not about doing more ── */}
      <section
        className="section-padding"
        style={{ background: "#FEFCF9" }}
        aria-labelledby="ybtm-noticing"
      >
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2
            id="ybtm-noticing"
            className="mb-6"
            style={{
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              color: "#231E1A",
              lineHeight: 1.2,
            }}
          >
            This isn&rsquo;t about doing more.
            <br />
            <span style={{ color: "#C8913A" }}>It&rsquo;s about noticing more.</span>
          </h2>
          <p className="text-base leading-relaxed mb-5" style={{ color: "#7B6B5B" }}>
            Most of us walk, eat, sit, and work — but the mind is somewhere else entirely. We make
            plans while walking. We scroll while eating. We are physically present but mentally
            absent for most of the day.
          </p>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#7B6B5B" }}>
            The yogic traditions spent thousands of years understanding this — and they didn&rsquo;t
            fix it with more classes. They fixed it with attention, applied to ordinary life.
          </p>
          <div
            className="rounded-2xl p-8 border"
            style={{ background: "#F6EFE6", borderColor: "#E4D8C8" }}
          >
            <p
              className="text-xl italic leading-relaxed"
              style={{ fontFamily: "var(--font-heading)", color: "#6B4A2A" }}
            >
              No performance. No perfection.
              <br />
              No need to clear your mind.
            </p>
            <p className="text-sm mt-4" style={{ color: "#B87D3B" }}>
              Just your ordinary day — met with a little more attention.
            </p>
          </div>
        </div>
      </section>

      {/* ── Unconscious vs Conscious ── */}
      <section
        className="section-padding"
        style={{ background: "#F6EFE6" }}
        aria-labelledby="ybtm-comparison"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-14">
            <p
              className="mb-4 font-semibold"
              style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#B87D3B" }}
            >
              Same Activity
            </p>
            <h2
              id="ybtm-comparison"
              style={{
                fontFamily: "var(--font-heading)",
                fontStyle: "italic",
                color: "#231E1A",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              }}
            >
              Different quality of attention.
            </h2>
            <p className="mt-3 text-sm max-w-md mx-auto" style={{ color: "#7B6B5B" }}>
              The activity doesn&rsquo;t change. Only the quality of awareness does. That is the whole practice.
            </p>
          </div>
          <div className="space-y-5">
            {activityComparisons.map((item) => (
              <div
                key={item.activity}
                className="rounded-2xl overflow-hidden border"
                style={{ borderColor: "#E4D8C8" }}
              >
                <div
                  className="px-6 py-3 flex items-center gap-3"
                  style={{ background: "#E4D8C8" }}
                >
                  <span className="text-xl" aria-hidden="true">{item.icon}</span>
                  <span className="font-semibold" style={{ color: "#6B4A2A" }}>
                    {item.activity}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-6 border-b md:border-b-0 md:border-r" style={{ background: "#FEFCF9", borderColor: "#E4D8C8" }}>
                    <p
                      className="text-xs font-semibold mb-4 uppercase tracking-widest"
                      style={{ color: "#B87D3B", letterSpacing: "0.2em" }}
                    >
                      On Autopilot
                    </p>
                    <ul className="space-y-2" role="list">
                      {item.unconscious.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <span className="text-sm mt-0.5 flex-shrink-0" style={{ color: "#C8A878" }}>—</span>
                          <span className="text-sm leading-relaxed" style={{ color: "#7B6B5B" }}>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6" style={{ background: "#F2E8DA" }}>
                    <p
                      className="text-xs font-semibold mb-4 uppercase tracking-widest"
                      style={{ color: "#6B4A2A", letterSpacing: "0.2em" }}
                    >
                      With Attention
                    </p>
                    <ul className="space-y-2" role="list">
                      {item.conscious.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <CheckCircle
                            size={14}
                            className="flex-shrink-0 mt-0.5"
                            style={{ color: "#C8913A" }}
                            aria-hidden="true"
                          />
                          <span className="text-sm leading-relaxed" style={{ color: "#5A4E44" }}>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7-Day Timeline ── */}
      <section
        className="section-padding"
        style={{ background: "#FBF7F2" }}
        aria-labelledby="ybtm-days"
      >
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <p
              className="mb-4 font-semibold"
              style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#B87D3B" }}
            >
              The Journey
            </p>
            <h2
              id="ybtm-days"
              style={{
                fontFamily: "var(--font-heading)",
                fontStyle: "italic",
                color: "#231E1A",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              }}
            >
              7 Days. 7 Small Experiments.
            </h2>
            <p className="mt-3 text-sm" style={{ color: "#7B6B5B" }}>
              Each day builds on the last — from body, through breath and mind, to experience.
            </p>
          </div>
          <div className="space-y-4">
            {journeyConfig.days.map((day, i) => (
              <div
                key={day.number}
                className="rounded-2xl p-6 border flex gap-5 items-start"
                style={{ background: "#FEFCF9", borderColor: "#E4D8C8" }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
                  style={{
                    background: "rgba(200,145,58,0.12)",
                    color: "#C8913A",
                    border: "1.5px solid rgba(200,145,58,0.25)",
                  }}
                  aria-hidden="true"
                >
                  {day.number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-2 mb-1">
                    <p className="font-semibold" style={{ color: "#231E1A" }}>
                      {day.title}
                    </p>
                    <span className="text-xs" style={{ color: "#B87D3B" }}>
                      {day.durationMinutes} min
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed mb-2" style={{ color: "#7B6B5B" }}>
                    {dayDetails[i].description}
                  </p>
                  <p className="text-xs italic" style={{ color: "#C8913A" }}>
                    &ldquo;{dayDetails[i].question}&rdquo;
                  </p>
                </div>
                {i === 0 && (
                  <span
                    className="text-xs px-2.5 py-1 rounded-full flex-shrink-0"
                    style={{ background: "rgba(200,145,58,0.12)", color: "#C8913A" }}
                  >
                    Start here
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What happens each day ── */}
      <section
        id="how-it-works"
        className="section-padding relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #3A2616 0%, #4A3220 50%, #5C4432 100%)" }}
        aria-labelledby="ybtm-framework"
      >
        <div
          className="absolute right-0 top-0 w-[400px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(200,145,58,0.09) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-14">
            <p
              className="mb-4 font-semibold"
              style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C8913A" }}
            >
              Daily Structure
            </p>
            <h2
              id="ybtm-framework"
              style={{
                fontFamily: "var(--font-heading)",
                fontStyle: "italic",
                color: "#FBF7F2",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              }}
            >
              What happens each day?
            </h2>
            <p className="mt-3 text-sm" style={{ color: "rgba(251,247,242,0.5)" }}>
              Five steps. Fifteen minutes. A complete practice in itself.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {frameworkSteps.map((step, i) => (
              <div
                key={step.step}
                className="rounded-xl p-5 text-center"
                style={{
                  background: "rgba(251,247,242,0.04)",
                  border: "1px solid rgba(251,247,242,0.08)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold mx-auto mb-3"
                  style={{ background: "rgba(200,145,58,0.2)", color: "#E8C07A" }}
                  aria-hidden="true"
                >
                  {i + 1}
                </div>
                <p className="font-semibold text-sm mb-2" style={{ color: "#FBF7F2" }}>
                  {step.step}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(251,247,242,0.55)" }}>
                  {step.description}
                </p>
                <p className="text-xs mt-3 italic" style={{ color: "rgba(200,145,58,0.65)" }}>
                  {step.example}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reassurance ── */}
      <section
        className="section-padding"
        style={{ background: "#FEFCF9" }}
        aria-labelledby="ybtm-reassurance"
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-12">
            <h2
              id="ybtm-reassurance"
              style={{
                fontFamily: "var(--font-heading)",
                fontStyle: "italic",
                color: "#231E1A",
                fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              }}
            >
              You don&rsquo;t need to prepare for this.
            </h2>
            <p className="mt-3 text-sm" style={{ color: "#7B6B5B" }}>
              This journey was designed to meet you exactly where you are.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reassuranceCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl p-7 border"
                style={{ background: "#FBF7F2", borderColor: "#E4D8C8" }}
              >
                <h3 className="font-semibold mb-3" style={{ color: "#6B4A2A", fontSize: "1.05rem" }}>
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7B6B5B" }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>
          {/* Stats strip */}
          <div
            className="mt-10 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border"
            style={{ background: "#F6EFE6", borderColor: "#E4D8C8" }}
          >
            {[
              { value: "7 days", label: "of practice" },
              { value: "10–15 min", label: "per day" },
              { value: "No mat", label: "required" },
              { value: "Free", label: "to join" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="font-semibold text-xl mb-1"
                  style={{ fontFamily: "var(--font-heading)", color: "#6B4A2A" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-widest" style={{ color: "#B87D3B" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What this is NOT ── */}
      <section
        className="section-padding"
        style={{ background: "#F6EFE6" }}
        aria-labelledby="ybtm-not"
      >
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <h2
            id="ybtm-not"
            className="text-center mb-10"
            style={{
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              color: "#231E1A",
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
            }}
          >
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
              <div key={item} className="flex items-center gap-3 py-2">
                <CheckCircle
                  size={16}
                  className="flex-shrink-0"
                  style={{ color: "#C8913A" }}
                  aria-hidden="true"
                />
                <span className="text-sm" style={{ color: "#5A4E44" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Future journeys ── */}
      <section
        className="section-padding"
        style={{ background: "#FBF7F2" }}
        aria-labelledby="ybtm-future"
      >
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <p
            className="mb-4 font-semibold"
            style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#B87D3B" }}
          >
            Coming Soon
          </p>
          <h2
            id="ybtm-future"
            className="mb-3"
            style={{
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              color: "#231E1A",
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
            }}
          >
            The first journey is walking.
          </h2>
          <p className="text-sm mb-8" style={{ color: "#7B6B5B" }}>
            Once you see how walking can become a practice, the same lens opens onto everything.
            Future journeys explore:
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {futureJourneys.map((j) => (
              <span
                key={j}
                className="px-4 py-2 rounded-full border text-sm"
                style={{ background: "#FEFCF9", borderColor: "#E4D8C8", color: "#6B4A2A" }}
              >
                {j}
              </span>
            ))}
          </div>
          <p className="text-xs italic" style={{ color: "#B87D3B" }}>
            Each journey takes one ordinary activity and transforms it into a field of practice.
          </p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #3A2616 0%, #4A3220 50%, #5C4432 100%)" }}
        aria-label="Join the journey"
      >
        <div
          className="absolute right-0 bottom-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(200,145,58,0.09) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <p
            className="mb-5 font-semibold"
            style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C8913A" }}
          >
            An Invitation
          </p>
          <h2
            className="mb-6"
            style={{
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              color: "#FBF7F2",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              lineHeight: 1.2,
            }}
          >
            Yoga doesn&rsquo;t always ask you to stop your life.
            <br />
            <span style={{ color: "#E8C07A" }}>Sometimes it asks you to live it differently.</span>
          </h2>
          <p
            className="leading-relaxed mb-8"
            style={{ color: "rgba(251,247,242,0.65)", maxWidth: "480px", margin: "0 auto 2rem" }}
          >
            Seven days. Ten minutes each. Nothing to buy. Nothing to perform.
            Just your ordinary day — met with a little more attention.
          </p>
          <Link href="/signup?redirect=/dashboard/journey">
            <Button variant="accent" size="xl">
              Start the 7-Day Journey — Free
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </Link>
          <p className="text-xs mt-5" style={{ color: "rgba(251,247,242,0.35)" }}>
            Free to join. Takes about 10–15 minutes a day.
          </p>
        </div>
      </section>
    </>
  );
}
