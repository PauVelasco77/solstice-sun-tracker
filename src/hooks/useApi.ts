import { useCallback } from 'react';
import { SunTimingApiRequest } from '../types/sunTiming';
import { getSunTimingService } from '../services/sunTiming';

export const useApi = () => {
  const getSunTiming = useCallback(
    async (params: Omit<SunTimingApiRequest, 'date_start' | 'date_end'>) =>
      await getSunTimingService(params),
    [],
  );

  const getSunTimingRange = useCallback(
    async (
      params: Required<
        Pick<SunTimingApiRequest, 'date_start' | 'date_end'> &
          Partial<Pick<SunTimingApiRequest, 'lat' | 'lng'>>
      >,
    ) => await getSunTimingService(params),
    [],
  );

  return { getSunTiming, getSunTimingRange };
};
