from fastapi import APIRouter, Depends
from apps.backend.api.deps import verify_auth, get_supabase
from supabase import Client

router = APIRouter()

@router.get("/active")
async def get_active_arc(
    user_id: str = Depends(verify_auth),
    db: Client = Depends(get_supabase)
):
    """Get details about the user's currently active Arc."""
    return {
        "arc_name": "Winter Arc",
        "start_date": "2026-10-01",
        "end_date": "2026-12-31"
    }

@router.post("/{arc_id}/habits/{habit_id}/toggle")
async def toggle_arc_habit(
    arc_id: str,
    habit_id: str,
    user_id: str = Depends(verify_auth),
    db: Client = Depends(get_supabase)
):
    """Log a habit completion for today within the context of an Arc."""
    return {"status": "toggled", "habit_id": habit_id}
