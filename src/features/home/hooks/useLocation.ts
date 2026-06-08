import { useEffect, useState } from 'react';
import {
  getCurrentLocation,
  LocationCoords,
} from '../services/locationService';

type UseLocationResult = {
  coords: LocationCoords | null;
  loading: boolean;
  error: string | null;
};

// Calls the location service once on mount and exposes the result
// as plain state. Components only ever import this hook.
export function useLocation(): UseLocationResult {
  const [coords, setCoords] = useState<LocationCoords | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCurrentLocation().then((result) => {
      if (result.success) {
        setCoords(result.coords);
      } else {
        setError(result.error);
      }
      setLoading(false);
    });
  }, []);

  return { coords, loading, error };
}
