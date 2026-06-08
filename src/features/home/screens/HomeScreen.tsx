import { useEffect } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { spacing } from '#shared/foundations';
import { ScreenContainer, Typography } from '#shared/elements';
import { CategorySection, HeaderSection, ProviderCard } from '#shared/patterns';
import { categories } from '#shared/data/providers';
import { useLocation } from '../hooks/useLocation';
import { useProviders } from '../hooks/useProviders';
import { useSearch } from '../hooks/useSearch';

type HomeScreenProps = {
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
};

export default function HomeScreen({
  isFavorite,
  toggleFavorite,
}: HomeScreenProps) {
  const { coords, loading, error } = useLocation();
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
      <View style={styles.section}>
        <Typography variant="title" style={styles.sectionTitle}>
          Your Location
        </Typography>
        {loading && <Typography variant="body">Fetching location…</Typography>}
        {error && <Typography variant="body">{error}</Typography>}
        {coords && (
          <>
            <Typography variant="body">
              Lat: {coords.latitude.toFixed(5)}
            </Typography>
            <Typography variant="body">
              Lon: {coords.longitude.toFixed(5)}
            </Typography>
          </>
        )}
      </View>

      <View style={styles.providersHeader}>
        <Typography variant="title" style={styles.sectionTitle}>
          Popular Providers
        </Typography>

        {/* Search field — value and change handler come from useSearch */}
        <TextInput
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Search for a service..."
          placeholderTextColor="#999"
          autoCorrect={false}
        />
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
  section: {
    padding: spacing.lg,
  },
  providersHeader: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  cardWrapper: {
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});
