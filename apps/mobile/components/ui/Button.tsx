import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';
import { KText } from './KText';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  title: string;
  loading?: boolean;
}

export function Button({
  style,
  variant = 'primary',
  size = 'md',
  title,
  loading = false,
  disabled,
  ...rest
}: ButtonProps) {
  
  const getBackgroundColor = () => {
    if (disabled) return theme.colors.divider;
    if (variant === 'primary') return theme.colors.primary;
    if (variant === 'secondary') return theme.colors.card;
    return 'transparent';
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.textMuted;
    if (variant === 'primary') return '#000000'; // Contrast text for lime green
    if (variant === 'secondary') return theme.colors.textPrimary;
    return theme.colors.primary;
  };

  const getHeight = () => {
    if (size === 'sm') return 36;
    if (size === 'lg') return 56;
    return 48; // md
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          height: getHeight(),
          borderRadius: theme.radius.full, // Pill shape buttons for modern feel
          borderWidth: variant === 'secondary' ? 1 : 0,
          borderColor: variant === 'secondary' ? theme.colors.border : 'transparent',
        },
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <KText 
          weight="semibold" 
          style={{ color: getTextColor() }}
        >
          {title}
        </KText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
});
