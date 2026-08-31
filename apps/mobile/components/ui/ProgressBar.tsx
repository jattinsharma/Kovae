import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { theme } from '../../theme';

interface ProgressBarProps {
  progress: number; // 0 to 1
  height?: number;
  color?: string;
  trackColor?: string;
}

export function ProgressBar({
  progress,
  height = 8,
  color = theme.colors.primary,
  trackColor = theme.colors.card,
}: ProgressBarProps) {
  
  // We'd use Reanimated for smoother animations in production
  const widthPercentage = `${Math.min(Math.max(progress * 100, 0), 100)}%`;

  return (
    <View
      style={[
        styles.container,
        {
          height,
          backgroundColor: trackColor,
          borderRadius: height / 2,
        },
      ]}
    >
      <View
        style={[
          styles.fill,
          {
            width: widthPercentage as any,
            backgroundColor: color,
            borderRadius: height / 2,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
