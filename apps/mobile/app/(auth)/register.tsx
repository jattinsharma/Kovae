import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { KText } from '../../components/ui/KText';
import { useAuthStore } from '../../stores/auth-store';
import { colors } from '../../theme/colors';
import { theme } from '../../theme';

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !name) {
      setError('Please fill in all fields');
      return;
    }
    if (!agreedTerms) {
      setError('Please agree to the Terms & Conditions');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await register(email, password, name);
      router.replace('/(onboarding)/goals');
    } catch (err: any) {
      setError(err.message || 'Failed to create account.');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <KText style={styles.title}>Create Your Account</KText>
            <KText style={styles.subtitle}>
              Start your transformation today
            </KText>
          </View>

          {/* Error */}
          {error ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={16} color={colors.dark.error} />
              <KText style={styles.errorText}>{error}</KText>
            </View>
          ) : null}

          {/* Form */}
          <View style={styles.form}>
            {/* Full Name */}
            <View style={styles.fieldGroup}>
              <KText style={styles.label}>Full Name</KText>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={colors.dark.textMuted}
                  style={styles.inputIcon}
                />
                <View style={styles.inputWrapper}>
                  <KText style={styles.inputLabel}>Jattin Singh</KText>
                </View>
              </View>
              {/* Actual input overlaid */}
              <View style={[styles.inputContainer, styles.realInput]}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="transparent"
                  style={styles.inputIcon}
                />
                <View style={styles.inputWrapper}>
                  <KText style={[styles.inputLabel, { color: 'transparent' }]}>placeholder</KText>
                </View>
              </View>
              <View style={[StyleSheet.absoluteFill, { top: 24 }]}>
                <View style={[styles.inputContainer, { backgroundColor: 'transparent', borderColor: 'transparent' }]}>
                  <View style={{ width: 36 }} />
                  <input
                    style={{ display: 'none' }}
                  />
                </View>
              </View>
            </View>

            {/* We use RN TextInputs for actual functionality */}
            <InputField
              label="Full Name"
              placeholder="Jattin Singh"
              icon="person-outline"
              value={name}
              onChangeText={setName}
            />

            <InputField
              label="Email"
              placeholder="jattin@example.com"
              icon="mail-outline"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <InputField
              label="Password"
              placeholder="••••••••"
              icon="lock-closed-outline"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={colors.dark.textMuted}
                  />
                </TouchableOpacity>
              }
            />

            {/* Terms */}
            <TouchableOpacity
              style={styles.termsRow}
              onPress={() => setAgreedTerms(!agreedTerms)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.checkbox,
                  agreedTerms && styles.checkboxChecked,
                ]}
              >
                {agreedTerms && (
                  <Ionicons name="checkmark" size={14} color="#000" />
                )}
              </View>
              <KText style={styles.termsText}>
                I agree to the{' '}
                <KText style={styles.termsLink}>Terms & Conditions</KText>
              </KText>
            </TouchableOpacity>
          </View>

          {/* CTA */}
          <TouchableOpacity
            style={[styles.ctaButton, loading && styles.ctaDisabled]}
            onPress={handleRegister}
            activeOpacity={0.8}
            disabled={loading}
          >
            <KText style={styles.ctaText}>
              {loading ? 'Creating...' : 'Create Account'}
            </KText>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <KText style={styles.dividerText}>or continue with</KText>
            <View style={styles.dividerLine} />
          </View>

          {/* Social login */}
          <View style={styles.socialRow}>
            <SocialButton icon="logo-google" />
            <SocialButton icon="logo-apple" />
            <SocialButton icon="call-outline" />
          </View>

          {/* Footer */}
          <View style={styles.footerRow}>
            <KText style={styles.footerText}>Already have an account? </KText>
            <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
              <KText style={styles.footerLink}>Log In</KText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ─── Reusable InputField ───────────────────── */
import { TextInput, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
  label: string;
  icon: string;
  rightIcon?: React.ReactNode;
}

function InputField({
  label,
  icon,
  rightIcon,
  style: _style,
  ...rest
}: InputFieldProps) {
  return (
    <View style={styles.fieldGroup}>
      <KText style={styles.label}>{label}</KText>
      <View style={styles.inputContainer}>
        <Ionicons
          name={icon as any}
          size={20}
          color={colors.dark.textMuted}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholderTextColor={colors.dark.textMuted}
          {...rest}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
    </View>
  );
}

/* ─── Social Button ─────────────────────────── */
function SocialButton({ icon }: { icon: string }) {
  return (
    <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
      <Ionicons name={icon as any} size={22} color={colors.dark.textPrimary} />
    </TouchableOpacity>
  );
}

/* ─── Styles ────────────────────────────────── */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  flex: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    marginTop: 20,
    marginBottom: 28,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: colors.dark.textPrimary,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: colors.dark.textSecondary,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239,68,68,0.1)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 8,
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: colors.dark.error,
    flex: 1,
  },
  form: {
    gap: 4,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    color: colors.dark.textSecondary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.surface,
    borderWidth: 1,
    borderColor: colors.dark.border,
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 16,
  },
  realInput: {
    display: 'none',
  },
  inputIcon: {
    marginRight: 12,
  },
  inputWrapper: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: colors.dark.textPrimary,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: colors.dark.textPrimary,
    height: '100%',
  },
  rightIcon: {
    marginLeft: 8,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.dark.border,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.dark.primary,
    borderColor: colors.dark.primary,
  },
  termsText: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: colors.dark.textSecondary,
    flex: 1,
  },
  termsLink: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    color: colors.dark.primary,
  },
  ctaButton: {
    backgroundColor: colors.dark.primary,
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  ctaDisabled: {
    opacity: 0.6,
  },
  ctaText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#000000',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.dark.border,
  },
  dividerText: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: colors.dark.textMuted,
    marginHorizontal: 16,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 28,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.dark.surface,
    borderWidth: 1,
    borderColor: colors.dark.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: colors.dark.textSecondary,
  },
  footerLink: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: colors.dark.primary,
  },
});
