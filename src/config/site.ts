/**
 * Central application configuration.
 * Replace placeholder values with real content before going live.
 */

export const siteConfig = {
  name: "[School Name]",
  tagline: "Yoga • Breath • Awareness",
  description:
    "Explore yoga, breathwork and mindfulness as practices for becoming more aware — on the mat and in everyday life.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ogImage: "/og-image.jpg",

  // Contact & Social — replace with real values
  email: "hello@example.com",
  phone: "[Phone Number]",
  whatsapp: "[WhatsApp Number]",
  instagram: "[Instagram Handle]",
  whatsappCommunity: "[WhatsApp Community Link]",

  // Location — replace with real value
  location: "[Location]",
  timezone: "Asia/Kolkata",

  // Languages supported
  languages: ["en", "hi", "mr"] as const,
  defaultLanguage: "en" as const,
} as const;

export const teacherConfig = {
  name: "[Teacher Name]",
  title: "[Teacher Title / Designation]",
  shortBio: "[A short, warm introduction to the teacher.]",
  bio: "[Full teacher bio — background, approach, philosophy.]",
  photoUrl: null as string | null,
  certifications: [] as string[],
  specialties: ["Yoga", "Breathwork", "Mindfulness"],
} as const;

export const journeyConfig = {
  slug: "7-day-awareness-journey",
  title: "Yoga Beyond the Mat",
  subtitle: "A 7-Day Awareness Journey",
  tagline: "What if yoga didn't begin on the mat?",
  description:
    "A simple 7-day experiment to notice how you think, move, eat, work and respond — without adding another hour to your day.",
  days: [
    { number: 1, title: "Where Is Your Mind?", theme: "Mind", durationMinutes: 10 },
    { number: 2, title: "Notice the Body", theme: "Body", durationMinutes: 10 },
    { number: 3, title: "Come Back to the Breath", theme: "Breath", durationMinutes: 10 },
    { number: 4, title: "Wake Up Your Senses", theme: "Senses", durationMinutes: 10 },
    { number: 5, title: "Notice Distraction", theme: "Distraction", durationMinutes: 10 },
    { number: 6, title: "Experience Presence", theme: "Presence", durationMinutes: 15 },
    { number: 7, title: "Look Back", theme: "Reflection", durationMinutes: 15 },
  ],
} as const;

export const offeringCategories = [
  { key: "YOGA", label: "Yoga", slug: "yoga", icon: "🧘" },
  { key: "BREATHWORK", label: "Breathwork", slug: "breathwork", icon: "💨" },
  { key: "MINDFULNESS", label: "Mindfulness", slug: "mindfulness", icon: "🌿" },
  { key: "MEDITATION", label: "Meditation", slug: "meditation", icon: "🕯️" },
  { key: "JOURNEY", label: "Yoga Beyond the Mat", slug: "yoga-beyond-the-mat", icon: "🚶" },
  { key: "WORKSHOP", label: "Workshops", slug: "workshops", icon: "📚" },
  { key: "PROGRAM", label: "Programs", slug: "programs", icon: "📋" },
  { key: "RETREAT", label: "Retreats", slug: "retreats", icon: "🌄" },
] as const;

export const navLinks = [
  { label: "Offerings", href: "/offerings" },
  { label: "Yoga", href: "/yoga" },
  { label: "Breathwork", href: "/breathwork" },
  { label: "Mindfulness", href: "/mindfulness" },
  { label: "Beyond the Mat", href: "/yoga-beyond-the-mat" },
  { label: "Workshops", href: "/workshops" },
  { label: "Schedule", href: "/schedule" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
];

export const contactInterests = [
  "Yoga",
  "Breathwork",
  "Mindfulness",
  "Meditation",
  "Private Session",
  "Workshop",
  "Program",
  "Retreat",
  "Yoga Beyond the Mat",
  "Other",
] as const;

export const sessionModeLabels: Record<string, string> = {
  ONLINE: "Online",
  OFFLINE: "In-Person",
  HYBRID: "Online & In-Person",
};
