import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '#features/home/screens/HomeScreen';
import FavoritesScreen from '#features/favorites/screens/FavoritesScreen';
import RequestsScreen from '#features/requests/screens/RequestsScreen';
import { colors } from '#shared/foundations';

const Tab = createBottomTabNavigator();

type TabNavigatorProps = {
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
};

export default function TabNavigator({
  isFavorite,
  toggleFavorite,
}: TabNavigatorProps) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>🏠</Text>
          ),
        }}
      >
        {() => (
          <HomeScreen isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Favorites"
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>♥</Text>
          ),
        }}
      >
        {() => (
          <FavoritesScreen
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Requests"
        component={RequestsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>R</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
