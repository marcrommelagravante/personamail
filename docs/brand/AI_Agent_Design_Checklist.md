# PersonaMail AI Agent Design Checklist

> Version: 0.1 — UI Quality Gate

## Purpose

This document is a mandatory pre-flight checklist for AI agents and developers creating or modifying PersonaMail pages and UI components.

The goal is to make every new page feel like the same product and prevent generic “AI app” design.

## Before Creating a Page

### Brand
- [ ] Understand the page's purpose and primary user action.
- [ ] Follow PersonaMail's relationship-aware communication identity.
- [ ] Do not make AI the visual focus unless directly relevant.
- [ ] Use approved product language.
- [ ] Do not introduce new branding without documenting the decision.

### Color
- [ ] Primary: `#0F172A`
- [ ] Accent: `#7CE3FF`
- [ ] Background: `#F8FAFC`
- [ ] White: `#FFFFFF`
- [ ] Accent is used intentionally, not everywhere.
- [ ] No random colors.
- [ ] No default purple AI gradients.
- [ ] Contrast is accessible.

### Typography
- [ ] Use Geist.
- [ ] Establish a clear heading/body hierarchy.
- [ ] Do not introduce another font without explicit approval.
- [ ] Keep text readable and appropriately sized.

### Layout
- [ ] Use generous whitespace.
- [ ] Follow a consistent 8px spacing system.
- [ ] Avoid crowded layouts.
- [ ] Establish one clear primary action.
- [ ] Keep visual hierarchy obvious.
- [ ] Use consistent 8–16px component radii where appropriate.

### Components
- [ ] Buttons have clear labels.
- [ ] Primary and secondary actions are visually distinct.
- [ ] Cards use subtle borders and restrained shadows.
- [ ] Inputs have visible labels or accessible equivalents.
- [ ] Icons use a consistent style.
- [ ] Prefer Lucide Icons.
- [ ] Do not use emoji as UI icons.
- [ ] Avoid excessive pill-shaped components.

### AI Experience
- [ ] AI is integrated into the workflow rather than presented as the product identity.
- [ ] No robot avatars.
- [ ] No “AI Magic” language.
- [ ] No unnecessary “Powered by AI” labels.
- [ ] No prompt box as the default interface unless genuinely required.
- [ ] AI actions use human-readable language such as Compose, Improve, Review, or Summary.
- [ ] AI loading states are subtle.

### Motion
- [ ] Animations have a purpose.
- [ ] Transitions are subtle.
- [ ] Prefer approximately 150–250ms for common UI transitions.
- [ ] No bouncing UI.
- [ ] No glowing/pulsing AI effects.
- [ ] No decorative particles.

### States
- [ ] Loading state is designed.
- [ ] Empty state is designed.
- [ ] Error state is designed.
- [ ] Success state is designed when needed.
- [ ] Disabled states are understandable.
- [ ] Focus states are visible.

### Responsive
- [ ] Desktop layout works.
- [ ] Tablet layout works.
- [ ] Mobile layout works.
- [ ] Mobile is simplified rather than merely scaled down.
- [ ] Navigation remains usable on smaller screens.

### Accessibility
- [ ] Keyboard navigation works.
- [ ] Focus states are visible.
- [ ] Text and controls have sufficient contrast.
- [ ] Color is not the only way information is communicated.
- [ ] Interactive targets are appropriately sized.
- [ ] Images/icons have appropriate accessible labels where needed.
- [ ] Reduced-motion preferences are respected.

## Before Marking the Page Complete

Ask:
1. Does this look like PersonaMail?
2. Does it feel like a communication product rather than an AI wrapper?
3. Is the primary action obvious?
4. Is there enough whitespace?
5. Is the accent color being used sparingly?
6. Is Geist used consistently?
7. Are the components visually consistent?
8. Are AI elements subtle and contextual?
9. Does the page work on mobile?
10. Would the page still look good if the word “AI” were removed?

## Final Rule

> **If a design looks impressive because it looks “AI,” it probably does not fit PersonaMail.**

PersonaMail should feel intelligent because the experience is thoughtful—not because the interface is covered in AI visual effects.
