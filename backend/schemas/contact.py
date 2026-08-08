from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class ContactBase(BaseModel):
    name: str
    email: Optional[str] = None
    relationship: str  # Professor, HR, Client, Friend, etc.
    tone: str          # formal, casual, friendly
    greeting: Optional[str] = None
    closing: Optional[str] = None
    notes: Optional[str] = None

class ContactCreate(ContactBase):
    pass

class ContactUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    relationship: Optional[str] = None
    tone: Optional[str] = None
    greeting: Optional[str] = None
    closing: Optional[str] = None
    notes: Optional[str] = None

class ContactResponse(ContactBase):
    id: UUID
    user_id: UUID
    created_at: datetime

    class Config:
        from_attributes = True