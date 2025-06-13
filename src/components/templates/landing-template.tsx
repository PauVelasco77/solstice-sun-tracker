import { HeroCountdown } from '../hero-countdown.tsx/hero-countdown';
import { motion } from 'framer-motion';
import { SunTimingResults } from '@/types/sunTiming';
import { use } from 'react';

export default function LandingTemplate({
  solsticeDatePromise,
  sunTimingPromise,
}: {
  solsticeDatePromise: Promise<Date>;
  sunTimingPromise: Promise<SunTimingResults[]>;
}) {
  const solsticeDate = use(solsticeDatePromise);
  const sunTiming = use(sunTimingPromise);

  return (
    <div className="grid min-h-dvh min-w-dvw grid-rows-[auto_1fr_auto] justify-center">
      <header>
        <motion.h1
          className="text-foreground mt-10 text-4xl font-medium tracking-tight sm:text-9xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gradient">Diada de Sant Joan</span>
        </motion.h1>
      </header>
      <main className="max-w-5xl min-w-5xl">
        <motion.div
          className="text-foreground mt-10 text-4xl font-medium tracking-tight sm:text-9xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <HeroCountdown solsticeDate={solsticeDate} />
        </motion.div>
        <div>
          {sunTiming?.map((sunTiming) => (
            <div key={sunTiming.date}>
              <p>Sunrise: {sunTiming.sunrise}</p>
              <p>Sunset: {sunTiming.sunset}</p>
              <p>Day Length: {sunTiming.day_length}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
