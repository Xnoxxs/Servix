import { useEffect } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { spacing } from '#shared/foundations';
import { ScreenContainer, Typography } from '#shared/elements';
import { useFavoritesContext } from '#features/favorites/context/FavoritesContext';
import LocationSection from '#features/location/components/LocationSection';
import { useLocation } from '#features/location/hooks/useLocation';
import ProviderCard from '#features/providers/components/ProviderCard';
import { useProviders } from '#features/providers/hooks/useProviders';
import { categories } from '#features/providers/services/providerCatalog';
import SearchInput from '#features/search/components/SearchInput';
import { useSearch } from '#features/search/hooks/useSearch';
import CategorySection from '../components/CategorySection';
import HeaderSection from '../components/HeaderSection';

export default function HomeScreen() {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const { place, loading, error } = useLocation();
  const { list, refreshing, onRefresh, onEndReached } = useProviders();
  const { searchTerm, setSearchTerm, filteredProviders } = useSearch(list);

  useEffect(() => {
    console.log('Servix app loaded');
  }, []);

  // Everything above the provider list lives in the FlatList header so the
  // whole screen scrolls as one and we avoid nesting lists inside a ScrollView.
  // Passed as an element (not a component) so the search input keeps focus
  // while filtering re-renders the list.
  const listHeader = (
    <>
      <CategorySection title="Categories" categories={categories} />

      {/* Your Location section — driven entirely by the useLocation hook */}
      <LocationSection place={place} loading={loading} error={error} />

      <View style={styles.providersHeader}>
        <View style={styles.providersTitleRow}>
          <Typography variant="title" style={styles.sectionTitle}>
            Popular Providers
          </Typography>
          <Pressable onPress={() => router.push('/providers')}>
            <Typography variant="caption" style={styles.browseAll}>
              Browse all
            </Typography>
          </Pressable>
        </View>

        {/* Search field — value and change handler come from useSearch */}
        <SearchInput value={searchTerm} onChangeText={setSearchTerm} />
      </View>
    </>
  );

  return (
    <ScreenContainer>
      <HeaderSection />

      <FlatList
        style={styles.list}
        data={filteredProviders}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={listHeader}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ProviderCard
              id={item.id}
              name={item.name}
              rating={item.rating}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={toggleFavorite}
              onPress={(id) => router.push(`/providers/${id}`)}
            />
          </View>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  providersHeader: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  providersTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  browseAll: {
    color: '#007AFF',
  },
  cardWrapper: {
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
});
