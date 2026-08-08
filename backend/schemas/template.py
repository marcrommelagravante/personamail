from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field


class TemplateBase(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    subject: str = Field(min_length=1, max_length=200)
    body: str = Field(min_length=1, max_length=10000)
    relationship: Optional[str] = Field(default=None, max_length=120)
    tone: Optional[str] = Field(default=None, max_length=50)


class TemplateCreate(TemplateBase):
    pass


class TemplateUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=1, max_length=120)
    subject: Optional[str] = Field(default=None, min_length=1, max_length=200)
    body: Optional[str] = Field(default=None, min_length=1, max_length=10000)
    relationship: Optional[str] = Field(default=None, max_length=120)
    tone: Optional[str] = Field(default=None, max_length=50)


class TemplateResponse(TemplateBase):
    id: UUID
    user_id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
