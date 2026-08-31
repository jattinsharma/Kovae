from fastapi import APIRouter, Depends
from apps.backend.api.deps import verify_auth, get_supabase
from supabase import Client

router = APIRouter()

@router.get("/me")
async def get_my_profile(
    user_id: str = Depends(verify_auth),
    db: Client = Depends(get_supabase)
):
    """Get the profile of the currently authenticated user."""
    # Phase 2: return mock
    return {
        "id": user_id,
        "full_name": "Athlete",
        "experience_level": "intermediate"
    }

@router.put("/me")
async def update_my_profile(
    user_id: str = Depends(verify_auth),
    db: Client = Depends(get_supabase)
):
    """Update user profile data."""
    return {"status": "updated"}
