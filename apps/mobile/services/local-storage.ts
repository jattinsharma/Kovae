import { createMMKV } from 'react-native-mmkv';

// MMKV v4+ uses createMMKV() (Nitro Module)
// We use MMKV for fast, synchronous app state and offline cache.
// NOT for secrets — those go in expo-secure-store.
export const storage = createMMKV({
  id: 'kovae-app-storage',
});

export const LocalStorage = {
  setItem: (key: string, value: string | number | boolean) => {
    storage.set(key, value);
  },
  
  getItem: (key: string): string | undefined => {
    return storage.getString(key);
  },
  
  getNumber: (key: string): number | undefined => {
    return storage.getNumber(key);
  },
  
  getBoolean: (key: string): boolean | undefined => {
    return storage.getBoolean(key);
  },
  
  getObject: <T>(key: string): T | null => {
    const json = storage.getString(key);
    if (!json) return null;
    try {
      return JSON.parse(json) as T;
    } catch (e) {
      console.error(`Error parsing JSON from MMKV for key ${key}`, e);
      return null;
    }
  },
  
  setObject: <T>(key: string, value: T) => {
    storage.set(key, JSON.stringify(value));
  },
  
  removeItem: (key: string) => {
    storage.remove(key); // v4 API: .remove() instead of .delete()
  },
  
  clearAll: () => {
    storage.clearAll();
  }
};
