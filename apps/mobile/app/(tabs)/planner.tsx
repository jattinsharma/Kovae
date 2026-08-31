import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { KText } from '../../components/ui/KText';
import { colors } from '../../theme/colors';

const c = colors.dark;
const { width } = Dimensions.get('window');
const DAY_WIDTH = (width - 40 - 6 * 8) / 7;

// Demo schedule data
const WEEK = [
  { day: 'Mon', date: 25, workout: 'Back + Biceps', type: 'workout', duration: '55 min' },
  { day: 'Tue', date: 26, workout: 'Legs', type: 'workout', duration: '50 min' },
  { day: 'Wed', date: 27, workout: 'Recovery', type: 'recovery', duration: '20 min' },
  { day: 'Thu', date: 28, workout: 'Chest + Triceps', type: 'workout', duration: '50 min', isToday: true },
  { day: 'Fri', date: 29, workout: 'Legs', type: 'workout', duration: '50 min' },
  { day: 'Sat', date: 30, workout: 'Full Body', type: 'workout', duration: '60 min' },
  { day: 'Sun', date: 31, workout: 'Rest', type: 'rest', duration: '—' },
];

export default function PlannerScreen() {
  const [selectedIdx, setSelectedIdx] = useState(3); // Thursday = today
  const selected = WEEK[selectedIdx];

  const getTypeColor = (type: string) => {
    if (type === 'workout') return c.primary;
    if (type === 'recovery') return c.secondary;
    return c.textMuted;
  };

  const getTypeIcon = (type: string) => {
    if (type === 'workout') return 'barbell-outline';
    if (type === 'recovery') return 'leaf-outline';
    return 'bed-outline';
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <KText style={styles.title}>Your Plan</KText>
          <KText style={styles.subtitle}>This week's schedule</KText>
        </View>

        {/* Day selector */}
        <View style={styles.dayRow}>
          {WEEK.map((day, idx) => {
            const isActive = idx === selectedIdx;
            return (
              <TouchableOpacity
                key={day.day}
                style={[styles.dayPill, isActive && styles.dayPillActive]}
                onPress={() => setSelectedIdx(idx)}
                activeOpacity={0.7}
              >
                <KText
                  style={[
                    styles.dayLabel,
                    isActive && styles.dayLabelActive,
                  ]}
                >
                  {day.day}
                </KText>
                <KText
                  style={[
                    styles.dayDate,
                    isActive && styles.dayDateActive,
                  ]}
                >
                  {day.date}
                </KText>
                {day.isToday && !isActive && <View style={styles.todayDot} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Selected day detail */}
        <View style={styles.detailCard}>
          <View style={styles.detailHeader}>
            <View
              style={[
                styles.detailIcon,
                { backgroundColor: `${getTypeColor(selected.type)}15` },
              ]}
            >
              <Ionicons
                name={getTypeIcon(selected.type) as any}
                size={24}
                color={getTypeColor(selected.type)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <KText style={styles.detailTitle}>{selected.workout}</KText>
              <KText style={styles.detailSub}>
                {selected.day}, Aug {selected.date} · {selected.duration}
              </KText>
            </View>
            <View
              style={[
                styles.typeBadge,
                { backgroundColor: `${getTypeColor(selected.type)}20` },
              ]}
            >
              <KText
                style={[
                  styles.typeBadgeText,
                  { color: getTypeColor(selected.type) },
                ]}
              >
                {selected.type.charAt(0).toUpperCase() + selected.type.slice(1)}
              </KText>
            </View>
          </View>

          {/* Exercise preview (workout days) */}
          {selected.type === 'workout' && (
            <View style={styles.exercisePreview}>
              {[
                { name: 'Bench Press', sets: '4 sets · 8-10 reps' },
                { name: 'Lat Pulldown', sets: '3 sets · 10-12 reps' },
                { name: 'Seated Row', sets: '3 sets · 10-12 reps' },
                { name: 'Shoulder Press', sets: '3 sets · 8-10 reps' },
              ].map((ex, i) => (
                <View key={i} style={styles.exerciseRow}>
                  <View style={styles.exerciseNum}>
                    <KText style={styles.exerciseNumText}>{i + 1}</KText>
                  </View>
                  <View style={{ flex: 1 }}>
                    <KText style={styles.exerciseName}>{ex.name}</KText>
                    <KText style={styles.exerciseSets}>{ex.sets}</KText>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Recovery advice */}
          {selected.type === 'recovery' && (
            <View style={styles.recoveryInfo}>
              <KText style={styles.recoveryText}>
                Light stretching, foam rolling, and mobility work. Focus on
                areas worked yesterday.
              </KText>
            </View>
          )}

          {/* Rest day */}
          {selected.type === 'rest' && (
            <View style={styles.recoveryInfo}>
              <KText style={styles.recoveryText}>
                Full rest day. Let your body repair and grow. Stay hydrated and
                get quality sleep.
              </KText>
            </View>
          )}

          {/* CTA */}
          {selected.type === 'workout' && (
            <TouchableOpacity style={styles.startButton} activeOpacity={0.8}>
              <KText style={styles.startButtonText}>Start Workout</KText>
            </TouchableOpacity>
          )}
        </View>

        {/* Weekly overview mini cards */}
        <KText style={[styles.sectionTitle, { marginTop: 28 }]}>
          Week Overview
        </KText>
        <View style={styles.weekOverview}>
          {WEEK.map((day, idx) => (
            <TouchableOpacity
              key={day.day}
              style={[
                styles.weekCard,
                idx === selectedIdx && styles.weekCardActive,
              ]}
              onPress={() => setSelectedIdx(idx)}
              activeOpacity={0.7}
            >
              <KText style={styles.weekCardDay}>{day.day}</KText>
              <View
                style={[
                  styles.weekCardDot,
                  { backgroundColor: getTypeColor(day.type) },
                ]}
              />
              <KText style={styles.weekCardLabel} numberOfLines={1}>
                {day.workout}
              </KText>
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

  // Day selector
  dayRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  dayPill: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: c.surface,
    borderWidth: 1,
    borderColor: c.border,
  },
  dayPillActive: {
    backgroundColor: c.primary,
    borderColor: c.primary,
  },
  dayLabel: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: c.textSecondary,
    marginBottom: 4,
  },
  dayLabelActive: {
    color: '#000',
  },
  dayDate: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: c.textPrimary,
  },
  dayDateActive: {
    color: '#000',
  },
  todayDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: c.primary,
    marginTop: 4,
  },

  // Detail card
  detailCard: {
    backgroundColor: c.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: c.border,
    padding: 20,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
  },
  detailIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: c.textPrimary,
    marginBottom: 2,
  },
  detailSub: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: c.textSecondary,
  },
  typeBadge: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  typeBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },

  // Exercises
  exercisePreview: {
    gap: 12,
    marginBottom: 20,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  exerciseNum: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: c.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseNumText: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: c.textPrimary,
  },
  exerciseName: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: c.textPrimary,
    marginBottom: 1,
  },
  exerciseSets: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: c.textSecondary,
  },

  // Recovery/rest info
  recoveryInfo: {
    marginBottom: 8,
  },
  recoveryText: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: c.textSecondary,
    lineHeight: 22,
  },

  // Start button
  startButton: {
    backgroundColor: c.primary,
    borderRadius: 16,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#000',
  },

  // Section title
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: c.textPrimary,
    marginBottom: 14,
  },

  // Week overview
  weekOverview: {
    gap: 8,
    marginBottom: 20,
  },
  weekCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: c.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: c.border,
  },
  weekCardActive: {
    borderColor: c.primary,
  },
  weekCardDay: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: c.textSecondary,
    width: 32,
  },
  weekCardDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  weekCardLabel: {
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
    color: c.textPrimary,
    flex: 1,
  },
});
