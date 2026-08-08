from jose import jwt
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, Request
from sqlalchemy.orm import Session
from core.config import settings
from core.db import get_db

ALGORITHM = "HS256"
EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

def create_access_token(user_id: str, email: str):
    expire = datetime.utcnow() + timedelta(minutes=EXPIRE_MINUTES)
    payload = {"sub": user_id, "email": email, "exp": expire}
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=ALGORITHM)

def decode_access_token(token: str):
    try:
        return jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
    except Exception:
        return None

def get_current_user_dependency(request: Request, db: Session = Depends(get_db)):
    from models.user import User  # local import avoids circular import
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = db.query(User).filter(User.id == payload["sub"]).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user