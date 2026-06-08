import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '#shared/foundations';
import { Typography } from '#shared/elements';

type ProviderCardProps = {
  id: string;
  name: string;
  rating: number;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onPress?: (id: string) => void;
};

export default function ProviderCard({
  id,
  name,
  rating,
  isFavorite,
  onToggleFavorite,
  onPress,
}: ProviderCardProps) {
  const info = (
    <>
      <Typography variant="label">{name}</Typography>
      <Typography variant="caption" style={{ marginTop: spacing.xs }}>
        Rating: {rating.toFixed(1)} ★
      </Typography>
    </>
  );

  return (
    <View style={styles.card}>
      {onPress ? (
        <Pressable style={styles.info} onPress={() => onPress(id)}>
          {info}
        </Pressable>
      ) : (
        <View style={styles.info}>{info}</View>
      )}
      <Pressable
        style={styles.favoriteButton}
        onPress={() => onToggleFavorite(id)}
      >
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
