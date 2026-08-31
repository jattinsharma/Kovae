"""
Today API endpoint.

GET /api/v1/today
Returns the complete Today payload for the authenticated user.

This is the sole data source for the Home screen.
"""

from fastapi import APIRouter
from apps.backend.engines.today_engine import today_engine, TodayPayload

router = APIRouter()


@router.get("", response_model=TodayPayload)
async def get_today() -> TodayPayload:
    """
    Resolve the current day's actionable state for the requesting user.
    
    In production this will extract the user_id from the JWT.
    Phase 2 returns mock data for development.
    """
    # TODO: Extract user_id from auth header / JWT
    user_id = "mock-user-id"
    
    payload = await today_engine.resolve(user_id)
    return payload
