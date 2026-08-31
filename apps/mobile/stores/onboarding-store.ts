import { create } from 'zustand';
import { LocalStorage } from '../services/local-storage';
import { STORAGE_KEYS } from '../constants';

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
export type FitnessGoal = 'lose_weight' | 'build_muscle' | 'get_stronger' | 'endurance' | 'health';

interface OnboardingData {
  name: string;
  goal: FitnessGoal | null;
  experience: ExperienceLevel | null;
  age: number | null;
  weight: number | null; // kg
  height: number | null; // cm
  trainingDays: number[]; // 1 = Monday, 7 = Sunday
  hasGymAccess: boolean;
}

interface OnboardingState {
  isCompleted: boolean;
  data: OnboardingData;
  
  // Actions
  updateData: (data: Partial<OnboardingData>) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  loadSavedState: () => void;
}

const defaultData: OnboardingData = {
  name: '',
  goal: null,
  experience: null,
  age: null,
  weight: null,
  height: null,
  trainingDays: [1, 3, 5], // Default M/W/F
  hasGymAccess: true,
};

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  isCompleted: LocalStorage.getBoolean(STORAGE_KEYS.ONBOARDING_COMPLETED) || false,
  data: LocalStorage.getObject<OnboardingData>(STORAGE_KEYS.ONBOARDING_STATE) || defaultData,
  
  updateData: (newData) => {
    const updatedData = { ...get().data, ...newData };
    LocalStorage.setObject(STORAGE_KEYS.ONBOARDING_STATE, updatedData);
    set({ data: updatedData });
  },
  
  completeOnboarding: () => {
    LocalStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, true);
    set({ isCompleted: true });
    // Note: In a real app we'd also push this data to the backend API here
  },
  
  resetOnboarding: () => {
    LocalStorage.removeItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
    LocalStorage.removeItem(STORAGE_KEYS.ONBOARDING_STATE);
    set({ isCompleted: false, data: defaultData });
  },
  
  loadSavedState: () => {
    const isCompleted = LocalStorage.getBoolean(STORAGE_KEYS.ONBOARDING_COMPLETED) || false;
    const data = LocalStorage.getObject<OnboardingData>(STORAGE_KEYS.ONBOARDING_STATE) || defaultData;
    set({ isCompleted, data });
  }
}));
