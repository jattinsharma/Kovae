import { supabase } from './supabase';
import { Analytics } from './analytics';
import { ANALYTICS_EVENTS } from '../constants/analytics-events';
import { LocalStorage } from './local-storage';
import { STORAGE_KEYS } from '../constants';

export const AuthService = {
  // We use standard email/password for MVP + hooks for social providers later
  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    if (data.user) {
      Analytics.identify(data.user.id);
      Analytics.track(ANALYTICS_EVENTS.AUTH_LOGIN, { provider: 'email' });
    }
    
    return data;
  },
  
  register: async (email: string, password: string, name?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        }
      }
    });
    
    if (error) throw error;
    
    if (data.user) {
      Analytics.identify(data.user.id);
      Analytics.track(ANALYTICS_EVENTS.AUTH_REGISTER, { provider: 'email' });
    }
    
    return data;
  },
  
  logout: async () => {
    Analytics.track(ANALYTICS_EVENTS.AUTH_LOGOUT);
    
    // Clear all fast cache data on logout for security
    LocalStorage.clearAll();
    Analytics.reset();
    
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
  
  getSession: async () => {
    return supabase.auth.getSession();
  },
  
  onAuthStateChange: (callback: (session: any) => void) => {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
  }
};
