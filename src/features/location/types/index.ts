// The cleaned-up coordinates returned to the rest of the app.
// Components never see raw Expo Location types.
export type LocationCoords = {
  latitude: number;
  longitude: number;
};

// Human-readable place derived from reverse geocoding.
export type LocationPlace = {
  city: string;
  country: string;
};

// Discriminated union so callers always handle both outcomes explicitly.
export type LocationResult =
  | { success: true; coords: LocationCoords; place: LocationPlace | null }
  | { success: false; error: string };
