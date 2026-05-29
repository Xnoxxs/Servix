import { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { spacing } from '#shared/foundations';
import { ScreenContainer, Typography } from '#shared/elements';
import { CategorySection, HeaderSection, ProviderCard } from '#shared/patterns';
import { categories, providers } from '../data/homeData';
import { useLocation } from '../hooks/useLocation';

type HomeScreenProps = {
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
};

export default function HomeScreen({ isFavorite, toggleFavorite }: HomeScreenProps) {
  const { coords, loading, error } = useLocation();

  useEffect(() => {
    console.log('Servix app loaded');
  }, []);

  return (
    <ScreenContainer>
      <HeaderSection />

      <ScrollView style={styles.scrollView}>
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
              <Typography variant="body">Lat: {coords.latitude.toFixed(5)}</Typography>
              <Typography variant="body">Lon: {coords.longitude.toFixed(5)}</Typography>
            </>
          )}
        </View>

        <View style={styles.section}>
          <Typography variant="title" style={styles.sectionTitle}>
            Popular Providers
          </Typography>
          {providers.map((provider) => (
            <ProviderCard
              key={provider.id}
              id={provider.id}
              name={provider.name}
              rating={provider.rating}
              isFavorite={isFavorite(provider.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
});
