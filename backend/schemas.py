from pydantic import BaseModel, EmailStr, ConfigDict
from datetime import datetime
from typing import Optional


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


class TypingSessionCreate(BaseModel):
    wpm: float
    accuracy: float
    errors: int


class TypingSessionResponse(BaseModel):
    id: int
    user_id: int
    date: datetime
    wpm: float
    accuracy: float
    errors: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)