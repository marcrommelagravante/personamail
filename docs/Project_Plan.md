# PersonaMail — Project Plan

> Version: 4.0 — Updated to reflect actual build state

## Overview

A full-stack web application — positioned as a **relationship-aware
communication workspace** — that helps users compose, improve, and
review emails using Groq's LLM API, with tone and style that
automatically adapt per contact.

## V1 Scope (Complete)

- [x] Google OAuth login
- [x] Adaptive Communication Profiles
- [x] AI Email Generator (rebranding to "Compose")
- [x] Email Rewriter (rebranding to "Improve")
- [x] Grammar Checker (rebranding to "Review")

## Unique Feature

### Adaptive Communication Profiles

Store communication preferences per contact (Professor, HR, Client,
Friend, etc.) so AI automatically adapts tone, greeting, closing,
length, and style. This is the mechanism behind the "relationship-aware
communication" positioning — see `docs/brand/Brand_Guidelines.md`.

## Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend
- FastAPI
- Python
- SQLAlchemy
- Pydantic

### Database
- PostgreSQL (Neon)

### Authentication
- Google OAuth 2.0 (JWT cookie sessions)

### AI
- **Groq API** (llama-3.3-70b-versatile)
- *Originally planned: Google Gemini API — switched because Gemini's
  free tier requires billing/card setup, which failed with a
  Google-side error (`OR_BACR2_44`). Groq's free tier requires no card.*

### Deployment
- Vercel (Frontend) — **not yet deployed**
- Render (Backend) — **not yet deployed**
- Neon PostgreSQL — **live**

## Architecture

```text
Frontend (Next.js)
        |
    REST API (credentials: include)
        |
Backend (FastAPI)
   |      |      |
Auth  EmailSvc ContactSvc
        |
 Groq Service
    |        |
  Groq    PostgreSQL
```

### Backend Folder Structure

```text
backend/
├── routers/     # API endpoints (auth, contacts, email)
├── services/    # groq_service.py — business logic, AI calls
├── models/      # SQLAlchemy ORM models (user, contact)
├── schemas/     # Pydantic request/response schemas
└── core/        # config, security, db session
```

### Frontend Folder Structure

```text
frontend/app/
├── page.tsx                # Home (login/logout)
├── contacts/page.tsx       # Contacts CRUD UI
├── generate/page.tsx       # Compose (AI Email Generator)
├── rewrite/page.tsx        # Improve (AI Email Rewriter)
├── grammar-check/page.tsx  # Review (Grammar Checker)
└── components/Navbar.tsx   # Shared nav
```

## Development Principles

- Service-layer architecture
- Modular prompts
- Structured JSON AI outputs
- Secure secret management
- Backend validation before AI calls
- Brand-consistent UI — see `docs/brand/AI_Agent_Design_Checklist.md`
  before creating or modifying any page

## Security Checklist

- [x] Verify Google ID tokens server-side (never trust client claims)
- [x] Session tokens in httpOnly + secure(prod)/lax cookies only
- [x] All Groq calls server-side only — API key never exposed to frontend
- [x] Every DB query scoped to authenticated user_id
- [ ] CORS locked to production Vercel domain only (currently allows
      localhost:3000 for dev — must restrict before deploy)
- [ ] Rate limit AI endpoints per user
- [x] Sanitize AI output before rendering (no dangerouslySetInnerHTML)
- [x] .env in .gitignore before first commit

## AI Project Context

Single source of truth is `AGENTS.md` at repo root (vision, architecture,
coding standards, common pitfalls, dev order), plus `docs/brand/` for
visual/voice identity.

## Repository Structure

```text
personamail/
├── frontend/
├── backend/
├── docs/
│   └── brand/
│       ├── Brand_Guidelines.md
│       └── AI_Agent_Design_Checklist.md
├── prompts/
├── .github/
├── AGENTS.md                 # replaces CLAUDE.md — shared project context
├── README.md
├── CONTRIBUTING.md
└── LICENSE
```

## Recommended Development Order

1. [x] Repository structure
2. [x] README.md + AGENTS.md
3. [x] Architecture documentation (`docs/Architecture.md`)
4. [x] Database design documentation (`docs/Database_Design.md`)
5. [x] API specification (`docs/API_Specification.md` and FastAPI `/docs`)
6. [x] Feature implementation (V1 complete)
7. [x] CI quality gates (`.github/workflows/ci.yml`)

## Current Priorities (as of this plan version)

1. Deploy: Vercel (frontend) + Render (backend)
2. End-to-end production verification
3. Consider persistent/distributed rate limiting before scaling beyond one API instance
