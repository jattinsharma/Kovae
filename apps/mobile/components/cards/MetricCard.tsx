import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { Card } from '../ui/Card';
import { KText } from '../ui/KText';
import { Ionicons } from '@expo/vector-icons';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  color?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  iconName,
  color = theme.colors.primary,
  trend,
  trendValue,
}: MetricCardProps) {
  
  const getTrendColor = () => {
    if (trend === 'up') return theme.colors.success;
    if (trend === 'down') return theme.colors.error;
    return theme.colors.textSecondary;
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'trending-up';
    if (trend === 'down') return 'trending-down';
    return 'remove';
  };

  return (
    <Card elevation="none" style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          {iconName && (
            <Ionicons name={iconName} size={16} color={color} style={styles.icon} />
          )}
          <KText variant="caption" color="secondary" weight="medium">
            {title}
          </KText>
        </View>
      </View>
      
      <View style={styles.valueContainer}>
        <KText variant="h2" weight="bold">{value}</KText>
        {subtitle && (
          <KText variant="small" color="secondary" style={styles.subtitle}>
            {subtitle}
          </KText>
        )}
      </View>

      {trend && trendValue && (
        <View style={styles.trendContainer}>
          <Ionicons name={getTrendIcon()} size={14} color={getTrendColor()} />
          <KText variant="small" style={{ color: getTrendColor(), marginLeft: 4 }}>
            {trendValue}
          </KText>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    flex: 1,
  },
  header: {
    marginBottom: theme.spacing.sm,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing.xs,
  },
  valueContainer: {
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    marginTop: 2,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.xs,
  },
});
