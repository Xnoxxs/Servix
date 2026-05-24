import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type ProviderCardProps = {
  name: string;
  rating: number;
};

export default function ProviderCard({ name, rating }: ProviderCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.rating}>Rating: {rating.toFixed(1)} ★</Text>
      </View>
      <Pressable style={styles.favoriteButton} onPress={toggleFavorite}>
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
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  rating: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  favoriteButton: {
    padding: 8,
  },
  favoriteText: {
    fontSize: 24,
    color: '#ef4444',
  },
});
