import { ReactNode } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { colors, typography } from '#shared/foundations';

type TypographyVariant = 'heading' | 'title' | 'label' | 'body' | 'caption';

type TypographyProps = {
  variant?: TypographyVariant;
  color?: string;
  weight?: TextStyle['fontWeight'];
  style?: StyleProp<TextStyle>;
  children: ReactNode;
};

const variantStyles: Record<TypographyVariant, TextStyle> = {
  heading: {
    fontSize: typography.heading,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  title: {
    fontSize: typography.xl,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  label: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  body: {
    fontSize: typography.md,
    fontWeight: 'normal',
    color: colors.textPrimary,
  },
  caption: {
    fontSize: typography.sm,
    fontWeight: 'normal',
    color: colors.textMuted,
  },
};

export default function Typography({
  variant = 'body',
  color,
  weight,
  style,
  children,
}: TypographyProps) {
  const base = variantStyles[variant];

  return (
    <Text
      style={[
        base,
        color ? { color } : undefined,
        weight ? { fontWeight: weight } : undefined,
        style,
      ]}
    >
      {children}
    </Text>
  );
}
