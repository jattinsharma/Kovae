import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '../../components/ui/ScreenWrapper';
import { KText } from '../../components/ui/KText';
import { Button } from '../../components/ui/Button';
import { useOnboardingStore } from '../../stores/onboarding-store';
import { theme } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

export default function GymSetupScreen() {
  const router = useRouter();
  const { data, updateData } = useOnboardingStore();
  
  const handleNext = () => {
    router.push('/(onboarding)/plan-ready');
  };

  const setGymAccess = (hasAccess: boolean) => {
    updateData({ hasGymAccess: hasAccess });
  };

  return (
    <ScreenWrapper scrollable padding={false} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <KText variant="h1" weight="bold">Where do you train?</KText>
          <KText color="secondary" style={styles.subtitle}>
            We'll adjust your workouts based on available equipment.
          </KText>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setGymAccess(true)}
            style={[
              styles.optionCard,
              data.hasGymAccess && styles.optionCardSelected
            ]}
          >
            <View style={styles.iconContainer}>
              <Ionicons 
                name="barbell" 
                size={32} 
                color={data.hasGymAccess ? theme.colors.primary : theme.colors.textSecondary} 
              />
            </View>
            <KText variant="h3" color={data.hasGymAccess ? 'brand' : 'primary'} style={styles.optionTitle}>
              Commercial Gym
            </KText>
            <KText color="secondary" align="center" style={styles.optionDesc}>
              Access to full machines, free weights, and cables.
            </KText>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setGymAccess(false)}
            style={[
              styles.optionCard,
              !data.hasGymAccess && styles.optionCardSelected
            ]}
          >
            <View style={styles.iconContainer}>
              <Ionicons 
                name="home" 
                size={32} 
                color={!data.hasGymAccess ? theme.colors.primary : theme.colors.textSecondary} 
              />
            </View>
            <KText variant="h3" color={!data.hasGymAccess ? 'brand' : 'primary'} style={styles.optionTitle}>
              Home / Bodyweight
            </KText>
            <KText color="secondary" align="center" style={styles.optionDesc}>
              Limited equipment or purely bodyweight exercises.
            </KText>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Button 
          title="Build My Plan" 
          onPress={handleNext} 
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
  },
  header: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing['2xl'],
  },
  subtitle: {
    marginTop: theme.spacing.sm,
  },
  optionsContainer: {
    gap: theme.spacing.lg,
  },
  optionCard: {
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: theme.radius.lg,
    alignItems: 'center',
  },
  optionCardSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}10`,
  },
  iconContainer: {
    marginBottom: theme.spacing.md,
  },
  optionTitle: {
    marginBottom: theme.spacing.sm,
  },
  optionDesc: {
    paddingHorizontal: theme.spacing.md,
  },
  footer: {
    padding: theme.spacing.xl,
    paddingBottom: theme.spacing['2xl'],
  },
});
