import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '../../components/ui/ScreenWrapper';
import { KText } from '../../components/ui/KText';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { supabase } from '../../services/supabase';
import { theme } from '../../theme';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleReset = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'kovae://reset-password',
      });
      
      if (resetError) throw resetError;
      
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset instructions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper scrollable>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <KText variant="h1" weight="bold">Reset Password</KText>
          <KText color="secondary" style={styles.subtitle}>
            Enter your email to receive recovery instructions.
          </KText>
        </View>

        <View style={styles.form}>
          {success ? (
            <View style={styles.successBox}>
              <KText color="success" align="center">
                Check your email for a password reset link.
              </KText>
              <Button 
                title="Back to Login" 
                variant="secondary"
                onPress={() => router.replace('/(auth)/login')} 
                style={styles.backButton}
              />
            </View>
          ) : (
            <>
              {error ? (
                <KText color="error" style={styles.errorText}>{error}</KText>
              ) : null}
              
              <Input
                label="Email"
                placeholder="name@example.com"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              
              <Button 
                title="Send Instructions" 
                onPress={handleReset} 
                loading={loading}
                style={styles.submitButton}
              />
              
              <Button 
                title="Back to Login" 
                variant="ghost"
                onPress={() => router.back()} 
              />
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: theme.spacing['2xl'],
  },
  header: {
    marginBottom: theme.spacing['2xl'],
  },
  subtitle: {
    marginTop: theme.spacing.sm,
  },
  form: {
    gap: theme.spacing.sm,
  },
  submitButton: {
    marginTop: theme.spacing.lg,
  },
  errorText: {
    marginBottom: theme.spacing.md,
  },
  successBox: {
    padding: theme.spacing.lg,
    backgroundColor: `${theme.colors.success}10`,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: `${theme.colors.success}30`,
  },
  backButton: {
    marginTop: theme.spacing.xl,
  }
});
