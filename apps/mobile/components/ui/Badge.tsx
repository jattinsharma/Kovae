import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { KText } from './KText';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  icon?: React.ReactNode;
}

export function Badge({ label, variant = 'primary', icon }: BadgeProps) {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary': return `${theme.colors.primary}20`; // 20% opacity
      case 'secondary': return `${theme.colors.secondary}20`;
      case 'success': return `${theme.colors.success}20`;
      case 'warning': return `${theme.colors.warning}20`;
      case 'error': return `${theme.colors.error}20`;
      default: return `${theme.colors.primary}20`;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.secondary;
      case 'success': return theme.colors.success;
      case 'warning': return theme.colors.warning;
      case 'error': return theme.colors.error;
      default: return theme.colors.primary;
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor() },
      ]}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <KText variant="small" weight="medium" style={{ color: getTextColor() }}>
        {label}
      </KText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: 4,
  },
});
