import * as Location from 'expo-location';
import type { LocationCoords, LocationPlace, LocationResult } from '../types';

function parsePlace(
  address: Location.LocationGeocodedAddress,
): LocationPlace | null {
  const city =
    address.city ?? address.district ?? address.subregion ?? address.region;
  const country = address.country;

  if (!city && !country) {
    return null;
  }

  return {
    city: city ?? 'Unknown city',
    country: country ?? 'Unknown country',
  };
}

async function reverseGeocodePlace(
  coords: LocationCoords,
): Promise<LocationPlace | null> {
  try {
    const addresses = await Location.reverseGeocodeAsync(coords);
    const first = addresses[0];
    return first ? parsePlace(first) : null;
  } catch {
    return null;
  }
}

// Requests foreground location permission, then retrieves the current position.
// All Expo Location details are contained here — nothing leaks to the UI layer.
export async function getCurrentLocation(): Promise<LocationResult> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      return { success: false, error: 'Location permission was denied.' };
    }

    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const coords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    const place = await reverseGeocodePlace(coords);

    return { success: true, coords, place };
  } catch {
    return { success: false, error: 'Could not retrieve location.' };
  }
}
