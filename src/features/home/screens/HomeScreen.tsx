import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CategoryCard from '../components/CategoryCard';
import Header from '../components/Header';
import ProviderCard from '../components/ProviderCard';
import { categories, providers } from '../data/homeData';

export default function HomeScreen() {
  useEffect(() => {
    console.log('Servix app loaded');
  }, []);

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <CategoryCard key={category} name={category} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Providers</Text>
          {providers.map((provider) => (
            <ProviderCard
              key={provider.id}
              name={provider.name}
              rating={provider.rating}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
});
