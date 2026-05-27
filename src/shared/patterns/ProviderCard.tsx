import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '#shared/foundations';
import { Typography } from '#shared/elements';

type ProviderCardProps = {
  name: string;
  rating: number;
};

export default function ProviderCard({ name, rating }: ProviderCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Typography variant="label">{name}</Typography>
        <Typography variant="caption" style={{ marginTop: spacing.xs }}>
          Rating: {rating.toFixed(1)} ★
        </Typography>
      </View>
      <Pressable style={styles.favoriteButton} onPress={toggleFavorite}>
        <Text style={styles.favoriteText}>{isFavorite ? '♥' : '♡'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: spacing.sm,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  info: {
    flex: 1,
  },
  favoriteButton: {
    padding: spacing.sm,
  },
  favoriteText: {
    fontSize: typography.xl,
    color: colors.danger,
  },
});
