import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { KText } from '../../components/ui/KText';
import { colors } from '../../theme/colors';

const c = colors.dark;

const HABITS = [
  { id: '1', icon: '💪', name: 'Gym Workout', done: true },
  { id: '2', icon: '👟', name: '8,000 Steps', done: true },
  { id: '3', icon: '💧', name: 'Drink 2.5L Water', done: true },
  { id: '4', icon: '🥗', name: 'Eat Healthy', done: true },
  { id: '5', icon: '📖', name: 'Study 60 Min', done: true },
  { id: '6', icon: '🧠', name: 'Deep Work 2 Hrs', done: true },
  { id: '7', icon: '📱', name: 'Content / Post', done: false },
  { id: '8', icon: '😴', name: 'Sleep by 11 PM', done: false },
];

export default function ArcScreen() {
  const [habits, setHabits] = useState(HABITS);
  const completed = habits.filter((h) => h.done).length;
  const total = habits.length;
  const arcDay = 18;
  const arcTotal = 100;
  const progress = arcDay / arcTotal;

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, done: !h.done } : h))
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <KText style={styles.arcBadge}>WINTER ARC</KText>
          <View style={styles.arcStats}>
            <View>
              <KText style={styles.arcDayBig}>{arcDay}</KText>
              <KText style={styles.arcDayLabel}>/ {arcTotal} Days</KText>
            </View>
            <View style={styles.percentBadge}>
              <KText style={styles.percentText}>
                {Math.round(progress * 100)}%
              </KText>
            </View>
          </View>

          {/* Progress bar */}
          <View style={styles.progressBg}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.round(progress * 100)}%` },
              ]}
            />
          </View>

          {/* Streak */}
          <View style={styles.streakRow}>
            <Ionicons name="flame" size={18} color="#FF6B35" />
            <KText style={styles.streakText}>{arcDay}-day streak</KText>
          </View>
        </View>

        {/* Today's habits */}
        <View style={styles.habitHeader}>
          <KText style={styles.sectionTitle}>Today's Habits</KText>
          <KText style={styles.habitCount}>
            {completed} / {total} Completed
          </KText>
        </View>

        <View style={styles.habitList}>
          {habits.map((habit) => (
            <TouchableOpacity
              key={habit.id}
              style={[styles.habitRow, habit.done && styles.habitRowDone]}
              onPress={() => toggleHabit(habit.id)}
              activeOpacity={0.7}
            >
              <View style={styles.habitLeft}>
                <KText style={styles.habitIcon}>{habit.icon}</KText>
                <KText
                  style={[
                    styles.habitName,
                    habit.done && styles.habitNameDone,
                  ]}
                >
                  {habit.name}
                </KText>
              </View>
              <View
                style={[
                  styles.habitCheck,
                  habit.done && styles.habitCheckDone,
                ]}
              >
                {habit.done && (
                  <Ionicons name="checkmark" size={16} color="#000" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: c.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  // Header / Arc card
  header: {
    backgroundColor: c.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: c.border,
    padding: 24,
    marginTop: 12,
    marginBottom: 28,
  },
  arcBadge: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    color: c.primary,
    letterSpacing: 2,
    marginBottom: 16,
  },
  arcStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  arcDayBig: {
    fontSize: 48,
    fontFamily: 'Inter_700Bold',
    color: c.textPrimary,
    lineHeight: 52,
  },
  arcDayLabel: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: c.textSecondary,
  },
  percentBadge: {
    backgroundColor: 'rgba(191, 255, 0, 0.12)',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  percentText: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    color: c.primary,
  },
  progressBg: {
    height: 10,
    borderRadius: 5,
    backgroundColor: c.card,
    marginBottom: 16,
  },
  progressFill: {
    height: 10,
    borderRadius: 5,
    backgroundColor: c.primary,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  streakText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: c.textSecondary,
  },

  // Habits
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: c.textPrimary,
  },
  habitCount: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: c.textSecondary,
  },
  habitList: {
    gap: 10,
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: c.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: c.border,
  },
  habitRowDone: {
    borderColor: 'rgba(191, 255, 0, 0.2)',
  },
  habitLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  habitIcon: {
    fontSize: 22,
  },
  habitName: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: c.textPrimary,
  },
  habitNameDone: {
    color: c.textSecondary,
    textDecorationLine: 'line-through',
  },
  habitCheck: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: c.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitCheckDone: {
    backgroundColor: c.primary,
    borderColor: c.primary,
  },
});
