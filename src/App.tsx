import { useEffect, useState } from 'react';
import { useApi } from './hooks/useApi';
import { SunTimingResults } from './types/sunTiming';
import { useSolstice } from './hooks/useSolstice';

function App() {
  const [sunTiming, setSunTiming] = useState<SunTimingResults[] | null>(null);
  const { getSunTimingRange } = useApi();
  const { getLongestDay } = useSolstice();

  useEffect(() => {
    getSunTimingRange({
      lat: 38.907192,
      lng: -77.036873,
      date_start: '2025-06-12',
      date_end: '2025-06-30',
    }).then((sunTiming) => {
      setSunTiming(sunTiming);
      console.log(getLongestDay(sunTiming));
    });
  }, [getSunTimingRange, getLongestDay]);

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
