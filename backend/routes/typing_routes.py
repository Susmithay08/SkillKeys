from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from typing import List
from database import get_db
from models import User, TypingSession
from schemas import TypingSessionCreate, TypingSessionResponse
from auth import get_current_user

router = APIRouter(prefix="/typing", tags=["Typing"])


@router.post("/sessions", response_model=TypingSessionResponse)
def create_typing_session(
    session: TypingSessionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_session = TypingSession(
        user_id=current_user.id,
        wpm=session.wpm,
        accuracy=session.accuracy,
        errors=session.errors
    )
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return new_session


@router.get("/sessions", response_model=List[TypingSessionResponse])
def get_typing_sessions(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    sessions = db.query(TypingSession).filter(
        TypingSession.user_id == current_user.id
    ).order_by(TypingSession.date.desc()).all()
    return sessions


@router.get("/stats")
def get_typing_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    sessions = db.query(TypingSession).filter(
        TypingSession.user_id == current_user.id
    ).order_by(TypingSession.date.asc()).all()
    
    if not sessions:
        return {
            "average_wpm": 0,
            "best_wpm": 0,
            "current_streak": 0,
            "total_sessions": 0
        }
    
    avg_wpm = sum(s.wpm for s in sessions) / len(sessions)
    best_wpm = max(s.wpm for s in sessions)
    
    # Calculate streak
    dates = sorted(set(s.date.date() for s in sessions), reverse=True)
    streak = 0
    if dates:
        expected_date = datetime.utcnow().date()
        for date in dates:
            if date == expected_date or date == expected_date - timedelta(days=1):
                streak += 1
                expected_date = date - timedelta(days=1)
            else:
                break
    
    return {
        "average_wpm": round(avg_wpm, 2),
        "best_wpm": round(best_wpm, 2),
        "current_streak": streak,
        "total_sessions": len(sessions)
    }