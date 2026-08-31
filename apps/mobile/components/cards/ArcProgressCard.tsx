import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { Card } from '../ui/Card';
import { KText } from '../ui/KText';
import { ProgressBar } from '../ui/ProgressBar';

interface ArcProgressCardProps {
  arcName: string;
  currentDay: number;
  totalDays: number;
  streak: number;
  onPress?: () => void;
}

export function ArcProgressCard({
  arcName,
  currentDay,
  totalDays,
  streak,
  onPress,
}: ArcProgressCardProps) {
  
  const progress = totalDays > 0 ? currentDay / totalDays : 0;
  
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={!onPress}>
      <Card style={styles.container} padding="sm">
        <View style={styles.header}>
          <KText variant="caption" color="secondary">
            Day {currentDay} of {arcName}
          </KText>
          <View style={styles.streakBadge}>
            <KText variant="caption" style={{ color: '#000', fontWeight: 'bold' }}>
              🔥 {streak}
            </KText>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <ProgressBar progress={progress} height={4} />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  streakBadge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.radius.sm,
  },
  progressContainer: {
    width: '100%',
  },
});
