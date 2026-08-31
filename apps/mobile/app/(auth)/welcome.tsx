import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { KText } from '../../components/ui/KText';
import { Button } from '../../components/ui/Button';
import { theme } from '../../theme';
import { colors } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const buttonFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(buttonFade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Background gradient simulating a dramatic dark fitness aesthetic */}
      <LinearGradient
        colors={['#0A0A0A', '#111111', '#0A0A0A']}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Decorative accent glow */}
      <View style={styles.glowContainer}>
        <View style={styles.glowCircle} />
      </View>

      {/* Brand content */}
      <Animated.View
        style={[
          styles.brandContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Logo mark */}
        <View style={styles.logoMark}>
          <KText style={styles.logoLetter}>K</KText>
        </View>

        <KText style={styles.brandName}>KOVAE</KText>

        <KText style={styles.tagline}>
          Your AI Companion for{'\n'}
          <KText style={styles.taglineHighlight}>Every Day Wins</KText>
        </KText>
      </Animated.View>

      {/* Actions */}
      <Animated.View style={[styles.actions, { opacity: buttonFade }]}>
        <Button
          title="Get Started"
          onPress={() => router.push('/(auth)/register')}
          style={styles.primaryButton}
          size="lg"
        />

        <TouchableOpacity
          onPress={() => router.push('/(auth)/login')}
          activeOpacity={0.7}
          style={styles.loginButton}
        >
          <KText style={styles.loginText}>Log In</KText>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  glowContainer: {
    position: 'absolute',
    top: height * 0.15,
    alignSelf: 'center',
    alignItems: 'center',
  },
  glowCircle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(191, 255, 0, 0.04)',
  },
  brandContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoMark: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: colors.dark.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoLetter: {
    fontSize: 40,
    color: '#000000',
    fontFamily: 'Inter_700Bold',
  },
  brandName: {
    fontSize: 48,
    color: colors.dark.textPrimary,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 8,
    marginBottom: 16,
  },
  tagline: {
    fontSize: 18,
    color: colors.dark.textSecondary,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    lineHeight: 28,
  },
  taglineHighlight: {
    fontSize: 18,
    color: colors.dark.primary,
    fontFamily: 'Inter_600SemiBold',
  },
  actions: {
    paddingHorizontal: 24,
    paddingBottom: 60,
    gap: 16,
  },
  primaryButton: {
    width: '100%',
  },
  loginButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  loginText: {
    color: colors.dark.textSecondary,
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
});
