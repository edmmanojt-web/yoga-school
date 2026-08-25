# Yoga School — Project Documentation

> **Stack:** Next.js 16 · TypeScript · MongoDB · Prisma ORM 7 · Auth.js v5 · Tailwind CSS v4 · Framer Motion

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#project-structure)
4. [Database — MongoDB](#database--mongodb)
   - [Collections / Models](#collections--models)
   - [Entity Relationships](#entity-relationships)
   - [Enums](#enums)
5. [API Routes](#api-routes)
6. [Authentication](#authentication)
7. [Pages & Routes](#pages--routes)
8. [Environment Variables](#environment-variables)
9. [Running Locally](#running-locally)
10. [Database Setup](#database-setup)
11. [Deployment Notes](#deployment-notes)

---

## 1. Project Overview

A full-stack yoga school web application for managing classes, bookings, guided journeys, community posts, and admin operations. Built with a mobile-first approach and multilingual support (English, Hindi, Marathi).

**Core features:**
- Public marketing site — yoga, breathwork, mindfulness, retreats, workshops pages
- User authentication (email/password + OAuth-ready via Auth.js)
- Session booking with capacity management and email confirmations
- Guided 7-day journeys with daily practices, polls, and reflections
- Community feed with posts and comments
- Admin dashboard — manage offerings, sessions, bookings, users, contacts
- Analytics event tracking
- SEO — sitemap, robots.txt, Open Graph metadata

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Database | MongoDB |
| ORM | Prisma 7 |
| Auth | Auth.js (NextAuth v5) with Prisma adapter |
| Styling | Tailwind CSS v4 |
| UI Components | Custom (`src/components/ui/`) |
| Forms | React Hook Form + Zod |
| Email | Resend / SendGrid / SMTP (configurable) |
| Animation | Framer Motion |
| Icons | Lucide React |
| Hosting | Any Node.js platform (Vercel, Railway, etc.) |

---

## Project Structure

```
yoga-school/
├── prisma/
│   ├── schema.prisma         # MongoDB Prisma schema
│   └── seed.ts               # Database seed script
├── src/
│   ├── app/
│   │   ├── (auth)/           # Login, signup, forgot/reset password
│   │   ├── (marketing)/      # Public-facing pages
│   │   ├── admin/            # Admin dashboard (protected)
│   │   ├── api/              # API route handlers
│   │   ├── dashboard/        # Logged-in user dashboard
│   │   ├── global-error.tsx  # Global error boundary
│   │   ├── layout.tsx        # Root layout
│   │   ├── loading.tsx       # Root loading state
│   │   ├── not-found.tsx     # 404 page
│   │   ├── robots.ts         # robots.txt
│   │   └── sitemap.ts        # sitemap.xml
│   ├── components/
│   │   ├── admin/            # Admin-specific components
│   │   ├── community/        # Community feed & post form
│   │   ├── dashboard/        # Profile form
│   │   ├── journey/          # Journey day, polls, reflections
│   │   ├── layout/           # Navbar, footer
│   │   ├── marketing/        # Contact form
│   │   ├── schedule/         # Schedule client component
│   │   └── ui/               # Button, Card, Input, Badge, etc.
│   ├── config/
│   │   └── site.ts           # App-wide config (name, teacher, journeys)
│   ├── content/
│   │   └── i18n.ts           # i18n strings (en / hi / mr)
│   ├── lib/
│   │   ├── analytics.ts      # Analytics event helpers
│   │   ├── auth.ts           # Auth.js config
│   │   ├── db.ts             # Prisma client singleton
│   │   ├── email.ts          # Email sending helpers
│   │   └── utils.ts          # Date formatters, cn(), etc.
│   ├── types/
│   │   └── index.ts          # Shared TypeScript types
│   └── validations/
│       └── index.ts          # Zod schemas for all forms & APIs
├── .env.example              # Environment variables template
├── next.config.ts
├── prisma.config.ts          # Prisma configuration
├── tailwind.config.ts
└── tsconfig.json
```

---

## Database — MongoDB

The project uses **MongoDB** via **Prisma ORM**. All IDs are MongoDB `ObjectId` values (stored as strings with `@db.ObjectId`).

### Collections / Models

#### `User`
Stores all registered users.

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | Auto-generated |
| `name` | String? | Display name |
| `email` | String | Unique |
| `emailVerified` | DateTime? | Set on email verification |
| `image` | String? | Avatar URL |
| `passwordHash` | String? | bcrypt hash; null for OAuth users |
| `phone` | String? | |
| `preferredLanguage` | `en \| hi \| mr` | Default: `en` |
| `role` | `VISITOR \| USER \| TEACHER \| ADMIN` | Default: `USER` |
| `createdAt` | DateTime | |
| `updatedAt` | DateTime | |

---

#### `Profile`
One-to-one extension of `User` for optional bio/location details.

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `userId` | ObjectId | → `User._id` (unique) |
| `bio` | String? | |
| `photoUrl` | String? | |
| `location` | String? | |
| `timezone` | String | Default: `Asia/Kolkata` |
| `website` | String? | |

---

#### `Account`
OAuth provider accounts (Auth.js / NextAuth).

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `userId` | ObjectId | → `User._id` |
| `provider` | String | e.g. `google`, `credentials` |
| `providerAccountId` | String | |
| `access_token` | String? | |
| `refresh_token` | String? | |
| `expires_at` | Int? | Unix timestamp |

---

#### `AuthSession`
Active auth sessions (Auth.js managed).

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `sessionToken` | String | Unique |
| `userId` | ObjectId | → `User._id` |
| `expires` | DateTime | |

---

#### `VerificationToken`
Email verification / password reset tokens.

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `identifier` | String | Email address |
| `token` | String | Unique hashed token |
| `expires` | DateTime | |

---

#### `Offering`
A class type / programme offered by the school (e.g. Hatha Yoga, Pranayama Breathwork).

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `title` | String | |
| `slug` | String | Unique, used in URLs |
| `category` | Enum | `YOGA \| BREATHWORK \| MINDFULNESS \| MEDITATION \| JOURNEY \| WORKSHOP \| PROGRAM \| RETREAT \| COMMUNITY` |
| `shortDescription` | String | |
| `description` | String | Full markdown/HTML content |
| `imageUrl` | String? | |
| `mode` | `ONLINE \| OFFLINE \| HYBRID` | Default: `HYBRID` |
| `level` | String? | e.g. Beginner, All levels |
| `durationMinutes` | Int? | |
| `featured` | Boolean | Shown on homepage |
| `published` | Boolean | Visible on public site |
| `sortOrder` | Int | |

---

#### `Teacher`
Teacher profiles (may be linked to a `User` account).

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `userId` | ObjectId? | → `User._id` (optional link) |
| `name` | String | |
| `slug` | String | Unique |
| `bio` | String | Full bio |
| `shortBio` | String | |
| `photoUrl` | String? | |
| `specialties` | String[] | Array of specialty tags |
| `published` | Boolean | |

---

#### `Session`
A specific scheduled class instance of an `Offering`.

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `offeringId` | ObjectId | → `Offering._id` |
| `teacherId` | ObjectId? | → `Teacher._id` |
| `title` | String | |
| `description` | String? | |
| `startTime` | DateTime | |
| `endTime` | DateTime | |
| `mode` | `ONLINE \| OFFLINE \| HYBRID` | |
| `capacity` | Int | Max participants |
| `enrolled` | Int | Current booking count |
| `location` | String? | Physical address or "Online" |
| `meetingUrl` | String? | Zoom / Meet link |
| `status` | `DRAFT \| SCHEDULED \| CANCELLED \| COMPLETED` | |

---

#### `Booking`
A user's booking for a `Session`.

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `userId` | ObjectId | → `User._id` |
| `sessionId` | ObjectId | → `Session._id` |
| `status` | `PENDING \| CONFIRMED \| CANCELLED \| COMPLETED` | |
| `notes` | String? | User notes |
| `bookedAt` | DateTime | |
| `confirmedAt` | DateTime? | |
| `cancelledAt` | DateTime? | |

Constraint: one booking per user per session (`@@unique([userId, sessionId])`).

---

#### `Journey`
A multi-day guided programme (e.g. 7-Day Awareness Journey).

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `offeringId` | ObjectId? | → `Offering._id` |
| `slug` | String | Unique |
| `title` | String | |
| `description` | String | |
| `totalDays` | Int | Default: 7 |
| `published` | Boolean | |
| `featured` | Boolean | |

---

#### `JourneyDay`
A single day's content within a `Journey`.

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `journeyId` | ObjectId | → `Journey._id` |
| `dayNumber` | Int | 1-based |
| `title` | String | |
| `theme` | String? | |
| `intention` | String | |
| `practiceTitle` | String | |
| `practiceContent` | String | Detailed practice instructions |
| `observationNote` | String | Reflection prompt |
| `durationMinutes` | Int | Estimated time |

---

#### `JourneyEnrollment`
Tracks a user's enrollment in a `Journey`.

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `userId` | ObjectId | → `User._id` |
| `journeyId` | ObjectId | → `Journey._id` |
| `status` | `ACTIVE \| COMPLETED \| ARCHIVED` | |
| `startedAt` | DateTime | |
| `completedAt` | DateTime? | |

---

#### `JourneyDayProgress`
Records when a user completes a specific `JourneyDay`.

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `userId` | ObjectId | → `User._id` |
| `dayId` | ObjectId | → `JourneyDay._id` |
| `completedAt` | DateTime | |

---

#### `Poll` / `PollOption` / `PollResponse`
Embedded polls within journey days.

- **Poll** — a question attached to a `JourneyDay`
- **PollOption** — answer choices for a `Poll`
- **PollResponse** — a user's single answer per poll (unique per `[userId, pollId]`)

---

#### `Reflection`
Free-text journal entries written by users, optionally linked to a `JourneyDay`.

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `userId` | ObjectId | → `User._id` |
| `dayId` | ObjectId? | → `JourneyDay._id` |
| `content` | String | |
| `isPrivate` | Boolean | Default: `true` |

---

#### `CommunityPost` / `CommunityComment`
User-generated content in the community feed.

- **CommunityPost** — posts with optional title, content, tags, and visibility (`PRIVATE \| COMMUNITY \| PUBLIC`)
- **CommunityComment** — comments on posts

---

#### `Testimonial`
Admin-managed testimonials shown on the marketing site.

---

#### `FAQ`
Admin-managed FAQ entries shown on the marketing site.

---

#### `ContactSubmission`
Form submissions from the public contact page.

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `userId` | ObjectId? | Linked if submitted while logged in |
| `name` | String | |
| `email` | String | |
| `interest` | String | What they're interested in |
| `message` | String | |
| `read` | Boolean | Admin mark-as-read |

---

#### `AnalyticsEvent`
Internal event tracking (page views, button clicks, etc.).

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `userId` | ObjectId? | Null for anonymous events |
| `event` | String | Event name e.g. `page_view` |
| `properties` | Json? | Arbitrary event payload |
| `page` | String? | |
| `referrer` | String? | |

---

### Entity Relationships

```
User
 ├── Profile          (1:1)
 ├── Account[]        (1:many — OAuth providers)
 ├── AuthSession[]    (1:many — active sessions)
 ├── Booking[]        (1:many)
 ├── JourneyEnrollment[] (1:many)
 ├── JourneyDayProgress[] (1:many)
 ├── PollResponse[]   (1:many)
 ├── Reflection[]     (1:many)
 ├── CommunityPost[]  (1:many)
 ├── CommunityComment[] (1:many)
 ├── AnalyticsEvent[] (1:many)
 └── ContactSubmission[] (1:many)

Offering
 ├── Session[]        (1:many)
 └── Journey[]        (1:many)

Teacher
 └── Session[]        (1:many)

Session
 └── Booking[]        (1:many)

Journey
 ├── JourneyDay[]     (1:many)
 └── JourneyEnrollment[] (1:many)

JourneyDay
 ├── Poll[]           (1:many)
 ├── JourneyDayProgress[] (1:many)
 └── Reflection[]     (1:many)

Poll
 ├── PollOption[]     (1:many)
 └── PollResponse[]   (1:many)

CommunityPost
 └── CommunityComment[] (1:many)
```

---

### Enums

| Enum | Values |
|---|---|
| `Role` | `VISITOR`, `USER`, `TEACHER`, `ADMIN` |
| `OfferingCategory` | `YOGA`, `BREATHWORK`, `MINDFULNESS`, `MEDITATION`, `JOURNEY`, `WORKSHOP`, `PROGRAM`, `RETREAT`, `COMMUNITY` |
| `SessionMode` | `ONLINE`, `OFFLINE`, `HYBRID` |
| `SessionStatus` | `DRAFT`, `SCHEDULED`, `CANCELLED`, `COMPLETED` |
| `BookingStatus` | `PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED` |
| `PostVisibility` | `PRIVATE`, `COMMUNITY`, `PUBLIC` |
| `JourneyStatus` | `ACTIVE`, `COMPLETED`, `ARCHIVED` |
| `Language` | `en`, `hi`, `mr` |

---

## API Routes

All routes are under `src/app/api/`.

### Auth

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Register new user (name, email, password) |
| `POST` | `/api/auth/forgot-password` | Send password reset email |
| `POST` | `/api/auth/reset-password` | Reset password with token |
| `ANY` | `/api/auth/[...nextauth]` | Auth.js handler (login, logout, OAuth) |

### Bookings

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/bookings` | Create a booking (auth required) |

### Offerings

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/offerings` | List published offerings |
| `GET` | `/api/offerings/[slug]` | Get offering by slug |

### Sessions

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/sessions` | List upcoming scheduled sessions |

### Journeys

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/journeys/[id]/enroll` | Enroll in a journey (auth required) |
| `POST` | `/api/journeys/[id]/days/[dayId]/complete` | Mark a day complete (auth required) |

### Polls

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/polls/responses` | Submit a poll response (auth required) |

### Reflections

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/reflections` | Get current user's reflections |
| `POST` | `/api/reflections` | Create a reflection |
| `PUT` | `/api/reflections/[id]` | Update a reflection |
| `DELETE` | `/api/reflections/[id]` | Delete a reflection |

### Community

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/community/posts` | List community posts |
| `POST` | `/api/community/posts` | Create a post (auth required) |
| `DELETE` | `/api/community/posts/[id]` | Delete a post (owner/admin) |
| `POST` | `/api/community/comments` | Add a comment (auth required) |

### Users

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/users/profile` | Get current user's profile |
| `PUT` | `/api/users/profile` | Update profile |

### Analytics

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/analytics/events` | Track an analytics event |

### Admin (protected — `ADMIN` role)

| Method | Route | Description |
|---|---|---|
| `GET/POST` | `/api/admin/offerings` | List / create offerings |
| `PUT/DELETE` | `/api/admin/offerings/[id]` | Update / delete offering |
| `GET/POST` | `/api/admin/sessions` | List / create sessions |
| `PUT/DELETE` | `/api/admin/sessions/[id]` | Update / delete session |
| `PUT` | `/api/admin/bookings/[id]` | Update booking status |
| `PUT` | `/api/admin/contact/[id]` | Mark contact submission as read |

---

## Authentication

Auth is handled by **Auth.js (NextAuth v5)** configured in `src/lib/auth.ts`.

- **Credentials provider** — email + password with bcrypt
- **Prisma adapter** — sessions, accounts, verification tokens stored in MongoDB
- **Roles** — `VISITOR | USER | TEACHER | ADMIN` stored on the `User` document
- **Password reset** — token-based flow via `VerificationToken` + email

---

## Pages & Routes

### Marketing (public)

| Path | Page |
|---|---|
| `/` | Home — hero, offerings, upcoming sessions, journey CTA |
| `/about` | About the school and teacher |
| `/offerings` | All offerings listing |
| `/yoga` | Yoga offering detail |
| `/breathwork` | Breathwork offering detail |
| `/mindfulness` | Mindfulness offering detail |
| `/retreats` | Retreats page |
| `/workshops` | Workshops page |
| `/schedule` | Upcoming session schedule |
| `/yoga-beyond-the-mat` | 7-Day Journey landing page |
| `/community` | Community overview |
| `/contact` | Contact form |
| `/faq` | FAQ |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

### Auth

| Path | Page |
|---|---|
| `/login` | Sign in |
| `/signup` | Create account |
| `/forgot-password` | Request password reset |
| `/reset-password` | Set new password (with token) |

### Dashboard (requires login)

| Path | Page |
|---|---|
| `/dashboard` | Overview |
| `/dashboard/bookings` | User's bookings |
| `/dashboard/sessions` | Browse & book sessions |
| `/dashboard/journey` | Journey enrollment & progress |
| `/dashboard/journey/[dayNumber]` | Individual journey day |
| `/dashboard/community` | Community feed |
| `/dashboard/profile` | Edit profile |

### Admin (requires `ADMIN` role)

| Path | Page |
|---|---|
| `/admin` | Dashboard overview |
| `/admin/offerings` | Manage offerings |
| `/admin/offerings/new` | Create offering |
| `/admin/offerings/[id]/edit` | Edit offering |
| `/admin/sessions` | Manage sessions |
| `/admin/sessions/new` | Create session |
| `/admin/sessions/[id]/edit` | Edit session |
| `/admin/bookings` | View all bookings |
| `/admin/users` | View all users |
| `/admin/journeys` | Manage journeys |
| `/admin/community` | Moderate community posts |
| `/admin/contact` | View contact submissions |
| `/admin/analytics` | Analytics dashboard |

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values.

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | MongoDB connection string |
| `AUTH_SECRET` | ✅ | Random 32-byte secret for Auth.js |
| `AUTH_URL` | ✅ | App base URL (e.g. `http://localhost:3000`) |
| `NEXT_PUBLIC_APP_URL` | ✅ | Public app URL |
| `NEXT_PUBLIC_APP_NAME` | ✅ | School name shown in UI |
| `EMAIL_PROVIDER` | ✅ | `resend \| sendgrid \| smtp` |
| `EMAIL_API_KEY` | ✅ | API key for email provider |
| `EMAIL_FROM` | ✅ | Sender address |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER` | — | `posthog \| gtag \| none` |
| `NEXT_PUBLIC_ANALYTICS_KEY` | — | Analytics API key |
| `STORAGE_PROVIDER` | — | `supabase \| s3 \| local` |

---

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Copy and configure environment variables
cp .env.example .env.local
# Edit .env.local — set DATABASE_URL, AUTH_SECRET, etc.

# 3. Generate Prisma client
npm run db:generate

# 4. Push schema to MongoDB (creates collections & indexes)
npm run db:push

# 5. (Optional) Seed the database with sample data
npm run db:seed

# 6. Start the dev server
npm run dev
```

Open **http://localhost:3000**.

---

## Database Setup

### Option A — MongoDB Atlas (recommended for production)

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a database user with read/write access
3. Whitelist your IP (or `0.0.0.0/0` for dev)
4. Copy the **connection string** (SRV format) into `DATABASE_URL` in `.env.local`
5. Run `npm run db:push`

```
DATABASE_URL="mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/yoga_school_db?retryWrites=true&w=majority"
```

### Option B — Local MongoDB

1. Install [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Start the service: `mongod`
3. Set in `.env.local`:

```
DATABASE_URL="mongodb://localhost:27017/yoga_school_db"
```

4. Run `npm run db:push`

### Useful DB commands

```bash
npm run db:generate   # Regenerate Prisma client after schema changes
npm run db:push       # Sync schema to MongoDB (no migration files)
npm run db:seed       # Seed database with sample data
npm run db:studio     # Open Prisma Studio visual browser at localhost:5555
```

---

## Deployment Notes

- Set all production environment variables in your hosting provider (Vercel, Railway, etc.).
- `AUTH_URL` must match your production domain exactly.
- `NEXT_PUBLIC_APP_URL` is used in sitemap and Open Graph tags — set to the production URL.
- MongoDB Atlas: whitelist `0.0.0.0/0` or add your host's static IPs in the Atlas Network Access panel.
- Run `npm run db:push` once after first deployment to create indexes on the production cluster.
- `EMAIL_PROVIDER` + `EMAIL_API_KEY` must be configured for booking confirmations and password resets to work.
- No migration files are needed — MongoDB is schema-flexible. Just re-run `db:push` after schema changes.
