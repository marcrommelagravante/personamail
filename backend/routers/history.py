from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from core.db import get_db
from core.security import get_current_user_dependency
from models.activity import Activity
from models.user import User
from schemas.activity import ActivityResponse

router = APIRouter(prefix="/history", tags=["history"])


@router.get("/", response_model=List[ActivityResponse])
def list_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_dependency),
):
    return (
        db.query(Activity)
        .filter(Activity.user_id == current_user.id)
        .order_by(Activity.created_at.desc())
        .all()
    )


@router.delete("/{activity_id}")
def delete_history_item(
    activity_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_dependency),
):
    activity = (
        db.query(Activity)
        .filter(Activity.id == activity_id, Activity.user_id == current_user.id)
        .first()
    )
    if not activity:
        raise HTTPException(status_code=404, detail="History item not found")

    db.delete(activity)
    db.commit()
    return {"message": "History item deleted"}
