import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, spacing, typography } from '#shared/foundations';

type ButtonVariant = 'primary' | 'outline';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
};

export default function Button({
  label,
  onPress,
  variant = 'primary',
}: ButtonProps) {
  return (
    <Pressable
      style={[
        styles.base,
        variant === 'outline' ? styles.outline : styles.primary,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.label,
          variant === 'outline' ? styles.labelOutline : styles.labelPrimary,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  label: {
    fontSize: typography.md,
    fontWeight: '600',
  },
  labelPrimary: {
    color: colors.white,
  },
  labelOutline: {
    color: colors.primary,
  },
});
