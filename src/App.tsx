import { useEffect, useState } from 'react';
import { useApi } from './hooks/useApi';
import { SunTimingResults } from './types/sunTiming';
import { useSolstice } from './hooks/useSolstice';
import { useGeolocation } from './hooks/useGeolocation';

function App() {
  const [sunTiming, setSunTiming] = useState<SunTimingResults[] | null>(null);
  const [geolocation, setGeolocation] = useState<GeolocationPosition | null>(
    null,
  );
  const { getSunTimingRange } = useApi();
  const { getLongestDay } = useSolstice();
  const { getGeolocation } = useGeolocation();

  useEffect(() => {
    getGeolocation().then(setGeolocation);
  }, [getGeolocation]);

  useEffect(() => {
    if (geolocation) {
      getSunTimingRange({
        lat: geolocation?.coords.latitude,
        lng: geolocation?.coords.longitude,
        date_start: '2025-06-12',
        date_end: '2025-06-30',
      }).then(setSunTiming);
    }
  }, [getSunTimingRange, getLongestDay, geolocation]);

  return (
    <div>
      <h1>Today's Daylight Info</h1>
      <div>
        {sunTiming?.map((sunTiming) => (
          <div key={sunTiming.date}>
            <p>Sunrise: {sunTiming.sunrise}</p>
            <p>Sunset: {sunTiming.sunset}</p>
            <p>Day Length: {sunTiming.day_length}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
