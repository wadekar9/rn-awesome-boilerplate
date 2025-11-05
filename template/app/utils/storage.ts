import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export const Storage = {
  getString(key: string): string | undefined {
    try {
      return storage.getString(key);
    } catch {
      return undefined;
    }
  },

  /** Safely store any value (primitives + JSON-serializable objects/arrays) */
  set(key: string, value: string | number | boolean | object | any[]): boolean {
    try {
      if (value === null || value === undefined) {
        return false;
      }

      if (typeof value === 'object') {
        storage.set(key, JSON.stringify(value));
      } else {
        storage.set(key, value);
      }
      return true;
    } catch {
      return false;
    }
  },

  delete(key: string): boolean {
    try {
      storage.delete(key);
      return true;
    } catch {
      return false;
    }
  },

  clearAll(): void {
    try {
      storage.clearAll();
    } catch {}
  },

  contains(key: string): boolean {
    return storage.contains(key);
  },

  getAllKeys(): string[] {
    return storage.getAllKeys();
  },
};

// Optional: Helper to retrieve and parse JSON
export const getJson = <T = any>(key: string): T | undefined => {
  const value = Storage.getString(key);
  if (!value) return undefined;
  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
};