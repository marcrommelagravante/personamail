import httpx
import secrets
import uuid
from urllib.parse import urlencode

from fastapi import APIRouter, Depends, HTTPException, Request, Response
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from core.config import settings
from core.db import get_db
from core.security import create_access_token, decode_access_token, get_current_user_dependency
from models.user import User

router = APIRouter(prefix="/auth", tags=["auth"])

GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"


@router.get("/google/login")
def google_login():
    state = secrets.token_urlsafe(32)
    params = {
        "client_id": settings.GOOGLE_CLIENT_ID,
        "redirect_uri": f"{settings.BACKEND_URL}/auth/google/callback",
        "response_type": "code",
        "scope": "openid email profile",
        "access_type": "offline",
        "state": state,
    }
    query = urlencode(params)
    response = RedirectResponse(f"{GOOGLE_AUTH_URL}?{query}")
    response.set_cookie(
        key="oauth_state",
        value=state,
        httponly=True,
        secure=settings.is_production,
        samesite="none" if settings.is_production else "lax",
        max_age=600,  # 10 minutes
        path="/",
    )
    return response


@router.get("/google/callback")
async def google_callback(
    request: Request,
    code: str,
    state: str | None = None,
    db: Session = Depends(get_db),
):
    stored_state = request.cookies.get("oauth_state")
    if not stored_state or not state or stored_state != state:
        raise HTTPException(
            status_code=400,
            detail="Invalid OAuth state parameter. Request rejected for security.",
        )

    async with httpx.AsyncClient() as client:
        token_res = await client.post(
            GOOGLE_TOKEN_URL,
            data={
                "code": code,
                "client_id": settings.GOOGLE_CLIENT_ID,
                "client_secret": settings.GOOGLE_CLIENT_SECRET,
                "redirect_uri": f"{settings.BACKEND_URL}/auth/google/callback",
                "grant_type": "authorization_code",
            },
        )
        tokens = token_res.json()
        if "access_token" not in tokens:
            raise HTTPException(
                status_code=400, detail=f"Google token error: {tokens}"
            )

        userinfo_res = await client.get(
            GOOGLE_USERINFO_URL,
            headers={"Authorization": f"Bearer {tokens['access_token']}"},
        )
        userinfo = userinfo_res.json()

    user = db.query(User).filter(User.email == userinfo["email"]).first()
    if not user:
        user = User(
            id=uuid.uuid4(),
            email=userinfo["email"],
            name=userinfo["name"],
            picture=userinfo.get("picture"),
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    jwt_token = create_access_token(str(user.id), str(user.email))

    frontend_base = settings.FRONTEND_URL.rstrip("/")
    response = RedirectResponse(f"{frontend_base}/?login=success&token={jwt_token}")
    response.set_cookie(
        key="access_token",
        value=jwt_token,
        httponly=True,
        secure=settings.is_production,
        samesite="none" if settings.is_production else "lax",
        max_age=60 * 60 * 24 * 7,
        path="/",
    )
    response.delete_cookie("oauth_state", path="/")
    return response


@router.get("/me")
def get_current_user(user: User = Depends(get_current_user_dependency)):
    return {
        "id": str(user.id),
        "email": user.email,
        "name": user.name,
        "picture": user.picture,
    }


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    return {"message": "Logged out"}
