import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig, teacherConfig, journeyConfig } from "@/config/site";
import { db } from "@/lib/db";
import { formatDate, formatTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
};

// ─── Section components ────────────────────────────────────────────────

function Hero() {
  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#FBF7F2]"
      aria-labelledby="hero-heading"
    >
      {/* Subtle warm glow blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 45% at 80% 25%, rgba(200,145,58,0.07) 0%, transparent 70%), " +
            "radial-gradient(ellipse 45% 55% at 15% 75%, rgba(107,74,42,0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Faint horizontal rule ornament */}
      <div
        className="absolute left-0 right-0 bottom-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(200,145,58,0.25) 40%, rgba(200,145,58,0.25) 60%, transparent)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-28 md:py-40 w-full">
        <div className="max-w-[700px]">
          {/* Eyebrow */}
          <p className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-[#B87D3B] mb-6">
            Traditional Yoga School
          </p>

          {/* Brand headline */}
          <h1
            id="hero-heading"
            className="text-[#231E1A] mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
            }}
          >
            SAHAJ
          </h1>

          {/* Tagline */}
          <p
            className="text-[#6B4A2A] mb-8"
            style={{
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)",
              lineHeight: 1.3,
            }}
          >
            From Practice to Experience.
          </p>

          {/* Descriptor */}
          <p className="text-[#7B6B5B] text-base md:text-lg max-w-[500px] leading-relaxed mb-10">
            Traditional yoga for the inner journey — Hatha, Pranayama, Meditation and Sadhana,
            guided progressively from body to experience.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link href="/yoga-beyond-the-mat">
              <Button variant="accent" size="lg">
                Begin the Sahaj Journey
                <ArrowRight size={15} aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/offerings">
              <Button variant="outline" size="lg">
                Explore Offerings
              </Button>
            </Link>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap items-center gap-8 mt-14 pt-10 border-t border-[#E4D8C8]">
            {[
              { stat: "100+", label: "Students guided" },
              { stat: "3", label: "Languages" },
              { stat: "Online & In-person", label: "Available" },
            ].map(({ stat, label }) => (
              <div key={label} className="flex flex-col">
                <span
                  className="text-[#231E1A] text-[1.1rem] font-semibold"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {stat}
                </span>
                <span className="text-[#7B6B5B] text-xs mt-0.5">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="section-padding bg-[#F6EFE6]" aria-labelledby="philosophy-heading">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
        <p className="text-[0.65rem] font-semibold tracking-[0.25em] uppercase text-[#B87D3B] mb-6">
          Our Approach
        </p>
        <h2
          id="philosophy-heading"
          className="text-[#231E1A] mb-8"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          What if yoga wasn&apos;t another thing to achieve?
        </h2>
        <div className="max-w-2xl mx-auto space-y-4 text-[#7B6B5B] leading-relaxed">
          <p>You don&apos;t need to become more flexible.</p>
          <p>You don&apos;t need to perform difficult postures.</p>
          <p>You don&apos;t need to believe anything.</p>
          <p className="pt-2 text-[#3E3530] font-medium">
            You simply begin with practice. And gradually, the practice begins to change
            the way you experience yourself and life.
          </p>
        </div>
        <div className="mt-10 pt-10 border-t border-[#E4D8C8]">
          <p
            className="text-[#6B4A2A] text-xl"
            style={{ fontFamily: "var(--font-heading)", fontStyle: "italic" }}
          >
            &ldquo;We don&apos;t teach yoga as a collection of practices. We guide you through
            a progressive journey of practice, awareness and experience.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}

function SahajMethod() {
  const stages = [
    {
      sanskrit: "Sharira",
      english: "Body",
      number: "01",
      description: "Learn to inhabit and understand the body. Asana, Hatha, alignment and stability — the foundation of all practice.",
    },
    {
      sanskrit: "Prana",
      english: "Breath & Energy",
      number: "02",
      description: "Move from the gross to the subtle. Pranayama and breath awareness as tools for presence and inner discovery.",
    },
    {
      sanskrit: "Manas",
      english: "Mind",
      number: "03",
      description: "Develop steadiness and inner observation. Dharana, meditation and the practice of watching the mind.",
    },
    {
      sanskrit: "Sadhana",
      english: "Practice",
      number: "04",
      description: "Yoga moves from something you do to something you live. Daily practice, discipline and sustained awareness.",
    },
    {
      sanskrit: "Anubhava",
      english: "Experience",
      number: "05",
      description: "The ultimate aim — not more information, but direct experience. Where the practice transforms the practitioner.",
    },
  ];

  return (
    <section className="section-padding bg-[#FBF7F2]" aria-labelledby="method-heading">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="mb-14">
          <p className="text-[0.65rem] font-semibold tracking-[0.25em] uppercase text-[#B87D3B] mb-4">
            The Method
          </p>
          <h2
            id="method-heading"
            className="text-[#231E1A] max-w-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            The Sahaj Journey
          </h2>
          <p className="text-[#7B6B5B] mt-3 max-w-lg text-sm leading-relaxed">
            A progressive path from the body inward — from the visible to the subtle, from practice to experience.
          </p>
        </div>

        <div className="space-y-px">
          {stages.map((stage, i) => (
            <div
              key={stage.sanskrit}
              className="group flex items-start gap-6 md:gap-10 py-7 border-t border-[#E4D8C8] hover:bg-[#F2E8DA]/40 transition-colors duration-200 px-4 -mx-4 rounded-lg"
            >
              <span className="text-[0.65rem] font-semibold text-[#C8913A]/60 tracking-widest mt-1 w-6 flex-shrink-0">
                {stage.number}
              </span>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-[180px,1fr] gap-2 md:gap-10 items-baseline">
                <div>
                  <span
                    className="text-[#6B4A2A] text-xl"
                    style={{ fontFamily: "var(--font-heading)", fontStyle: "italic" }}
                  >
                    {stage.sanskrit}
                  </span>
                  <span className="text-[#B87D3B] text-xs font-semibold tracking-widest uppercase block mt-0.5">
                    {stage.english}
                  </span>
                </div>
                <p className="text-sm text-[#7B6B5B] leading-relaxed">{stage.description}</p>
              </div>
              {i < stages.length - 1 && (
                <ArrowRight
                  size={14}
                  className="text-[#C8913A]/30 mt-1.5 flex-shrink-0 hidden md:block"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Offerings() {
  const offerings = [
    {
      title: "Hatha Yoga",
      description: "Traditional Hatha practice for all levels. From foundations to deeper exploration — online and in-person.",
      href: "/yoga",
      label: "Body · Alignment · Stability",
      mode: "Online & In-Person",
    },
    {
      title: "Pranayama & Breathwork",
      description: "Guided breath awareness and pranayama. Sessions that help you discover the relationship between breath and experience.",
      href: "/breathwork",
      label: "Breath · Prana · Presence",
      mode: "Online & In-Person",
    },
    {
      title: "Meditation & Mindfulness",
      description: "Guided practices for inner observation. Learning to watch the mind without being pulled by it.",
      href: "/mindfulness",
      label: "Mind · Stillness · Awareness",
      mode: "Online & In-Person",
    },
    {
      title: "Workshops & Programs",
      description: "Focused multi-day programs for deeper exploration of the practices and their inner dimensions.",
      href: "/workshops",
      label: "Deep Dive · Various Formats",
      mode: "Various Formats",
    },
    {
      title: "Retreats",
      description: "Immersive retreat experiences. Step away from ordinary life, slow down, and return to stillness.",
      href: "/retreats",
      label: "Immersive · In-Person",
      mode: "In-Person",
    },
    {
      title: "Community",
      description: "A space for practitioners to ask, share and learn together. Genuine inquiry, not performance.",
      href: "/community",
      label: "Sangha · Online",
      mode: "Online",
    },
  ];

  return (
    <section className="section-padding bg-[#F2E8DA]/40" aria-labelledby="offerings-heading">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center mb-14">
          <p className="text-[0.65rem] font-semibold tracking-[0.25em] uppercase text-[#B87D3B] mb-4">Offerings</p>
          <h2
            id="offerings-heading"
            className="text-[#231E1A] mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ways to explore
          </h2>
          <p className="text-[#7B6B5B] max-w-md mx-auto text-sm">
            Different practices, one intention — cultivating awareness.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {offerings.map((o) => (
            <Link key={o.href} href={o.href} className="group block">
              <Card variant="elevated" className="h-full">
                <CardContent className="p-7 h-full flex flex-col">
                  <p className="text-[0.65rem] font-semibold tracking-widest uppercase text-[#C8913A] mb-4">
                    {o.label}
                  </p>
                  <h3
                    className="text-[#231E1A] text-[1.15rem] mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {o.title}
                  </h3>
                  <p className="text-sm text-[#7B6B5B] leading-relaxed flex-1">{o.description}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-[0.65rem] font-medium text-[#B87D3B]/50 uppercase tracking-wider">
                      {o.mode}
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-[#C8913A]/40 group-hover:text-[#C8913A] group-hover:translate-x-1 transition-all"
                      aria-hidden="true"
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedJourney() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #3A2616 0%, #4A3220 50%, #5C4432 100%)" }}
      aria-labelledby="journey-heading"
    >
      {/* Warm glow */}
      <div
        className="absolute right-0 bottom-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,145,58,0.1) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -left-20 top-0 w-[300px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,247,242,0.03) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[0.65rem] font-semibold tracking-[0.25em] uppercase text-[#C8913A]/80 mb-5">
              Signature Programme · Yoga Beyond the Mat
            </p>
            <h2
              id="journey-heading"
              className="text-[#FBF7F2] mb-3"
              style={{ fontFamily: "var(--font-heading)", fontStyle: "italic" }}
            >
              {journeyConfig.title}
            </h2>
            <p className="text-[#FBF7F2]/50 text-sm mb-7 tracking-wide">{journeyConfig.subtitle}</p>
            <blockquote className="border-l-2 border-[#C8913A]/60 pl-5 mb-8">
              <p
                className="text-[#FBF7F2]/85 text-lg italic leading-snug"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                &ldquo;What if yoga didn&rsquo;t begin on the mat?&rdquo;
              </p>
            </blockquote>
            <p className="text-[#FBF7F2]/50 leading-relaxed mb-3 max-w-md text-sm">
              Walking. Eating. Sitting. Working. These ordinary activities become the field of practice
              — each day moving from body, through breath and mind, to direct experience.
            </p>
            <p className="text-[#FBF7F2]/35 text-xs mb-9 max-w-md">
              10–15 min a day · No mat required · Free to join
            </p>
            <Link href="/yoga-beyond-the-mat">
              <Button variant="accent" size="lg">
                Begin the Journey
                <ArrowRight size={15} aria-hidden="true" />
              </Button>
            </Link>
          </div>

          {/* Journey days */}
          <div className="space-y-2">
            {journeyConfig.days.map((day) => (
              <div
                key={day.number}
                className="flex items-center gap-4 rounded-xl px-5 py-4 border border-white/[0.06] hover:bg-white/[0.04] transition-colors duration-200"
                style={{ background: "rgba(251,247,242,0.025)" }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[0.65rem] font-semibold flex-shrink-0 text-[#E8C07A]"
                  style={{ background: "rgba(200,145,58,0.15)" }}
                  aria-hidden="true"
                >
                  {day.number}
                </div>
                <div className="min-w-0">
                  <p className="text-[#FBF7F2]/85 text-sm font-medium">{day.title}</p>
                  <p className="text-[#FBF7F2]/30 text-xs mt-0.5">{day.theme} · {day.durationMinutes} min</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function UpcomingSessions({ sessions }: {
  sessions: Array<{
    id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    mode: string;
    spotsLeft: number;
    offering: { title: string; category: string };
    teacher: { name: string } | null;
  }>;
}) {
  const hasSessions = sessions.length > 0;

  const fallback = [
    { title: "Morning Hatha Flow", category: "Yoga", day: "Mon / Wed / Fri", time: "Time TBA", mode: "Online" },
    { title: "Pranayama & Breath Awareness", category: "Breathwork", day: "Tue & Thu", time: "Time TBA", mode: "Online" },
    { title: "Guided Meditation", category: "Mindfulness", day: "Sunday", time: "Time TBA", mode: "Online" },
  ];

  return (
    <section className="section-padding bg-[#FBF7F2]" aria-labelledby="sessions-heading">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[0.65rem] font-semibold tracking-[0.25em] uppercase text-[#B87D3B] mb-3">Live Sessions</p>
            <h2
              id="sessions-heading"
              className="text-[#231E1A]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Upcoming classes
            </h2>
          </div>
          <Link href="/schedule">
            <Button variant="outline" size="sm">
              Full schedule <ArrowRight size={13} aria-hidden="true" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {hasSessions ? sessions.map((s) => (
            <Card key={s.id} variant="elevated">
              <CardContent className="p-6">
                <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-[#B87D3B]">
                  {s.offering.category}
                </span>
                <h3
                  className="text-[#231E1A] text-xl mt-2 mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {s.title}
                </h3>
                <div className="space-y-2.5 text-sm text-[#7B6B5B]">
                  <div className="flex items-center gap-2.5">
                    <Calendar size={13} aria-hidden="true" />
                    <span>{formatDate(s.startTime)}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs" aria-hidden="true">🕐</span>
                    <span>{formatTime(s.startTime)}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin size={13} aria-hidden="true" />
                    <span>{s.mode === "ONLINE" ? "Online" : "In-Person"}</span>
                  </div>
                  {s.teacher && (
                    <p className="text-xs text-[#7B6B5B]/60">with {s.teacher.name}</p>
                  )}
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <p className="text-xs text-[#7B6B5B]/50">
                    {s.spotsLeft > 0 ? `${s.spotsLeft} spots left` : "Full"}
                  </p>
                  <Link href="/schedule">
                    <Button variant="outline" size="sm">Book</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )) : fallback.map((s) => (
            <Card key={s.title} variant="elevated">
              <CardContent className="p-6">
                <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-[#B87D3B]">
                  {s.category}
                </span>
                <h3
                  className="text-[#231E1A] text-xl mt-2 mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {s.title}
                </h3>
                <div className="space-y-2.5 text-sm text-[#7B6B5B]">
                  <div className="flex items-center gap-2.5">
                    <Calendar size={13} aria-hidden="true" />
                    <span>{s.day}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs" aria-hidden="true">🕐</span>
                    <span>{s.time}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs" aria-hidden="true">💻</span>
                    <span>{s.mode}</span>
                  </div>
                </div>
                <div className="mt-5">
                  <Link href="/schedule">
                    <Button variant="outline" size="sm" className="w-full">View &amp; Book</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutTeacher() {
  return (
    <section className="section-padding bg-[#F2E8DA]/40" aria-labelledby="teacher-heading">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* Photo placeholder */}
          <div
            className="aspect-[4/5] rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #F2E8DA 0%, #E4D8C8 100%)" }}
            role="img"
            aria-label={`Photo of ${teacherConfig.name}`}
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#6B4A2A]/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-[#6B4A2A]/30 text-2xl" aria-hidden="true">🙏</span>
              </div>
              <p className="text-[#7B6B5B]/40 text-xs">[Teacher Photo]</p>
            </div>
          </div>

          <div>
            <p className="text-[0.65rem] font-semibold tracking-[0.25em] uppercase text-[#B87D3B] mb-5">
              Your Guide
            </p>
            <h2
              id="teacher-heading"
              className="text-[#231E1A] mb-1"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {teacherConfig.name}
            </h2>
            <p className="text-[#7B6B5B]/70 text-sm mb-6">{teacherConfig.title}</p>
            <p className="text-[#7B6B5B] leading-relaxed mb-7 text-sm">{teacherConfig.shortBio}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {teacherConfig.specialties.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 bg-white rounded-full text-xs text-[#6B4A2A] border border-[#E4D8C8]"
                >
                  {s}
                </span>
              ))}
            </div>
            <Link href="/about">
              <Button variant="outline">
                Learn more <ArrowRight size={13} aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section className="section-padding bg-[#FBF7F2]" aria-labelledby="community-heading">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="rounded-2xl border border-[#E4D8C8] bg-[#FEFCF9] p-10 md:p-14 text-center">
          <p className="text-[0.65rem] font-semibold tracking-[0.25em] uppercase text-[#B87D3B] mb-4">Sangha</p>
          <h2
            id="community-heading"
            className="text-[#231E1A] mb-5"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Practice together
          </h2>
          <p className="text-[#7B6B5B] max-w-md mx-auto mb-8 text-sm leading-relaxed">
            A space for practitioners to ask questions, share experiences, and learn from each other —
            genuine inquiry, not performance.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/community">
              <Button variant="primary">Explore Community</Button>
            </Link>
            {siteConfig.whatsappCommunity !== "[WhatsApp Community Link]" && (
              <a href={siteConfig.whatsappCommunity} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary">Join WhatsApp Group</Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      content: "The Sahaj Journey changed how I understand yoga. It shifted from something I do on a mat to something I carry into my day.",
      author: "[Participant Name]",
      detail: "Completed the Sahaj Journey",
    },
    {
      content: "The breathwork sessions are genuinely different. Calm, grounded, without pressure to perform or achieve anything.",
      author: "[Participant Name]",
      detail: "Pranayama participant",
    },
    {
      content: "The Hatha classes feel thoughtful and accessible. Three months in and the difference in how I hold myself is real.",
      author: "[Participant Name]",
      detail: "Regular student",
    },
  ];

  return (
    <section className="section-padding bg-[#F2E8DA]/40" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center mb-12">
          <p className="text-[0.65rem] font-semibold tracking-[0.25em] uppercase text-[#B87D3B] mb-4">
            From Practitioners
          </p>
          <h2
            id="testimonials-heading"
            className="text-[#231E1A]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            What people say
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="bg-[#FEFCF9] rounded-2xl p-7 border border-[#E4D8C8] hover:shadow-[0_4px_24px_rgba(107,74,42,0.07)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex gap-0.5 mb-5" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={12} className="text-[#C8913A] fill-[#C8913A]" aria-hidden="true" />
                ))}
              </div>
              <blockquote>
                <p className="text-[#7B6B5B] italic leading-relaxed text-sm">
                  &ldquo;{t.content}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-5 pt-5 border-t border-[#E4D8C8]">
                <p className="font-semibold text-sm text-[#3E3530]">{t.author}</p>
                <p className="text-xs text-[#7B6B5B]/50 mt-0.5">{t.detail}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "Do I need any prior yoga experience?",
      a: "No. The Sahaj approach begins where you are. Complete beginners are welcome, and there is a structured path for those already practising.",
    },
    {
      q: "What is the Sahaj Journey?",
      a: "A free 7-day inner journey through the traditional yogic framework — Sharira, Prana, Manas, Sadhana, and Anubhava. About 10–15 minutes a day. No beliefs required.",
    },
    {
      q: "Are sessions available online?",
      a: "Yes. Most offerings are available online. Select in-person sessions are also offered depending on location.",
    },
    {
      q: "What is the difference between Hatha Yoga and general yoga classes?",
      a: "Hatha yoga is a traditional practice that encompasses asana, pranayama and inner awareness — not just physical exercise. Sessions here are grounded in this classical approach.",
    },
    {
      q: "What languages are sessions conducted in?",
      a: "English, Hindi and Marathi. Please mention your preference when booking.",
    },
  ];

  return (
    <section className="section-padding bg-[#FBF7F2]" aria-labelledby="faq-heading">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <p className="text-[0.65rem] font-semibold tracking-[0.25em] uppercase text-[#B87D3B] mb-4">Questions</p>
          <h2
            id="faq-heading"
            className="text-[#231E1A]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Common questions
          </h2>
        </div>
        <dl className="space-y-0 border-t border-[#E4D8C8]">
          {faqs.map((faq) => (
            <div key={faq.q} className="border-b border-[#E4D8C8] py-6">
              <dt
                className="text-[#231E1A] text-[1.05rem] mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {faq.q}
              </dt>
              <dd className="text-[#7B6B5B] leading-relaxed text-sm">{faq.a}</dd>
            </div>
          ))}
        </dl>
        <div className="text-center mt-9">
          <Link href="/faq">
            <Button variant="ghost">
              See all questions <ArrowRight size={13} aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #3A2616 0%, #4A3220 60%, #5C4432 100%)" }}
      aria-labelledby="cta-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(200,145,58,0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-2xl mx-auto px-5 sm:px-8 text-center">
        <p className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase text-[#C8913A]/70 mb-8">
          Begin
        </p>
        <h2
          id="cta-heading"
          className="text-[#FBF7F2] mb-6"
          style={{ fontFamily: "var(--font-heading)", fontStyle: "italic" }}
        >
          Yoga is a practice. Awareness is something we cultivate.
          Everyday life is where we get to practise.
        </h2>
        <p className="text-[#FBF7F2]/45 mb-10 max-w-md mx-auto text-sm">
          Whatever stage you&apos;re at — start where you are.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/yoga-beyond-the-mat">
            <Button variant="accent" size="lg">
              Start the Sahaj Journey <ArrowRight size={15} aria-hidden="true" />
            </Button>
          </Link>
          <Link href="/schedule">
            <Button
              variant="ghost"
              size="lg"
              className="text-[#FBF7F2]/70 hover:text-[#FBF7F2] hover:bg-white/10 border border-white/15"
            >
              Browse Classes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────

export default async function HomePage() {
  let sessionsData: Array<{
    id: string;
    startTime: Date;
    endTime: Date;
    capacity: number;
    enrolled: number;
    location: string | null;
    spotsLeft: number;
    offering: { title: string; category: string };
    teacher: { name: string | null };
  }> = [];

  if (process.env.DATABASE_URL) {
    try {
      const upcomingSessions = await db.session.findMany({
        where: {
          status: "SCHEDULED",
          startTime: { gte: new Date() },
        },
        include: {
          offering: { select: { title: true, category: true } },
          teacher: { select: { name: true } },
        },
        orderBy: { startTime: "asc" },
        take: 3,
      });

      sessionsData = upcomingSessions.map((s) => ({
        ...s,
        spotsLeft: Math.max(0, s.capacity - s.enrolled),
      }));
    } catch {
      // DB unreachable — render page with no sessions
    }
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-[#6B4A2A] focus:text-[#FBF7F2] focus:rounded-lg"
      >
        Skip to main content
      </a>
      <Hero />
      <Philosophy />
      <SahajMethod />
      <Offerings />
      <FeaturedJourney />
      <UpcomingSessions sessions={sessionsData} />
      <AboutTeacher />
      <Community />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}

