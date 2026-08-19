import { z } from "zod";

// ─── Auth ──────────────────────────────────────────────────────

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100)
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  preferredLanguage: z.enum(["en", "hi", "mr"]).default("en"),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// ─── Profile ───────────────────────────────────────────────────

export const profileUpdateSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  bio: z.string().max(500).optional(),
  location: z.string().max(200).optional(),
  timezone: z.string().optional(),
  phone: z.string().max(20).optional(),
});

// ─── Contact ───────────────────────────────────────────────────

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().max(20).optional(),
  interest: z.string().min(1, "Please select your interest"),
  preferredLanguage: z.enum(["en", "hi", "mr"]).optional(),
  message: z.string().min(10, "Please tell us a bit more").max(2000),
});

// ─── Booking ───────────────────────────────────────────────────

export const createBookingSchema = z.object({
  sessionId: z.string().cuid("Invalid session"),
  notes: z.string().max(500).optional(),
});

export const cancelBookingSchema = z.object({
  bookingId: z.string().cuid("Invalid booking"),
});

// ─── Poll ──────────────────────────────────────────────────────

export const pollResponseSchema = z.object({
  pollId: z.string().cuid("Invalid poll"),
  optionId: z.string().cuid("Invalid option"),
});

// ─── Reflection ────────────────────────────────────────────────

export const createReflectionSchema = z.object({
  dayId: z.string().cuid().optional(),
  content: z.string().min(1, "Please write something").max(5000),
  isPrivate: z.boolean().default(true),
});

export const updateReflectionSchema = z.object({
  content: z.string().min(1).max(5000),
  isPrivate: z.boolean().optional(),
});

// ─── Community ─────────────────────────────────────────────────

export const createPostSchema = z.object({
  title: z.string().max(200).optional(),
  content: z.string().min(10, "Post must be at least 10 characters").max(5000),
  visibility: z.enum(["PRIVATE", "COMMUNITY", "PUBLIC"]).default("COMMUNITY"),
  tags: z.array(z.string().max(50)).max(5).default([]),
});

export const createCommentSchema = z.object({
  postId: z.string().cuid("Invalid post"),
  content: z.string().min(1).max(2000),
});

// ─── Admin — Offering ──────────────────────────────────────────

export const offeringSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().min(2).max(200).regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers and hyphens"),
  category: z.enum(["YOGA", "BREATHWORK", "MINDFULNESS", "MEDITATION", "JOURNEY", "WORKSHOP", "PROGRAM", "RETREAT", "COMMUNITY"]),
  shortDescription: z.string().min(10).max(300),
  description: z.string().min(20).max(10000),
  imageUrl: z.string().url().optional().or(z.literal("")),
  mode: z.enum(["ONLINE", "OFFLINE", "HYBRID"]).default("HYBRID"),
  level: z.string().max(50).optional(),
  durationMinutes: z.number().int().positive().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
});

// ─── Admin — Session ───────────────────────────────────────────

export const sessionSchema = z.object({
  offeringId: z.string().cuid("Please select an offering"),
  teacherId: z.string().cuid().optional(),
  title: z.string().min(2).max(200),
  description: z.string().max(2000).optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  mode: z.enum(["ONLINE", "OFFLINE", "HYBRID"]),
  capacity: z.number().int().min(1).max(500).default(20),
  location: z.string().max(500).optional(),
  meetingUrl: z.string().url().optional().or(z.literal("")),
});

// ─── Analytics ─────────────────────────────────────────────────

export const analyticsEventSchema = z.object({
  event: z.string().min(1).max(100),
  properties: z.record(z.string(), z.unknown()).optional(),
  page: z.string().max(500).optional(),
});

// Types inferred from schemas
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type PollResponseInput = z.infer<typeof pollResponseSchema>;
export type CreateReflectionInput = z.infer<typeof createReflectionSchema>;
export type UpdateReflectionInput = z.infer<typeof updateReflectionSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type OfferingInput = z.infer<typeof offeringSchema>;
export type SessionInput = z.infer<typeof sessionSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
