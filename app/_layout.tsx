import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FavoritesProvider } from '#features/favorites/context/FavoritesContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="providers" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="light" />
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
