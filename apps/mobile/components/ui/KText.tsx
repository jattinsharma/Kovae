import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface KTextProps extends TextProps {
  variant?: 'hero' | 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'small';
  color?: 'primary' | 'secondary' | 'muted' | 'brand' | 'success' | 'warning' | 'error';
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
}

export function KText({
  style,
  variant = 'body',
  color = 'primary',
  align = 'left',
  weight,
  children,
  ...rest
}: KTextProps) {
  const getFontSize = () => theme.typography.sizes[variant];
  
  const getColor = () => {
    switch (color) {
      case 'primary': return theme.colors.textPrimary;
      case 'secondary': return theme.colors.textSecondary;
      case 'muted': return theme.colors.textMuted;
      case 'brand': return theme.colors.primary;
      case 'success': return theme.colors.success;
      case 'warning': return theme.colors.warning;
      case 'error': return theme.colors.error;
      default: return theme.colors.textPrimary;
    }
  };

  const getFontFamily = () => {
    if (weight) return theme.typography.fonts[weight];
    switch (variant) {
      case 'hero':
      case 'h1':
        return theme.typography.fonts.bold;
      case 'h2':
      case 'h3':
        return theme.typography.fonts.semibold;
      default:
        return theme.typography.fonts.regular;
    }
  };

  return (
    <Text
      style={[
        {
          fontSize: getFontSize(),
          color: getColor(),
          textAlign: align,
          fontFamily: getFontFamily(),
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
