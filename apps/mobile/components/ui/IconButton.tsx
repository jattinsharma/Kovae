import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface IconButtonProps extends TouchableOpacityProps {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function IconButton({
  icon,
  size = 'md',
  variant = 'ghost',
  style,
  disabled,
  ...rest
}: IconButtonProps) {
  
  const getDimension = () => {
    switch (size) {
      case 'sm': return 32;
      case 'lg': return 56;
      default: return 48; // md
    }
  };

  const dim = getDimension();

  const getBackgroundColor = () => {
    if (disabled) return 'transparent';
    if (variant === 'primary') return theme.colors.primary;
    if (variant === 'secondary') return theme.colors.card;
    return 'transparent';
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled}
      style={[
        styles.container,
        {
          width: dim,
          height: dim,
          borderRadius: dim / 2,
          backgroundColor: getBackgroundColor(),
          borderWidth: variant === 'secondary' ? 1 : 0,
          borderColor: variant === 'secondary' ? theme.colors.border : 'transparent',
        },
        style,
      ]}
      {...rest}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
