from fastapi import APIRouter, Depends
from apps.backend.api.deps import verify_auth, get_supabase
from apps.backend.engines.planner_engine import planner_engine, WeeklyPlan
from supabase import Client

router = APIRouter()

@router.post("/generate", response_model=WeeklyPlan)
async def generate_plan(
    user_id: str = Depends(verify_auth),
    db: Client = Depends(get_supabase)
):
    """
    Generate a new multi-day training and habit plan.
    This invokes the Planner Engine.
    """
    plan = await planner_engine.generate_week(user_id)
    return plan

@router.get("/current", response_model=WeeklyPlan)
async def get_current_plan(
    user_id: str = Depends(verify_auth),
    db: Client = Depends(get_supabase)
):
    """Get the currently active weekly plan."""
    # Just generating a mock one for now
    plan = await planner_engine.generate_week(user_id)
    return plan
