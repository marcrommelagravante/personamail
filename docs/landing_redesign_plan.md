# PersonaMail Landing Page Redesign — Implementation Plan

**Goal:** Redesign the PersonaMail landing page (`frontend/app/components/LandingPage.tsx`) in the style of [getkeeby.com](https://getkeeby.com) — horizontal scrolling, smooth scroll-driven animation, and an interactive, feature-by-feature narrative.

---

## 1. Design Direction

Keeby's site works because it's a **single-purpose product told as a sequence of feature "moments"** — not because horizontal scroll is inherently better. The pattern to copy:

- Full-viewport panels, each dedicated to one feature, pinned while content animates in
- A big, confident headline per panel instead of dense text
- One interactive/visual centerpiece per panel (a live demo, not a screenshot)
- A scroll-progress indicator so users know where they are
- Minimal chrome — the animation *is* the content

For PersonaMail, the panels map naturally onto what already exists: Adaptive Communication Profiles, AI Email Generator, Email Rewriter, Grammar Checker, the 3-step workflow, and the trust block.

---

## 2. Technical Approach

| | **GSAP + ScrollTrigger** | **Framer Motion (useScroll/useTransform)** |
|---|---|---|
| Horizontal pin mechanic | Purpose-built for this (`pin: true`, scrub) — industry standard for this exact effect | Doable but more manual math (translateX tied to scroll progress) |
| Bundle cost | ~30–40kb extra dependency | Likely already idiomatic if more React animation gets added later |
| Learning curve | New API, but many examples for this exact pattern | May already be familiar |
| Fit with existing code | Separate from the current `ScrollReveal.tsx` (IntersectionObserver) | Can coexist with or replace `ScrollReveal.tsx` |

**Recommendation:** GSAP + ScrollTrigger for the horizontal-pin mechanism specifically — it's the tool built for this. Pair it with **Lenis** for smooth momentum scrolling globally. Keep Tailwind for everything else.

---

## 3. Component Plan

**Keep as-is:**
- `Navbar.tsx`, `Footer.tsx` structure
- Design tokens (`--color-primary`, `--color-accent`)
- Dark mode system

**New:**
- `frontend/app/components/landing/HorizontalScrollTrack.tsx` — the pinned container GSAP drives
- `frontend/app/components/landing/panels/` — one component per feature panel:
  - `HeroPanel.tsx`
  - `ProfilesPanel.tsx`
  - `GeneratorPanel.tsx`
  - `RewriterPanel.tsx`
  - `WorkflowPanel.tsx`
  - `TrustPanel.tsx`
- `frontend/app/hooks/useHorizontalScroll.ts` — wraps GSAP ScrollTrigger setup, cleanup, and reduced-motion check
- `frontend/app/components/landing/ScrollProgress.tsx` — Keeby-style scroll progress bar/dots
- `LandingPage.tsx` becomes the orchestrator: mounts `HorizontalScrollTrack` on desktop, falls back to the **existing vertical `ScrollReveal` stack** on mobile/reduced-motion

---

## 4. Mobile & Reduced-Motion Fallback (non-negotiable)

Scroll-jacked horizontal panels fight native scroll gestures on touch devices and can trigger motion sickness. Plan:

- Keep the current vertical `LandingPage.tsx` as the **mobile experience**, untouched.
- Only mount the horizontal GSAP version above a breakpoint (e.g. `md:` / pointer-fine media query) **and** when `prefers-reduced-motion` is not set.
- This extends the reduced-motion discipline already established in the project's animation rules.

---

## 5. Phased Build Order

1. **Dependencies & shell** — install `gsap`, `@gsap/react`, `lenis`; build `HorizontalScrollTrack` with placeholder panels; confirm pin/scrub feels right on desktop, mobile still renders the untouched vertical page.
2. **Progress indicator** — scroll-linked progress bar/dots so the mechanic feels intentional from the start.
3. **Migrate content panel-by-panel** — move real feature-card content (Profiles, Generator, Rewriter, Grammar Checker) into the new panel components, testing each in isolation.
4. **Signature interactive centerpiece** — pick one panel (hero or Generator) for a live demo, e.g. an email that visibly re-tones itself as a contact avatar swaps (Professor → Friend) — echoing Keeby's "hover a switch, hear it change" interactivity.
5. **Micro-interactions pass** — reuse existing hover/lift/active-scale rules inside panels; optional cursor-parallax on the hero.
6. **Accessibility pass** — keyboard nav between panels (arrow keys / tab order), skip link, verify DOM order stays semantic/linear for screen readers despite the horizontal visual layout.
7. **Performance pass** — GPU-accelerated transforms only (`transform`, not `left/top`), lazy-mount below-fold panel assets, check for scroll jank.
8. **QA** — `npm run lint && npm run build`, test at all standard breakpoints, verify both the mobile fallback and desktop GSAP path work from a cold load.

---

## 6. Open Decisions

- [x] Confirm GSAP + Lenis over Framer Motion (or stay dependency-light): **GSAP + ScrollTrigger + Lenis selected.**
- [x] Final panel count/order — the 6 listed above, or trim/add: **Keeping the 6 proposed panels in the exact order.**
- [x] Scope confirmation: `/` and `/landing` only, dashboard untouched: **Confirmed.**

---

## 7. Risks & Trade-offs

- **SEO/crawlability:** Not affected — DOM order stays semantic; horizontal layout is purely visual (CSS transform), so this is a non-issue as long as content isn't conditionally rendered only on scroll.
- **Accessibility:** Requires explicit keyboard navigation and skip-link work; don't skip step 6.
- **Motion sensitivity:** Mitigated by the mandatory reduced-motion/mobile fallback in section 4.
- **Dev/QA time:** Custom scroll physics take longer to get right than standard vertical sections — budget extra time for step 7/8 polish.