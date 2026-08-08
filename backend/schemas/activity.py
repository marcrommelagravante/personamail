from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class ActivityResponse(BaseModel):
    id: UUID
    contact_id: Optional[UUID]
    kind: str
    input_text: str
    subject: Optional[str]
    output_text: str
    summary: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
