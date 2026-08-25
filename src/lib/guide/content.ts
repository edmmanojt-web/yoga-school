export interface GuideFaqItem {
  q: string;
  a: string;
}

export interface GuideFaqSection {
  category: string;
  questions: GuideFaqItem[];
}

export interface GuidePracticeSummary {
  slug: string;
  title: string;
  audience: string;
  summary: string;
  href: string;
}

export const faqSections: GuideFaqSection[] = [
  {
    category: "General",
    questions: [
      {
        q: "Do I need any experience to join?",
        a: "No. We welcome complete beginners. All sessions are designed to be accessible regardless of your experience level.",
      },
      {
        q: "Do I need to be flexible?",
        a: "No. Flexibility is a result of practice, not a requirement for it. You can start exactly where you are.",
      },
      {
        q: "What language are sessions conducted in?",
        a: "Sessions are available in English, Hindi and Marathi. Please mention your preferred language when you sign up or get in touch.",
      },
    ],
  },
  {
    category: "Yoga",
    questions: [
      {
        q: "What do I need for an online yoga class?",
        a: "A quiet space, a yoga mat or any comfortable surface, comfortable clothing, and a stable internet connection.",
      },
      {
        q: "How is yoga different from stretching?",
        a: "Yoga includes movement and stretching, but it also includes breath awareness, body awareness, and over time a way of relating to experience that goes beyond the mat.",
      },
    ],
  },
  {
    category: "Breathwork",
    questions: [
      {
        q: "Is breathwork safe?",
        a: "Most breathwork practices are safe for healthy adults. If you have a cardiovascular condition, epilepsy, pregnancy, or other medical conditions, please consult your doctor before joining. These sessions are not medical treatment.",
      },
      {
        q: "What can I expect in a breathwork session?",
        a: "You will be guided through one or more breathing techniques. Sessions are calm and grounded. You may feel tingling, light-headedness, or emotional release. You are always in control.",
      },
    ],
  },
  {
    category: "7-Day Journey",
    questions: [
      {
        q: "What is the 7-Day Awareness Journey?",
        a: "A free, self-paced exploration of awareness through ordinary activities, starting with walking. Each day introduces a short practice that takes about 10 minutes.",
      },
      {
        q: "Is it really free?",
        a: "Yes. The 7-Day Journey is completely free. You just need to create an account.",
      },
      {
        q: "What if I miss a day?",
        a: "That is completely fine. There are no streaks and no penalties. You continue from where you left off.",
      },
      {
        q: "Are my reflections private?",
        a: "Yes. All reflections are private by default. You can choose to share a reflection with the community, but that is always your choice.",
      },
    ],
  },
  {
    category: "Booking & Sessions",
    questions: [
      {
        q: "How do I book a session?",
        a: "Create an account, browse the schedule, and book the session you want. You will receive confirmation details by email.",
      },
      {
        q: "Can I book a private session?",
        a: "Yes. Private sessions are available for yoga, breathwork, and mindfulness. Please get in touch through the contact page.",
      },
      {
        q: "What is the cancellation policy?",
        a: "The current website does not list a cancellation policy yet.",
      },
    ],
  },
];

export const practiceSummaries: GuidePracticeSummary[] = [
  {
    slug: "yoga",
    title: "Yoga",
    audience: "Beginners through regular practitioners",
    summary:
      "Yoga here is described as a practice of movement, breath, and awareness, offered online and in person.",
    href: "/yoga",
  },
  {
    slug: "breathwork",
    title: "Breathwork",
    audience: "Anyone wanting guided breath awareness",
    summary:
      "Breathwork sessions are calm and grounded, with attention on using the breath as an anchor to this moment.",
    href: "/breathwork",
  },
  {
    slug: "mindfulness",
    title: "Mindfulness & Meditation",
    audience: "Anyone wanting inner observation and steadiness",
    summary:
      "Mindfulness here is framed as learning to notice what is happening without trying to stop thinking.",
    href: "/mindfulness",
  },
  {
    slug: "journey",
    title: "The Sahaj Journey",
    audience: "People wanting a gentle, structured starting point",
    summary:
      "The journey is a free 7-day path from body, breath, and mind toward experience, designed to fit into ordinary life.",
    href: "/yoga-beyond-the-mat",
  },
  {
    slug: "workshops",
    title: "Workshops & Programs",
    audience: "Students wanting deeper exploration",
    summary:
      "Workshops and programs are positioned as focused, multi-day explorations for going deeper into practice.",
    href: "/workshops",
  },
  {
    slug: "retreats",
    title: "Retreats",
    audience: "People seeking immersive, in-person time away",
    summary:
      "Retreats are described as small, unhurried, and grounded in the same philosophy as the rest of the school, but no upcoming dates are currently published.",
    href: "/retreats",
  },
];

export const schoolVoice = {
  welcome: "Welcome. I can help you explore sessions, programs, retreats, and the school's approach without making you dig through the site.",
  homeTitle: "Explore Your Yoga Journey",
  homeSubtitle:
    "Answers come from the site's current classes, offerings, journey pages, and FAQs. If something is missing, I will say so.",
  schoolSummary:
    "SAHAJ presents itself as a traditional yoga school offering yoga, breathwork, mindfulness, meditation, and a 7-day inner journey online and in person.",
  philosophy:
    "The school's central idea is that yoga is not only something practiced on a mat. It is the quality of awareness brought to ordinary moments.",
  approach:
    "The site describes a welcoming, non-one-size-fits-all approach: some people come for movement, some for calm, and some out of curiosity. The common thread is cultivating awareness.",
  retreats:
    "The retreats page says the next retreat is being planned and invites visitors to express interest when dates are announced.",
};

export const guideQuickActions = [
  { label: "Today's Classes", query: "What's happening today?" },
  { label: "Upcoming Sessions", query: "What's coming up?" },
  { label: "Explore Retreats", query: "Are there any retreats coming up?" },
  { label: "Find a Session for Me", query: "I'm new to yoga. What should I attend?" },
  { label: "Explore Programs", query: "What programs does the school offer?" },
  { label: "Ask About the School", query: "Tell me about the school." },
];

export function isPlaceholderValue(value: string | null | undefined): boolean {
  if (!value) return true;

  const trimmed = value.trim();
  return (
    !trimmed ||
    trimmed.startsWith("[") ||
    trimmed.includes("example.com") ||
    trimmed.toLowerCase().includes("placeholder")
  );
}

export function flattenFaqs() {
  return faqSections.flatMap((section) =>
    section.questions.map((question) => ({
      category: section.category,
      ...question,
    }))
  );
}