import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';

// Reads the persisted list of favorite provider IDs from AsyncStorage.
// Returns an empty array if nothing is stored yet or if reading fails.
export async function loadFavorites(): Promise<string[]> {
  try {
    const json = await AsyncStorage.getItem(FAVORITES_KEY);
    const result = json ? (JSON.parse(json) as string[]) : [];
    console.log('[favoritesStorage] loaded:', result);
    return result;
  } catch {
    return [];
  }
}

// Writes the current list of favorite provider IDs to AsyncStorage.
// Failures are silently swallowed so the UI is never blocked.
export async function saveFavorites(ids: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
    console.log('[favoritesStorage] saved:', ids);
  } catch {
    // silently ignore write errors
  }
}
