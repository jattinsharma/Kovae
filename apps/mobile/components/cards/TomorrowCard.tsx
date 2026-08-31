import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { Card } from '../ui/Card';
import { KText } from '../ui/KText';
import { Button } from '../ui/Button';

interface TomorrowCardProps {
  title: string;
  duration: string;
  activities: string[];
  onViewPlan: () => void;
}

export function TomorrowCard({
  title,
  duration,
  activities,
  onViewPlan,
}: TomorrowCardProps) {
  return (
    <Card elevation="sm" style={styles.container}>
      <View style={styles.header}>
        <KText variant="h3">TOMORROW</KText>
      </View>
      
      <View style={styles.content}>
        <View style={styles.info}>
          <KText variant="h2">{title}</KText>
          <KText color="secondary" style={styles.duration}>{duration}</KText>
          <KText color="secondary" style={styles.activities}>
            {activities.length} activities
          </KText>
          <KText color="muted" variant="caption">
            {activities.join(' · ')}
          </KText>
        </View>
        
        <Button 
          title="VIEW PLAN" 
          variant="secondary" 
          size="sm" 
          onPress={onViewPlan}
          style={styles.button}
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
  header: {
    marginBottom: theme.spacing.sm,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  info: {
    flex: 1,
    paddingRight: theme.spacing.md,
  },
  duration: {
    marginTop: theme.spacing.xs,
  },
  activities: {
    marginTop: theme.spacing.sm,
  },
  button: {
    minWidth: 100,
  },
});
