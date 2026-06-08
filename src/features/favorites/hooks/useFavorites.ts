import { useEffect, useRef, useState } from 'react';
import { loadFavorites, saveFavorites } from '../services/favoritesStorage';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Tracks whether the initial load from AsyncStorage has completed.
  // We must not save until after loading, otherwise we would overwrite
  // stored data with the initial empty array on every app launch.
  const hasLoaded = useRef(false);

  // Load persisted favorites once when the hook mounts.
  useEffect(() => {
    loadFavorites().then((stored) => {
      setFavorites(stored);
      hasLoaded.current = true;
    });
  }, []);

  // Persist favorites to AsyncStorage whenever the list changes,
  // but only after the initial load has completed.
  useEffect(() => {
    if (hasLoaded.current) {
      saveFavorites(favorites);
    }
  }, [favorites]);

  // Returns true if the provider with the given id is a favorite.
  const isFavorite = (id: string) => favorites.includes(id);

  // Adds the id to favorites if not present, removes it if it is.
  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  return { isFavorite, toggleFavorite };
}
