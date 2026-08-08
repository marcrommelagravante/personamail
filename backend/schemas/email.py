from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class EmailGenerateRequest(BaseModel):
    contact_id: UUID
    purpose: str  # what the user wants the email to say

class EmailGenerateResponse(BaseModel):
    subject: str
    body: str

class EmailRewriteRequest(BaseModel):
    contact_id: UUID
    original_text: str

class EmailRewriteResponse(BaseModel):
    subject: str
    body: str

class GrammarCheckRequest(BaseModel):
    text: str

class GrammarCheckResponse(BaseModel):
    corrected_text: str
    changes_summary: str