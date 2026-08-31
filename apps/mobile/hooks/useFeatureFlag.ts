import { useFlagsStore } from '../stores/flags-store';
import { useEffect } from 'react';

export function useFeatureFlag(flagName: string) {
  const evaluate = useFlagsStore((state) => state.evaluate);
  const loadFlags = useFlagsStore((state) => state.loadFlags);
  const isLoaded = useFlagsStore((state) => state.isLoaded);
  
  useEffect(() => {
    if (!isLoaded) {
      loadFlags();
    }
  }, [isLoaded]);
  
  return evaluate(flagName);
}
