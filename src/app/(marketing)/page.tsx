import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Users, Leaf, Wind, Brain, MapPin } from "lucide-react";
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

// ─── Section components ─────────────────────────────────────────

function Hero() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center"
      style={{
        background: "linear-gradient(135deg, #FAF7F0 0%, #F4EFE3 40%, #E8DFC8 100%)",
      }}
      aria-labelledby="hero-heading"
    >
      {/* Decorative element */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 70% 30%, #5A7A4A22 0%, transparent 60%), radial-gradient(circle at 20% 80%, #C47D4922 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="text-sm uppercase tracking-[0.2em] text-sage-500 font-medium mb-6">
            Yoga · Breath · Awareness
          </p>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="font-heading text-charcoal-700 mb-6"
            style={{ fontStyle: "italic" }}
          >
            Come back to yourself.
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-charcoal-500 max-w-xl leading-relaxed mb-10">
            Explore yoga, breathwork and mindfulness as practices for becoming
            more aware — on the mat and in everyday life.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link href="/offerings">
              <Button variant="primary" size="lg">
                Explore Our Offerings
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/yoga-beyond-the-mat">
              <Button variant="outline" size="lg">
                Start the 7-Day Journey
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Introduction() {
  return (
    <section
      className="section-padding bg-white"
      aria-labelledby="intro-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-sage-500 font-medium mb-4">
          Our Philosophy
        </p>
        <h2 id="intro-heading" className="font-heading text-charcoal-700 mb-6">
          Yoga is not something we only practice on a mat.
        </h2>
        <p className="text-lg text-charcoal-500 leading-relaxed max-w-2xl mx-auto">
          It is the quality of awareness we bring to ordinary moments — to how
          we breathe, how we move, how we eat, how we listen, how we respond.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            {
              icon: <Leaf size={24} className="text-sage-500" />,
              title: "A Physical Practice",
              description:
                "Yoga as movement, breath, and stillness. Classes for beginners, regular practitioners, and those wanting to go deeper.",
            },
            {
              icon: <Wind size={24} className="text-sage-500" />,
              title: "A Breath Practice",
              description:
                "Breathwork and pranayama as tools for presence. Learning to notice the breath as an anchor to this moment.",
            },
            {
              icon: <Brain size={24} className="text-sage-500" />,
              title: "A Way of Living",
              description:
                "Bringing awareness into ordinary activities. Yoga Beyond the Mat — where everyday life becomes the practice.",
            },
          ].map((item) => (
            <div key={item.title} className="flex flex-col gap-3">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="font-heading text-charcoal-700">{item.title}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed">
                {item.description}
              </p>
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
      title: "Yoga",
      description:
        "Online and in-person classes for all levels. From beginner sessions to deeper practices.",
      href: "/yoga",
      icon: "🧘",
      mode: "Online & In-Person",
    },
    {
      title: "Breathwork",
      description:
        "Guided breath awareness and pranayama. Sessions to help you come back to yourself.",
      href: "/breathwork",
      icon: "💨",
      mode: "Online & In-Person",
    },
    {
      title: "Mindfulness & Meditation",
      description:
        "Guided mindfulness and meditation practices. Individual and group sessions.",
      href: "/mindfulness",
      icon: "🌿",
      mode: "Online & In-Person",
    },
    {
      title: "Workshops",
      description:
        "Focused workshops and multi-day programs for deeper exploration.",
      href: "/workshops",
      icon: "📚",
      mode: "Various formats",
    },
    {
      title: "Retreats",
      description:
        "Immersive retreat experiences. Step away, slow down, and come back to yourself.",
      href: "/retreats",
      icon: "🌄",
      mode: "In-Person",
    },
    {
      title: "Community",
      description:
        "A space to share, ask, reflect and learn together. Observe. Share. Learn.",
      href: "/community",
      icon: "🤝",
      mode: "Online",
    },
  ];

  return (
    <section
      className="section-padding bg-muted"
      aria-labelledby="offerings-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.2em] text-sage-500 font-medium mb-4">
            What We Offer
          </p>
          <h2 id="offerings-heading" className="font-heading text-charcoal-700 mb-4">
            Ways to explore
          </h2>
          <p className="text-charcoal-500 max-w-xl mx-auto">
            Different practices, one intention — cultivating awareness.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerings.map((offering) => (
            <Link key={offering.href} href={offering.href} className="group block">
              <Card
                variant="elevated"
                className="h-full hover:border-sage-200 transition-all duration-200"
              >
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="text-3xl mb-4" aria-hidden="true">
                    {offering.icon}
                  </div>
                  <h3 className="font-heading text-charcoal-700 text-xl mb-2">
                    {offering.title}
                  </h3>
                  <p className="text-sm text-charcoal-500 leading-relaxed flex-1">
                    {offering.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {offering.mode}
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-sage-500 group-hover:translate-x-1 transition-transform"
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
      className="section-padding"
      style={{ background: "linear-gradient(135deg, #334B2C 0%, #26231E 100%)" }}
      aria-labelledby="journey-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-terracotta-300 font-medium mb-4">
              Featured Experience
            </p>
            <h2
              id="journey-heading"
              className="font-heading text-ivory mb-2"
              style={{ fontStyle: "italic" }}
            >
              {journeyConfig.title}
            </h2>
            <p className="text-ivory/60 text-lg mb-6">
              {journeyConfig.subtitle}
            </p>
            <blockquote className="border-l-2 border-terracotta pl-6 mb-8">
              <p className="text-xl text-ivory font-heading italic">
                &ldquo;{journeyConfig.tagline}&rdquo;
              </p>
            </blockquote>
            <p className="text-ivory/70 leading-relaxed mb-8 max-w-md">
              {journeyConfig.description}
            </p>
            <Link href="/yoga-beyond-the-mat">
              <Button variant="accent" size="lg">
                Start the 7-Day Journey
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </Link>
          </div>

          {/* Journey days preview */}
          <div className="space-y-3">
            {journeyConfig.days.map((day) => (
              <div
                key={day.number}
                className="flex items-center gap-4 rounded-xl p-4"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
                  style={{ background: "rgba(196,125,73,0.2)", color: "#E8AF84" }}
                  aria-hidden="true"
                >
                  {day.number}
                </div>
                <div>
                  <p className="text-ivory text-sm font-medium">{day.title}</p>
                  <p className="text-ivory/40 text-xs">{day.theme} · {day.durationMinutes} min</p>
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
  return (
    <section
      className="section-padding bg-white"
      aria-labelledby="sessions-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-sage-500 font-medium mb-3">
              Live Sessions
            </p>
            <h2 id="sessions-heading" className="font-heading text-charcoal-700">
              Upcoming classes
            </h2>
          </div>
          <Link href="/schedule">
            <Button variant="outline" size="sm">
              View full schedule
              <ArrowRight size={14} aria-hidden="true" />
            </Button>
          </Link>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hasSessions ? (
            sessions.map((session) => (
              <Card key={session.id} variant="elevated">
                <CardContent className="p-6">
                  <span className="text-xs font-medium text-sage-500 uppercase tracking-wider">
                    {session.offering.category}
                  </span>
                  <h3 className="font-heading text-charcoal-700 text-xl mt-2 mb-3">
                    {session.title}
                  </h3>
                  <div className="space-y-2 text-sm text-charcoal-500">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} aria-hidden="true" />
                      <span>{formatDate(session.startTime)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span aria-hidden="true">🕐</span>
                      <span>{formatTime(session.startTime)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span aria-hidden="true">{session.mode === "ONLINE" ? "💻" : "📍"}</span>
                      <span>{session.mode === "ONLINE" ? "Online" : "In-Person"}</span>
                    </div>
                    {session.teacher && (
                      <p className="text-xs text-muted-foreground">with {session.teacher.name}</p>
                    )}
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {session.spotsLeft > 0 ? `${session.spotsLeft} spots left` : "Full"}
                    </p>
                    <Link href="/schedule">
                      <Button variant="outline" size="sm">View & Book</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            // Fallback static cards when no sessions are in DB
            [
              { title: "Morning Yoga Flow", category: "Yoga", day: "Mon / Wed / Fri", time: "[Time] IST", mode: "Online" },
              { title: "Breathwork & Pranayama", category: "Breathwork", day: "Tue & Thu", time: "[Time] IST", mode: "Online" },
              { title: "Guided Meditation", category: "Mindfulness", day: "Sunday", time: "[Time] IST", mode: "Online" },
            ].map((s) => (
              <Card key={s.title} variant="elevated">
                <CardContent className="p-6">
                  <span className="text-xs font-medium text-sage-500 uppercase tracking-wider">{s.category}</span>
                  <h3 className="font-heading text-charcoal-700 text-xl mt-2 mb-3">{s.title}</h3>
                  <div className="space-y-2 text-sm text-charcoal-500">
                    <div className="flex items-center gap-2"><Calendar size={14} aria-hidden="true" /><span>{s.day}</span></div>
                    <div className="flex items-center gap-2"><span aria-hidden="true">🕐</span><span>{s.time}</span></div>
                    <div className="flex items-center gap-2"><span aria-hidden="true">💻</span><span>{s.mode}</span></div>
                  </div>
                  <div className="mt-5">
                    <Link href="/schedule"><Button variant="outline" size="sm" className="w-full">View & Book</Button></Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function AboutTeacher() {
  return (
    <section
      className="section-padding bg-muted"
      aria-labelledby="teacher-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Photo placeholder */}
          <div
            className="aspect-[4/5] rounded-3xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #E8DFC8, #D9CDB4)" }}
            role="img"
            aria-label={`Photo of ${teacherConfig.name}`}
          >
            <div className="text-center">
              <div className="text-6xl mb-4" aria-hidden="true">🌿</div>
              <p className="text-charcoal-400 text-sm">[Teacher Photo]</p>
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-sage-500 font-medium mb-4">
              Your Guide
            </p>
            <h2
              id="teacher-heading"
              className="font-heading text-charcoal-700 mb-2"
            >
              {teacherConfig.name}
            </h2>
            <p className="text-charcoal-400 mb-6">{teacherConfig.title}</p>
            <p className="text-charcoal-500 leading-relaxed mb-6">
              {teacherConfig.shortBio}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {teacherConfig.specialties.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 bg-white rounded-full text-xs text-charcoal-500 border border-border"
                >
                  {s}
                </span>
              ))}
            </div>
            <Link href="/about">
              <Button variant="outline">
                Learn more
                <ArrowRight size={14} aria-hidden="true" />
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
    <section
      className="section-padding bg-white"
      aria-labelledby="community-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-sage-500 font-medium mb-4">
          Community
        </p>
        <h2 id="community-heading" className="font-heading text-charcoal-700 mb-6">
          Observe. Share. Learn.
        </h2>
        <p className="text-charcoal-500 max-w-xl mx-auto mb-10">
          A space for practitioners to ask questions, share experiences, and
          learn from each other. Not a platform for performance — a place for
          genuine sharing.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/community">
            <Button variant="outline">
              <Users size={16} aria-hidden="true" />
              Explore Community
            </Button>
          </Link>
          {siteConfig.whatsappCommunity !== "[WhatsApp Community Link]" && (
            <a
              href={siteConfig.whatsappCommunity}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary">Join WhatsApp Group</Button>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  // Placeholder — real testimonials to be added through admin panel
  const testimonials = [
    {
      content:
        "The 7-Day Journey changed how I understand yoga. I started noticing things I had always walked past without seeing.",
      author: "[Participant Name]",
      detail: "Completed the 7-Day Awareness Journey",
    },
    {
      content:
        "The breathwork sessions are genuinely different from anything else I've tried. Calm, grounded, no pressure.",
      author: "[Participant Name]",
      detail: "Breathwork participant",
    },
    {
      content:
        "The yoga classes feel accessible and thoughtful. I've been practicing for three months and the difference is real.",
      author: "[Participant Name]",
      detail: "Regular yoga student",
    },
  ];

  return (
    <section
      className="section-padding bg-muted"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-sage-500 font-medium mb-4">
            From Participants
          </p>
          <h2 id="testimonials-heading" className="font-heading text-charcoal-700">
            What people say
          </h2>
          <p className="text-xs text-muted-foreground mt-3">
            Placeholder testimonials — to be replaced with real ones.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <figure key={i} className="bg-white rounded-2xl p-6 border border-border">
              <blockquote>
                <p className="text-charcoal-500 italic leading-relaxed">
                  &ldquo;{t.content}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-4">
                <p className="font-medium text-sm text-charcoal-700">{t.author}</p>
                <p className="text-xs text-muted-foreground">{t.detail}</p>
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
      q: "Do I need to be flexible to start yoga?",
      a: "No. Flexibility is a result of practice, not a requirement for it. We welcome complete beginners.",
    },
    {
      q: "What is the 7-Day Awareness Journey?",
      a: "A free, self-paced journey to explore awareness through ordinary activities — starting with walking. It takes about 10 minutes a day.",
    },
    {
      q: "Are sessions available online?",
      a: "Yes. Most of our offerings are available online. Some in-person sessions are also offered depending on location.",
    },
    {
      q: "How do I book a private session?",
      a: "Get in touch through the contact page and we'll work out the details together.",
    },
    {
      q: "What language are sessions conducted in?",
      a: "Sessions are available in English, Hindi and Marathi. Please mention your preference when booking.",
    },
  ];

  return (
    <section
      className="section-padding bg-white"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-sage-500 font-medium mb-4">
            Questions
          </p>
          <h2 id="faq-heading" className="font-heading text-charcoal-700">
            Common questions
          </h2>
        </div>
        <dl className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q} className="border-b border-border pb-6 last:border-0">
              <dt className="font-heading text-charcoal-700 text-lg mb-2">{faq.q}</dt>
              <dd className="text-charcoal-500 leading-relaxed text-sm">{faq.a}</dd>
            </div>
          ))}
        </dl>
        <div className="text-center mt-10">
          <Link href="/faq">
            <Button variant="ghost">
              See all questions
              <ArrowRight size={14} aria-hidden="true" />
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
      className="section-padding"
      style={{ background: "linear-gradient(135deg, #FAF7F0 0%, #E8DFC8 100%)" }}
      aria-labelledby="cta-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-sage-500 font-medium mb-6">
          Begin
        </p>
        <h2
          id="cta-heading"
          className="font-heading text-charcoal-700 mb-6"
          style={{ fontStyle: "italic" }}
        >
          Yoga is a practice. Awareness is something we cultivate. And everyday
          life is where we get to practice.
        </h2>
        <p className="text-charcoal-500 mb-10 max-w-lg mx-auto">
          Whatever stage you're at — start where you are.
        </p>
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
          <Link href="/contact">
            <Button variant="ghost" size="lg">
              Get in touch
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Page ───────────────────────────────────────────────────────

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
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-forest focus:text-ivory focus:rounded-lg"
      >
        Skip to main content
      </a>
      <Hero />
      <Introduction />
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
