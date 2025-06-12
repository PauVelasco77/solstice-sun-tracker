import { useCallback } from 'react';
import { SunTimingApiRequest } from '../types/SunTiming';
import { getSunTimingService } from '../services/sunTiming';

export const useApi = () => {
  const getSunTiming = useCallback(
    async (params: SunTimingApiRequest) => await getSunTimingService(params),
    [],
  );

  return { getSunTiming };
};
