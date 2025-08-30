import { MMKV } from "react-native-mmkv";

/**
 *
 * @param key
 * @returns
 */
export const storage = new MMKV();
export async function getData(key: string): Promise<string | undefined> {
  try {
    return storage.getString(key);
  } catch (error) {
    return undefined;
  }
}

/**
 *
 * @param key
 * @param value
 * @returns
 */
export async function storeData(key: string, value: any): Promise<boolean> {
  try {
    storage.set(key, value);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 *
 * @param key
 * @returns
 */
export async function removeStore(key: string): Promise<boolean> {
  try {
    storage.delete(key);
    return true;
  } catch (error) {
    return false;
  }
}

export async function clearStorage(): Promise<void> {
  try {
    storage.clearAll();
  } catch (error) {}
}
