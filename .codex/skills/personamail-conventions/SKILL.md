---
name: personamail-conventions
description: Use this skill when writing or editing any backend route, service, or frontend page in PersonaMail. Covers auth patterns, API conventions, and error handling style used throughout the project.
---

# PersonaMail Coding Conventions

## Backend routes
- Every protected FastAPI route must depend on:
  `current_user: User = Depends(get_current_user_dependency)`
- Every DB query filtering by ownership must include:
  `.filter(Model.user_id == current_user.id)`
- Use Pydantic response_model on every route for consistent output shape.
- Wrap external API calls (Groq) in try/except, and fall back to a
  reasonable default rather than raising a raw 500 when parsing fails.

## Frontend pages
- Every page needing auth state should fetch `/auth/me` with
  `credentials: "include"` on mount.
- API base URL is always `http://localhost:8000` in development —
  never hardcode 127.0.0.1.
- Forms should show a loading state during submission and a clear
  error message on failure (never fail silently).
- New pages should include the shared `<Navbar />` component from
  `app/components/Navbar.tsx`.

## Adding a new AI feature (pattern to follow)
1. Add a function to `backend/services/groq_service.py` following the
   existing `generate_email` / `rewrite_email` pattern (JSON-only
   prompt, strip markdown fences, fallback on parse failure).
2. Add request/response schemas to `backend/schemas/email.py`.
3. Add a route to `backend/routers/email.py`.
4. Add a frontend page under `frontend/app/<feature-name>/page.tsx`
   following the existing generate/rewrite page pattern.