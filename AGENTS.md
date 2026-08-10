# AGENTS.md — PersonaMail

## Project Overview
PersonaMail is a full-stack AI email assistant. It generates, rewrites,
and grammar-checks emails using Groq's LLM API, with tone/style that
automatically adapts per contact (Adaptive Communication Profiles).

## Tech Stack
- Frontend: Next.js (App Router) + TypeScript + Tailwind CSS
- Backend: FastAPI + Python + SQLAlchemy + Pydantic
- Database: PostgreSQL (Neon)
- Auth: Google OAuth 2.0 (JWT cookie sessions)
- AI: Groq API (llama-3.3-70b-versatile)
- Deployment: Vercel (frontend), Render (backend), Neon (DB)

## Architecture
Frontend (Next.js) → REST API (fetch, credentials: include) → 
Backend (FastAPI) → Groq / PostgreSQL

## Backend Structure
backend/
├── routers/     # API endpoints: auth.py, contacts.py, email.py
├── services/    # Business logic: groq_service.py
├── models/      # SQLAlchemy ORM: user.py, contact.py
├── schemas/     # Pydantic request/response schemas
└── core/        # config.py, db.py, security.py

## Frontend Structure
frontend/app/
├── page.tsx              # Home (login/logout)
├── contacts/page.tsx      # Contacts CRUD UI
├── generate/page.tsx      # AI Email Generator
├── rewrite/page.tsx       # AI Email Rewriter
├── grammar-check/page.tsx # Grammar Checker
└── components/Navbar.tsx  # Shared nav

## Key Rules
- Always use "localhost" (never 127.0.0.1) for both frontend and backend
  URLs — cookies do not share across those two hosts, causing auth bugs.
- All Groq API calls must stay server-side only (never expose API key
  to frontend).
- Every DB query must be scoped to authenticated user_id — never trust
  client-provided user IDs.
- Every protected route must use `get_current_user_dependency` from
  core/security.py.
- Frontend fetch calls to the backend must always include
  `credentials: "include"` or auth cookies won't be sent.
- AI service functions (backend/services/groq_service.py) must return
  parsed JSON with a fallback if the model doesn't return valid JSON.
- Sanitize any AI-generated output before rendering in the UI.

## Common Pitfalls (from past debugging)
- Zombie backend processes can pile up on port 8000 across restarts,
  causing all requests to hang. Check with:
  `netstat -ano | findstr :8000`
  then kill with: `taskkill //PID <pid> //F` (double slashes in Git Bash)
- Always activate the venv before running uvicorn:
  `source venv/Scripts/activate`
- Always use Git Bash for backend commands; do not use PowerShell to
  activate or run the backend virtual environment.
- New Python packages must be installed inside the activated venv, or
  imports will silently fail with ModuleNotFoundError.

## Development Order (for new features)
1. Define the SQLAlchemy model (if new data is needed)
2. Define Pydantic schemas (request/response)
3. Build the service function (business logic)
4. Build the router (API endpoint)
5. Register the router in main.py
6. Build the frontend page/component
7. Test end-to-end via /docs, then via the actual UI

## Progress Tracking

After completing a project task, update this section with its status,
verification, and the next active task. Keep this concise and accurate.

### Current Status (2026-08-10)

- [x] Brand/UI foundation and shared navigation
- [x] Templates, History, and Settings workspace features
- [x] Production-hardening implementation: configurable URLs/CORS/cookies,
  token-log removal, and per-user AI request limits
- [x] Verify the repaired backend and resolve the configuration-name collision
- [x] Add and baseline Alembic migrations in Neon (`20260809_0001`)
- [x] Add CI quality gates and formal architecture, database, and API documentation
- [x] Complete pre-launch UI/UX, backend, prompt, and authentication audit
- [x] Redesign shared navigation, Home dashboard, and Compose experience
- [x] Extract Tailwind v4 design tokens (`primary`, `accent`) and fix contrast/slop issues with 0 Impeccable warnings
- [x] Create split-screen `/login` page, toast logout flow, collapsed dashboard hero, and Recent Activity/Contacts state layer
- [x] Polish remaining sub-pages (Contacts, Templates, History, Improve, Review) to align with the new design system
- [x] Implement the prioritized backend and prompt improvements from the pre-launch audit
- [x] Integrate 7-part layout and tone formatting rules from `docs/email_tone_structure.md` into Groq system and user prompts (`backend/services/prompts.py`)
- [x] Create 24/7 cloud deployment blueprint (`backend/render.yaml` & `docs/Deployment_Guide.md`) for zero-downtime Vercel + Render + Neon hosting
- [x] Install `ui-ux-pro-max` design intelligence skill into `.agents/skills/ui-ux-pro-max`, generate & persist `MASTER.md` design system
- [x] Polish UI/UX across all pages with bespoke micro-animations (`fadeInUp`, `slideDownFade`, `scaleIn`), Google G logo SVG on login, anti-pattern icon removal, 44px touch targets, and verified zero-error `npm run lint` & `npm run build`
- [x] Build official landing page from `docs/Landing_page.md` using `ui-ux-pro-max` skill (interactive product preview, value proposition comparison, 4 feature cards, 3-step workflow, trust block, footer, standalone `/landing` route, and unauthenticated `/` landing page)
- [ ] Implement Dashboard Page UX overhaul (workspace stats header, quick action cards with contextual hints, recent activity drawer/preview)
- [ ] Implement Scroll-Driven & Entrance Animations (staggered section fade-ins, viewport reveal effects, smooth anchor scrolling)
- [ ] Implement Hover Micro-Interactions (smooth 150ms transform lifts `hover:-translate-y-1`, active button spring scale `active:scale-[0.98]`, subtle ring glows)
- [ ] Implement Polished Skeleton & Async Loading States (shimmer pulse skeletons, status-reflecting spinner CTAs, non-jarring state transitions)
- [ ] Deploy the frontend to Vercel and backend to Render, then run production verification

