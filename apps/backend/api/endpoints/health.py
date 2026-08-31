from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class HealthCheck(BaseModel):
    status: str = "ok"
    version: str = "0.1.0"
    service: str = "kovae-api"

@router.get("", response_model=HealthCheck)
def get_health() -> HealthCheck:
    """
    Check if the API is running and reachable.
    """
    return HealthCheck()
