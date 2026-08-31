import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '../../components/ui/ScreenWrapper';
import { KText } from '../../components/ui/KText';
import { Button } from '../../components/ui/Button';
import { useOnboardingStore, ExperienceLevel } from '../../stores/onboarding-store';
import { theme } from '../../theme';

const LEVELS: { id: ExperienceLevel; title: string; desc: string }[] = [
  { id: 'beginner', title: 'Complete Beginner', desc: 'New to the gym, not sure where to start' },
  { id: 'intermediate', title: 'Intermediate', desc: 'Familiar with basic equipment and exercises' },
  { id: 'advanced', title: 'Advanced', desc: 'Experienced lifter looking for structure' },
];

export default function ExperienceScreen() {
  const router = useRouter();
  const { data, updateData } = useOnboardingStore();
  
  const handleNext = () => {
    router.push('/(onboarding)/body');
  };

  const selectLevel = (id: ExperienceLevel) => {
    updateData({ experience: id });
  };

  return (
    <ScreenWrapper scrollable padding={false} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <KText variant="h1" weight="bold">What's your experience level?</KText>
          <KText color="secondary" style={styles.subtitle}>
            We'll adjust the difficulty based on this.
          </KText>
        </View>

        <View style={styles.levelsContainer}>
          {LEVELS.map((level) => {
            const isSelected = data.experience === level.id;
            return (
              <TouchableOpacity
                key={level.id}
                activeOpacity={0.7}
                onPress={() => selectLevel(level.id)}
                style={[
                  styles.levelCard,
                  isSelected && styles.levelCardSelected
                ]}
              >
                <KText variant="h3" color={isSelected ? 'brand' : 'primary'}>
                  {level.title}
                </KText>
                <KText color="secondary" style={styles.levelDesc}>
                  {level.desc}
                </KText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      
      <View style={styles.footer}>
        <Button 
          title="Continue" 
          onPress={handleNext} 
          disabled={!data.experience}
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
  levelsContainer: {
    gap: theme.spacing.lg,
  },
  levelCard: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: theme.radius.lg,
  },
  levelCardSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}10`,
  },
  levelDesc: {
    marginTop: theme.spacing.xs,
  },
  footer: {
    padding: theme.spacing.xl,
    paddingBottom: theme.spacing['2xl'],
  },
});