## Active UI/UX Polish Handoff

### Completed design work

- `frontend/app/components/Logo.tsx` is the official brand logo component rendering the Geist Option B stylized P icon and wordmark (`#0F172A` primary, `#7CE3FF` cyan accent), integrated into `Navbar.tsx`, `login/page.tsx`, `LandingPage.tsx`, and browser tab metadata in `layout.tsx`.
- `frontend/app/components/Navbar.tsx` is now the responsive shared app shell.
  It uses desktop navigation, mobile menu, Lucide icons, and keeps primary
  navigation focused on Compose, Contacts, Templates, History, and Settings.
- `frontend/app/components/LandingPage.tsx` is the official landing page component
  built from `docs/Landing_page.md` with an interactive product preview, before/after
  value proposition comparison, 4 feature cards, 3-step workflow, trust block, and footer.
- `frontend/app/login/page.tsx` is a 50/50 split-screen login page featuring a
  dark primary panel with brand tagline, a white surface with Google OAuth CTA,
  and search-param based logout toast handling.
- `frontend/app/page.tsx` renders the full `LandingPage` for unauthenticated visitors
  and the populated Dashboard workspace for authenticated users.
- `frontend/app/settings/page.tsx` includes a Session & Security section with
  toast-based logout redirecting to `/login?logout=true`.
- `frontend/app/globals.css` defines `--color-primary` (`#0F172A`) and `--color-accent` (`#7CE3FF`)
  tokens in Tailwind v4 `@theme inline`, keyframes (`fadeInUp`, `slideDownFade`, `scaleIn`), and animation utilities.

### UI/UX Improvement Guidelines & Standard Rules

1. **Dashboard Command Center Enhancements:**
   - Keep the single-line welcome hero clean, but add a 3-part summary metric strip (Total Contacts, Messages Composed, Active Tone Profile).
   - Card grid must use high-contrast surfaces (`bg-white border border-slate-200`), 44px min touch targets, and hover micro-elevations (`hover:-translate-y-1 hover:shadow-md`).
   - Recent Activity and Recent Contacts strips must include quick action links ("Compose email to X", "View history detail").

2. **Scroll-Driven Animation Rules:**
   - Use `animate-fade-in-up`, `animate-slide-down-fade`, and `animate-stagger-1..4` utilities on section entrances.
   - Enforce smooth scrolling behavior (`html { scroll-behavior: smooth; }`).
   - Respect `prefers-reduced-motion: reduce` across all animated components to prevent motion sickness.

3. **Hover & Micro-Interaction Rules:**
   - Every interactive element (buttons, cards, inputs, tabs, contact pills) MUST have explicit hover feedback:
     - Buttons: `hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.98] transition-all duration-150`
     - Cards: `hover:-translate-y-1 hover:shadow-md hover:border-slate-300 transition-all duration-200`
     - Icons inside buttons/cards: `group-hover:translate-x-0.5 transition-transform`
   - Always specify `cursor-pointer` on clickable custom elements.

4. **Loading & Async Feedback Rules:**
   - Replace plain static grey blocks with shimmer pulse skeletons (`bg-slate-200 animate-pulse rounded-2xl`).
   - Every primary action button (e.g. Generate Email, Rewrite, Review, Save Contact) MUST display a loading state with an animated spinner (`animate-spin h-4 w-4 mr-2`) and descriptive progress copy (e.g., "Analyzing relationship tone...", "Composing email...").
   - Prevent layout shifts by giving loading state containers matching min-height dimensions.

### UI validation

Run from `frontend/` after each UI task:

```bash
npm run lint
npm run build
```

Update the **Current Status** checklist in this file whenever a task is
completed, including what was verified and the next active task.

## Database Migrations

- Never use `Base.metadata.create_all()` in application startup.
- Run all migration commands from Git Bash after activating the backend venv:
  `source venv/Scripts/activate`
- For every model/schema change, generate and review a migration before applying it:
  `alembic revision --autogenerate -m "describe change"`
- Apply migrations with `alembic upgrade head`, then verify with
  `alembic check` and `alembic current`.
- The current Neon baseline revision is `20260809_0001`.
