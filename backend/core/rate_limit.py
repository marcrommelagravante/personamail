from collections import defaultdict, deque
from threading import Lock
from time import time

from fastapi import Depends, HTTPException

from core.config import settings
from core.security import get_current_user_dependency
from models.user import User

_requests_by_user: dict[str, deque[float]] = defaultdict(deque)
_lock = Lock()


def enforce_ai_rate_limit(
    current_user: User = Depends(get_current_user_dependency),
) -> User:
    now = time()
    cutoff = now - settings.AI_RATE_LIMIT_WINDOW_SECONDS

    with _lock:
        requests = _requests_by_user[str(current_user.id)]
        while requests and requests[0] <= cutoff:
            requests.popleft()

        if len(requests) >= settings.AI_RATE_LIMIT_REQUESTS:
            retry_after = max(1, int(requests[0] + settings.AI_RATE_LIMIT_WINDOW_SECONDS - now))
            raise HTTPException(status_code=429, detail="AI request limit reached. Please try again shortly.", headers={"Retry-After": str(retry_after)})

        requests.append(now)

    return current_user
