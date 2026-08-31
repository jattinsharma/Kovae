import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { KText } from '../../components/ui/KText';
import { colors } from '../../theme/colors';

const c = colors.dark;

export default function PlanReadyScreen() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleStart = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Animated check */}
        <Animated.View
          style={[
            styles.checkCircle,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Ionicons name="checkmark" size={48} color="#000" />
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
          <KText style={styles.title}>Your Plan is Ready! 🎉</KText>
          <KText style={styles.subtitle}>
            We've built a personalized program{'\n'}just for you. Let's begin.
          </KText>

          {/* Plan summary */}
          <View style={styles.summaryCard}>
            <SummaryRow icon="calendar-outline" label="5 training days / week" />
            <SummaryRow icon="barbell-outline" label="Push / Pull / Legs split" />
            <SummaryRow icon="flame-outline" label="Winter Arc: 100-day program" />
            <SummaryRow icon="trending-up-outline" label="AI-personalized progression" />
          </View>
        </Animated.View>

        {/* CTA */}
        <Animated.View style={[styles.bottomActions, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStart}
            activeOpacity={0.8}
          >
            <KText style={styles.startText}>Let's Go</KText>
            <Ionicons name="arrow-forward" size={20} color="#000" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

function SummaryRow({ icon, label }: { icon: string; label: string }) {
  return (
    <View style={styles.summaryRow}>
      <Ionicons name={icon as any} size={20} color={c.primary} />
      <KText style={styles.summaryText}>{label}</KText>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: c.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  checkCircle: {
    width: 96,
    height: 96,
    borderRadius: 32,
    backgroundColor: c.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: c.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: c.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  summaryCard: {
    backgroundColor: c.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: c.border,
    padding: 20,
    width: '100%',
    gap: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  summaryText: {
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
    color: c.textPrimary,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 40,
    left: 32,
    right: 32,
  },
  startButton: {
    backgroundColor: c.primary,
    borderRadius: 16,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  startText: {
    fontSize: 17,
    fontFamily: 'Inter_700Bold',
    color: '#000',
  },
});
