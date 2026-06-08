import { useEffect, useRef, useState } from 'react';
import { getLastSearch, saveLastSearch } from '../services/searchStorage';
import type { Provider } from '#features/providers/types/Provider';

type UseSearchResult = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredProviders: Provider[];
};

export function useSearch(providers: Provider[]): UseSearchResult {
  const [searchTerm, setSearchTerm] = useState('');

  // Tracks whether the initial load from AsyncStorage has completed.
  // We must not save until after loading, otherwise we would overwrite
  // stored data with the initial empty string on every app launch.
  const hasLoaded = useRef(false);

  // Load the persisted search term once when the hook mounts.
  useEffect(() => {
    getLastSearch().then((stored) => {
      setSearchTerm(stored);
      hasLoaded.current = true;
    });
  }, []);

  // Persist the search term to AsyncStorage whenever it changes,
  // but only after the initial load has completed.
  useEffect(() => {
    if (hasLoaded.current) {
      saveLastSearch(searchTerm);
    }
  }, [searchTerm]);

  // Filter providers by name, case-insensitive, using the current search term.
  const filteredProviders = providers.filter((provider) =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return { searchTerm, setSearchTerm, filteredProviders };
}
