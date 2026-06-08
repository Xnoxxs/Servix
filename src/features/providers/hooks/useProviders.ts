import { useCallback, useState } from 'react';
import {
  moreProviders,
  providers,
} from '#features/providers/services/providerCatalog';
import type { Provider } from '#features/providers/types/Provider';

type UseProvidersResult = {
  list: Provider[];
  refreshing: boolean;
  onRefresh: () => void;
  onEndReached: () => void;
};

export function useProviders(): UseProvidersResult {
  const [list, setList] = useState<Provider[]>(providers);
  const [refreshing, setRefreshing] = useState(false);

  // Pull-to-refresh: simulate a network refresh by reloading the original
  // mock data after a short delay. Everything stays local and static.
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setList([...providers]);
      setRefreshing(false);
    }, 1000);
  }, []);

  // Reaching the end of the list appends the extra mock providers once.
  // We guard against duplicates by skipping ids that are already shown.
  const onEndReached = useCallback(() => {
    setList((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const additions = moreProviders.filter((p) => !existingIds.has(p.id));
      return additions.length > 0 ? [...prev, ...additions] : prev;
    });
  }, []);

  return { list, refreshing, onRefresh, onEndReached };
}
