# PersonaMail — Privacy Page Documentation

**Route:** `/privacy`
**Component:** `PrivacyPage.tsx`
**Linked from:** Footer stack on the closing panel (Panel 7)

---

## 1. Purpose

A standalone page explaining what data PersonaMail collects, how it's used, and how it's handled — written plainly rather than as dense legal boilerplate, since this is a portfolio project people will actually read.

---

## 2. Content Sections

### What's collected
- Name, email, and profile photo via Google OAuth
- Contacts and communication-style profiles the user creates (Professor, HR, Client, Friend, etc.)
- Drafts and generation history

### How it's used
- Contact/profile data is sent to Groq to generate tone-adapted drafts
- Drafts, contacts, and profiles are stored in PostgreSQL (via Neon) so they persist across sessions

### Third parties
- **Groq** — named explicitly as the AI processor handling generation requests
- API keys are never exposed client-side; all AI calls run server-side

### What's *not* done
- No selling or sharing of user data
- No use of user content to train external models

### Data control
- How a user can request deletion of their account and associated data

### Project context
- One short, honest note that this is a personal/portfolio project, not a commercial product — sets expectations without undercutting the seriousness of the page

---

## 3. Layout

- **Header:** standard site header (logo, nav, Sign in / Get Started) — same as the rest of the app, not a stripped-down standalone page
- Below the header, single-column, readable article layout — not a marketing panel:
- Page title: "Privacy"
- Short intro line (1–2 sentences, plain language)
- Section headers as listed above, each with 2–4 sentences of body copy
- Optional: last-updated date at the top or bottom

---

## 4. Visual & Styling Notes

Matches the app's light theme, consistent with the closing panel:
- **Background:** white / very light gray
- **Headings:** dark slate, same weight hierarchy as the rest of the site (no need to introduce new type styles for a legal-adjacent page)
- **Body text:** slightly muted gray for readability over long paragraphs
- **Accent:** PersonaMail blue used sparingly — e.g. section anchors or a "back to home" link, not throughout the body copy
- No card components needed here — this page is about clarity, not visual flourish

---

## 5. Open Questions

- Does this page need a simple in-page nav (jump links to each section) given the number of sections, or is it short enough to just scroll?
