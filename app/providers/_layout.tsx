import { Stack } from 'expo-router';
import { colors } from '#shared/foundations';

export default function ProvidersLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'All Providers' }} />
      <Stack.Screen name="[id]" options={{ title: 'Provider Details' }} />
    </Stack>
  );
}
