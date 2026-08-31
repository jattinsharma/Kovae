import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { KText } from './KText';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  message?: string;
  actionTitle?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title,
  message,
  actionTitle,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <KText variant="h3" style={styles.title} align="center">
        {title}
      </KText>
      {message && (
        <KText color="secondary" align="center" style={styles.message}>
          {message}
        </KText>
      )}
      {actionTitle && onAction && (
        <Button
          title={actionTitle}
          onPress={onAction}
          style={styles.button}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  iconContainer: {
    marginBottom: theme.spacing.lg,
    opacity: 0.8,
  },
  title: {
    marginBottom: theme.spacing.sm,
  },
  message: {
    marginBottom: theme.spacing.xl,
  },
  button: {
    minWidth: 160,
  },
});
