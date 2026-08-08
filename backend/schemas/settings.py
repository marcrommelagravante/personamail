from typing import Optional

from pydantic import BaseModel, Field


class SettingsUpdate(BaseModel):
    default_tone: str = Field(min_length=1, max_length=50)
    default_greeting: Optional[str] = Field(default=None, max_length=120)
    default_closing: Optional[str] = Field(default=None, max_length=120)


class SettingsResponse(SettingsUpdate):
    class Config:
        from_attributes = True
