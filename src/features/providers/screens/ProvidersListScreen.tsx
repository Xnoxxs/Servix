import { FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { spacing } from '#shared/foundations';
import { ScreenContainer } from '#shared/elements';
import { useFavoritesContext } from '#features/favorites/context/FavoritesContext';
import ProviderCard from '../components/ProviderCard';
import { getAllProviders } from '../services/providerCatalog';

export default function ProvidersListScreen() {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavoritesContext();

  return (
    <ScreenContainer>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={getAllProviders()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProviderCard
            id={item.id}
            name={item.name}
            rating={item.rating}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={toggleFavorite}
            onPress={(id) => router.push(`/providers/${id}`)}
          />
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    padding: spacing.lg,
  },
});
