import PostHog from 'posthog-react-native';
import { APP_CONFIG } from '../constants';
import { Platform } from 'react-native';

let posthogClient: PostHog | null = null;

export const Analytics = {
  init: async () => {
    if (posthogClient) return;
    
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('[Analytics] PostHog disabled in development');
        return;
      }
      
      posthogClient = new PostHog(APP_CONFIG.POSTHOG_API_KEY, {
        host: APP_CONFIG.POSTHOG_HOST,
        captureAppLifecycleEvents: true, // Automatically captures App Opened etc
        flushAt: 20,
        flushInterval: 30000,
      });
      
      // Set super properties
      posthogClient.register({
        platform: Platform.OS,
        app_version: '0.1.0',
      });
    } catch (e) {
      console.warn('Failed to initialize PostHog analytics', e);
    }
  },
  
  identify: (userId: string, userProperties?: Record<string, any>) => {
    if (!posthogClient) return;
    posthogClient.identify(userId, userProperties);
  },
  
  track: (eventName: string, properties?: Record<string, any>) => {
    if (!posthogClient) {
      console.log(`[Analytics Mock] Tracked: ${eventName}`, properties);
      return;
    }
    posthogClient.capture(eventName, properties);
  },
  
  screen: (screenName: string, properties?: Record<string, any>) => {
    if (!posthogClient) {
      console.log(`[Analytics Mock] Screen: ${screenName}`, properties);
      return;
    }
    posthogClient.screen(screenName, properties);
  },
  
  reset: () => {
    if (!posthogClient) return;
    posthogClient.reset();
  }
};
