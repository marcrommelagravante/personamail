from sqlalchemy import Column, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID

from core.db import Base


class UserPreferences(Base):
    __tablename__ = "user_preferences"

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True)
    default_tone = Column(String, nullable=False, default="formal")
    default_greeting = Column(String, nullable=True)
    default_closing = Column(String, nullable=True)
