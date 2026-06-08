import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { colors, spacing, typography } from '#shared/foundations';
import { ScreenContainer, Typography } from '#shared/elements';
import { useFavoritesContext } from '#features/favorites/context/FavoritesContext';
import { getProviderById } from '../services/providerCatalog';

export default function ProviderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const provider = id ? getProviderById(id) : undefined;

  if (!provider) {
    return (
      <ScreenContainer>
        <View style={styles.content}>
          <Typography variant="title">Provider not found</Typography>
          <Typography variant="body" style={styles.description}>
            This provider may have been removed or the link is invalid.
          </Typography>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <Typography variant="heading">{provider.name}</Typography>
        <Typography variant="body" style={styles.rating}>
          Rating: {provider.rating.toFixed(1)} ★
        </Typography>
        <Typography variant="body" style={styles.description}>
          Professional local service provider.
        </Typography>

        <Pressable
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(provider.id)}
        >
          <Text style={styles.favoriteText}>
            {isFavorite(provider.id) ? '♥ Saved' : '♡ Save to favorites'}
          </Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
  },
  rating: {
    marginTop: spacing.sm,
  },
  description: {
    marginTop: spacing.lg,
    color: colors.textMuted,
  },
  favoriteButton: {
    marginTop: spacing.xl,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  favoriteText: {
    fontSize: typography.lg,
    color: colors.danger,
  },
});
