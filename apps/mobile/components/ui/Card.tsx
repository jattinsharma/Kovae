import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface CardProps extends ViewProps {
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
  style,
  elevation = 'sm',
  padding = 'md',
  children,
  ...rest
}: CardProps) {
  
  const getPadding = () => {
    if (padding === 'none') return 0;
    if (padding === 'sm') return theme.spacing.sm;
    if (padding === 'lg') return theme.spacing.xl;
    return theme.spacing.md;
  };

  return (
    <View
      style={[
        styles.card,
        theme.shadows[elevation],
        {
          padding: getPadding(),
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
});
