import { ScrollView, StyleSheet, View } from 'react-native';
import { spacing } from '#shared/foundations';
import { Typography } from '#shared/elements';
import CategoryCard from './CategoryCard';

type CategorySectionProps = {
  title: string;
  categories: string[];
};

export default function CategorySection({ title, categories }: CategorySectionProps) {
  return (
    <View style={styles.section}>
      <Typography variant="title" style={styles.sectionTitle}>
        {title}
      </Typography>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <CategoryCard key={category} name={category} />
        ))}
      </ScrollView>
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
});
