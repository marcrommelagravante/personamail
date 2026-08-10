from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings
from models import activity, contact, template, user, user_preferences
from routers import auth, contacts, email, history, settings as settings_router, templates

app = FastAPI(title="PersonaMail API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(contacts.router)
app.include_router(email.router)
app.include_router(templates.router)
app.include_router(history.router)
app.include_router(settings_router.router)

@app.get("/")
def root():
    return {"message": "PersonaMail API is running"}

@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "personamail-api"}

