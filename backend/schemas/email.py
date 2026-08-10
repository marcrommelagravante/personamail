from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field, field_validator


class EmailGenerateRequest(BaseModel):
    contact_id: UUID
    purpose: str = Field(..., min_length=1, max_length=3000, description="Email purpose or prompt details")

    @field_validator("purpose")
    @classmethod
    def validate_purpose(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("Purpose cannot be empty or blank")
        return cleaned


class EmailGenerateResponse(BaseModel):
    subject: str
    body: str


class EmailRewriteRequest(BaseModel):
    contact_id: UUID
    original_text: str = Field(..., min_length=1, max_length=8000, description="Original email draft to rewrite")

    @field_validator("original_text")
    @classmethod
    def validate_original_text(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("Original text cannot be empty or blank")
        return cleaned


class EmailRewriteResponse(BaseModel):
    subject: str
    body: str


class GrammarCheckRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=8000, description="Text to proofread and review")

    @field_validator("text")
    @classmethod
    def validate_text(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("Text cannot be empty or blank")
        return cleaned


class GrammarCheckResponse(BaseModel):
    corrected_text: str
    changes_summary: str