import * as Location from 'expo-location';

// The cleaned-up coordinates returned to the rest of the app.
// Components never see raw Expo Location types.
export type LocationCoords = {
  latitude: number;
  longitude: number;
};

// Discriminated union so callers always handle both outcomes explicitly.
export type LocationResult =
  | { success: true; coords: LocationCoords }
  | { success: false; error: string };

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

    return {
      success: true,
      coords: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
    };
  } catch {
    return { success: false, error: 'Could not retrieve location.' };
  }
}
