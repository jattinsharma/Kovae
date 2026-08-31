import * as SecureStore from 'expo-secure-store';

// We use SecureStore ONLY for secrets and tokens
export const SecureStorage = {
  setItem: async (key: string, value: string) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (e) {
      console.error(`Error saving to SecureStore for key ${key}`, e);
    }
  },
  
  getItem: async (key: string) => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (e) {
      console.error(`Error reading from SecureStore for key ${key}`, e);
      return null;
    }
  },
  
  removeItem: async (key: string) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (e) {
      console.error(`Error deleting from SecureStore for key ${key}`, e);
    }
  }
};
