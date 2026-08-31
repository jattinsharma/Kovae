"""
KOVAE Today Engine
==================

The Today Engine resolves the current day's actionable state for a user.
It consumes output from the Planner Engine (which owns multi-day schedule
generation and rescheduling) and combines it with real-time workout, habit,
Arc, and recovery state to produce a single unified "Today" payload.

Architecture:

    Planner Engine  (determines multi-day schedule)
          ↓
    Today Engine    (resolves current-day actionable state)
          ↓
    Home Screen     (renders the experience)

The Today Engine is the ONLY data source for the Home screen.
It does NOT generate plans — it reads them.

Responsibilities:
  1. Resolve today's planned workout from plan_days + planned_exercises
  2. Gather today's habit checklist from arcs, arc_habits, habit_logs
  3. Compute Arc progress (current day, streak, compliance)
  4. Aggregate recovery state (sleep, soreness, readiness)
  5. Build tomorrow's preview from the next plan_day
  6. Compute completion metrics (tasks done / total)
  7. Handle edge cases: rest days, plan changes mid-day, no active plan
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import date


# ──────────────────────────────────────────
# Today Engine Response Models
# ──────────────────────────────────────────

class TodayWorkout(BaseModel):
    """The workout scheduled for today, if any."""
    id: str
    title: str
    duration_minutes: int
    exercise_count: int
    muscle_groups: list[str] = Field(default_factory=list)
    is_rest_day: bool = False
    is_started: bool = False
    is_completed: bool = False


class TodayHabit(BaseModel):
    """A single habit to track today."""
    id: str
    title: str
    icon: str
    target: Optional[str] = None  # e.g. "3L", "10k steps"
    current: Optional[str] = None  # e.g. "2.1L", "4k steps"
    completed: bool = False


class TodayArc(BaseModel):
    """Summary of the user's active Arc."""
    arc_id: str
    arc_name: str
    current_day: int
    total_days: int
    streak: int
    compliance_pct: float = 0.0  # 0-100
    is_active: bool = True


class TodayRecovery(BaseModel):
    """Recovery readiness snapshot."""
    readiness_score: Optional[float] = None  # 0-100
    sleep_hours: Optional[float] = None
    soreness_level: Optional[int] = None  # 1-5
    recommendation: Optional[str] = None  # e.g. "Train normally", "Reduce volume"


class TomorrowPreview(BaseModel):
    """What's coming tomorrow."""
    title: str
    duration: str
    activities: list[str] = Field(default_factory=list)
    is_rest_day: bool = False


class TodayPayload(BaseModel):
    """
    The complete payload powering the Home screen.
    This is the single response from GET /api/v1/today.
    """
    date: date
    greeting_name: str
    
    # Completion
    completed_tasks: int = 0
    total_tasks: int = 0
    
    # Core sections
    workout: Optional[TodayWorkout] = None
    habits: list[TodayHabit] = Field(default_factory=list)
    arc: Optional[TodayArc] = None
    recovery: Optional[TodayRecovery] = None
    tomorrow: Optional[TomorrowPreview] = None


# ──────────────────────────────────────────
# Today Engine Service
# ──────────────────────────────────────────

class TodayEngine:
    """
    Resolves the user's current-day state.
    
    In Phase 2 this returns mock data.
    In Phase 3+ it queries Planner output, habit logs, Arc state,
    and recovery records from the database.
    """
    
    async def resolve(self, user_id: str, target_date: Optional[date] = None) -> TodayPayload:
        """
        Build the complete Today payload for a given user and date.
        
        Args:
            user_id: The authenticated user's ID.
            target_date: The date to resolve. Defaults to today.
        
        Returns:
            TodayPayload with all sections populated.
        """
        today = target_date or date.today()
        
        # Phase 2: return deterministic mock data.
        # Phase 3+: each of these will query the database.
        workout = await self._resolve_workout(user_id, today)
        habits = await self._resolve_habits(user_id, today)
        arc = await self._resolve_arc(user_id, today)
        recovery = await self._resolve_recovery(user_id, today)
        tomorrow = await self._resolve_tomorrow(user_id, today)
        
        # Compute completion
        habit_completed = sum(1 for h in habits if h.completed)
        workout_done = 1 if (workout and workout.is_completed) else 0
        total = len(habits) + (1 if workout and not workout.is_rest_day else 0)
        completed = habit_completed + workout_done
        
        return TodayPayload(
            date=today,
            greeting_name="Athlete",  # Will come from profile lookup
            completed_tasks=completed,
            total_tasks=total,
            workout=workout,
            habits=habits,
            arc=arc,
            recovery=recovery,
            tomorrow=tomorrow,
        )
    
    async def _resolve_workout(self, user_id: str, day: date) -> Optional[TodayWorkout]:
        """Read today's planned workout from the Planner's output."""
        # Phase 2 mock
        return TodayWorkout(
            id="workout-mock-1",
            title="Push Day — Hypertrophy",
            duration_minutes=60,
            exercise_count=6,
            muscle_groups=["Chest", "Shoulders", "Triceps"],
        )
    
    async def _resolve_habits(self, user_id: str, day: date) -> list[TodayHabit]:
        """Gather habits from the active Arc + user custom habits."""
        # Phase 2 mock
        return [
            TodayHabit(id="h1", title="Drink 3L Water", icon="💧", target="3L", current="2.1L", completed=False),
            TodayHabit(id="h2", title="10k Steps", icon="🚶", target="10k", current="4.2k", completed=False),
            TodayHabit(id="h3", title="Read 10 Pages", icon="📚", completed=False),
        ]
    
    async def _resolve_arc(self, user_id: str, day: date) -> Optional[TodayArc]:
        """Compute the user's active Arc progress."""
        # Phase 2 mock
        return TodayArc(
            arc_id="arc-winter-1",
            arc_name="Winter Arc",
            current_day=24,
            total_days=90,
            streak=12,
            compliance_pct=87.5,
        )
    
    async def _resolve_recovery(self, user_id: str, day: date) -> Optional[TodayRecovery]:
        """Check if there's a recovery record for today."""
        # Phase 2 mock — no recovery data yet
        return None
    
    async def _resolve_tomorrow(self, user_id: str, day: date) -> Optional[TomorrowPreview]:
        """Look ahead to the next plan_day."""
        # Phase 2 mock
        return TomorrowPreview(
            title="Rest & Recover",
            duration="Active Recovery",
            activities=["10k Steps", "Stretching Routine"],
            is_rest_day=True,
        )


# Singleton for dependency injection
today_engine = TodayEngine()
