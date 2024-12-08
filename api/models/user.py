from beanie import Document
from pydantic import EmailStr, Field, BaseModel
from typing import Optional
from datetime import datetime
from passlib.hash import bcrypt

class User(Document):
    email: EmailStr = Field(..., unique=True)
    hashed_password: str
    is_active: bool = True
    is_admin: bool = False
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = None

    class Settings:
        name = "users"  # MongoDB collection name

    def verify_password(self, password: str) -> bool:
        """Verify the password using bcrypt."""
        return bcrypt.verify(password, self.hashed_password)

    @classmethod
    def hash_password(cls, password: str) -> str:
        """Hash the password using bcrypt."""
        return bcrypt.hash(password)
