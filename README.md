# Yoga School

A full-stack yoga school management platform built with Next.js 16, TypeScript, Prisma, and PostgreSQL.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.3 (App Router, TypeScript) |
| Styling | Tailwind CSS v4, Cormorant Garamond + Inter |
| Auth | Auth.js v5 beta (Credentials + JWT) |
| Database | PostgreSQL + Prisma 7 (PrismaPg adapter) |
| Validation | Zod v4 + React Hook Form |
| Email | Resend (or console fallback for dev) |

## Prerequisites

- **Node.js** 20 or newer
- **PostgreSQL** 14 or newer (local or hosted)

## Setup

### 1. Clone and install dependencies

```bash
git clone <repo-url>
cd yoga-school
npm install
```

`postinstall` automatically runs `prisma generate`.

### 2. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in:

```env
# PostgreSQL connection string
DATABASE_URL="postgresql://user:password@localhost:5432/yoga_school"

# Generate with: openssl rand -base64 32
AUTH_SECRET="your-secret-here"

# Base URL (used in reset-password emails)
NEXTAUTH_URL="http://localhost:3000"

# Optional: Resend API key for real email delivery
# If omitted, emails are printed to the console
RESEND_API_KEY=""
FROM_EMAIL="noreply@yourdomain.com"
```

### 3. Create and seed the database

```bash
# Apply all migrations
npm run db:migrate

# Seed with sample data (offerings, journeys, demo users)
npm run db:seed
```

**Seed credentials**

| Role | Email | Password |
|---|---|---|
| Admin | admin@example.com | Admin@12345 |
| Member | demo@example.com | User@12345 |

### 4. Start the dev server

```bash
npm run dev
```

Open http://localhost:3000.

## Available Scripts

```bash
npm run dev          # Start development server (hot reload)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint

npm run db:generate  # Regenerate Prisma client
npm run db:migrate   # Run pending migrations (creates DB if needed)
npm run db:push      # Push schema without migration history (prototyping)
npm run db:seed      # Seed demo data
npm run db:studio    # Open Prisma Studio (GUI for the DB)
```

## Route Map

### Marketing (/)
| Route | Description |
|---|---|
| / | Homepage |
| /offerings | All class types |
| /schedule | Live session schedule with filters |
| /journeys | Transformation journey programs |
| /teachers | Teacher profiles |
| /community | Community wall |
| /blog | Blog index and posts |
| /contact | Contact form |
| /about | Studio story |
| /pricing | Pricing tiers |
| /privacy, /terms | Legal pages |

### Auth
/login, /signup, /forgot-password, /reset-password

### Dashboard (/dashboard/*) - requires login
| Route | Description |
|---|---|
| /dashboard | Personal overview |
| /dashboard/sessions | Browse and book sessions |
| /dashboard/bookings | Personal booking history |
| /dashboard/journey | Active transformation journey |
| /dashboard/journey/[day] | Day content: video, reflection, poll |
| /dashboard/community | Community feed |
| /dashboard/profile | Edit profile |

### Admin (/admin/*) - requires admin role
| Route | Description |
|---|---|
| /admin | Stats overview |
| /admin/users | User management |
| /admin/offerings | CRUD for class types |
| /admin/sessions | CRUD for scheduled sessions |
| /admin/bookings | Booking list: confirm / cancel |
| /admin/journeys | Journey management |
| /admin/community | Moderate posts |
| /admin/contact | Contact submissions |
| /admin/analytics | Event analytics |

## Architecture Notes

**Prisma 7 driver adapter**: PrismaClient requires @prisma/adapter-pg. Set up in src/lib/db.ts. prisma.config.ts (not schema.prisma) holds the DATABASE_URL datasource.

**Route protection**: src/proxy.ts (Next.js middleware) guards /dashboard/* and /admin/* using getToken from next-auth/jwt.

**Email**: src/lib/email.ts provides sendEmail(). Set RESEND_API_KEY for real delivery; otherwise logs to console.

**i18n**: Translation strings in src/lib/i18n.ts (English, Hindi, Marathi).

## Production Deployment

1. Set all environment variables on your host.
2. Run migrations: npx prisma migrate deploy
3. Build: npm run build
4. Start: npm run start

Prisma client regenerates automatically via the postinstall script on every npm install.
