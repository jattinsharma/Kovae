import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { theme } from '../../theme';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { usePathname } from 'expo-router';

// Maps routes to their step index for the progress bar
const STEP_MAP: Record<string, number> = {
  '/name': 1,
  '/goals': 2,
  '/experience': 3,
  '/body': 4,
  '/schedule': 5,
  '/gym-setup': 6,
  '/plan-ready': 7,
};
const TOTAL_STEPS = 7;

export default function OnboardingLayout() {
  const pathname = usePathname();
  
  // Extract the base route name from the pathname
  const route = pathname.replace('/(onboarding)', '');
  const step = Object.keys(STEP_MAP).find(k => route.includes(k)) ? STEP_MAP[route] || 1 : 1;
  const progress = step / TOTAL_STEPS;

  return (
    <View style={styles.container}>
      {/* Universal header for onboarding */}
      <View style={styles.header}>
        <ProgressBar progress={progress} height={4} />
      </View>

      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="name" />
        <Stack.Screen name="goals" />
        <Stack.Screen name="experience" />
        <Stack.Screen name="body" />
        <Stack.Screen name="schedule" />
        <Stack.Screen name="gym-setup" />
        <Stack.Screen name="plan-ready" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: 60, // Safe area approximation
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
  },
});
