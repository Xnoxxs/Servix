import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { colors, spacing } from '#shared/foundations';
import { ScreenContainer, Typography } from '#shared/elements';
import { ProviderCard } from '#shared/patterns';
import { providers } from '#features/home/data/homeData';

type FavoritesScreenProps = {
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
};

export default function FavoritesScreen({ isFavorite, toggleFavorite }: FavoritesScreenProps) {
  // Filter the full provider list down to only the ones the user has saved.
  const favorited = providers.filter((p) => isFavorite(p.id));

  return (
    <ScreenContainer>
      {/* Header styled to match the HomeScreen header */}
      <View style={styles.headerWrapper}>
        <SafeAreaView style={styles.headerSafe}>
          <View style={styles.headerContent}>
            <Typography variant="heading" color={colors.white}>
              Favorites
            </Typography>
            <Typography variant="body" color={colors.primaryLight}>
              Your saved providers
            </Typography>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.list}>
          {favorited.length === 0 ? (
            <View style={styles.empty}>
              <Typography variant="caption">
                No favorites yet. Tap ♡ on a provider to save them here.
              </Typography>
            </View>
          ) : (
            favorited.map((provider) => (
              <ProviderCard
                key={provider.id}
                id={provider.id}
                name={provider.name}
                rating={provider.rating}
                isFavorite={isFavorite(provider.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerSafe: {
    backgroundColor: colors.primary,
  },
  headerContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  scrollView: {
    flex: 1,
  },
  list: {
    padding: spacing.lg,
  },
  empty: {
    paddingTop: spacing.xl,
    alignItems: 'center',
  },
});
