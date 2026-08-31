import { create } from 'zustand';
import { LocalStorage } from '../services/local-storage';
import { STORAGE_KEYS } from '../constants';

interface UserPreferences {
  theme: 'dark' | 'light' | 'system';
  useMetric: boolean;
  notificationsEnabled: boolean;
}

interface UserState {
  profile: any | null; // Typed profile data
  preferences: UserPreferences;
  
  // Actions
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  setProfile: (profile: any) => void;
}

const defaultPrefs: UserPreferences = {
  theme: 'dark', // KOVAE is dark-first
  useMetric: true,
  notificationsEnabled: true,
};

export const useUserStore = create<UserState>((set, get) => ({
  profile: null,
  preferences: LocalStorage.getObject<UserPreferences>(STORAGE_KEYS.USER_PREFS) || defaultPrefs,
  
  updatePreferences: (newPrefs) => {
    const updated = { ...get().preferences, ...newPrefs };
    LocalStorage.setObject(STORAGE_KEYS.USER_PREFS, updated);
    set({ preferences: updated });
  },
  
  setProfile: (profile) => {
    set({ profile });
  }
}));
