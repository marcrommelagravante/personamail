from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from core.db import get_db
from core.rate_limit import enforce_ai_rate_limit
from models.activity import Activity
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
from services.groq_service import check_grammar, generate_email, rewrite_email

router = APIRouter(prefix="/email", tags=["email"])


def get_owned_contact(db: Session, contact_id, user_id: str) -> Contact:
    contact = (
        db.query(Contact)
        .filter(Contact.id == contact_id, Contact.user_id == user_id)
        .first()
    )
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact


@router.post("/generate", response_model=EmailGenerateResponse)
def generate(
    request: EmailGenerateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(enforce_ai_rate_limit),
):
    contact = get_owned_contact(db, request.contact_id, current_user.id)
    result = generate_email(
        purpose=request.purpose,
        contact_name=contact.name,
        relationship=contact.relationship,
        tone=contact.tone,
        greeting=contact.greeting,
        closing=contact.closing,
        notes=contact.notes,
    )
    db.add(Activity(user_id=current_user.id, contact_id=contact.id, kind="compose", input_text=request.purpose, subject=result["subject"], output_text=result["body"]))
    db.commit()
    return result


@router.post("/rewrite", response_model=EmailRewriteResponse)
def rewrite(
    request: EmailRewriteRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(enforce_ai_rate_limit),
):
    contact = get_owned_contact(db, request.contact_id, current_user.id)
    result = rewrite_email(
        original_text=request.original_text,
        contact_name=contact.name,
        relationship=contact.relationship,
        tone=contact.tone,
        greeting=contact.greeting,
        closing=contact.closing,
        notes=contact.notes,
    )
    db.add(Activity(user_id=current_user.id, contact_id=contact.id, kind="improve", input_text=request.original_text, subject=result["subject"], output_text=result["body"]))
    db.commit()
    return result


@router.post("/grammar-check", response_model=GrammarCheckResponse)
def grammar_check(
    request: GrammarCheckRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(enforce_ai_rate_limit),
):
    result = check_grammar(request.text)
    db.add(Activity(user_id=current_user.id, kind="review", input_text=request.text, output_text=result["corrected_text"], summary=result["changes_summary"]))
    db.commit()
    return result
