import axios from 'axios';
import { supabase } from './supabase';
import { APP_CONFIG } from '../constants';

export const api = axios.create({
  baseURL: APP_CONFIG.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Inject Supabase JWT into all API requests
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  
  return config;
});

// Generic error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // In production, we'd log this to Sentry
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
