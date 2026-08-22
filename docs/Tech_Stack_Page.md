# PersonaMail — Tech Stack Page Documentation

**Route:** `/tech-stack`
**Component:** `TechStackPage.tsx`
**Linked from:** Footer stack on the closing panel (Panel 7)

---

## 1. Purpose

A dedicated page showing the engineering behind PersonaMail — since this project's main purpose is a portfolio piece, this page is where technical depth gets demonstrated directly, rather than implied through the app's UI alone.

---

## 2. Content Sections

### Frontend
- Next.js, TypeScript, Tailwind, shadcn/ui
- GSAP (`ScrollTrigger`) for the landing page's horizontal scroll animations

### Backend
- FastAPI, Python, SQLAlchemy, Pydantic

### Database
- PostgreSQL via Neon

### AI
- **Groq API** — handles email generation, rewriting, and tone adaptation

### Infrastructure
- Vercel (frontend hosting)
- Render (backend hosting)
- Neon (managed Postgres)

### Architecture
- Service-layer pattern: Frontend → REST API → Backend (Auth Service / Email Service / Contact Service) → Groq Service → Groq API + PostgreSQL
- A simple architecture diagram visualizing this flow

---

## 3. Layout

- **Header:** standard site header (logo, nav, Sign in / Get Started) — same as the rest of the app
- Below the header:
  - Page title: "Tech Stack"
  - Short intro line framing why these choices were made (e.g. built for a working, deployable portfolio piece — not overengineered)
  - Grouped sections (Frontend / Backend / Database / AI / Infrastructure), each shown as a row of **real technology logos** (not text badges/pills) with a one-line rationale per group
  - Architecture diagram placed after the stack breakdown, visualizing the service-layer flow
  - Optional: link to the GitHub repo at the bottom

---

## 4. Visual & Styling Notes

Matches the app's light theme, consistent with the closing panel:
- **Background:** white / very light gray
- **Tech logos:** actual brand logos/icons per technology (Next.js, TypeScript, Tailwind, FastAPI, Python, PostgreSQL, Groq, Vercel, Render, Neon) — sized consistently in a grid or row, grayscale-to-color on hover works well if a subtle interaction is wanted
- **Accent:** PersonaMail blue for section headers and the diagram's connecting lines
- **Diagram:** clean boxes-and-arrows style, matching the light theme rather than a dark technical-diagram look

---

## 5. Open Questions

- Want the architecture diagram built now? It's a good candidate to render directly rather than describe in prose.
- Logos: pulling from each brand's official assets (e.g. simple-icons / devicon style) is the fastest path to a consistent-looking row — flag if you'd rather I source specific ones.
