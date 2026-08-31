import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { Card } from '../ui/Card';
import { KText } from '../ui/KText';
import { Ionicons } from '@expo/vector-icons';

interface QuickActionCardProps {
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  color?: string;
}

export function QuickActionCard({
  title,
  iconName,
  onPress,
  color = theme.colors.textPrimary,
}: QuickActionCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.touchable}>
      <Card padding="md" style={styles.container}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
          <Ionicons name={iconName} size={24} color={color} />
        </View>
        <KText variant="caption" weight="medium" align="center" style={styles.title}>
          {title}
        </KText>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  title: {
    minHeight: 36, // Ensure alignment if titles wrap
  },
});
