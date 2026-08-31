from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict

router = APIRouter()

class FeatureFlagsResponse(BaseModel):
    flags: Dict[str, bool]

@router.get("", response_model=FeatureFlagsResponse)
def get_flags() -> FeatureFlagsResponse:
    """
    Return global feature flags for the mobile app.
    These flags govern early access features or gradual rollouts.
    """
    # In production, these might be read from DB or a service like LaunchDarkly
    flags = {
        "enable_arc": True,
        "enable_challenges": False,
        "enable_machine_scan": False,
        "enable_recovery": False,
    }
    
    return FeatureFlagsResponse(flags=flags)
