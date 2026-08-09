# AGENTS.md — PersonaMail

## Project Overview
PersonaMail is a full-stack AI email assistant. It generates, rewrites,
and grammar-checks emails using Groq's LLM API, with tone/style that
automatically adapts per contact (Adaptive Communication Profiles).

## Tech Stack
- Frontend: Next.js (App Router) + TypeScript + Tailwind CSS
- Backend: FastAPI + Python + SQLAlchemy + Pydantic
- Database: PostgreSQL (Neon)
- Auth: Google OAuth 2.0 (JWT cookie sessions)
- AI: Groq API (llama-3.3-70b-versatile)
- Deployment: Vercel (frontend), Render (backend), Neon (DB)

## Architecture
Frontend (Next.js) → REST API (fetch, credentials: include) → 
Backend (FastAPI) → Groq / PostgreSQL

## Backend Structure
backend/
├── routers/     # API endpoints: auth.py, contacts.py, email.py
├── services/    # Business logic: groq_service.py
├── models/      # SQLAlchemy ORM: user.py, contact.py
├── schemas/     # Pydantic request/response schemas
└── core/        # config.py, db.py, security.py

## Frontend Structure
frontend/app/
├── page.tsx              # Home (login/logout)
├── contacts/page.tsx      # Contacts CRUD UI
├── generate/page.tsx      # AI Email Generator
├── rewrite/page.tsx       # AI Email Rewriter
├── grammar-check/page.tsx # Grammar Checker
└── components/Navbar.tsx  # Shared nav

## Key Rules
- Always use "localhost" (never 127.0.0.1) for both frontend and backend
  URLs — cookies do not share across those two hosts, causing auth bugs.
- All Groq API calls must stay server-side only (never expose API key
  to frontend).
- Every DB query must be scoped to authenticated user_id — never trust
  client-provided user IDs.
- Every protected route must use `get_current_user_dependency` from
  core/security.py.
- Frontend fetch calls to the backend must always include
  `credentials: "include"` or auth cookies won't be sent.
- AI service functions (backend/services/groq_service.py) must return
  parsed JSON with a fallback if the model doesn't return valid JSON.
- Sanitize any AI-generated output before rendering in the UI.

## Common Pitfalls (from past debugging)
- Zombie backend processes can pile up on port 8000 across restarts,
  causing all requests to hang. Check with:
  `netstat -ano | findstr :8000`
  then kill with: `taskkill //PID <pid> //F` (double slashes in Git Bash)
- Always activate the venv before running uvicorn:
  `source venv/Scripts/activate`
- Always use Git Bash for backend commands; do not use PowerShell to
  activate or run the backend virtual environment.
- New Python packages must be installed inside the activated venv, or
  imports will silently fail with ModuleNotFoundError.

## Development Order (for new features)
1. Define the SQLAlchemy model (if new data is needed)
2. Define Pydantic schemas (request/response)
3. Build the service function (business logic)
4. Build the router (API endpoint)
5. Register the router in main.py
6. Build the frontend page/component
7. Test end-to-end via /docs, then via the actual UI

## Progress Tracking

After completing a project task, update this section with its status,
verification, and the next active task. Keep this concise and accurate.

### Current Status (2026-08-09)

- [x] Brand/UI foundation and shared navigation
- [x] Templates, History, and Settings workspace features
- [x] Production-hardening implementation: configurable URLs/CORS/cookies,
  token-log removal, and per-user AI request limits
- [x] Verify the repaired backend and resolve the configuration-name collision
- [x] Add and baseline Alembic migrations in Neon (`20260809_0001`)
- [x] Add CI quality gates and formal architecture, database, and API documentation
- [ ] Deploy the frontend to Vercel and backend to Render, then run production verification

## Database Migrations

- Never use `Base.metadata.create_all()` in application startup.
- Run all migration commands from Git Bash after activating the backend venv:
  `source venv/Scripts/activate`
- For every model/schema change, generate and review a migration before applying it:
  `alembic revision --autogenerate -m "describe change"`
- Apply migrations with `alembic upgrade head`, then verify with
  `alembic check` and `alembic current`.
- The current Neon baseline revision is `20260809_0001`.
