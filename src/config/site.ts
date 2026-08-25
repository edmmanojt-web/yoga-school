/**
 * Central application configuration.
 * Replace placeholder values with real content before going live.
 */

export const siteConfig = {
  name: "SAHAJ",
  tagline: "Traditional Yoga School",
  description:
    "From Practice to Experience. Traditional yoga for the inner journey — Hatha, Pranayama, Meditation and Sadhana, guided progressively from body to experience.",
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
  slug: "sahaj-journey",
  title: "The Sahaj Journey",
  subtitle: "From Practice to Experience — 7 Days",
  tagline: "Yoga is not something to achieve. It is something to experience.",
  description:
    "A 7-day inner journey through the traditional yogic framework — beginning with the body, moving through breath and mind, and arriving at experience. Ten minutes a day. No beliefs required.",
  days: [
    { number: 1, title: "Sharira — Body", theme: "Body", durationMinutes: 10 },
    { number: 2, title: "Prana — Breath", theme: "Breath", durationMinutes: 10 },
    { number: 3, title: "Manas — Mind", theme: "Mind", durationMinutes: 10 },
    { number: 4, title: "Dharana — Awareness", theme: "Awareness", durationMinutes: 10 },
    { number: 5, title: "Sadhana — Practice", theme: "Practice", durationMinutes: 15 },
    { number: 6, title: "Mouna — Silence", theme: "Silence", durationMinutes: 15 },
    { number: 7, title: "Anubhava — Experience", theme: "Experience", durationMinutes: 15 },
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
  { label: "Schedule", href: "/schedule" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
];

export const practicesLinks = [
  { label: "Yoga", href: "/yoga", desc: "Movement & posture" },
  { label: "Breathwork", href: "/breathwork", desc: "Pranayama & breath" },
  { label: "Mindfulness", href: "/mindfulness", desc: "Meditation & awareness" },
  { label: "Workshops", href: "/workshops", desc: "Deeper explorations" },
  { label: "Retreats", href: "/retreats", desc: "Immersive time away" },
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
