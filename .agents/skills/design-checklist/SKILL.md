---
name: design-checklist
description: Use this skill before creating or modifying any PersonaMail frontend page or UI component. Enforces brand-consistent colors, typography, spacing, and AI-experience rules.
---

# PersonaMail Design Checklist

Before marking any page complete, verify:
- Colors: Primary #0F172A, Accent #7CE3FF (sparingly), Background #F8FAFC, White #FFFFFF
- Font: Geist only
- Spacing: 8px grid, radius 8/12/16px, subtle 1px borders, soft shadows
- Icons: Lucide only, no emoji
- Motion: 150-250ms ease-out only, no bouncing/glowing/particles
- Language: "Compose/Improve/Review/Summary" — never "AI Generator/AI Rewrite/AI Magic"
- No robot avatars, no "Powered by AI" labels, no prompt-box-as-default-UI
- Loading/empty/error/success states are all designed, not skipped
- Works on desktop, tablet, and mobile (simplified, not just shrunk)
- Keyboard navigation and visible focus states work

Full reference: docs/brand/Brand_Guidelines.md and
docs/brand/AI_Agent_Design_Checklist.md

Final gut-check: if a design looks impressive because it looks "AI,"
it probably doesn't fit PersonaMail.