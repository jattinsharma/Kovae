import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { KText } from '../../components/ui/KText';
import { useOnboardingStore } from '../../stores/onboarding-store';
import { colors } from '../../theme/colors';

const c = colors.dark;

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export default function BodyScreen() {
  const router = useRouter();
  const { updateData } = useOnboardingStore();

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [level, setLevel] = useState('Beginner');

  const handleNext = () => {
    updateData({
      height: height ? parseFloat(height) : undefined,
      weight: weight ? parseFloat(weight) : undefined,
      experience: level.toLowerCase() as any,
    });
    router.push('/(onboarding)/schedule');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color={c.textPrimary} />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <KText style={styles.title}>Tell Us About You</KText>
          <KText style={styles.subtitle}>
            This helps us create the best plan.
          </KText>
        </View>

        {/* Height & Weight */}
        <View style={styles.row}>
          <View style={[styles.fieldGroup, { flex: 1 }]}>
            <KText style={styles.label}>Height</KText>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="5'9&quot;"
                placeholderTextColor={c.textMuted}
                value={height}
                onChangeText={setHeight}
                keyboardType="decimal-pad"
              />
              <KText style={styles.unitText}>(175 cm)</KText>
            </View>
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <KText style={styles.label}>Weight</KText>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="70"
              placeholderTextColor={c.textMuted}
              value={weight}
              onChangeText={setWeight}
              keyboardType="decimal-pad"
            />
            <KText style={styles.unitText}>kg</KText>
          </View>
        </View>

        {/* Experience level */}
        <View style={styles.fieldGroup}>
          <KText style={styles.label}>Experience Level</KText>
          <View style={styles.levelRow}>
            {LEVELS.map((l) => (
              <TouchableOpacity
                key={l}
                style={[
                  styles.levelPill,
                  level === l && styles.levelPillActive,
                ]}
                onPress={() => setLevel(l)}
                activeOpacity={0.7}
              >
                <KText
                  style={[
                    styles.levelPillText,
                    level === l && styles.levelPillTextActive,
                  ]}
                >
                  {l}
                </KText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <KText style={styles.nextText}>Next</KText>
          <Ionicons name="arrow-forward" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: c.background,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: c.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: c.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: c.textSecondary,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  fieldGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    color: c.textSecondary,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: c.surface,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 16,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: c.textPrimary,
    height: '100%',
  },
  unitText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: c.textMuted,
    marginLeft: 8,
  },
  levelRow: {
    flexDirection: 'row',
    gap: 10,
  },
  levelPill: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: c.surface,
    borderWidth: 1,
    borderColor: c.border,
    alignItems: 'center',
  },
  levelPillActive: {
    backgroundColor: c.primary,
    borderColor: c.primary,
  },
  levelPillText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: c.textSecondary,
  },
  levelPillTextActive: {
    color: '#000',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
    backgroundColor: c.background,
  },
  nextButton: {
    backgroundColor: c.primary,
    borderRadius: 16,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  nextText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#000',
  },
});
