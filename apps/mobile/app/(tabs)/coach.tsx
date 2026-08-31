import React from 'react';
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

// Demo exercise data
const EXERCISES = [
  { id: 1, name: 'Bench Press', sets: 4, reps: '8-10', status: 'pending' },
  { id: 2, name: 'Lat Pulldown', sets: 3, reps: '10-12', status: 'pending' },
  { id: 3, name: 'Seated Row', sets: 3, reps: '10-12', status: 'pending' },
  { id: 4, name: 'Shoulder Press', sets: 3, reps: '8-10', status: 'pending' },
  { id: 5, name: 'Bicep Curl', sets: 3, reps: '10-12', status: 'pending' },
  { id: 6, name: 'Tricep Pushdown', sets: 3, reps: '10-12', status: 'pending' },
];

export default function CoachScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <KText style={styles.title}>Today's Workout</KText>
          <KText style={styles.subtitle}>Upper Body Strength</KText>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <StatCard icon="time-outline" label="Duration" value="55 min" />
          <StatCard icon="flame-outline" label="Est. Calories" value="420 kcal" />
          <StatCard icon="barbell-outline" label="Volume" value="12,450 kg" />
        </View>

        {/* Exercise list */}
        <KText style={styles.sectionTitle}>Exercises</KText>
        <View style={styles.exerciseList}>
          {EXERCISES.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={styles.exerciseCard}
              activeOpacity={0.7}
            >
              <View style={styles.exerciseNum}>
                <KText style={styles.exerciseNumText}>{exercise.id}</KText>
              </View>
              <View style={styles.exerciseInfo}>
                <KText style={styles.exerciseName}>{exercise.name}</KText>
                <KText style={styles.exerciseSets}>
                  {exercise.sets} sets · {exercise.reps} reps
                </KText>
              </View>
              <View style={styles.exerciseStatus}>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={c.textMuted}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.startButton} activeOpacity={0.8}>
          <Ionicons name="play" size={20} color="#000" />
          <KText style={styles.startText}>Start Workout</KText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ─── Stat Card ─────────────────────────────── */
function StatCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={icon as any} size={20} color={c.primary} />
      <KText style={styles.statValue}>{value}</KText>
      <KText style={styles.statLabel}>{label}</KText>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: c.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  header: {
    marginTop: 12,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: c.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: c.textSecondary,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 28,
  },
  statCard: {
    flex: 1,
    backgroundColor: c.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: c.border,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: c.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: c.textSecondary,
  },

  // Section title
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: c.textPrimary,
    marginBottom: 14,
  },

  // Exercise list
  exerciseList: {
    gap: 10,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: c.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: c.border,
    padding: 16,
    gap: 14,
  },
  exerciseNum: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: c.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseNumText: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
    color: c.textPrimary,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: c.textPrimary,
    marginBottom: 2,
  },
  exerciseSets: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: c.textSecondary,
  },
  exerciseStatus: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Bottom
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 100,
    paddingTop: 16,
    backgroundColor: c.background,
  },
  startButton: {
    backgroundColor: c.primary,
    borderRadius: 16,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  startText: {
    fontSize: 17,
    fontFamily: 'Inter_700Bold',
    color: '#000',
  },
});
