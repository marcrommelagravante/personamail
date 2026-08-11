# PersonaMail 24/7 Production Deployment Guide

This guide details how to deploy PersonaMail to cloud infrastructure so that it remains **100% functional 24/7/365**, even when your personal computer or laptop is turned off or closed.

---

## Cloud Architecture

```
User Device (Phone / Laptop / Tablet)
          │
          ▼
┌──────────────────────────────────────┐
│  Frontend (Vercel)                   │
│  https://personamail-coral.vercel.app│
└──────────────────┬───────────────────┘
                   │  REST API + Cookies
                   ▼
┌──────────────────────────────────────┐
│  Backend (Render)                    │
│  https://personamail-api.onrender.com│
└─────────┬──────────────────┬─────────┘
          │                  │
          ▼                  ▼
┌──────────────────┐  ┌──────────────────┐
│ Groq AI API      │  │ Neon PostgreSQL  │
│ (llama-3.3-70b)  │  │ (Cloud DB)       │
└──────────────────┘  └──────────────────┘
```

---

## 1. Database (Neon PostgreSQL) - Already Baseline

- **Provider:** [Neon.tech](https://neon.tech)
- **Status:** Baseline migration `20260809_0001` applied.
- **Connection String:**
  ```env
  DATABASE_URL=postgresql://neondb_owner:...@ep-....neon.tech/neondb?sslmode=require
  ```

---

## 2. Backend API Deployment (Render Web Service)

Render hosts the FastAPI backend server 24/7 in the cloud.

### Steps:
1. Push your repository to **GitHub**.
2. Log into [Render.com](https://render.com) and click **New +** -> **Web Service**.
3. Connect your `personamail` GitHub repository.
4. Select **Root Directory**: `backend`
5. Set Build Command: `pip install -r requirements.txt && alembic upgrade head`
6. Set Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
7. Add Environment Variables:
   - `ENVIRONMENT` = `production`
   - `DATABASE_URL` = `<your Neon connection string>`
   - `GROQ_API_KEY` = `<your Groq API key>`
   - `GOOGLE_CLIENT_ID` = `<your Google OAuth Client ID>`
   - `GOOGLE_CLIENT_SECRET` = `<your Google OAuth Client Secret>`
   - `SECRET_KEY` = `<generate a secure random 32-char string>`
   - `FRONTEND_URL` = `https://personamail-coral.vercel.app`
   - `BACKEND_URL` = `https://<your-render-app-name>.onrender.com`
   - `CORS_ORIGINS` = `https://personamail-coral.vercel.app`

---

## 3. Frontend UI Deployment (Vercel)

Vercel hosts the Next.js App Router application on global CDN edge nodes.

### Steps:
1. Log into [Vercel.com](https://vercel.com) and click **Add New...** -> **Project**.
2. Import your `personamail` GitHub repository.
3. Set **Framework Preset**: `Next.js`
4. Set **Root Directory**: `frontend`
5. Add Environment Variable:
   - `NEXT_PUBLIC_API_URL` = `https://<your-render-app-name>.onrender.com`
6. Click **Deploy**.

---

## 4. Google OAuth Redirect URI Update

In [Google Cloud Console](https://console.cloud.google.com/apis/credentials):
1. Select your OAuth 2.0 Client ID.
2. Under **Authorized Javascript Origins**, add:
   - `https://<your-vercel-app-name>.vercel.app`
3. Under **Authorized Redirect URIs**, add:
   - `https://<your-render-app-name>.onrender.com/auth/google/callback`

---

## 24/7 Availability Verification

Once deployed to Vercel + Render + Neon:
- Your app is hosted in high-availability cloud data centers.
- You can turn off your laptop, close your browser, or access the web app from your smartphone anywhere in the world.
- Your contacts, history, templates, and AI generation remain available 24/7.
