import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '../../components/ui/ScreenWrapper';
import { KText } from '../../components/ui/KText';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useOnboardingStore } from '../../stores/onboarding-store';
import { theme } from '../../theme';

export default function NameScreen() {
  const router = useRouter();
  const { data, updateData } = useOnboardingStore();
  
  const [name, setName] = useState(data.name || '');

  const handleNext = () => {
    if (name.trim().length === 0) return;
    
    updateData({ name: name.trim() });
    router.push('/(onboarding)/goals');
  };

  return (
    <ScreenWrapper scrollable padding={false} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <KText variant="h1" weight="bold">What should we call you?</KText>
          <KText color="secondary" style={styles.subtitle}>
            Your KOVAE profile will use this name.
          </KText>
        </View>

        <View style={styles.form}>
          <Input
            placeholder="Your first name"
            value={name}
            onChangeText={setName}
            autoFocus
          />
        </View>
      </View>
      
      <View style={styles.footer}>
        <Button 
          title="Continue" 
          onPress={handleNext} 
          disabled={name.trim().length === 0}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
  },
  header: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing['2xl'],
  },
  subtitle: {
    marginTop: theme.spacing.sm,
  },
  form: {
    flex: 1,
  },
  footer: {
    padding: theme.spacing.xl,
    paddingBottom: theme.spacing['2xl'],
  },
});
