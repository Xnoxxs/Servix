import { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { spacing } from '#shared/foundations';
import { ScreenContainer, Typography } from '#shared/elements';
import { CategorySection, HeaderSection, ProviderCard } from '#shared/patterns';
import { categories, providers } from '../data/homeData';

export default function HomeScreen() {
  useEffect(() => {
    console.log('Servix app loaded');
  }, []);

  return (
    <ScreenContainer>
      <HeaderSection />

      <ScrollView style={styles.scrollView}>
        <CategorySection title="Categories" categories={categories} />

        <View style={styles.section}>
          <Typography variant="title" style={styles.sectionTitle}>
            Popular Providers
          </Typography>
          {providers.map((provider) => (
            <ProviderCard
              key={provider.id}
              name={provider.name}
              rating={provider.rating}
            />
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
});
