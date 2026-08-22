# PersonaMail — Tech Stack & Privacy Page UI Improvements

**Status:** Both pages are live at `/tech-stack` and `/privacy`. This doc captures proposed UI refinements on top of the current build — not a rebuild, incremental polish.

---

## 1. Tech Stack Page (`/tech-stack`)

### Architecture diagram — not needed
- Decided against adding a flow diagram below the cards. The four stat cards (Frontend / Backend / Database / AI Engine) stand on their own.

### Card interactions
- Cards are currently static. Add the hover treatment already spec'd elsewhere on the site (`hover:-translate-y-0.5`, `hover:shadow-md`) so this page feels consistent with the rest of the app's micro-interactions

### Icon consistency
- Most icons read as accurate brand marks (Next.js, Tailwind, Vercel)
- A couple — Pydantic, SQLAlchemy — currently look like generic placeholder icons rather than real logos. Swap these specifically for consistency

### Source link
- Add a "View source on GitHub" link near the bottom — this page is the strongest recruiter-facing surface on the site, worth making the repo one click away

---

## 2. Privacy Page (`/privacy`)

### Section navigation
- Page is a long single scroll across four dense sections (AI & Data Processing, Authentication & Google OAuth, Cookies & Local Storage, Database Security)
- Add a sticky jump-nav (left rail on desktop, top bar on mobile) — AI & Data · Auth · Cookies · Database — so a reader can jump directly to a section instead of scrolling through all of them

### Visual rhythm
- Every section currently repeats the same pattern: icon → heading → paragraph → bullets, which starts to feel monotone by the third section
- Introduce a small visual break — e.g. alternating icon background tint per section, or giving the first section (AI & Data Processing) slightly more visual weight since it's the one most visitors care about most

### Last updated date
- Add a small "Last updated" date near the top — low cost, adds legitimacy to the page

### What's already working (keep as-is)
- Headline "Your data is yours. We just help you write better." — plain-language tone over legal boilerplate, exactly right for this audience
- Specificity throughout (zero data retention, server-side-only keys, scoped DB queries, parameterized queries) — reads as genuinely trustworthy rather than defensive boilerplate

---

## 3. Open Questions

None currently — remaining items above (hover states, icon swaps, source link, section nav, visual rhythm, last-updated date) are ready to build whenever you get to them.
