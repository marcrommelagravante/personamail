# PersonaMail — Footer / Closing Panel Documentation

**Panel:** 7 — Closing & Footer (final panel)
**Component:** `ClosingFooterPanel.tsx` (replaces `TrustPanel.tsx` — trust card removed)
**Position:** Final panel in the horizontal scroll track. No separate Panel 8 — footer content lives inside this panel.

> **Change log:**
> 1. Originally planned as a separate dark-themed Panel 8, outside the scroll track.
> 2. Then merged into Panel 7 (Trust), keeping the trust card, switched to the app's light theme.
> 3. **Trust card removed entirely.** Panel 7 is now just the closing headline + footer links, two-column.

---

## 1. Purpose

The scroll track's final panel: closes the pitch with the headline CTA, and doubles as the site footer — no separate footer panel needed.

---

## 2. Layout

Two-column split, no card, no icon:

**Left — closing headline block:**
- Headline: "Write like you know exactly who you're talking to."
- "Because you do." (blue accent)
- Subheadline: "Every conversation remembers who it's for."
- CTA: "Get Started Now →"

**Right — footer link stack (vertical, right-aligned):**
- PersonaMail · © 2026 PersonaMail
- Workflow
- Privacy
- Tech Stack

```
Write like you know                PersonaMail · © 2026 PersonaMail
exactly who you're
talking to.                        Workflow
Because you do.                    Privacy
                                    Tech Stack
Every conversation
remembers who it's for.

[ Get Started Now → ]
```

---

## 3. Color Palette

Matches the app's existing light theme (unchanged from the previous version of this doc):

- **Background:** white / very light gray
- **Accent:** PersonaMail blue ("Because you do.", CTA button)
- **Headline / body text:** dark slate
- **Footer link stack:** gray, hover to dark slate or blue, no underline

---

## 4. Copy

- Headline: "Write like you know exactly who you're talking to."
- Accent line: "Because you do."
- Subheadline: "Every conversation remembers who it's for."
- CTA: "Get Started Now →"
- Footer stack: PersonaMail · © 2026 PersonaMail / Workflow / Privacy / Tech Stack

Removing the trust card also removes the Groq/Gemini copy mismatch flagged earlier — that text no longer appears on the page, so no fix needed there anymore.

---

## 5. Navigation / Routing

| Link | Destination | Notes |
|---|---|---|
| Workflow | `/workflow` | New/standalone page — see Open Questions |
| Privacy | `/privacy` | New page |
| Tech Stack | `/tech-stack` | New page |

---

## 6. Visual & Styling Notes

- No card, no icon — just typography and whitespace, closer to the original Keeby-inspired closing layout
- Footer stack: right-aligned, vertical, ~16–20px gap between lines
- CTA button: solid blue pill with arrow, matches current build
- Since the trust card (and its visual weight) is gone, give the left column enough width/whitespace so the headline still anchors the panel — don't let the right-side stack overpower it

---

## 7. Open Questions

- ~~Workflow routing~~ — **Resolved:** no change needed, keep as-is.
- Privacy and Tech Stack are being built out as new standalone pages — see `Privacy_Page.md` and `Tech_Stack_Page.md`.
- **Note:** both the Privacy and Tech Stack pages will include the standard site header section (logo, nav, Sign in / Get Started) — they are not header-less standalone pages. See each page's Layout section.
