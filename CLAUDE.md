@AGENTS.md

# Project: VoxTalent — Human-AI Collaboration (HAIC) Platform

A full-stack recruitment SaaS built with Next.js 16 (App Router), Prisma, Turso LibSQL, NextAuth v5, and Tailwind CSS 4.

---

## Build & Development Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma generate  # Regenerate Prisma client after schema changes
npx prisma db push   # Push schema changes to the database
```

---

## Tech Stack

| Layer          | Technology                                     |
|----------------|------------------------------------------------|
| Framework      | Next.js 16, React 19, TypeScript               |
| Styling        | Tailwind CSS 4 + CSS Modules (mixed)           |
| Database       | Prisma 5 + LibSQL adapter (Turso in prod, SQLite locally) |
| Auth           | NextAuth.js v5 beta (`next-auth@5.0.0-beta.30`) |
| Icons          | Lucide React                                   |
| Validation     | Zod (only in auth; server actions use raw FormData) |
| Path alias     | `@/*` -> `./src/*`                             |

---

## Project Structure

```
src/
├── app/                         # App Router pages
│   ├── layout.tsx               # Root layout — calls auth(), mounts Navbar/Footer/AuthProvider
│   ├── page.tsx                 # Landing page
│   ├── login/page.tsx           # Credentials login form (client)
│   ├── signup/page.tsx          # Multi-step signup wizard (client)
│   ├── challenges/              # Public challenge listing + detail + submit
│   │   ├── page.tsx
│   │   ├── actions.ts           # submitSolution server action
│   │   └── [id]/page.tsx
│   ├── vote/[id]/               # Anonymous peer voting UI
│   │   ├── page.tsx
│   │   └── actions.ts           # castVote server action
│   ├── dashboard/
│   │   ├── page.tsx             # Hub — redirects to role-specific dashboard
│   │   ├── admin/page.tsx
│   │   ├── company/             # Company dashboard
│   │   │   ├── page.tsx
│   │   │   ├── actions.ts       # createChallenge, deleteChallenge
│   │   │   ├── ChallengeForm.tsx
│   │   │   ├── challenges/[id]/page.tsx
│   │   │   └── submissions/[id]/page.tsx
│   │   ├── candidate/page.tsx
│   │   └── employee/page.tsx    # Voting queue for employees
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── challenges/route.ts  # In-memory data only — POST does NOT persist
│       ├── votes/route.ts       # In-memory data only — POST does NOT persist
│       ├── seed/route.ts
│       └── fix-admin/route.ts
├── components/
│   ├── AuthProvider.tsx         # 'use client' — SessionProvider wrapper
│   ├── Navbar.tsx               # 'use client' — session-aware nav + register modal
│   ├── SignOutButton.tsx        # 'use client'
│   ├── Footer.tsx
│   ├── challenge/SubmitSolutionForm.tsx
│   └── layout/Navbar.tsx + Footer.tsx
├── lib/
│   ├── prisma.ts                # Singleton PrismaClient (Proxy pattern, auto-switches DB)
│   └── data.ts                  # In-memory seed/demo data (no DB calls)
├── actions/
│   └── auth.ts                  # handleSignOut server action
├── types/
│   └── next-auth.d.ts           # Augments Session/User/JWT with id and role
├── auth.ts                      # NextAuth config with credentials provider
└── auth.config.ts               # Base config (signIn page, callbacks.authorized)
prisma/
└── schema.prisma                # SQLite/LibSQL schema
```

---

## Database Models (Prisma)

- **User** — id, email, password (hashed), name?, image?, role (CANDIDATE | COMPANY | EMPLOYEE | ADMIN)
- **CompanyProfile** — belongs to User; has many Challenges
- **EmployeeProfile** — belongs to User + CompanyProfile
- **CandidateProfile** — belongs to User
- **Challenge** — belongs to CompanyProfile; status OPEN | CLOSED; has many Submissions
- **Submission** — belongs to User (candidate) + Challenge; has many Votes; includes anonymousId
- **Vote** — belongs to User (voter) + Submission; score defaults to 1

---

## Authentication

- **NextAuth v5 beta** — Credentials provider only (email + bcrypt password)
- `auth()` is called in the root layout and in every dashboard page independently
- Session JWT includes `user.id` and `user.role`
- `callbacks.authorized` always returns `true` — no mandatory login enforcement at middleware level
- Role-based redirects are done manually inside each dashboard page

### Demo Credentials

| Role      | Email                  | Password     |
|-----------|------------------------|--------------|
| ADMIN     | admin@company.com      | admin        |
| COMPANY   | hr@company.com         | hr@company   |
| EMPLOYEE  | employee@company.com   | employee     |
| CANDIDATE | candidate@company.com  | candidate    |

---

## Key Patterns

### Server vs Client Components
- **Server components** (async, no directive): all dashboard pages, challenge listing, voting pages
- **Client components** (`'use client'`): forms, Navbar, AuthProvider, any component using hooks
- **Server Actions** (`'use server'`): `submitSolution`, `createChallenge`, `deleteChallenge`, `castVote`, `handleSignOut`

### Data Fetching
- Dashboard pages fetch from Prisma in async Server Components
- All DB calls in dashboards are wrapped in `try/catch` — on failure they fall back to hardcoded demo data
- API routes (`/api/challenges`, `/api/votes`) return **in-memory data from `src/lib/data.ts`**, not real DB records — do not rely on them for persistence

### Database Connection (`src/lib/prisma.ts`)
- Uses a Proxy to lazily initialize the singleton
- If `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN` are set -> remote Turso (LibSQL adapter)
- Otherwise -> local SQLite (`prisma/dev.db`)
- Client is only initialized server-side (`typeof window === "undefined"`)

---

## Environment Variables

```env
TURSO_DATABASE_URL=libsql://...
TURSO_AUTH_TOKEN=...
NEXTAUTH_SECRET=...
AUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
```

No `.env.example` exists — check `.env` directly.

---

## Important Gotchas

1. **API routes don't persist** — `/api/challenges` POST and `/api/votes` POST only log to console. Use Server Actions for actual writes.

2. **Mixed data sources** — Some pages use real Prisma data, others fall back to `src/lib/data.ts` in-memory arrays. Don't assume all pages show DB data.

3. **Role strings are uppercase** — `"CANDIDATE"`, `"COMPANY"`, `"EMPLOYEE"`, `"ADMIN"`. The dashboard hub lowercases the role for URL routing.

4. **No Zod in most server actions** — `FormData.get()` is used directly. Add Zod if validation is needed in new actions.

5. **No migrations directory** — Schema changes go through `prisma db push` only.

6. **NextAuth v5 beta API differs from v4** — `useSession()` is in `next-auth/react`, `auth()` is imported from `@/auth`. The `session.user` type requires casting (`as any`) in several places.

7. **Styling is mixed** — Tailwind utilities are used alongside CSS Modules (`.module.css`). Follow the existing style approach of whichever page you're editing.

8. **`src/lib/data.ts` is the source of truth for demo content** — platform stats, sample challenges, companies, and testimonials all live here.

---

## Branding & UI Rules

- Platform name: **VoxTalent** — Human-AI Collaboration (HAIC) platform
- Never use "Help Desk" or legacy terminology
- Dark mode support is expected for all components
- All components must be fully responsive and mobile-friendly
- Use Lucide React for icons
