import React from 'react';
import { View, StyleSheet, ScrollView, ViewProps } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';

interface ScreenWrapperProps extends ViewProps {
  scrollable?: boolean;
  withBottomNav?: boolean;
  padding?: boolean;
  backgroundColor?: string;
}

export function ScreenWrapper({
  children,
  scrollable = false,
  withBottomNav = false,
  padding = true,
  backgroundColor = theme.colors.background,
  style,
  ...rest
}: ScreenWrapperProps) {
  const insets = useSafeAreaInsets();
  
  const content = (
    <View
      style={[
        styles.content,
        { paddingHorizontal: padding ? theme.spacing.lg : 0 },
        // If it's a tab screen, add bottom padding for the tab bar
        { paddingBottom: withBottomNav ? 80 + insets.bottom : insets.bottom },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );

  const Container = SafeAreaView;
  
  return (
    <Container style={[styles.container, { backgroundColor }]} edges={['top']}>
      {scrollable ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
