# PersonaMail — Landing Page Documentation

**Brand voice reference:** relationship-aware communication. Avoid "AI Generator / AI Rewrite / AI Grammar / Magic Prompt / AI Magic / Powered by AI." No robot avatars, no prompt-box-as-default-interface. Use the existing product language: **Compose · Contacts · Improve · Review · Communication Style.**

---

## 1. Architecture & Layout

The landing page features a dual-layout architecture:
- **Desktop (Motion Enabled):** A continuous horizontal canvas using GSAP `ScrollTrigger` and a `HorizontalScrollTrack` component. Panels are laid out left-to-right to create a seamless timeline experience.
- **Mobile & Reduced Motion:** A traditional, vertically stacked responsive layout using `ScrollReveal` for entrance animations.

### Core Components
- `LandingPage.tsx`: The main entry point that switches between the horizontal and vertical layouts based on viewport and motion preferences.
- `HorizontalScrollTrack.tsx`: The GSAP-powered container that pins the viewport and translates the panels horizontally.
- `ScrollReveal.tsx`: Handles IntersectionObserver-based fade-in and slide-up animations within individual panels.
- `LoginModal.tsx`: An accessible, animated modal for Google Sign-In and logout transitions.

---

## 2. Horizontal Scroll Panels

### Panel 1: Hero (`HeroPanel.tsx`)
- **Headline:** The right words for every relationship.
- **Subheadline:** PersonaMail learns how you communicate with each person — and helps you write emails that sound like you, every time.
- **Interactive Element:** A prominent, interactive feature demo that cycles through Compose/Improve/Review to show the product in action immediately.
- **CTAs:** "Get Started" (Opens Login Modal)

### Panel 2: Profiles (`ProfilesPanel.tsx`)
- **Focus:** The **Contacts** feature.
- **Copy:** "Every relationship deserves its own voice." "Remember the person, not just the email address."
- **Visuals:** Side-by-side comparison of "Generic Email Tools" vs "PersonaMail Relationship-Aware Voice".

### Panel 3: Generator (`GeneratorPanel.tsx`)
- **Focus:** The **Compose** feature.
- **Copy:** "Start with the idea. PersonaMail helps shape it into the right message."
- **Visuals:** UI preview of creating a draft from scratch tailored to a specific recipient.

### Panel 4: Rewriter (`RewriterPanel.tsx`)
- **Focus:** The **Improve** feature.
- **Copy:** "Already wrote it? Make it better without losing your voice."
- **Visuals:** UI preview of refining a rough draft by sharpening tone and tightening wording.

### Panel 5: Review (`ReviewPanel.tsx`)
- **Focus:** The **Review** feature.
- **Copy:** "Make sure your message is ready before you send it."
- **Visuals:** UI preview of catching grammar, spelling, and clarity issues.

### Panel 6: Workflow (`WorkflowPanel.tsx`)
- **Headline:** Three steps to a better email.
- **Steps:**
  1. Add a contact (Tell PersonaMail who you're writing to)
  2. Compose or Improve (Write from scratch or bring in a draft)
  3. Review and send (Check the message and send with confidence)

### Panel 7: Trust (`TrustPanel.tsx`)
- **Headline:** Built for people who write a lot of email.
- **Copy:** Emphasizes data privacy, secure server-side AI via Groq, and never exposing API keys.
- **Final CTA:** "Write like you know exactly who you’re talking to."

---

## 3. Footer (`LandingFooter.tsx`)

The footer sits *outside* the horizontal scroll track so the page unpins naturally and scrolls down to reveal it.

- **Design:** Premium, dark-themed footer (`#090c14` / `#0F172A`).
- **Logo:** PersonaMail (Vector SVG).
- **Navigation:**
  - Product (Compose, Contacts, Improve, Review)
  - Company (About, Workflow)
  - Legal (Privacy, Terms)

---

## 4. UI/UX Rules & Micro-Interactions

- **Hover States:** All interactive elements must have explicit hover feedback (e.g., `hover:-translate-y-0.5`, `hover:shadow-md`, `active:scale-[0.98]`).
- **Dark Mode Support:** The landing page fully supports system/user dark mode preferences via Tailwind `dark:` variants and the `ThemeToggle` component.
- **Animations:** Entrance animations use `animate-fade-in-up` and `animate-slide-down-fade`. Horizontal scrolling is driven by GSAP to ensure a smooth 60fps experience.
- **Accessibility:** Ensure ARIA labels on icons, maintain 44px minimum touch targets on mobile, and respect `prefers-reduced-motion` queries.