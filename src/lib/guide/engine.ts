import { db } from "@/lib/db";
import { formatDate, formatTime } from "@/lib/utils";
import { journeyConfig, siteConfig, teacherConfig } from "@/config/site";
import {
  flattenFaqs,
  guideQuickActions,
  isPlaceholderValue,
  practiceSummaries,
  schoolVoice,
} from "@/lib/guide/content";

export type GuideIntent =
  | "discover"
  | "daily_classes"
  | "session_details"
  | "upcoming"
  | "retreats"
  | "programs"
  | "booking"
  | "teacher"
  | "location"
  | "about_school"
  | "general_yoga"
  | "handoff"
  | "faq"
  | "fallback";

export interface GuideCard {
  id: string;
  type: "session" | "offering" | "retreat" | "program" | "faq";
  title: string;
  eyebrow?: string;
  description?: string;
  meta?: string[];
  href?: string;
  ctaLabel?: string;
}

export interface GuideAction {
  id: string;
  label: string;
  kind: "primary" | "secondary";
  href?: string;
  query?: string;
}

export interface GuideMessageInput {
  role: "user" | "assistant";
  text: string;
}

export interface GuideRequest {
  message: string;
  history?: GuideMessageInput[];
  lastCards?: GuideCard[];
  currentPath?: string;
}

export interface GuideReply {
  answer: string;
  intent: GuideIntent;
  cards: GuideCard[];
  ctas: GuideAction[];
  followUpQuestion?: string;
  knowledgeGap?: string;
  handoff?: boolean;
  sourceNote?: string;
}

interface SessionRecord {
  id: string;
  title: string;
  description: string | null;
  startTime: Date;
  endTime: Date;
  mode: string;
  location: string | null;
  capacity: number;
  enrolled: number;
  offering: {
    title: string;
    category: string;
    slug: string;
    shortDescription: string;
  };
  teacher: {
    name: string;
  } | null;
}

interface OfferingRecord {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  mode: string;
  level: string | null;
  durationMinutes: number | null;
  featured: boolean;
}

interface GuideKnowledge {
  sessions: SessionRecord[];
  offerings: OfferingRecord[];
  dataAvailable: boolean;
}

interface ConversationPreferences {
  beginner: boolean;
  preferredMode?: "ONLINE" | "OFFLINE";
  preferredTime?: "morning" | "afternoon" | "evening";
  interests: string[];
}

const GENERAL_YOGA_EXPLANATION =
  "More generally, yoga is a broad tradition that includes posture, breath, attention, and ways of relating to experience. It is not only exercise; it also includes practices for steadiness, awareness, and how we meet everyday life.";

export async function buildGuideReply(request: GuideRequest): Promise<GuideReply> {
  const message = request.message.trim();
  const history = request.history ?? [];
  const preferences = deriveConversationPreferences(history, message);
  const knowledge = await loadKnowledge();
  const intent = detectIntent(message);

  const reply = await answerByIntent({
    intent,
    message,
    history,
    lastCards: request.lastCards ?? [],
    preferences,
    knowledge,
  });

  logGuideEvents({
    message,
    intent: reply.intent,
    knowledgeGap: reply.knowledgeGap,
    handoff: reply.handoff,
    currentPath: request.currentPath,
  });

  return reply;
}

async function loadKnowledge(): Promise<GuideKnowledge> {
  try {
    const [sessions, offerings] = await Promise.all([
      db.session.findMany({
        where: {
          status: "SCHEDULED",
          startTime: { gte: new Date(Date.now() - 12 * 60 * 60 * 1000) },
        },
        include: {
          offering: {
            select: {
              title: true,
              category: true,
              slug: true,
              shortDescription: true,
            },
          },
          teacher: { select: { name: true } },
        },
        orderBy: { startTime: "asc" },
        take: 80,
      }),
      db.offering.findMany({
        where: { published: true },
        select: {
          id: true,
          title: true,
          slug: true,
          category: true,
          shortDescription: true,
          mode: true,
          level: true,
          durationMinutes: true,
          featured: true,
        },
        orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
        take: 50,
      }),
    ]);

    return {
      sessions,
      offerings,
      dataAvailable: true,
    };
  } catch {
    return {
      sessions: [],
      offerings: [],
      dataAvailable: false,
    };
  }
}

async function answerByIntent(args: {
  intent: GuideIntent;
  message: string;
  history: GuideMessageInput[];
  lastCards: GuideCard[];
  preferences: ConversationPreferences;
  knowledge: GuideKnowledge;
}): Promise<GuideReply> {
  switch (args.intent) {
    case "daily_classes":
      return answerDailyClasses(args.message, args.knowledge);
    case "session_details":
      return answerSessionDetails(args.message, args.knowledge, args.lastCards);
    case "teacher":
      return answerTeacher(args.message, args.knowledge, args.lastCards);
    case "location":
      return answerLocation(args.message, args.knowledge, args.lastCards);
    case "retreats":
      return answerRetreats(args.message, args.knowledge);
    case "programs":
      return answerPrograms(args.knowledge);
    case "booking":
      return answerBooking(args.message, args.knowledge, args.lastCards);
    case "about_school":
      return answerAboutSchool();
    case "general_yoga":
      return answerGeneralYoga();
    case "handoff":
      return answerHandoff(args.message);
    case "faq":
      return answerFaq(args.message);
    case "upcoming":
      return answerUpcoming(args.knowledge);
    case "discover":
      return answerDiscover(args.preferences, args.knowledge);
    case "fallback":
    default:
      return answerFallback(args.message, args.knowledge);
  }
}

