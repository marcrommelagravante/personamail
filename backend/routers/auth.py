import logging
import secrets
import uuid
from urllib.parse import urlencode

import httpx
from fastapi import APIRouter, Depends, Request, Response
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from core.config import settings
from core.db import get_db
from core.security import create_access_token, get_current_user_dependency
from models.user import User

logger = logging.getLogger(__name__)

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
        "prompt": "select_account",
        "state": state,
    }
    query = urlencode(params)
    response = RedirectResponse(f"{GOOGLE_AUTH_URL}?{query}")

    is_sec = settings.is_production or settings.BACKEND_URL.startswith("https://")
    response.set_cookie(
        key="oauth_state",
        value=state,
        httponly=True,
        secure=is_sec,
        samesite="none" if is_sec else "lax",
        max_age=600,  # 10 minutes
        path="/",
    )
    return response


@router.get("/google/callback")
async def google_callback(
    request: Request,
    code: str | None = None,
    state: str | None = None,
    error: str | None = None,
    db: Session = Depends(get_db),
):
    frontend_base = settings.FRONTEND_URL.rstrip("/")

    if error:
        logger.warning(f"Google OAuth error parameter received: {error}")
        return RedirectResponse(f"{frontend_base}/login?error={error}")

    if not code:
        logger.error("Google OAuth callback called without authorization code.")
        return RedirectResponse(f"{frontend_base}/login?error=missing_code")

    stored_state = request.cookies.get("oauth_state")
    if stored_state and state and stored_state != state:
        logger.warning("Mismatch in oauth_state cookie vs state query parameter.")

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
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
                logger.error(f"Google token exchange failed: {tokens}")
                error_detail = (
                    tokens.get("error_description")
                    or tokens.get("error")
                    or "token_exchange_failed"
                )
                return RedirectResponse(f"{frontend_base}/login?error={error_detail}")

            userinfo_res = await client.get(
                GOOGLE_USERINFO_URL,
                headers={"Authorization": f"Bearer {tokens['access_token']}"},
            )
            if userinfo_res.status_code != 200:
                logger.error(f"Google userinfo request failed: {userinfo_res.text}")
                return RedirectResponse(f"{frontend_base}/login?error=userinfo_failed")

            userinfo = userinfo_res.json()

        email = userinfo.get("email")
        if not email:
            logger.error("No email address provided by Google userinfo.")
            return RedirectResponse(f"{frontend_base}/login?error=missing_email")

        display_name = userinfo.get("name") or email.split("@")[0]
        picture = userinfo.get("picture")

        user = db.query(User).filter(User.email == email).first()
        if not user:
            user = User(
                id=uuid.uuid4(),
                email=email,
                name=display_name,
                picture=picture,
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        else:
            if display_name and user.name != display_name:
                user.name = display_name
            if picture and user.picture != picture:
                user.picture = picture
            db.commit()

        jwt_token = create_access_token(str(user.id), str(user.email))

        response = RedirectResponse(
            f"{frontend_base}/?login=success&token={jwt_token}"
        )
        is_sec = settings.is_production or settings.BACKEND_URL.startswith("https://")
        response.set_cookie(
            key="access_token",
            value=jwt_token,
            httponly=True,
            secure=is_sec,
            samesite="none" if is_sec else "lax",
            max_age=60 * 60 * 24 * 7,
            path="/",
        )
        response.delete_cookie("oauth_state", path="/")
        return response

    except Exception as exc:
        logger.exception(f"Unhandled exception during Google OAuth callback: {exc}")
        return RedirectResponse(f"{frontend_base}/login?error=internal_auth_error")


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
