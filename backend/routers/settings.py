from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.db import get_db
from core.security import get_current_user_dependency
from models.user import User
from models.user_preferences import UserPreferences
from schemas.settings import SettingsResponse, SettingsUpdate

router = APIRouter(prefix="/settings", tags=["settings"])


def get_or_create_preferences(db: Session, user_id) -> UserPreferences:
    preferences = (
        db.query(UserPreferences)
        .filter(UserPreferences.user_id == user_id)
        .first()
    )
    if not preferences:
        preferences = UserPreferences(user_id=user_id)
        db.add(preferences)
        db.commit()
        db.refresh(preferences)
    return preferences


@router.get("/", response_model=SettingsResponse)
def get_settings(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_dependency),
):
    return get_or_create_preferences(db, current_user.id)


@router.put("/", response_model=SettingsResponse)
def update_settings(
    updates: SettingsUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_dependency),
):
    preferences = get_or_create_preferences(db, current_user.id)
    for key, value in updates.model_dump().items():
        setattr(preferences, key, value)
    db.commit()
    db.refresh(preferences)
    return preferences
