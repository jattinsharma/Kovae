from fastapi import APIRouter, Depends
from apps.backend.api.deps import verify_auth, get_supabase
from supabase import Client

router = APIRouter()

@router.post("/{workout_id}/start")
async def start_workout(
    workout_id: str,
    user_id: str = Depends(verify_auth),
    db: Client = Depends(get_supabase)
):
    """Mark a planned workout session as started."""
    return {"status": "started", "workout_id": workout_id}

@router.post("/{workout_id}/complete")
async def complete_workout(
    workout_id: str,
    user_id: str = Depends(verify_auth),
    db: Client = Depends(get_supabase)
):
    """Mark a workout session as completed and calculate stats."""
    return {"status": "completed", "workout_id": workout_id}

@router.post("/{workout_id}/sets")
async def log_set(
    workout_id: str,
    user_id: str = Depends(verify_auth),
    db: Client = Depends(get_supabase)
):
    """Log a single set (weight/reps) during a workout."""
    return {"status": "logged"}
