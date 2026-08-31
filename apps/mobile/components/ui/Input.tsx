import React from 'react';
import { View, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { KText } from './KText';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({
  label,
  error,
  style,
  ...rest
}: InputProps) {
  return (
    <View style={styles.container}>
      {label && (
        <KText variant="caption" color="secondary" style={styles.label}>
          {label}
        </KText>
      )}
      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : null,
          style,
        ]}
        placeholderTextColor={theme.colors.textMuted}
        {...rest}
      />
      {error && (
        <KText variant="small" color="error" style={styles.errorText}>
          {error}
        </KText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    marginBottom: theme.spacing.xs,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    height: 48,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.sizes.body,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    marginTop: theme.spacing.xs,
  },
});
