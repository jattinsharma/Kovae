import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { theme } from '../../theme';
import { KText } from './KText';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  uri?: string | null;
  name?: string;
}

export function Avatar({ size = 'md', uri, name }: AvatarProps) {
  const getDimension = () => {
    switch (size) {
      case 'sm': return 32;
      case 'lg': return 64;
      case 'xl': return 96;
      default: return 48; // md
    }
  };

  const dim = getDimension();
  
  const getInitials = () => {
    if (!name) return '?';
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: dim,
          height: dim,
          borderRadius: dim / 2,
        },
      ]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: dim, height: dim, borderRadius: dim / 2 }}
        />
      ) : (
        <KText weight="semibold" style={{ fontSize: dim * 0.4 }}>
          {getInitials()}
        </KText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
