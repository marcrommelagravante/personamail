from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from typing import List

from core.db import get_db
from core.security import get_current_user_dependency
from models.contact import Contact
from models.user import User
from schemas.contact import ContactCreate, ContactUpdate, ContactResponse

router = APIRouter(prefix="/contacts", tags=["contacts"])

@router.get("/", response_model=List[ContactResponse])
def list_contacts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_dependency),
):
    return db.query(Contact).filter(Contact.user_id == current_user.id).all()

@router.post("/", response_model=ContactResponse)
def create_contact(
    contact: ContactCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_dependency),
):
    new_contact = Contact(user_id=current_user.id, **contact.model_dump())
    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)
    return new_contact

@router.get("/{contact_id}", response_model=ContactResponse)
def get_contact(
    contact_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_dependency),
):
    contact = db.query(Contact).filter(
        Contact.id == contact_id, Contact.user_id == current_user.id
    ).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact

@router.put("/{contact_id}", response_model=ContactResponse)
def update_contact(
    contact_id: UUID,
    updates: ContactUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_dependency),
):
    contact = db.query(Contact).filter(
        Contact.id == contact_id, Contact.user_id == current_user.id
    ).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    for key, value in updates.model_dump(exclude_unset=True).items():
        setattr(contact, key, value)

    db.commit()
    db.refresh(contact)
    return contact

@router.delete("/{contact_id}")
def delete_contact(
    contact_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_dependency),
):
    contact = db.query(Contact).filter(
        Contact.id == contact_id, Contact.user_id == current_user.id
    ).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    db.delete(contact)
    db.commit()
    return {"message": "Contact deleted"}