from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str
    GROQ_API_KEY: str
    SECRET_KEY: str
    FRONTEND_URL: str

    class Config:
        env_file = ".env"

settings = Settings()