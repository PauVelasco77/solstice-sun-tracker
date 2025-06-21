import { HeroCountdown } from '../hero-countdown.tsx/hero-countdown';
import { motion } from 'framer-motion';
import { use } from 'react';

export default function LandingTemplate({
  solsticeDatePromise,
}: {
  solsticeDatePromise: Promise<Date>;
}) {
  const solsticeDate = use(solsticeDatePromise);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div>
        <header>
          <motion.h1
            className="text-foreground mt-10 text-4xl font-medium tracking-tight sm:text-9xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gradient">Revetlla de Sant Joan</span>
          </motion.h1>
        </header>
        <main>
          <motion.div
            className="text-foreground mt-10 text-4xl font-medium tracking-tight sm:text-9xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroCountdown solsticeDate={solsticeDate} />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
