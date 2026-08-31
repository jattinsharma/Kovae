import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { KText } from '../../components/ui/KText';
import { useOnboardingStore } from '../../stores/onboarding-store';
import { colors } from '../../theme/colors';

const { width } = Dimensions.get('window');
const CARD_GAP = 12;
const CARD_WIDTH = (width - 48 - CARD_GAP) / 2;

const GOALS = [
  { id: 'build_muscle', label: 'Build Muscle', icon: 'barbell-outline' },
  { id: 'lose_weight', label: 'Lose Weight', icon: 'scale-outline' },
  { id: 'get_stronger', label: 'Get Stronger', icon: 'fitness-outline' },
  { id: 'improve_endurance', label: 'Improve Endurance', icon: 'pulse-outline' },
  { id: 'stay_healthy', label: 'Stay Healthy', icon: 'heart-outline' },
  { id: 'general_fitness', label: 'General Fitness', icon: 'body-outline' },
];

export default function GoalsScreen() {
  const router = useRouter();
  const { updateData } = useOnboardingStore();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleGoal = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (selected.length === 0) return;
    updateData({ goal: selected[0] as any });
    router.push('/(onboarding)/body');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <KText style={styles.title}>What's Your Goal? 🎯</KText>
          <KText style={styles.subtitle}>
            We'll personalize everything for you.
          </KText>
        </View>

        {/* Goal grid */}
        <View style={styles.grid}>
          {GOALS.map((goal) => {
            const isSelected = selected.includes(goal.id);
            return (
              <TouchableOpacity
                key={goal.id}
                style={[
                  styles.goalCard,
                  isSelected && styles.goalCardSelected,
                ]}
                onPress={() => toggleGoal(goal.id)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.goalIcon,
                    isSelected && styles.goalIconSelected,
                  ]}
                >
                  <Ionicons
                    name={goal.icon as any}
                    size={28}
                    color={isSelected ? '#000' : colors.dark.textPrimary}
                  />
                </View>
                <KText
                  style={[
                    styles.goalLabel,
                    isSelected && styles.goalLabelSelected,
                  ]}
                >
                  {goal.label}
                </KText>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            selected.length === 0 && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          activeOpacity={0.8}
          disabled={selected.length === 0}
        >
          <KText style={styles.nextText}>Next</KText>
          <Ionicons name="arrow-forward" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  header: {
    marginTop: 20,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: colors.dark.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: colors.dark.textSecondary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CARD_GAP,
  },
  goalCard: {
    width: CARD_WIDTH,
    backgroundColor: colors.dark.surface,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.dark.border,
    paddingVertical: 28,
    alignItems: 'center',
    gap: 14,
  },
  goalCardSelected: {
    borderColor: colors.dark.primary,
    backgroundColor: 'rgba(191, 255, 0, 0.06)',
  },
  goalIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.dark.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalIconSelected: {
    backgroundColor: colors.dark.primary,
  },
  goalLabel: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: colors.dark.textPrimary,
  },
  goalLabelSelected: {
    color: colors.dark.primary,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
    backgroundColor: colors.dark.background,
  },
  nextButton: {
    backgroundColor: colors.dark.primary,
    borderRadius: 16,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  nextButtonDisabled: {
    opacity: 0.3,
  },
  nextText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#000',
  },
});
