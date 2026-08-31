import { LocalStorage } from './local-storage';
import { STORAGE_KEYS } from '../constants';
import { api } from './api';
import { Analytics } from './analytics';
import { ANALYTICS_EVENTS } from '../constants/analytics-events';

// Default flag values shipped with the app
const DEFAULT_FLAGS: Record<string, boolean> = {
  enable_arc: true,
  enable_challenges: false, // Phase 5 feature
  enable_machine_scan: false, // Phase 7 feature
  enable_recovery: false, // Phase 8 feature
};

export const FeatureFlags = {
  // Sync flags from backend
  sync: async () => {
    try {
      const response = await api.get('/flags');
      const serverFlags = response.data.flags;
      
      const mergedFlags = { ...DEFAULT_FLAGS, ...serverFlags };
      LocalStorage.setObject(STORAGE_KEYS.FEATURE_FLAGS, mergedFlags);
      return mergedFlags;
    } catch (e) {
      console.warn('Failed to sync feature flags, using cache or defaults', e);
      return FeatureFlags.getAll();
    }
  },
  
  // Fast synchronous evaluation
  evaluate: (flagName: string): boolean => {
    const flags = FeatureFlags.getAll();
    const value = flags[flagName] ?? DEFAULT_FLAGS[flagName] ?? false;
    
    Analytics.track(ANALYTICS_EVENTS.FEATURE_FLAG_EVALUATED, {
      flag: flagName,
      value: value,
    });
    
    return value;
  },
  
  getAll: (): Record<string, boolean> => {
    return LocalStorage.getObject(STORAGE_KEYS.FEATURE_FLAGS) || DEFAULT_FLAGS;
  }
};
