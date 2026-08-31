import { create } from 'zustand';
import { TodayService, TodayPayload } from '../services/today';

interface TodayState {
  payload: TodayPayload | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchToday: () => Promise<void>;
  clearToday: () => void;
}

export const useTodayStore = create<TodayState>((set) => ({
  payload: null,
  isLoading: true,
  error: null,
  
  fetchToday: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await TodayService.fetch();
      set({ payload: data, isLoading: false });
    } catch (err: any) {
      console.error('Failed to fetch Today payload:', err);
      set({ 
        error: err.message || 'Could not load your plan for today.', 
        isLoading: false 
      });
    }
  },
  
  clearToday: () => {
    set({ payload: null, isLoading: true, error: null });
  }
}));
