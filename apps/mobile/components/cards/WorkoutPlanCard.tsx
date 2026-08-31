import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { Card } from '../ui/Card';
import { KText } from '../ui/KText';
import { Button } from '../ui/Button';

interface WorkoutPlanCardProps {
  title: string;
  duration: string;
  exercises: number;
  tags?: string[];
  onStart: () => void;
  onView?: () => void;
}

export function WorkoutPlanCard({
  title,
  duration,
  exercises,
  tags = [],
  onStart,
  onView,
}: WorkoutPlanCardProps) {
  return (
    <Card elevation="sm" style={styles.container}>
      <View style={styles.content}>
        <View style={styles.info}>
          <KText variant="h3" style={styles.title}>{title}</KText>
          <KText color="secondary" variant="body">
            {exercises} exercises · {duration}
          </KText>
          
          {tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {tags.map((tag, idx) => (
                <View key={idx} style={styles.tag}>
                  <KText variant="small" color="secondary">{tag}</KText>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.actions}>
        {onView && (
          <Button 
            title="Details" 
            variant="secondary" 
            size="sm" 
            onPress={onView} 
            style={styles.detailsButton} 
          />
        )}
        <Button 
          title="START" 
          variant="primary" 
          size="sm" 
          onPress={onStart} 
          style={styles.startButton}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
  },
  content: {
    marginBottom: theme.spacing.lg,
  },
  info: {
    flex: 1,
  },
  title: {
    marginBottom: theme.spacing.xs,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.md,
  },
  tag: {
    backgroundColor: theme.colors.card,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing.md,
  },
  detailsButton: {
    flex: 1,
  },
  startButton: {
    flex: 1,
  },
});
