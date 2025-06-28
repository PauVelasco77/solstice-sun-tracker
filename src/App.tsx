import { Suspense, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
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

function ParallaxSection({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <motion.section
      ref={ref}
      className={`relative h-screen w-full flex-shrink-0 snap-start snap-always ${className}`}
      style={{ y }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.section>
  );
}

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

      <div className="h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth">
        <ParallaxSection>
          <Meteors />
          <LandingTemplate solsticeDatePromise={solsticeDatePromise} />
        </ParallaxSection>

        <ParallaxSection>
          <DescriptionTemplate />
        </ParallaxSection>

        <ParallaxSection className="overflow-hidden">
          <BentoGridTemplate />
        </ParallaxSection>
      </div>
    </Suspense>
  );
}

function BigSpinner() {
  return <h2>🌀 Loading...</h2>;
}
