import { useCallback } from 'react';
import { getGeolocationService } from '../services/geolocation';

export const useGeolocation = () => {
  const getGeolocation = useCallback(
    async () => await getGeolocationService(),
    [],
  );

  return { getGeolocation };
};
