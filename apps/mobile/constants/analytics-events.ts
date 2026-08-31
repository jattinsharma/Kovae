export const ANALYTICS_EVENTS = {
  // App Lifecycle
  APP_OPENED: 'app_opened',
  SCREEN_VIEWED: 'screen_viewed',
  RETENTION_PING: 'retention_ping', // Daily retention tracking
  
  // Auth
  AUTH_LOGIN: 'auth_login',
  AUTH_REGISTER: 'auth_register',
  AUTH_LOGOUT: 'auth_logout',
  
  // Onboarding
  ONBOARDING_STARTED: 'onboarding_started',
  ONBOARDING_STEP_COMPLETED: 'onboarding_step_completed',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  
  // Planner & Today Engine
  PLANNER_VIEWED: 'planner_viewed',
  TOMORROW_PREVIEW_CLICKED: 'tomorrow_preview_clicked',
  PLAN_GENERATED: 'plan_generated',
  
  // Workouts
  WORKOUT_STARTED: 'workout_started',
  WORKOUT_COMPLETED: 'workout_completed',
  WORKOUT_CANCELED: 'workout_canceled',
  SET_LOGGED: 'set_logged',
  MACHINE_SCAN: 'machine_scan', // For AI equipment detection
  
  // Habits
  HABIT_COMPLETED: 'habit_completed',
  HABIT_UNDONE: 'habit_undone',
  
  // Arcs
  ARC_VIEWED: 'arc_viewed',
  ARC_STARTED: 'arc_started',
  ARC_COMPLETED: 'arc_completed',
  
  // Challenges & Social
  CHALLENGE_JOINED: 'challenge_joined',
  FRIEND_REQUEST_SENT: 'friend_request_sent',
  FRIEND_ADDED: 'friend_added',
  
  // Recovery
  RECOVERY_LOGGED: 'recovery_logged',
  
  // System
  FEATURE_FLAG_EVALUATED: 'feature_flag_evaluated',
};
