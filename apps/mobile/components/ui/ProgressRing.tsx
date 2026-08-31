import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { KText } from './KText';
// In a real app we'd use react-native-svg or Reanimated here
// This is a simple placeholder to represent the visual structure

interface ProgressRingProps {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

export function ProgressRing({
  progress,
  size = 64,
  strokeWidth = 6,
  color = theme.colors.primary,
  label,
}: ProgressRingProps) {
  
  const radius = (size - strokeWidth) / 2;
  
  return (
    <View style={[{ width: size, height: size }, styles.container]}>
      {/* Background circle placeholder */}
      <View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderColor: theme.colors.border,
        }}
      />
      
      {/* Foreground circle placeholder (static for MVP, use SVG later) */}
      <View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderColor: color,
          opacity: progress > 0 ? 1 : 0,
          borderRightColor: progress < 0.25 ? 'transparent' : color,
          borderBottomColor: progress < 0.5 ? 'transparent' : color,
          borderLeftColor: progress < 0.75 ? 'transparent' : color,
          transform: [{ rotate: '-45deg' }],
        }}
      />

      <View style={styles.content}>
        {label ? (
          <KText weight="bold" style={{ fontSize: size * 0.25 }}>
            {label}
          </KText>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
