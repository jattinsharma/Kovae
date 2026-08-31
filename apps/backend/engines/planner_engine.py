"""
KOVAE Planner Engine
====================

The Planner Engine determines the user's multi-day workout, habit,
and recovery schedule. It owns:

  1. Weekly plan generation (based on user goals, experience, available days)
  2. Plan rescheduling (when the user misses a day or adjusts preferences)
  3. Plan versioning (track which plan is active)

The Planner Engine does NOT power the Home screen directly.
Its output is consumed by the Today Engine.

Architecture:

    User Constraints + Goals
              ↓
    Planner Engine  (generates plan_days + planned_exercises)
              ↓
    Today Engine    (reads plan_days for the current day)
              ↓
    Home Screen
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import date, timedelta


# ──────────────────────────────────────────
# Planner Models
# ──────────────────────────────────────────

class PlannedExercise(BaseModel):
    exercise_id: str
    exercise_name: str
    sets: int
    reps_min: int
    reps_max: int
    rest_seconds: int
    order: int
    notes: Optional[str] = None


class PlanDay(BaseModel):
    date: date
    day_type: str  # "training", "rest", "active_recovery"
    title: str  # e.g. "Push Day — Hypertrophy"
    duration_minutes: int
    muscle_groups: list[str] = Field(default_factory=list)
    exercises: list[PlannedExercise] = Field(default_factory=list)


class WeeklyPlan(BaseModel):
    plan_id: str
    user_id: str
    week_start: date
    week_end: date
    days: list[PlanDay] = Field(default_factory=list)
    version: int = 1


# ──────────────────────────────────────────
# Planner Engine Service
# ──────────────────────────────────────────

class PlannerEngine:
    """
    Generates multi-day training schedules.
    
    Phase 2: Returns deterministic mock plans.
    Phase 3+: Will use user profile, goal, experience level, available
    equipment, and training history to generate real periodized plans.
    """
    
    async def generate_week(
        self,
        user_id: str,
        start_date: Optional[date] = None,
    ) -> WeeklyPlan:
        """
        Generate a 7-day plan starting from start_date.
        """
        start = start_date or date.today()
        end = start + timedelta(days=6)
        
        # Phase 2 mock plan — PPL split
        days = [
            PlanDay(
                date=start,
                day_type="training",
                title="Push Day — Hypertrophy",
                duration_minutes=60,
                muscle_groups=["Chest", "Shoulders", "Triceps"],
                exercises=[
                    PlannedExercise(exercise_id="ex-1", exercise_name="Bench Press", sets=4, reps_min=8, reps_max=12, rest_seconds=90, order=1),
                    PlannedExercise(exercise_id="ex-2", exercise_name="Overhead Press", sets=3, reps_min=8, reps_max=12, rest_seconds=90, order=2),
                    PlannedExercise(exercise_id="ex-3", exercise_name="Incline DB Press", sets=3, reps_min=10, reps_max=12, rest_seconds=60, order=3),
                    PlannedExercise(exercise_id="ex-4", exercise_name="Cable Lateral Raise", sets=3, reps_min=12, reps_max=15, rest_seconds=60, order=4),
                    PlannedExercise(exercise_id="ex-5", exercise_name="Tricep Pushdown", sets=3, reps_min=12, reps_max=15, rest_seconds=60, order=5),
                    PlannedExercise(exercise_id="ex-6", exercise_name="Overhead Extension", sets=3, reps_min=12, reps_max=15, rest_seconds=60, order=6),
                ],
            ),
            PlanDay(
                date=start + timedelta(days=1),
                day_type="rest",
                title="Rest & Recover",
                duration_minutes=0,
                muscle_groups=[],
            ),
            PlanDay(
                date=start + timedelta(days=2),
                day_type="training",
                title="Pull Day — Strength",
                duration_minutes=65,
                muscle_groups=["Back", "Biceps", "Rear Delts"],
                exercises=[
                    PlannedExercise(exercise_id="ex-10", exercise_name="Deadlift", sets=4, reps_min=5, reps_max=6, rest_seconds=180, order=1),
                    PlannedExercise(exercise_id="ex-11", exercise_name="Barbell Row", sets=4, reps_min=6, reps_max=8, rest_seconds=120, order=2),
                    PlannedExercise(exercise_id="ex-12", exercise_name="Lat Pulldown", sets=3, reps_min=8, reps_max=12, rest_seconds=90, order=3),
                    PlannedExercise(exercise_id="ex-13", exercise_name="Cable Row", sets=3, reps_min=10, reps_max=12, rest_seconds=60, order=4),
                    PlannedExercise(exercise_id="ex-14", exercise_name="Hammer Curl", sets=3, reps_min=10, reps_max=12, rest_seconds=60, order=5),
                ],
            ),
            PlanDay(
                date=start + timedelta(days=3),
                day_type="training",
                title="Legs — Hypertrophy",
                duration_minutes=55,
                muscle_groups=["Quads", "Hamstrings", "Calves"],
                exercises=[
                    PlannedExercise(exercise_id="ex-20", exercise_name="Squat", sets=4, reps_min=8, reps_max=10, rest_seconds=120, order=1),
                    PlannedExercise(exercise_id="ex-21", exercise_name="Romanian Deadlift", sets=3, reps_min=10, reps_max=12, rest_seconds=90, order=2),
                    PlannedExercise(exercise_id="ex-22", exercise_name="Leg Press", sets=3, reps_min=10, reps_max=15, rest_seconds=90, order=3),
                    PlannedExercise(exercise_id="ex-23", exercise_name="Leg Curl", sets=3, reps_min=12, reps_max=15, rest_seconds=60, order=4),
                    PlannedExercise(exercise_id="ex-24", exercise_name="Calf Raise", sets=4, reps_min=15, reps_max=20, rest_seconds=45, order=5),
                ],
            ),
            PlanDay(
                date=start + timedelta(days=4),
                day_type="active_recovery",
                title="Active Recovery",
                duration_minutes=30,
                muscle_groups=[],
            ),
            PlanDay(
                date=start + timedelta(days=5),
                day_type="training",
                title="Upper Body — Strength",
                duration_minutes=60,
                muscle_groups=["Chest", "Back", "Shoulders"],
                exercises=[
                    PlannedExercise(exercise_id="ex-30", exercise_name="Weighted Pull-Up", sets=4, reps_min=5, reps_max=8, rest_seconds=120, order=1),
                    PlannedExercise(exercise_id="ex-31", exercise_name="Dumbbell Bench Press", sets=4, reps_min=8, reps_max=10, rest_seconds=90, order=2),
                    PlannedExercise(exercise_id="ex-32", exercise_name="Seated DB Press", sets=3, reps_min=8, reps_max=10, rest_seconds=90, order=3),
                    PlannedExercise(exercise_id="ex-33", exercise_name="Face Pull", sets=3, reps_min=15, reps_max=20, rest_seconds=60, order=4),
                ],
            ),
            PlanDay(
                date=start + timedelta(days=6),
                day_type="rest",
                title="Full Rest",
                duration_minutes=0,
                muscle_groups=[],
            ),
        ]
        
        return WeeklyPlan(
            plan_id="plan-mock-1",
            user_id=user_id,
            week_start=start,
            week_end=end,
            days=days,
        )
    
    async def reschedule_day(
        self,
        user_id: str,
        missed_date: date,
    ) -> WeeklyPlan:
        """
        When a user misses a day, reschedule the remaining week.
        Phase 3+ implementation.
        """
        # For now, just regenerate from the missed date
        return await self.generate_week(user_id, missed_date)


# Singleton
planner_engine = PlannerEngine()
