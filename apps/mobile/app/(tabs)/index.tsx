import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { KText } from '../../components/ui/KText';
import { useAuthStore } from '../../stores/auth-store';
import { useTodayStore } from '../../stores/today-store';
import { useRouter } from 'expo-router';
import { colors } from '../../theme/colors';
import { format } from 'date-fns';

const { width } = Dimensions.get('window');
const c = colors.dark;

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { payload, isLoading, fetchToday } = useTodayStore();

  useEffect(() => {
    fetchToday();
  }, [fetchToday]);

  // Mock data for demo (will be replaced by Today Engine payload)
  const name = payload?.greeting_name || user?.user_metadata?.full_name || 'Jattin';
  const displayDate = payload?.date
    ? format(new Date(payload.date), 'EEEE, MMM d')
    : format(new Date(), 'EEEE, MMM d');

  // Arc demo data
  const arcDay = payload?.arc?.current_day || 18;
  const arcTotal = payload?.arc?.total_days || 100;
  const arcProgress = arcDay / arcTotal;

  // Today plan demo data
  const habits = [
    { id: '1', icon: '💪', title: 'Gym Workout', subtitle: 'Upper Body · 55 min', completed: false },
    { id: '2', icon: '👟', title: '8,000 Steps', subtitle: '4,421 / 8,000', completed: false },
    { id: '3', icon: '💧', title: 'Drink Water', subtitle: '1.5L / 3L', completed: false },
    { id: '4', icon: '📖', title: 'Study', subtitle: '0 / 60 min', completed: false },
  ];

  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const toggleHabit = (id: string) => {
    setCompletedHabits((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchToday}
            tintColor={c.primary}
          />
        }
      >
        {/* ─── Header ──────────────────────────── */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <KText style={styles.greeting}>Good Morning, {name} 👋</KText>
            <KText style={styles.dateText}>
              Day {arcDay} of your Winter Arc
            </KText>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.bellButton}>
              <Ionicons name="notifications-outline" size={22} color={c.textPrimary} />
              <View style={styles.bellDot} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/profile')}
              activeOpacity={0.7}
            >
              <View style={styles.avatar}>
                <KText style={styles.avatarText}>
                  {name.charAt(0).toUpperCase()}
                </KText>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* ─── Arc Hero Card ───────────────────── */}
        <TouchableOpacity
          style={styles.arcCard}
          activeOpacity={0.85}
          onPress={() => router.push('/(tabs)/arc')}
        >
          <View style={styles.arcGradient}>
            {/* Title row */}
            <View style={styles.arcHeader}>
              <View>
                <KText style={styles.arcLabel}>WINTER ARC</KText>
                <KText style={styles.arcDays}>
                  {arcDay}{' '}
                  <KText style={styles.arcDaysTotal}>/ {arcTotal} Days</KText>
                </KText>
              </View>
              <View style={styles.arcPercentBadge}>
                <KText style={styles.arcPercentText}>
                  {Math.round(arcProgress * 100)}%
                </KText>
              </View>
            </View>

            {/* Progress bar */}
            <View style={styles.arcBarBg}>
              <View
                style={[
                  styles.arcBarFill,
                  { width: `${Math.round(arcProgress * 100)}%` },
                ]}
              />
            </View>
          </View>
        </TouchableOpacity>

        {/* ─── Today's Plan ────────────────────── */}
        <View style={styles.sectionHeader}>
          <KText style={styles.sectionTitle}>Today's Plan</KText>
          <TouchableOpacity onPress={() => router.push('/(tabs)/planner')}>
            <KText style={styles.viewAll}>View All →</KText>
          </TouchableOpacity>
        </View>

        <View style={styles.planList}>
          {habits.map((habit) => {
            const done = completedHabits.includes(habit.id);
            return (
              <TouchableOpacity
                key={habit.id}
                style={[styles.habitRow, done && styles.habitRowDone]}
                onPress={() => toggleHabit(habit.id)}
                activeOpacity={0.7}
              >
                <View style={styles.habitLeft}>
                  <KText style={styles.habitIcon}>{habit.icon}</KText>
                  <View>
                    <KText
                      style={[
                        styles.habitTitle,
                        done && styles.habitTitleDone,
                      ]}
                    >
                      {habit.title}
                    </KText>
                    <KText style={styles.habitSub}>{habit.subtitle}</KText>
                  </View>
                </View>
                <View style={[styles.habitCheck, done && styles.habitCheckDone]}>
                  {done && (
                    <Ionicons name="checkmark" size={16} color="#000" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ─── Tomorrow Preview ────────────────── */}
        <View style={styles.sectionHeader}>
          <KText style={styles.sectionTitle}>Tomorrow</KText>
        </View>

        <View style={styles.tomorrowCard}>
          <View style={styles.tomorrowTop}>
            <View style={styles.tomorrowIcon}>
              <Ionicons name="barbell-outline" size={22} color={c.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <KText style={styles.tomorrowTitle}>Full Body B</KText>
              <KText style={styles.tomorrowSub}>52 min · 6 exercises</KText>
            </View>
          </View>
          <TouchableOpacity
            style={styles.viewPlanButton}
            onPress={() => router.push('/(tabs)/planner')}
            activeOpacity={0.8}
          >
            <KText style={styles.viewPlanText}>View Plan</KText>
            <Ionicons name="arrow-forward" size={16} color="#000" />
          </TouchableOpacity>
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

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    color: c.textPrimary,
    marginBottom: 2,
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: c.textSecondary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bellButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: c.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellDot: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: c.primary,
    borderWidth: 1.5,
    borderColor: c.surface,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: c.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#000',
  },

  // Arc hero
  arcCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 28,
  },
  arcGradient: {
    backgroundColor: c.surface,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: 24,
    padding: 24,
  },
  arcHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  arcLabel: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    color: c.primary,
    letterSpacing: 2,
    marginBottom: 6,
  },
  arcDays: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: c.textPrimary,
  },
  arcDaysTotal: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: c.textSecondary,
  },
  arcPercentBadge: {
    backgroundColor: 'rgba(191, 255, 0, 0.12)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  arcPercentText: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: c.primary,
  },
  arcBarBg: {
    height: 8,
    borderRadius: 4,
    backgroundColor: c.card,
  },
  arcBarFill: {
    height: 8,
    borderRadius: 4,
    backgroundColor: c.primary,
  },

  // Section headers
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: c.textPrimary,
  },
  viewAll: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: c.primary,
  },

  // Habit rows
  planList: {
    gap: 10,
    marginBottom: 28,
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: c.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: c.border,
  },
  habitRowDone: {
    opacity: 0.5,
  },
  habitLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  habitIcon: {
    fontSize: 24,
  },
  habitTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: c.textPrimary,
    marginBottom: 2,
  },
  habitTitleDone: {
    textDecorationLine: 'line-through',
    color: c.textMuted,
  },
  habitSub: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: c.textSecondary,
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

  // Tomorrow
  tomorrowCard: {
    backgroundColor: c.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: c.border,
    padding: 20,
    marginBottom: 20,
  },
  tomorrowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  tomorrowIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(191, 255, 0, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tomorrowTitle: {
    fontSize: 17,
    fontFamily: 'Inter_600SemiBold',
    color: c.textPrimary,
    marginBottom: 2,
  },
  tomorrowSub: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: c.textSecondary,
  },
  viewPlanButton: {
    backgroundColor: c.primary,
    borderRadius: 14,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  viewPlanText: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
    color: '#000',
  },
});
