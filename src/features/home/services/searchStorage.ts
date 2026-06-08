import AsyncStorage from '@react-native-async-storage/async-storage';

const SEARCH_KEY = 'lastSearch';

// Reads the last search term the user typed from AsyncStorage.
// Returns an empty string if nothing is stored yet or if reading fails.
export async function getLastSearch(): Promise<string> {
  try {
    const value = await AsyncStorage.getItem(SEARCH_KEY);
    const result = value ?? '';
    console.log('[searchStorage] loaded:', result);
    return result;
  } catch {
    return '';
  }
}

// Writes the current search term to AsyncStorage so it survives app restarts.
// Failures are silently swallowed so the UI is never blocked.
export async function saveLastSearch(term: string): Promise<void> {
  try {
    await AsyncStorage.setItem(SEARCH_KEY, term);
    console.log('[searchStorage] saved:', term);
  } catch {
    // silently ignore write errors
  }
}
