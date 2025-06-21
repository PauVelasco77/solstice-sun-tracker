import { Suspense, useMemo } from 'react';
import LandingTemplate from './components/templates/landing-template';
import { useApi } from './hooks/useApi';
import { useSolstice } from './hooks/useSolstice';
import { CITIES } from './data/cities';
import { SelectCity } from './components/select-city';
import { useLocalStorage } from './hooks/useLocalStorage';
import BentoGridTemplate from './components/templates/bento-template';
import DescriptionTemplate from './components/templates/description-template';
import { ScrollProgress } from './components/ui/scroll-progress';
import { Meteors } from './components/ui/meteors';

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
      <ScrollProgress />

      <div className="relative h-dvh w-fit max-w-5xl snap-y snap-mandatory overflow-y-scroll">
        <div className="h-dvh snap-start">
          <Meteors />
          <LandingTemplate solsticeDatePromise={solsticeDatePromise} />
        </div>
        <div className="h-dvh snap-start">
          <DescriptionTemplate />
        </div>
        <div className="h-dvh snap-start">
          <BentoGridTemplate />
        </div>
      </div>
    </Suspense>
  );
}

function BigSpinner() {
  return <h2>🌀 Loading...</h2>;
}
