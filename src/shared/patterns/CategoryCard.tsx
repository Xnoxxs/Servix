import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '#shared/foundations';
import { Typography } from '#shared/elements';

type CategoryCardProps = {
  name: string;
};

export default function CategoryCard({ name }: CategoryCardProps) {
  return (
    <View style={styles.card}>
      <Typography variant="body" weight="600">{name}</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: spacing.sm,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    marginRight: spacing.md,
    minWidth: 120,
    alignItems: 'center',
  },
});
