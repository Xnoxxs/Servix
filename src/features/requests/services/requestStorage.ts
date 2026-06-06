import AsyncStorage from '@react-native-async-storage/async-storage';

const REQUESTS_KEY = 'serviceRequests';

export type ServiceRequest = {
  id: string;
  serviceType: string;
  location: string;
  description: string;
};

// Reads submitted service requests from AsyncStorage.
// Returns an empty array if nothing is stored yet or if reading fails.
export async function getRequests(): Promise<ServiceRequest[]> {
  try {
    const json = await AsyncStorage.getItem(REQUESTS_KEY);
    const result = json ? (JSON.parse(json) as ServiceRequest[]) : [];
    console.log('[requestStorage] loaded:', result);
    return result;
  } catch {
    return [];
  }
}

// Writes the full request list to AsyncStorage.
// Failures are silently swallowed so the UI is never blocked.
export async function saveRequests(requests: ServiceRequest[]): Promise<void> {
  try {
    await AsyncStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
    console.log('[requestStorage] saved:', requests);
  } catch {
    // silently ignore write errors
  }
}

// Adds one request to the persisted list and returns the updated list.
export async function addRequest(request: ServiceRequest): Promise<ServiceRequest[]> {
  const requests = await getRequests();
  const updatedRequests = [request, ...requests];

  await saveRequests(updatedRequests);

  return updatedRequests;
}
