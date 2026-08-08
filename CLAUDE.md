# CLAUDE.md — PersonaMail

## Project Overview
AI-powered email assistant that adapts tone per contact using Google Gemini.

## Tech Stack
- Frontend: Next.js + TypeScript + Tailwind CSS + shadcn/ui
- Backend: FastAPI + Python + SQLAlchemy + Pydantic
- DB: PostgreSQL (Neon)
- Auth: Google OAuth
- AI: Google Gemini API

## Architecture
Frontend (Next.js) → REST API → FastAPI Backend → Gemini / PostgreSQL

## Backend Structure
backend/routers/   → API endpoints (auth, email, contact)
backend/services/  → Business logic (EmailSvc, ContactSvc, GeminiService)
backend/models/    → SQLAlchemy ORM models
backend/schemas/   → Pydantic schemas
backend/core/      → Config, security, DB session

## Key Rules
- All Gemini calls server-side only — never expose API key to frontend
- Every DB query must be scoped to authenticated user_id
- Sanitize all AI output before rendering
- Use structured JSON outputs from Gemini
- Backend validates all inputs before AI calls