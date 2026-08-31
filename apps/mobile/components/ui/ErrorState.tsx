import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { KText } from './KText';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We encountered an error. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <KText variant="h3" color="error" style={styles.title} align="center">
        {title}
      </KText>
      <KText color="secondary" align="center" style={styles.message}>
        {message}
      </KText>
      {onRetry && (
        <Button
          title="Try Again"
          variant="secondary"
          onPress={onRetry}
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
    backgroundColor: theme.colors.background,
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
