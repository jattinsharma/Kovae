import { useEffect } from 'react';
import { useAuthStore } from '../stores/auth-store';
import { AuthService } from '../services/auth';
import { useRouter, useSegments } from 'expo-router';

export function useAuth() {
  const { isAuthenticated, isLoading, checkSession, setSession, ...rest } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Initial check
    checkSession();
    
    // Subscribe to auth state changes
    const { data: { subscription } } = AuthService.onAuthStateChange((session) => {
      setSession(session);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Handle routing based on auth state
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    
    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !isAuthenticated &&
      !inAuthGroup
    ) {
      // Redirect to the welcome screen.
      router.replace('/(auth)/welcome');
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect away from the auth group to the main tabs.
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments, isLoading]);

  return { isAuthenticated, isLoading, ...rest };
}
