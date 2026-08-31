import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { Card } from '../ui/Card';
import { KText } from '../ui/KText';

interface HabitCardProps {
  title: string;
  target: string;
  icon: string;
  completed: boolean;
  onToggle: () => void;
}

export function HabitCard({
  title,
  target,
  icon,
  completed,
  onToggle,
}: HabitCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onToggle}>
      <Card elevation="sm" style={styles.container}>
        <View style={styles.left}>
          <View style={[styles.iconContainer, completed && styles.iconCompleted]}>
            <KText variant="h3">{icon}</KText>
          </View>
          <View style={styles.info}>
            <KText 
              variant="body" 
              weight="medium"
              color={completed ? 'muted' : 'primary'}
              style={{ textDecorationLine: completed ? 'line-through' : 'none' }}
            >
              {title}
            </KText>
            <KText variant="caption" color="secondary">
              {target}
            </KText>
          </View>
        </View>
        
        <View style={[styles.checkbox, completed && styles.checkboxCompleted]}>
          {completed && <KText variant="small" style={{ color: '#000' }}>✓</KText>}
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  iconCompleted: {
    backgroundColor: theme.colors.surface,
    opacity: 0.5,
  },
  info: {
    flex: 1,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.md,
  },
  checkboxCompleted: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
});
