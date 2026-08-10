# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
People communicating with varying professional or personal contacts (e.g., Professor, HR, Client, Friend) who need their messages to adapt appropriately to each relationship.

## Product Purpose
PersonaMail is a relationship-aware communication workspace that helps users compose, improve, and review emails. It exists to ensure users always have the right words for every relationship by automatically adapting tone and style per contact using AI.

## Positioning
"Every conversation remembers who it's for." 
Unlike generic AI email generators, PersonaMail uses Adaptive Communication Profiles to store preferences per contact, meaning the AI automatically adapts the tone, greeting, closing, length, and style without requiring repeated manual prompting.

## Operating Context
Users operate within a calm, distraction-free web workspace to draft and refine communications before sending them via their actual email clients. Workflows center around five primary areas: Compose, Contacts, Templates, History, and Settings.

## Capabilities and Constraints
**Capabilities:**
- Adaptive Communication Profiles (per-contact AI tone/style).
- Core actions: Compose, Improve, Review, Summary.
- Grammar checking and message rewriting.

**Constraints (Technical & UI):**
- Groq API is used for AI generation (llama-3.3-70b-versatile) and must remain server-side.
- AI must feel like a background capability, not the product's identity. No "AI Magic", no robot avatars, no prompt-box-as-default-UI.
- Strict 8px grid system, 8/12/16px border radii, subtle 1px borders, and soft shadows.

## Brand Commitments
- **Name:** PersonaMail
- **Voice:** Calm, Helpful, Confident, Clean, Friendly, Professional.
- **Typography:** Geist font only.
- **Colors:** Primary `#0F172A`, Accent `#7CE3FF`, Background `#F8FAFC`, White `#FFFFFF`.
- **Icons:** Lucide React icons only (no emoji).
- **Motion:** 150-250ms ease-out only. No bouncing, glowing, or particle effects.

## Product Principles
1. **Human-first:** It is a personal communication product, not a generic AI chat interface.
2. **Calm Assistance:** The interface never overwhelms; AI assists contextually without interrupting.
3. **Relationship-Driven:** The tool's output morphs to fit the relationship with the recipient, eliminating the need for prompt engineering.

## Accessibility & Inclusion
- Keyboard navigation and visible focus states are mandatory.
- Sufficient text contrast must be maintained.
- Color must never be the sole indicator of state.
- Reduced-motion preferences must be respected.
