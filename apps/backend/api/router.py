from fastapi import APIRouter
from apps.backend.api.endpoints import health, flags, today
from apps.backend.api.modules.users import router as users_router
from apps.backend.api.modules.planner import router as planner_router
from apps.backend.api.modules.workouts import router as workouts_router
from apps.backend.api.modules.arc import router as arc_router
from apps.backend.api.modules.friends import router as friends_router

api_router = APIRouter()

# Core endpoints
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(flags.router, prefix="/flags", tags=["feature_flags"])
api_router.include_router(today.router, prefix="/today", tags=["today_engine"])

# Feature Modules
api_router.include_router(users_router.router, prefix="/users", tags=["users"])
api_router.include_router(planner_router.router, prefix="/planner", tags=["planner"])
api_router.include_router(workouts_router.router, prefix="/workouts", tags=["workouts"])
api_router.include_router(arc_router.router, prefix="/arcs", tags=["arc"])
api_router.include_router(friends_router.router, prefix="/friends", tags=["friends"])
