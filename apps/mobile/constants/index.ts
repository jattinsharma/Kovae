// In a real app this would come from environment variables.
// Due to current limitations, we provide sensible defaults for local development.

export const APP_CONFIG = {
  // Mobile app uses Anon Key only
  SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co',
  SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSJ9...',
  
  API_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  
  POSTHOG_API_KEY: process.env.EXPO_PUBLIC_POSTHOG_API_KEY || 'phc_placeholder',
  POSTHOG_HOST: process.env.EXPO_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
};

export const STORAGE_KEYS = {
  ONBOARDING_COMPLETED: 'kovae_onboarding_completed',
  ONBOARDING_STATE: 'kovae_onboarding_state',
  USER_PREFS: 'kovae_user_prefs',
  OFFLINE_QUEUE: 'kovae_offline_queue',
  FEATURE_FLAGS: 'kovae_feature_flags',
};
