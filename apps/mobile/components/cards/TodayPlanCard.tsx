import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { Card } from '../ui/Card';
import { KText } from '../ui/KText';
import { ProgressBar } from '../ui/ProgressBar';

interface HabitItem {
  id: string;
  title: string;
  icon: string;
  completed: boolean;
  target?: string;
}

interface TodayPlanCardProps {
  completedTasks: number;
  totalTasks: number;
  workoutTitle: string;
  workoutDuration: string;
  workoutExercises: number;
  habits: HabitItem[];
  onStartWorkout: () => void;
  onToggleHabit: (id: string) => void;
}

export function TodayPlanCard({
  completedTasks,
  totalTasks,
  workoutTitle,
  workoutDuration,
  workoutExercises,
  habits,
  onStartWorkout,
  onToggleHabit,
}: TodayPlanCardProps) {
  
  const progress = totalTasks > 0 ? completedTasks / totalTasks : 0;
  const percentage = Math.round(progress * 100);

  return (
    <Card elevation="md" style={styles.container}>
      <View style={styles.header}>
        <KText variant="h3">TODAY'S PLAN</KText>
        <KText variant="h3" color="brand">{completedTasks} / {totalTasks} ✓</KText>
      </View>
      
      <View style={styles.progressContainer}>
        <ProgressBar progress={progress} height={8} />
        <KText variant="small" color="secondary" style={styles.percentage}>
          {percentage}%
        </KText>
      </View>

      <TouchableOpacity 
        style={styles.workoutSection}
        activeOpacity={0.7}
        onPress={onStartWorkout}
      >
        <View style={styles.workoutInfo}>
          <KText variant="h2">💪 {workoutTitle}</KText>
          <KText color="secondary" style={styles.workoutMeta}>
            {workoutExercises} exercises · {workoutDuration}
          </KText>
        </View>
        <View style={styles.startButton}>
          <KText weight="bold" style={{ color: '#000' }}>START</KText>
        </View>
      </TouchableOpacity>

      <View style={styles.divider} />

      <View style={styles.habitsList}>
        {habits.map((habit) => (
          <TouchableOpacity 
            key={habit.id}
            style={styles.habitRow}
            onPress={() => onToggleHabit(habit.id)}
            activeOpacity={0.7}
          >
            <View style={styles.habitLeft}>
              <KText variant="body" style={styles.habitIcon}>{habit.icon}</KText>
              <KText 
                variant="body" 
                color={habit.completed ? 'muted' : 'primary'}
                style={{ textDecorationLine: habit.completed ? 'line-through' : 'none' }}
              >
                {habit.title}
              </KText>
            </View>
            <View style={styles.habitRight}>
              {habit.target && (
                <KText variant="caption" color="secondary" style={styles.habitTarget}>
                  {habit.target}
                </KText>
              )}
              <View style={[
                styles.checkbox,
                habit.completed && styles.checkboxCompleted
              ]}>
                {habit.completed && <KText variant="small" style={{ color: '#000' }}>✓</KText>}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  percentage: {
    marginLeft: theme.spacing.md,
    width: 35,
    textAlign: 'right',
  },
  workoutSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutMeta: {
    marginTop: theme.spacing.xs,
    marginLeft: 32, // align with text after emoji
  },
  startButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.full,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginVertical: theme.spacing.lg,
  },
  habitsList: {
    gap: theme.spacing.md,
  },
  habitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  habitLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  habitIcon: {
    width: 32,
  },
  habitRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  habitTarget: {
    marginRight: theme.spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
});
