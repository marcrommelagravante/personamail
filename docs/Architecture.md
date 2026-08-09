# PersonaMail Architecture

## Overview

PersonaMail is a relationship-aware communication workspace. The Next.js
frontend communicates with a FastAPI API using credentialed REST requests. The
API owns authentication, AI calls, and all database access.

```text
Browser
  │  Next.js App Router (frontend/)
  │  credentials: include
  ▼
FastAPI (backend/)
  ├── Google OAuth + JWT cookie session
  ├── Contact, Template, History, and Settings routers
  ├── Email service → Groq
  └── SQLAlchemy → Neon PostgreSQL
```

## Frontend

The frontend is a Next.js App Router application using TypeScript, Tailwind
CSS, and Geist. `frontend/app/lib/api.ts` reads `NEXT_PUBLIC_API_URL`; it
defaults to `http://localhost:8000` for local development.

| Route | Purpose |
| --- | --- |
| `/` | Login, logout, and workspace entry point |
| `/generate` | Compose a relationship-aware email |
| `/rewrite` | Improve a draft for a selected contact |
| `/grammar-check` | Review grammar and clarity |
| `/contacts` | Manage communication profiles |
| `/templates` | Save reusable message templates |
| `/history` | Review or delete generated work |
| `/settings` | Set defaults for new contact profiles |

All API requests that require authentication send `credentials: "include"`.

## Backend

FastAPI routers are organized by resource. Protected routes derive the user
from the JWT cookie and filter database queries by that user’s ID.

| Layer | Responsibility |
| --- | --- |
| `core/config.py` | Environment, URL, CORS, and rate-limit settings |
| `core/security.py` | JWT creation, decoding, and current-user dependency |
| `core/rate_limit.py` | In-memory per-user AI endpoint limit |
| `routers/` | HTTP validation and authenticated resource operations |
| `services/groq_service.py` | Server-side Groq prompts and JSON fallbacks |
| `models/` | SQLAlchemy ORM definitions |
| `schemas/` | Pydantic request/response contracts |

The Compose, Improve, and Review endpoints are rate-limited together per
authenticated user. The current default is 20 requests per hour.

## Authentication and deployment configuration

Google OAuth starts at the backend and returns the user to `FRONTEND_URL`.
`BACKEND_URL` is used to construct the OAuth callback URL. In production, set
`ENVIRONMENT=production`, configure exact `CORS_ORIGINS`, and use HTTPS URLs.
The JWT cookie then uses `Secure` and `SameSite=None` for the separate Vercel
and Render origins.

## Database lifecycle

Neon PostgreSQL is managed through Alembic. The baseline revision is
`20260809_0001`. Application startup must not create tables. See
[Database_Design.md](Database_Design.md) for schema and migration instructions.
