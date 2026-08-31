import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { SecureStorage } from './secure-storage';
import { APP_CONFIG } from '../constants';

// We use a custom storage adapter for Supabase Auth to use our SecureStorage
const supabaseStorageAdapter = {
  getItem: (key: string) => {
    return SecureStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    return SecureStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    return SecureStorage.removeItem(key);
  },
};

export const supabase = createClient(
  APP_CONFIG.SUPABASE_URL,
  APP_CONFIG.SUPABASE_ANON_KEY,
  {
    auth: {
      storage: supabaseStorageAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
