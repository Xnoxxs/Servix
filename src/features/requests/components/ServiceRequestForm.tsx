import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Button, Typography } from '#shared/elements';
import { colors, spacing } from '#shared/foundations';

type ServiceRequestInput = {
  serviceType: string;
  location: string;
  description: string;
};

type FormErrors = Partial<Record<keyof ServiceRequestInput, string>>;

type ServiceRequestFormProps = {
  onSubmit: (request: ServiceRequestInput) => Promise<void>;
};

export default function ServiceRequestForm({
  onSubmit,
}: ServiceRequestFormProps) {
  const [serviceType, setServiceType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!serviceType.trim()) {
      nextErrors.serviceType = 'Service Type is required.';
    }

    if (!location.trim()) {
      nextErrors.location = 'Location is required.';
    }

    if (!description.trim()) {
      nextErrors.description = 'Description is required.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    setSuccessMessage('');

    if (!validate()) {
      return;
    }

    await onSubmit({
      serviceType: serviceType.trim(),
      location: location.trim(),
      description: description.trim(),
    });

    setServiceType('');
    setLocation('');
    setDescription('');
    setErrors({});
    setSuccessMessage('Service request submitted successfully.');
  };

  return (
    <View style={styles.container}>
      <Typography variant="title" style={styles.title}>
        New Service Request
      </Typography>

      <View style={styles.field}>
        <Typography variant="label" style={styles.label}>
          Service Type
        </Typography>
        <TextInput
          style={styles.input}
          value={serviceType}
          onChangeText={setServiceType}
          placeholder="Example: Plumbing"
          placeholderTextColor={colors.textMuted}
        />
        {errors.serviceType && (
          <Typography
            variant="caption"
            color={colors.danger}
            style={styles.message}
          >
            {errors.serviceType}
          </Typography>
        )}
      </View>

      <View style={styles.field}>
        <Typography variant="label" style={styles.label}>
          Location
        </Typography>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Example: 123 Main Street"
          placeholderTextColor={colors.textMuted}
        />
        {errors.location && (
          <Typography
            variant="caption"
            color={colors.danger}
            style={styles.message}
          >
            {errors.location}
          </Typography>
        )}
      </View>

      <View style={styles.field}>
        <Typography variant="label" style={styles.label}>
          Description
        </Typography>
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          value={description}
          onChangeText={setDescription}
          placeholder="Describe what you need help with"
          placeholderTextColor={colors.textMuted}
          multiline
          textAlignVertical="top"
        />
        {errors.description && (
          <Typography
            variant="caption"
            color={colors.danger}
            style={styles.message}
          >
            {errors.description}
          </Typography>
        )}
      </View>

      <Button label="Submit Request" onPress={handleSubmit} />

      {successMessage && (
        <Typography
          variant="caption"
          color={colors.primary}
          style={styles.successMessage}
        >
          {successMessage}
        </Typography>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: spacing.md,
    borderWidth: 1,
    padding: spacing.lg,
  },
  title: {
    marginBottom: spacing.md,
  },
  field: {
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: spacing.sm,
    borderWidth: 1,
    color: colors.textPrimary,
    fontSize: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  descriptionInput: {
    minHeight: 96,
  },
  message: {
    marginTop: spacing.xs,
  },
  successMessage: {
    marginTop: spacing.md,
    textAlign: 'center',
  },
});
