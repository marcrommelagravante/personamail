from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from core.db import get_db
from core.security import get_current_user_dependency
from models.contact import Contact
from models.user import User
from schemas.email import (
    EmailGenerateRequest,
    EmailGenerateResponse,
    EmailRewriteRequest,
    EmailRewriteResponse,
    GrammarCheckRequest,
    GrammarCheckResponse,
)
from services.groq_service import generate_email, rewrite_email, check_grammar

router = APIRouter(prefix="/email", tags=["email"])

@router.post("/generate", response_model=EmailGenerateResponse)
def generate(
    request: EmailGenerateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_dependency),
):
    contact = db.query(Contact).filter(
        Contact.id == request.contact_id,
        Contact.user_id == current_user.id,
    ).first()

    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    result = generate_email(
        purpose=request.purpose,
        contact_name=contact.name,
        relationship=contact.relationship,
        tone=contact.tone,
        greeting=contact.greeting,
        closing=contact.closing,
        notes=contact.notes,
    )

    return result


@router.post("/rewrite", response_model=EmailRewriteResponse)
def rewrite(
    request: EmailRewriteRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_dependency),
):
    contact = db.query(Contact).filter(
        Contact.id == request.contact_id,
        Contact.user_id == current_user.id,
    ).first()

    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    result = rewrite_email(
        original_text=request.original_text,
        contact_name=contact.name,
        relationship=contact.relationship,
        tone=contact.tone,
        greeting=contact.greeting,
        closing=contact.closing,
        notes=contact.notes,
    )

    return result


@router.post("/grammar-check", response_model=GrammarCheckResponse)
def grammar_check(
    request: GrammarCheckRequest,
    current_user: User = Depends(get_current_user_dependency),
):
    result = check_grammar(request.text)
    return result