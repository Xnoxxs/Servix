import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '#shared/foundations';
import { Typography } from '#shared/elements';
import type { LocationPlace } from '../types';

type LocationSectionProps = {
  place: LocationPlace | null;
  loading: boolean;
  error: string | null;
};

export default function LocationSection({
  place,
  loading,
  error,
}: LocationSectionProps) {
  return (
    <View style={styles.section}>
      <Typography variant="title" style={styles.sectionTitle}>
        Your Location
      </Typography>
      {loading && <Typography variant="body">Fetching location…</Typography>}
      {error && <Typography variant="body">{error}</Typography>}
      {place && (
        <View style={styles.card}>
          <Typography variant="body" style={styles.pin}>
            📍
          </Typography>
          <View style={styles.placeText}>
            <Typography variant="label">{place.city}</Typography>
            <Typography variant="caption" style={styles.country}>
              {place.country}
            </Typography>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: spacing.sm,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pin: {
    fontSize: 28,
    marginRight: spacing.md,
  },
  placeText: {
    flex: 1,
  },
  country: {
    marginTop: spacing.xs,
    color: colors.textMuted,
  },
});
