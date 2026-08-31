import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { KText } from '../../components/ui/KText';
import { useOnboardingStore } from '../../stores/onboarding-store';
import { colors } from '../../theme/colors';

const c = colors.dark;
const DAYS = [
  { num: 3, label: 'Light' },
  { num: 4, label: 'Moderate' },
  { num: 5, label: 'Active' },
  { num: 6, label: 'Intense' },
  { num: 7, label: 'All In' },
];

export default function ScheduleScreen() {
  const router = useRouter();
  const { updateData } = useOnboardingStore();
  const [selected, setSelected] = useState(5);

  const handleNext = () => {
    updateData({ trainingDays: Array.from({ length: selected }, (_, i) => i + 1) });
    router.push('/(onboarding)/plan-ready');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Back */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <KText style={styles.title}>How many days can you train?</KText>
          <KText style={styles.subtitle}>
            We'll build your weekly plan around this.
          </KText>
        </View>

        {/* Day selector */}
        <View style={styles.dayGrid}>
          {DAYS.map((day) => {
            const isActive = selected === day.num;
            return (
              <TouchableOpacity
                key={day.num}
                style={[styles.dayCard, isActive && styles.dayCardActive]}
                onPress={() => setSelected(day.num)}
                activeOpacity={0.7}
              >
                <KText
                  style={[styles.dayNum, isActive && styles.dayNumActive]}
                >
                  {day.num}
                </KText>
                <KText
                  style={[
                    styles.dayLabel,
                    isActive && styles.dayLabelActive,
                  ]}
                >
                  {day.label}
                </KText>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Visual schedule preview */}
        <View style={styles.previewSection}>
          <KText style={styles.previewTitle}>Your Week</KText>
          <View style={styles.weekRow}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => {
              const isTraining = i < selected;
              return (
                <View
                  key={i}
                  style={[
                    styles.weekDot,
                    isTraining && styles.weekDotActive,
                  ]}
                >
                  <KText
                    style={[
                      styles.weekDotText,
                      isTraining && styles.weekDotTextActive,
                    ]}
                  >
                    {d}
                  </KText>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          activeOpacity={0.8}
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
    backgroundColor: c.background,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: c.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  header: {
    marginBottom: 36,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: c.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: c.textSecondary,
  },

  // Day grid
  dayGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 36,
  },
  dayCard: {
    width: '30%',
    flexGrow: 1,
    backgroundColor: c.surface,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: c.border,
    paddingVertical: 24,
    alignItems: 'center',
    gap: 6,
  },
  dayCardActive: {
    borderColor: c.primary,
    backgroundColor: 'rgba(191, 255, 0, 0.06)',
  },
  dayNum: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: c.textPrimary,
  },
  dayNumActive: {
    color: c.primary,
  },
  dayLabel: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    color: c.textSecondary,
  },
  dayLabelActive: {
    color: c.primary,
  },

  // Preview
  previewSection: {
    alignItems: 'center',
  },
  previewTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: c.textSecondary,
    marginBottom: 16,
  },
  weekRow: {
    flexDirection: 'row',
    gap: 10,
  },
  weekDot: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: c.surface,
    borderWidth: 1,
    borderColor: c.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekDotActive: {
    backgroundColor: c.primary,
    borderColor: c.primary,
  },
  weekDotText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: c.textMuted,
  },
  weekDotTextActive: {
    color: '#000',
  },

  // Bottom
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
    backgroundColor: c.background,
  },
  nextButton: {
    backgroundColor: c.primary,
    borderRadius: 16,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  nextText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#000',
  },
});
