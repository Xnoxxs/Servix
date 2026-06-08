import { useEffect, useState } from 'react';
import { addRequest, getRequests } from '../services/requestStorage';
import type { ServiceRequest } from '../types/ServiceRequest';

type CreateRequestInput = {
  serviceType: string;
  location: string;
  description: string;
};

type UseRequestsResult = {
  requests: ServiceRequest[];
  createRequest: (input: CreateRequestInput) => Promise<void>;
};

export function useRequests(): UseRequestsResult {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);

  // Load persisted service requests once when the hook mounts.
  useEffect(() => {
    getRequests().then((storedRequests) => {
      setRequests(storedRequests);
    });
  }, []);

  const createRequest = async (input: CreateRequestInput) => {
    const request: ServiceRequest = {
      id: Date.now().toString(),
      serviceType: input.serviceType,
      location: input.location,
      description: input.description,
    };

    const updatedRequests = await addRequest(request);
    setRequests(updatedRequests);
  };

  return { requests, createRequest };
}