function detectIntent(message: string): GuideIntent {
  const text = message.toLowerCase();

  if (/(payment|refund|charged|invoice|complaint|not working|can't log in|cannot log in|special accommodation|medical|injury|emergency|human)/.test(text)) {
    return "handoff";
  }

  if (/(what is yoga|explain yoga|meaning of yoga)/.test(text)) {
    return "general_yoga";
  }

  if (/(tell me about the school|about the school|school philosophy|your philosophy|approach|about sahaj)/.test(text)) {
    return "about_school";
  }

  if (/(retreat)/.test(text)) {
    return "retreats";
  }

  if (/(program|journey|7-day|7 day|workshop)/.test(text) && !/(today|tomorrow|class|session)/.test(text)) {
    return "programs";
  }

  if (/(today|tomorrow|tonight|this evening|morning class|evening class|schedule|what's happening|what is happening|classes today|sessions today|7 pm|7pm)/.test(text)) {
    return "daily_classes";
  }

  if (/(who teaches|teacher|instructor)/.test(text)) {
    return "teacher";
  }

  if (/(where is|where's|location|in-person|in person|online or in-person|online or in person)/.test(text)) {
    return "location";
  }

  if (/(book|register|sign up|join this|attend today|take me to registration)/.test(text)) {
    return "booking";
  }

  if (/(tell me about this|session details|how long is it|what should i bring|beginner friendly|this class|this session)/.test(text)) {
    return "session_details";
  }

  if (/(what's coming up|what is coming up|upcoming|next event|next session|special sessions)/.test(text)) {
    return "upcoming";
  }

  if (/(new to yoga|beginner|where should i start|start yoga|find a session|which class is right|what should i attend)/.test(text)) {
    return "discover";
  }

  if (/(do i need|what language|private session|cancellation policy|safe|expect)/.test(text)) {
    return "faq";
  }

  return "fallback";
}

function deriveConversationPreferences(history: GuideMessageInput[], latestMessage: string): ConversationPreferences {
  const combined = [...history, { role: "user" as const, text: latestMessage }]
    .filter((item) => item.role === "user")
    .map((item) => item.text.toLowerCase())
    .join(" \n ");

  const interests = [
    ["breathwork", /(breath|pranayama|breathwork)/],
    ["mindfulness", /(mindfulness|meditation|stillness)/],
    ["physical", /(physical|movement|asana|body|hatha|vinyasa)/],
    ["relaxation", /(relax|calm|stress|slow down)/],
    ["journey", /(journey|7-day|7 day|awareness)/],
  ]
    .filter(([, pattern]) => pattern.test(combined))
    .map(([label]) => label as string);

  return {
    beginner: /(complete beginner|beginner|new to yoga|just starting)/.test(combined),
    preferredMode: /online/.test(combined)
      ? "ONLINE"
      : /(in-person|in person|offline)/.test(combined)
        ? "OFFLINE"
        : undefined,
    preferredTime: /morning/.test(combined)
      ? "morning"
      : /afternoon/.test(combined)
        ? "afternoon"
        : /evening|tonight/.test(combined)
          ? "evening"
          : undefined,
    interests,
  };
}

function answerAboutSchool(): GuideReply {
  const teacherKnown = !isPlaceholderValue(teacherConfig.name) && !isPlaceholderValue(teacherConfig.bio);

  return {
    intent: "about_school",
    answer: `${schoolVoice.schoolSummary} ${schoolVoice.philosophy} ${teacherKnown ? `The teacher profile is published under ${teacherConfig.name}.` : `The school's teacher profile is not fully filled in on the current site, so I cannot reliably tell you more about the teacher yet.`}`,
    cards: practiceSummaries.slice(0, 4).map((item) => ({
      id: item.slug,
      type: item.slug === "journey" ? "program" : "offering",
      title: item.title,
      eyebrow: item.audience,
      description: item.summary,
      href: item.href,
      ctaLabel: "Explore",
    })),
    ctas: [
      action("about-school", "Learn About the School", "/about", "primary"),
      action("guide-programs", "Explore Programs", undefined, "secondary", "What programs does the school offer?"),
      action("guide-schedule", "Today's Classes", undefined, "secondary", "What's happening today?"),
    ],
    sourceNote: "From the school's website and current site content.",
  };
}

function answerGeneralYoga(): GuideReply {
  return {
    intent: "general_yoga",
    answer: `${GENERAL_YOGA_EXPLANATION}\n\nOn this school's website, yoga is described as more than what happens on the mat: a practice of movement, breath, and awareness brought into ordinary moments.`,
    cards: [
      {
        id: "school-approach",
        type: "offering",
        title: "How This School Approaches Yoga",
        eyebrow: "School-specific",
        description: schoolVoice.approach,
        href: "/about",
        ctaLabel: "Read more",
      },
    ],
    ctas: [
      action("school-approach", "How This School Approaches Yoga", undefined, "primary", "Tell me about the school."),
      action("beginner-start", "I'm New to Yoga", undefined, "secondary", "I'm new to yoga. What should I attend?"),
      action("today-classes", "Today's Classes", undefined, "secondary", "What's happening today?"),
    ],
    sourceNote: "General yoga explanation plus the school's own description of its approach.",
  };
}

function answerDailyClasses(message: string, knowledge: GuideKnowledge): GuideReply {
  if (!knowledge.dataAvailable) {
    return {
      intent: "daily_classes",
      answer:
        "I could not access the current schedule data right now, so I do not want to give you an unreliable answer.",
      cards: [],
      ctas: [
        action("full-schedule", "View Full Schedule", "/schedule", "primary"),
        action("contact-school", "Contact the School", "/contact", "secondary"),
      ],
      handoff: true,
      sourceNote: "Live schedule data was unavailable during this request.",
    };
  }

  const segment = detectTimeSegment(message);
  const requestedTime = extractRequestedTime(message);
  const targetKey = resolveDayKey(message, 0);
  const label = targetKey.offset === 1 ? "tomorrow" : "today";
  const daySessions = knowledge.sessions
    .filter((session) => getDateKey(session.startTime) === targetKey.dateKey)
    .filter((session) => (segment ? segmentMatches(session.startTime, segment) : true));

  if (requestedTime) {
    const matching = daySessions.filter((session) => isCloseToRequestedTime(session.startTime, requestedTime.hour24));
    if (matching.length > 0) {
      const cards = matching.slice(0, 3).map(toSessionCard);
      return {
        intent: "daily_classes",
        answer: `Based on the latest schedule on the website, there ${matching.length === 1 ? "is" : "are"} ${matching.length} session${matching.length === 1 ? "" : "s"} around ${requestedTime.label} ${label}. I cannot confirm live seat availability from chat, but I can take you to the booking flow.`,
        cards,
        ctas: [
          action("book-session", "Book a Session", "/schedule", "primary"),
          action("show-all", `All ${capitalize(label)}'s Classes`, undefined, "secondary", `Show me all ${label}'s classes.`),
          action("contact-school", "Contact the School", "/contact", "secondary"),
        ],
        sourceNote: "Based on the latest session data available on the website.",
      };
    }

    return {
      intent: "daily_classes",
      answer: `I could not find a session around ${requestedTime.label} ${label} on the current website schedule. I do not want to guess beyond what is listed.`,
      cards: daySessions.slice(0, 3).map(toSessionCard),
      ctas: [
        action("full-schedule", "View Full Schedule", "/schedule", "primary"),
        action("evening-classes", "Evening Classes", undefined, "secondary", `Show me ${label}'s evening classes.`),
        action("contact-school", "Contact the School", "/contact", "secondary"),
      ],
      knowledgeGap: "session_time_specific_availability",
      sourceNote: "Based on the latest session data available on the website.",
    };
  }

  if (daySessions.length === 0) {
    return {
      intent: "daily_classes",
      answer: `I could not find any ${segment ? `${segment} ` : ""}classes listed ${label} on the website right now.`,
      cards: knowledge.sessions.slice(0, 3).map(toSessionCard),
      ctas: [
        action("full-schedule", "View Full Schedule", "/schedule", "primary"),
        action("upcoming-sessions", "Upcoming Sessions", undefined, "secondary", "What's coming up?"),
        action("contact-school", "Contact the School", "/contact", "secondary"),
      ],
      knowledgeGap: `${label}_schedule_empty`,
      sourceNote: "Based on the latest session data available on the website.",
    };
  }

  const cards = daySessions.slice(0, 4).map(toSessionCard);
  const countText = segment ? `${segment} ${label}` : label;

  return {
    intent: "daily_classes",
    answer: `Here ${daySessions.length === 1 ? "is" : "are"} the ${countText} session${daySessions.length === 1 ? "" : "s"} I currently find on the website schedule.`,
    cards,
    ctas: [
      action("book-session", "Book a Session", "/schedule", "primary"),
      action("all-today", label === "today" ? "Tomorrow's Classes" : "Today's Classes", undefined, "secondary", label === "today" ? "What classes are happening tomorrow?" : "What's happening today?"),
      action("find-session", "Find a Session for Me", undefined, "secondary", "I'm new to yoga. What should I attend?"),
    ],
    sourceNote: "Based on the latest session data available on the website.",
  };
}

function answerUpcoming(knowledge: GuideKnowledge): GuideReply {
  const eventOfferings = knowledge.offerings.filter((item) =>
    ["WORKSHOP", "PROGRAM", "RETREAT", "JOURNEY"].includes(item.category)
  );

  if (eventOfferings.length > 0) {
    return {
      intent: "upcoming",
      answer: "Here is what currently looks most relevant or upcoming from the site's program and experience pages.",
      cards: eventOfferings.slice(0, 4).map((item) => ({
        id: item.id,
        type: item.category === "RETREAT" ? "retreat" : "program",
        title: item.title,
        eyebrow: item.category,
        description: item.shortDescription,
        meta: compact([item.mode, item.level ?? undefined, item.durationMinutes ? `${item.durationMinutes} min` : undefined]),
        href: `/${item.slug}`,
        ctaLabel: item.category === "RETREAT" ? "Explore Retreat" : "Learn More",
      })),
      ctas: [
        action("schedule", "View Schedule", "/schedule", "primary"),
        action("retreats", "Explore Retreats", undefined, "secondary", "Are there any retreats coming up?"),
        action("programs", "Explore Programs", undefined, "secondary", "What programs does the school offer?"),
      ],
      sourceNote: "From the website's current published offerings and experience pages.",
    };
  }

  if (knowledge.sessions.length > 0) {
    return {
      intent: "upcoming",
      answer: "I do not currently see separate upcoming workshops or retreat dates announced on the site, but these are the next scheduled sessions I can find.",
      cards: knowledge.sessions.slice(0, 4).map(toSessionCard),
      ctas: [
        action("full-schedule", "View Full Schedule", "/schedule", "primary"),
        action("retreats", "Retreat Details", undefined, "secondary", "Are there any retreats coming up?"),
        action("workshops", "Workshops & Programs", "/workshops", "secondary"),
      ],
      knowledgeGap: "upcoming_events_not_announced",
      sourceNote: "Based on the latest website schedule and published pages.",
    };
  }

  return {
    intent: "upcoming",
    answer: "I could not find currently announced upcoming sessions, workshops, or retreat dates on the website. I do not want to guess beyond what is published.",
    cards: [],
    ctas: [
      action("schedule", "View Schedule", "/schedule", "primary"),
      action("retreats", "Explore Retreats", "/retreats", "secondary"),
      action("contact", "Contact the School", "/contact", "secondary"),
    ],
    knowledgeGap: "upcoming_content_missing",
    sourceNote: "The current website does not publish upcoming event details I can verify.",
  };
}

function answerRetreats(message: string, knowledge: GuideKnowledge): GuideReply {
  const lower = message.toLowerCase();
  const asksDetail = /(cost|price|fee|accommodation|food|included|include|where|dates|when)/.test(lower);
  const retreatOfferings = knowledge.offerings.filter((item) => item.category === "RETREAT");

  if (asksDetail && retreatOfferings.length === 0) {
    let gap = "retreat_details_missing";
    let detail = "specific retreat details";

    if (lower.includes("accommodation")) {
      gap = "retreat_accommodation";
      detail = "accommodation details";
    } else if (/(cost|price|fee)/.test(lower)) {
      gap = "retreat_pricing";
      detail = "retreat pricing";
    } else if (/(food|included|include)/.test(lower)) {
      gap = "retreat_inclusions";
      detail = "what is included in the retreat";
    } else if (/(when|dates)/.test(lower)) {
      gap = "retreat_dates";
      detail = "upcoming retreat dates";
    }

    return {
      intent: "retreats",
      answer: `I could not find ${detail} on the school's website. The retreats page only says the next retreat is being planned, so I do not want to guess.`,
      cards: [
        {
          id: "retreats-coming-soon",
          type: "retreat",
          title: "Retreats coming soon",
          eyebrow: "Current website status",
          description: schoolVoice.retreats,
          href: "/retreats",
          ctaLabel: "Explore Retreats",
        },
      ],
      ctas: [
        action("retreat-contact", "Contact the School", "/contact?interest=Retreat", "primary"),
        action("retreat-page", "Retreat Details", "/retreats", "secondary"),
        action("schedule", "View Schedule", "/schedule", "secondary"),
      ],
      knowledgeGap: gap,
      handoff: true,
      sourceNote: "The retreats page currently says the next retreat is being planned.",
    };
  }

  if (retreatOfferings.length > 0) {
    return {
      intent: "retreats",
      answer: "Here are the retreat offerings I currently find published on the website.",
      cards: retreatOfferings.map((item) => ({
        id: item.id,
        type: "retreat",
        title: item.title,
        eyebrow: item.category,
        description: item.shortDescription,
        meta: compact([item.mode, item.level ?? undefined]),
        href: `/${item.slug}`,
        ctaLabel: "Explore Retreat",
      })),
      ctas: [
        action("retreat-register", "Registration", "/contact?interest=Retreat", "primary"),
        action("retreat-contact", "Contact the School", "/contact?interest=Retreat", "secondary"),
      ],
      sourceNote: "From the website's current retreat offering pages.",
    };
  }

  return {
    intent: "retreats",
    answer: "The website's retreats page says the next retreat is being planned, but I could not find currently announced retreat dates. If you want, I can take you to the interest form.",
    cards: [
      {
        id: "retreats-coming-soon",
        type: "retreat",
        title: "Retreats coming soon",
        eyebrow: "Current website status",
        description: schoolVoice.retreats,
        href: "/retreats",
        ctaLabel: "Explore Retreats",
      },
    ],
    ctas: [
      action("retreat-interest", "Express Interest", "/contact?interest=Retreat", "primary"),
      action("retreat-page", "Retreat Details", "/retreats", "secondary"),
      action("another-offering", "Explore Programs", undefined, "secondary", "What programs does the school offer?"),
    ],
    knowledgeGap: "retreat_dates",
    sourceNote: "The retreats page currently says the next retreat is being planned.",
  };
}

function answerPrograms(knowledge: GuideKnowledge): GuideReply {
  const curated = practiceSummaries.filter((item) => ["journey", "workshops", "retreats"].includes(item.slug));

  return {
    intent: "programs",
    answer: "The site currently points visitors toward the Sahaj Journey, workshops and programs, and future retreats as the deeper paths beyond regular sessions.",
    cards: curated.map((item) => ({
      id: item.slug,
      type: item.slug === "retreats" ? "retreat" : "program",
      title: item.title,
      eyebrow: item.audience,
      description: item.summary,
      href: item.href,
      ctaLabel: "Learn More",
    })),
    ctas: [
      action("journey-start", "Start the 7-Day Journey", "/yoga-beyond-the-mat", "primary"),
      action("workshops", "Program Details", "/workshops", "secondary"),
      action("retreats", "Explore Retreats", "/retreats", "secondary"),
    ],
    sourceNote: "From the website's program, journey, workshop, and retreat pages.",
  };
}

function answerDiscover(preferences: ConversationPreferences, knowledge: GuideKnowledge): GuideReply {
  const matchingOfferings = suggestOfferings(preferences);
  const recommendedSessions = knowledge.sessions
    .filter((session) => {
      if (preferences.preferredMode && session.mode !== preferences.preferredMode && session.mode !== "HYBRID") {
        return false;
      }
      if (preferences.preferredTime && !segmentMatches(session.startTime, preferences.preferredTime)) {
        return false;
      }
      if (preferences.interests.includes("breathwork") && session.offering.category !== "BREATHWORK") {
        return false;
      }
      if (preferences.interests.includes("mindfulness") && !["MINDFULNESS", "MEDITATION"].includes(session.offering.category)) {
        return false;
      }
      return true;
    })
    .slice(0, 3);

  const answer = preferences.beginner
    ? "If you are just beginning, the site suggests starting gently: a regular yoga session, breathwork, mindfulness, or the Sahaj Journey can all be good entry points depending on what you want from practice."
    : "I can help narrow this down from the site's current offerings based on the kind of practice you want right now.";

  const cards = recommendedSessions.length > 0
    ? recommendedSessions.map(toSessionCard)
    : matchingOfferings.map((item) => ({
        id: item.slug,
        type: item.slug === "journey" ? "program" : "offering",
        title: item.title,
        eyebrow: item.audience,
        description: item.summary,
        href: item.href,
        ctaLabel: "Explore",
      }));

  return {
    intent: "discover",
    answer,
    cards,
    ctas: [
      action("beginner-session", "Find a Beginner Session", undefined, "primary", "What classes are happening today?"),
      action("journey", "Start the 7-Day Journey", "/yoga-beyond-the-mat", "secondary"),
      action("schedule", "Today's Classes", undefined, "secondary", "What's happening today?"),
      action("clarify-time", preferences.preferredTime ? "View Full Schedule" : "Evening Options", preferences.preferredTime ? "/schedule" : undefined, "secondary", preferences.preferredTime ? undefined : "Show me evening classes."),
    ],
    followUpQuestion: preferences.preferredTime
      ? undefined
      : "Are you looking for a morning class, an evening class, or a slower self-paced starting point like the 7-day journey?",
    sourceNote: "From the website's current offerings, journey page, and live schedule when available.",
  };
}

function answerBooking(message: string, knowledge: GuideKnowledge, lastCards: GuideCard[]): GuideReply {
  const activeSession = resolveSessionFromContext(message, knowledge.sessions, lastCards);

  if (activeSession) {
    return {
      intent: "booking",
      answer: `This chat cannot complete the booking directly, but the website does support booking through the schedule once you sign in. For ${activeSession.title}, I can take you to the schedule and booking flow.`,
      cards: [toSessionCard(activeSession)],
      ctas: [
        action("book-now", "Book / Register", "/schedule", "primary"),
        action("login", "Sign In", "/login?callbackUrl=/dashboard/sessions", "secondary"),
        action("another-session", "View Schedule", "/schedule", "secondary"),
      ],
      sourceNote: "Booking on the site happens through the account and schedule flow.",
    };
  }

  return {
    intent: "booking",
    answer: "According to the website, booking happens after you create an account, browse the schedule, and reserve the session you want. Confirmation details are then sent by email.",
    cards: [],
    ctas: [
      action("view-schedule", "View Schedule", "/schedule", "primary"),
      action("sign-up", "Create an Account", "/signup?redirect=/dashboard/sessions", "secondary"),
      action("private-session", "Ask About a Private Session", "/contact?interest=Private%20Session", "secondary"),
    ],
    sourceNote: "From the website's booking flow and FAQ content.",
  };
}

function answerTeacher(message: string, knowledge: GuideKnowledge, lastCards: GuideCard[]): GuideReply {
  const session = resolveSessionFromContext(message, knowledge.sessions, lastCards);

  if (session?.teacher?.name) {
    return {
      intent: "teacher",
      answer: `${session.title} is currently listed with ${session.teacher.name} on the website schedule.`,
      cards: [toSessionCard(session)],
      ctas: [
        action("view-schedule", "View Schedule", "/schedule", "primary"),
        action("session-details", "Session Details", undefined, "secondary", `Tell me about ${session.title}.`),
        action("contact", "Contact the School", "/contact", "secondary"),
      ],
      sourceNote: "From the website's current session schedule.",
    };
  }

  if (!isPlaceholderValue(teacherConfig.name)) {
    return {
      intent: "teacher",
      answer: `The site's teacher page currently lists ${teacherConfig.name} as the teacher profile available.`,
      cards: [
        {
          id: "teacher-profile",
          type: "offering",
          title: teacherConfig.name,
          eyebrow: teacherConfig.title,
          description: isPlaceholderValue(teacherConfig.shortBio) ? undefined : teacherConfig.shortBio,
          href: "/about",
          ctaLabel: "About the Teacher",
        },
      ],
      ctas: [
        action("about-teacher", "About the Teacher", "/about", "primary"),
        action("schedule", "View Schedule", "/schedule", "secondary"),
      ],
      sourceNote: "From the website's teacher and about content.",
    };
  }

  return {
    intent: "teacher",
    answer: "I could not reliably identify a teacher from the current site content. The teacher profile on the site is not fully filled in yet, so I do not want to guess.",
    cards: [],
    ctas: [
      action("contact-school", "Contact the School", "/contact", "primary"),
      action("view-schedule", "View Schedule", "/schedule", "secondary"),
    ],
    knowledgeGap: "teacher_profile_missing",
    handoff: true,
    sourceNote: "The current teacher information on the website is incomplete.",
  };
}

function answerLocation(message: string, knowledge: GuideKnowledge, lastCards: GuideCard[]): GuideReply {
  const session = resolveSessionFromContext(message, knowledge.sessions, lastCards);

  if (session) {
    const locationText = session.mode === "ONLINE"
      ? "This session is listed as online on the website schedule."
      : session.location
        ? `This session is listed at ${session.location}.`
        : "This session is marked as in-person or hybrid, but the specific location is not listed on the current schedule entry.";

    return {
      intent: "location",
      answer: locationText,
      cards: [toSessionCard(session)],
      ctas: [
        action("view-schedule", "View Schedule", "/schedule", "primary"),
        action("contact-school", "Contact the School", "/contact", "secondary"),
      ],
      knowledgeGap: session.mode !== "ONLINE" && !session.location ? "session_location_missing" : undefined,
      sourceNote: "From the website's current session schedule.",
    };
  }

  if (!isPlaceholderValue(siteConfig.location)) {
    return {
      intent: "location",
      answer: `The site lists ${siteConfig.location} as the school location, and it also says all sessions are available online with some in-person options confirmed directly with the school.`,
      cards: [],
      ctas: [
        action("contact-school", "Contact the School", "/contact", "primary"),
        action("view-schedule", "View Schedule", "/schedule", "secondary"),
      ],
      sourceNote: "From the website's contact and schedule pages.",
    };
  }

  return {
    intent: "location",
    answer: "The website says all sessions are available online, and some in-person details are confirmed directly with the school. I could not find a confirmed public location on the current site.",
    cards: [],
    ctas: [
      action("contact-school", "Contact the School", "/contact", "primary"),
      action("full-schedule", "View Schedule", "/schedule", "secondary"),
    ],
    knowledgeGap: "school_location_missing",
    handoff: true,
    sourceNote: "The current site location details are incomplete.",
  };
}

function answerSessionDetails(message: string, knowledge: GuideKnowledge, lastCards: GuideCard[]): GuideReply {
  const session = resolveSessionFromContext(message, knowledge.sessions, lastCards);

  if (session) {
    const beginnerFriendly = /beginner|gentle|basics|foundations/i.test(
      `${session.title} ${session.description ?? ""} ${session.offering.shortDescription}`
    );

    return {
      intent: "session_details",
      answer: `${session.title} is currently listed as a ${session.offering.category.toLowerCase()} session${session.description ? `: ${session.description}` : ""} ${beginnerFriendly ? "It looks reasonably beginner-friendly from the wording on the site." : "The site does not explicitly label it as beginner-friendly, so I would treat that as something to confirm if it matters to you."}`,
      cards: [toSessionCard(session)],
      ctas: [
        action("book-session", "Book / Register", "/schedule", "primary"),
        action("teacher", "About the Teacher", undefined, "secondary", `Who teaches ${session.title}?`),
        action("location", "Where Is It?", undefined, "secondary", `Where is ${session.title}?`),
      ],
      sourceNote: "From the website's current schedule and linked offering data.",
    };
  }

  return answerFallback(message, knowledge);
}

function answerFaq(message: string): GuideReply {
  const faq = findRelevantFaq(message);

  if (faq) {
    return {
      intent: "faq",
      answer: faq.a,
      cards: [
        {
          id: faq.q,
          type: "faq",
          title: faq.q,
          eyebrow: faq.category,
          description: faq.a,
          href: "/faq",
          ctaLabel: "View FAQ",
        },
      ],
      ctas: [
        action("faq-page", "View FAQ", "/faq", "primary"),
        action("contact", "Contact the School", "/contact", "secondary"),
      ],
      sourceNote: "From the website's FAQ page.",
    };
  }

  return answerFallback(message, { sessions: [], offerings: [], dataAvailable: true });
}

function answerHandoff(message: string): GuideReply {
  const lower = message.toLowerCase();
  let gap = "human_support";
  let answer = "This is something I would recommend confirming directly with the school rather than guessing here.";

  if (/(payment|refund|charged|invoice)/.test(lower)) {
    gap = "payment_support";
    answer = "For payment, refund, or charge issues, I would recommend contacting the school directly. I do not want to guess about account or payment handling from chat.";
  } else if (/(medical|injury|pregnan|blood pressure|anxiety|depression|pain)/.test(lower)) {
    gap = "medical_handoff";
    answer = "Yoga may support general wellbeing, but this is not a substitute for medical advice. For a health-specific question, please consult a qualified healthcare professional and confirm any practice choices directly with the school.";
  } else if (/(special accommodation|accessibility|access)/.test(lower)) {
    gap = "special_accommodation";
    answer = "That is best confirmed directly with the school so you can get a reliable answer about accommodation or accessibility.";
  }

  return {
    intent: "handoff",
    answer,
    cards: [],
    ctas: [
      action("contact-school", "Contact the School", "/contact", "primary"),
      action("faq-page", "View FAQ", "/faq", "secondary"),
    ],
    knowledgeGap: gap,
    handoff: true,
    sourceNote: "This request needs human confirmation rather than an inferred answer.",
  };
}

function answerFallback(message: string, knowledge: GuideKnowledge): GuideReply {
  const faq = findRelevantFaq(message);
  if (faq) return answerFaq(message);

  const offeringMatch = findOfferingMatch(message, knowledge.offerings);
  if (offeringMatch) {
    return {
      intent: "fallback",
      answer: `${offeringMatch.title} is currently described on the site as: ${offeringMatch.shortDescription}`,
      cards: [
        {
          id: offeringMatch.id,
          type: ["RETREAT", "PROGRAM", "JOURNEY", "WORKSHOP"].includes(offeringMatch.category) ? "program" : "offering",
          title: offeringMatch.title,
          eyebrow: offeringMatch.category,
          description: offeringMatch.shortDescription,
          meta: compact([offeringMatch.mode, offeringMatch.level ?? undefined, offeringMatch.durationMinutes ? `${offeringMatch.durationMinutes} min` : undefined]),
          href: `/${offeringMatch.slug}`,
          ctaLabel: "Explore",
        },
      ],
      ctas: [
        action("explore-offering", "Explore This Offering", `/${offeringMatch.slug}`, "primary"),
        action("schedule", "View Schedule", "/schedule", "secondary"),
      ],
      sourceNote: "From the website's published offering content.",
    };
  }

  return {
    intent: "fallback",
    answer: "I could not find a reliable answer to that in the current site content, and I do not want to guess. I can help you explore classes, programs, retreats, or contact the school instead.",
    cards: practiceSummaries.slice(0, 3).map((item) => ({
      id: item.slug,
      type: item.slug === "journey" ? "program" : "offering",
      title: item.title,
      eyebrow: item.audience,
      description: item.summary,
      href: item.href,
      ctaLabel: "Explore",
    })),
    ctas: [
      action("today-classes", "Today's Classes", undefined, "primary", "What's happening today?"),
      action("programs", "Explore Programs", undefined, "secondary", "What programs does the school offer?"),
      action("contact", "Contact the School", "/contact", "secondary"),
    ],
    knowledgeGap: "unmatched_query",
    sourceNote: "No matching answer was found in the current site content.",
  };
}

function toSessionCard(session: SessionRecord): GuideCard {
  const spotsLeft = Math.max(0, session.capacity - session.enrolled);

  return {
    id: session.id,
    type: "session",
    title: session.title,
    eyebrow: session.offering.category,
    description: session.description ?? session.offering.shortDescription,
    meta: compact([
      formatDate(session.startTime),
      formatTime(session.startTime, siteConfig.timezone),
      session.mode === "ONLINE" ? "Online" : session.location ?? "In-person details not listed",
      session.teacher?.name ? `with ${session.teacher.name}` : undefined,
      spotsLeft > 0 ? `${spotsLeft} spots left` : "Full",
    ]),
    href: "/schedule",
    ctaLabel: "View Details",
  };
}

function suggestOfferings(preferences: ConversationPreferences) {
  if (preferences.interests.includes("breathwork")) {
    return practiceSummaries.filter((item) => ["breathwork", "journey"].includes(item.slug));
  }

  if (preferences.interests.includes("mindfulness")) {
    return practiceSummaries.filter((item) => ["mindfulness", "journey"].includes(item.slug));
  }

  if (preferences.beginner) {
    return practiceSummaries.filter((item) => ["yoga", "journey", "mindfulness"].includes(item.slug));
  }

  return practiceSummaries.filter((item) => ["yoga", "breathwork", "mindfulness"].includes(item.slug));
}

function resolveSessionFromContext(message: string, sessions: SessionRecord[], lastCards: GuideCard[]) {
  const exactByMessage = findSessionMatch(message, sessions);
  if (exactByMessage) return exactByMessage;

  if (/(this class|this session|it|that class|that session)/i.test(message)) {
    const activeCard = lastCards.find((card) => card.type === "session");
    if (activeCard) {
      return sessions.find((session) => session.id === activeCard.id) ?? null;
    }
  }

  return null;
}

function findSessionMatch(message: string, sessions: SessionRecord[]) {
  const query = message.toLowerCase();
  return sessions.find((session) => query.includes(session.title.toLowerCase()));
}

function findOfferingMatch(message: string, offerings: OfferingRecord[]) {
  const query = message.toLowerCase();
  return offerings.find((offering) =>
    query.includes(offering.title.toLowerCase()) ||
    query.includes(offering.slug.toLowerCase()) ||
    query.includes(offering.category.toLowerCase())
  );
}

function findRelevantFaq(message: string) {
  const query = message.toLowerCase();
  return flattenFaqs().find((faq) => {
    const haystack = `${faq.q} ${faq.a} ${faq.category}`.toLowerCase();
    return query.split(/\s+/).some((word) => word.length > 3 && haystack.includes(word));
  });
}

function detectTimeSegment(message: string): "morning" | "afternoon" | "evening" | undefined {
  const text = message.toLowerCase();
  if (text.includes("morning")) return "morning";
  if (text.includes("afternoon")) return "afternoon";
  if (text.includes("evening") || text.includes("tonight")) return "evening";
  return undefined;
}

function extractRequestedTime(message: string) {
  const match = message.toLowerCase().match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/);
  if (!match) return null;

  const hour = Number(match[1]);
  const minutes = Number(match[2] ?? 0);
  const meridiem = match[3];
  const hour24 = meridiem === "pm" && hour < 12 ? hour + 12 : meridiem === "am" && hour === 12 ? 0 : hour;

  return {
    hour24,
    minutes,
    label: `${hour}${minutes ? `:${String(minutes).padStart(2, "0")}` : ""} ${meridiem.toUpperCase()}`,
  };
}

function resolveDayKey(message: string, fallbackOffset: number) {
  const offset = /tomorrow/.test(message.toLowerCase()) ? 1 : fallbackOffset;
  const now = new Date();
  const target = new Date(now.getTime() + offset * 24 * 60 * 60 * 1000);

  return {
    offset,
    dateKey: getDateKey(target),
  };
}

function getDateKey(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: siteConfig.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function getHourInTimezone(date: Date) {
  return Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: siteConfig.timezone,
      hour: "2-digit",
      hour12: false,
    }).format(date)
  );
}

function segmentMatches(date: Date, segment: "morning" | "afternoon" | "evening") {
  const hour = getHourInTimezone(date);
  if (segment === "morning") return hour < 12;
  if (segment === "afternoon") return hour >= 12 && hour < 17;
  return hour >= 17;
}

function isCloseToRequestedTime(date: Date, hour24: number) {
  const hour = getHourInTimezone(date);
  return Math.abs(hour - hour24) <= 1;
}

function action(id: string, label: string, href: string | undefined, kind: "primary" | "secondary", query?: string): GuideAction {
  return { id, label, href, kind, query };
}

function compact(values: Array<string | undefined>) {
  return values.filter(Boolean) as string[];
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function logGuideEvents(input: {
  message: string;
  intent: GuideIntent;
  knowledgeGap?: string;
  handoff?: boolean;
  currentPath?: string;
}) {
  const baseEvent = db.analyticsEvent.create({
    data: {
      event: "guide_question_answered",
      page: input.currentPath ?? "/guide",
      properties: {
        intent: input.intent,
        prompt: input.message.slice(0, 300),
      },
    },
  });

  const extraEvents = [] as Array<Promise<unknown>>;

  if (input.knowledgeGap) {
    extraEvents.push(
      db.analyticsEvent.create({
        data: {
          event: "guide_knowledge_gap",
          page: input.currentPath ?? "/guide",
          properties: {
            gap: input.knowledgeGap,
            intent: input.intent,
            prompt: input.message.slice(0, 300),
          },
        },
      })
    );
  }

  if (input.handoff) {
    extraEvents.push(
      db.analyticsEvent.create({
        data: {
          event: "guide_handoff",
          page: input.currentPath ?? "/guide",
          properties: {
            intent: input.intent,
            prompt: input.message.slice(0, 300),
          },
        },
      })
    );
  }

  Promise.allSettled([baseEvent, ...extraEvents]).catch(() => {});
}

export function getGuideHomeActions() {
  return guideQuickActions;
}