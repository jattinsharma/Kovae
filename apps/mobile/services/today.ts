/**
 * KOVAE Today Engine — Mobile Service
 * ====================================
 * 
 * The mobile Today Engine service is the SOLE data source for the Home screen.
 * It calls GET /api/v1/today and returns the unified TodayPayload.
 * 
 * Architecture:
 *   Planner Engine (backend)  → generates multi-day schedule
 *   Today Engine (backend)    → resolves current-day state
 *   TodayService (mobile)     → fetches and caches the payload
 *   useTodayStore (mobile)    → reactive state for the Home screen
 *   HomeScreen (mobile)       → renders the experience
 */

import { api } from './api';

// ──────────────────────────────────────────
// Today Engine Types (mirror backend models)
// ──────────────────────────────────────────

export interface TodayWorkout {
  id: string;
  title: string;
  duration_minutes: number;
  exercise_count: number;
  muscle_groups: string[];
  is_rest_day: boolean;
  is_started: boolean;
  is_completed: boolean;
}

export interface TodayHabit {
  id: string;
  title: string;
  icon: string;
  target?: string;
  current?: string;
  completed: boolean;
}

export interface TodayArc {
  arc_id: string;
  arc_name: string;
  current_day: number;
  total_days: number;
  streak: number;
  compliance_pct: number;
  is_active: boolean;
}

export interface TodayRecovery {
  readiness_score?: number;
  sleep_hours?: number;
  soreness_level?: number;
  recommendation?: string;
}

export interface TomorrowPreview {
  title: string;
  duration: string;
  activities: string[];
  is_rest_day: boolean;
}

export interface TodayPayload {
  date: string;
  greeting_name: string;
  completed_tasks: number;
  total_tasks: number;
  workout: TodayWorkout | null;
  habits: TodayHabit[];
  arc: TodayArc | null;
  recovery: TodayRecovery | null;
  tomorrow: TomorrowPreview | null;
}

// ──────────────────────────────────────────
// Today Engine Service
// ──────────────────────────────────────────

export const TodayService = {
  /**
   * Fetch today's complete payload from the Today Engine.
   * This is the ONLY call the Home screen needs to make.
   */
  fetch: async (): Promise<TodayPayload> => {
    const { data } = await api.get<TodayPayload>('/today');
    return data;
  },
};
