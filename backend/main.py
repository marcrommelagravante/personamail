from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, contacts, email

app = FastAPI(title="PersonaMail API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(contacts.router)
app.include_router(email.router)

@app.get("/")
def root():
    return {"message": "PersonaMail API is running"}