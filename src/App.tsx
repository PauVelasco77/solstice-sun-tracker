import { Suspense, useMemo } from 'react';
import LandingTemplate from './components/templates/landing-template';
import { useApi } from './hooks/useApi';
import { useSolstice } from './hooks/useSolstice';
import { CITIES } from './data/cities';
import { SelectCity } from './components/select-city';
import { useLocalStorage } from './hooks/useLocalStorage';

const LOCAL_STORAGE_KEY = 'solstice-location';

export default function App() {
  const { getSunTimingRange } = useApi();
  const { getLongestDay } = useSolstice();
  const { setValue: setSelectedCity, value: selectedCity } = useLocalStorage<
    (typeof CITIES)[number] | null
  >(LOCAL_STORAGE_KEY, null);

  const handleCitySelect = (cityName: string) => {
    const city = CITIES.find((c) => c.name === cityName);
    if (city) setSelectedCity(city);
  };

  const sunTimingRangePromise = useMemo(() => {
    if (!selectedCity) return Promise.reject(new Error('No location'));
    return getSunTimingRange({
      lat: selectedCity.lat,
      lng: selectedCity.lng,
      date_start: '2025-06-12',
      date_end: '2025-06-30',
    });
  }, [getSunTimingRange, selectedCity]);

  const solsticeDatePromise = useMemo(async () => {
    const sunTiming = await sunTimingRangePromise;
    const longestDay = getLongestDay(sunTiming);
    return new Date(longestDay.date);
  }, [sunTimingRangePromise, getLongestDay]);

  if (!selectedCity) {
    return <SelectCity onValueChange={handleCitySelect} />;
  }

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
