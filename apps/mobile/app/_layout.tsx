import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../hooks/useAuth';
import { Analytics } from '../services/analytics';
import { theme } from '../theme';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular: require('@expo-google-fonts/inter/Inter_400Regular.ttf'),
    Inter_500Medium: require('@expo-google-fonts/inter/Inter_500Medium.ttf'),
    Inter_600SemiBold: require('@expo-google-fonts/inter/Inter_600SemiBold.ttf'),
    Inter_700Bold: require('@expo-google-fonts/inter/Inter_700Bold.ttf'),
  });
  
  // This hook handles auth-based routing protection
  const { isLoading: isAuthLoading } = useAuth();

  useEffect(() => {
    // Init analytics early
    Analytics.init();
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      if (!isAuthLoading) {
        SplashScreen.hideAsync();
      }
    }
  }, [fontsLoaded, fontError, isAuthLoading]);

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(onboarding)" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
