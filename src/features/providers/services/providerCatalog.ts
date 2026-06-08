import type { Provider } from '#features/providers/types/Provider';

export const categories = ['Plumbing', 'Electrical', 'Cleaning', 'Painting'];

export const providers: Provider[] = [
  { id: '1', name: 'Ino Plumbing', rating: 4.8 },
  { id: '2', name: 'Edu Motor Services', rating: 4.6 },
  { id: '3', name: 'Detailcar Gracia 3', rating: 4.9 },
];

// Extra static providers appended when the user scrolls to the end of the list.
// Kept local and static to simulate "load more" without any backend.
export const moreProviders: Provider[] = [
  { id: '4', name: 'Bright Spark Electrical', rating: 4.5 },
  { id: '5', name: 'Crystal Clean Co.', rating: 4.7 },
  { id: '6', name: 'ProPaint Studio', rating: 4.4 },
];

export function getAllProviders(): Provider[] {
  return [...providers, ...moreProviders];
}

export function getProviderById(id: string): Provider | undefined {
  return getAllProviders().find((p) => p.id === id);
}
