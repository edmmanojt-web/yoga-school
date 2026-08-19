/**
 * Shared TypeScript types for the Yoga School platform.
 */

// ─── API Response ──────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export function apiSuccess<T>(data: T, message?: string): ApiResponse<T> {
  return { success: true, data, message };
}

export function apiError(error: string): ApiResponse<never> {
  return { success: false, error };
}

// ─── User ──────────────────────────────────────────────────────

export interface UserSession {
  id: string;
  name?: string | null;
  email: string;
  role: "VISITOR" | "USER" | "TEACHER" | "ADMIN";
  image?: string | null;
  preferredLanguage: "en" | "hi" | "mr";
}

// ─── Journey ───────────────────────────────────────────────────

export interface JourneyDayData {
  id: string;
  dayNumber: number;
  title: string;
  subtitle?: string | null;
  theme?: string | null;
  intention: string;
  practiceTitle: string;
  practiceContent: string;
  observationNote: string;
  durationMinutes: number;
  imageUrl?: string | null;
  polls: PollData[];
}

export interface PollData {
  id: string;
  question: string;
  sortOrder: number;
  options: PollOptionData[];
  userResponse?: string | null; // optionId if already answered
}

export interface PollOptionData {
  id: string;
  text: string;
  sortOrder: number;
}

export interface JourneyProgress {
  enrollmentId: string;
  journeyId: string;
  startedAt: Date;
  completedDays: number[];
  currentDay: number | null;
  isCompleted: boolean;
}

// ─── Offerings ─────────────────────────────────────────────────

export interface OfferingSummary {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  imageUrl?: string | null;
  mode: string;
  level?: string | null;
  durationMinutes?: number | null;
  featured: boolean;
}

// ─── Sessions ──────────────────────────────────────────────────

export interface SessionSummary {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  mode: string;
  capacity: number;
  enrolled: number;
  status: string;
  teacher?: { name: string } | null;
  offering: { title: string; category: string };
}

// ─── Pagination ────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─── Languages ─────────────────────────────────────────────────

export type SupportedLanguage = "en" | "hi" | "mr";

export const languageNames: Record<SupportedLanguage, string> = {
  en: "English",
  hi: "हिन्दी",
  mr: "मराठी",
};
