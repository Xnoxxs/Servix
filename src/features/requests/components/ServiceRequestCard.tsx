import { StyleSheet, View } from 'react-native';
import { Typography } from '#shared/elements';
import { colors, spacing } from '#shared/foundations';
import type { ServiceRequest } from '../types/ServiceRequest';

type ServiceRequestCardProps = {
  request: ServiceRequest;
};

export default function ServiceRequestCard({
  request,
}: ServiceRequestCardProps) {
  return (
    <View style={styles.card}>
      <Typography variant="label">{request.serviceType}</Typography>

      <Typography variant="caption" style={styles.location}>
        Location: {request.location}
      </Typography>

      <Typography variant="body" style={styles.description}>
        {request.description}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: spacing.md,
    borderWidth: 1,
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  location: {
    marginTop: spacing.xs,
  },
  description: {
    marginTop: spacing.sm,
  },
});
