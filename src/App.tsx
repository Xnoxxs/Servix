import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFavorites } from '#features/home/hooks/useFavorites';
import { TabNavigator } from '#navigation/index';

export default function App() {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigator isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
      </NavigationContainer>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
