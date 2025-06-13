import { Suspense, useMemo } from 'react';
import LandingTemplate from './components/templates/landing-template';
import { useApi } from './hooks/useApi';
import { useSolstice } from './hooks/useSolstice';
import { useGeolocation } from './hooks/useGeolocation';

export default function App() {
  const { getSunTimingRange } = useApi();
  const { getLongestDay } = useSolstice();
  const { getGeolocation } = useGeolocation();

  const sunTimingRangePromise = useMemo(async () => {
    const geoLocation = await getGeolocation();
    if (!geoLocation) throw new Error('No geolocation');

    return getSunTimingRange({
      lat: geoLocation?.coords.latitude,
      lng: geoLocation?.coords.longitude,
      date_start: '2025-06-12',
      date_end: '2025-06-30',
    });
  }, [getGeolocation, getSunTimingRange]);

  const solsticeDatePromise = useMemo(async () => {
    const sunTiming = await sunTimingRangePromise;
    const longestDay = getLongestDay(sunTiming);
    return new Date(longestDay.date);
  }, [sunTimingRangePromise, getLongestDay]);

  return (
    <Suspense fallback={<BigSpinner />}>
      <LandingTemplate
        solsticeDatePromise={solsticeDatePromise}
        sunTimingPromise={sunTimingRangePromise}
      />
    </Suspense>
  );
}

function BigSpinner() {
  return <h2>🌀 Loading...</h2>;
}
