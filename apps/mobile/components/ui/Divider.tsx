import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface DividerProps {
  vertical?: boolean;
  color?: string;
  thickness?: number;
  margin?: number;
}

export function Divider({
  vertical = false,
  color = theme.colors.divider,
  thickness = 1,
  margin = theme.spacing.md,
}: DividerProps) {
  return (
    <View
      style={[
        vertical ? styles.vertical : styles.horizontal,
        {
          backgroundColor: color,
          [vertical ? 'width' : 'height']: thickness,
          [vertical ? 'marginHorizontal' : 'marginVertical']: margin,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  horizontal: {
    width: '100%',
  },
  vertical: {
    height: '100%',
  },
});
