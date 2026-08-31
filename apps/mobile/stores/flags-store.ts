import { create } from 'zustand';
import { FeatureFlags } from '../services/feature-flags';

interface FlagsState {
  flags: Record<string, boolean>;
  isLoaded: boolean;
  
  // Actions
  loadFlags: () => Promise<void>;
  evaluate: (flag: string) => boolean;
}

export const useFlagsStore = create<FlagsState>((set, get) => ({
  flags: FeatureFlags.getAll(),
  isLoaded: false,
  
  loadFlags: async () => {
    const flags = await FeatureFlags.sync();
    set({ flags, isLoaded: true });
  },
  
  evaluate: (flag) => {
    // If the component triggers this, we'll return from our loaded state
    // But we still call the service so Analytics triggers
    return FeatureFlags.evaluate(flag);
  }
}));
