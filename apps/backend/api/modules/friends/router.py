from fastapi import APIRouter, Depends
from apps.backend.api.deps import verify_auth, get_supabase
from supabase import Client

router = APIRouter()

@router.get("/")
async def list_friends(
    user_id: str = Depends(verify_auth),
    db: Client = Depends(get_supabase)
):
    """List the user's friends."""
    return {"friends": []}

@router.get("/challenges")
async def list_challenges(
    user_id: str = Depends(verify_auth),
    db: Client = Depends(get_supabase)
):
    """List active challenges the user is participating in."""
    return {"challenges": []}
