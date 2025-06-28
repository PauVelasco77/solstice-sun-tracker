import { HeroCountdown } from '../hero-countdown.tsx/hero-countdown';
import { motion } from 'motion/react';
import { use } from 'react';

export default function LandingTemplate({
  solsticeDatePromise,
}: {
  solsticeDatePromise: Promise<Date>;
}) {
  const solsticeDate = use(solsticeDatePromise);

  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl text-center">
        <header>
          <motion.h1
            className="text-foreground text-2xl font-medium tracking-tight sm:text-4xl md:text-6xl lg:text-8xl xl:text-9xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gradient">Revetlla de Sant Joan</span>
          </motion.h1>
        </header>
        <main className="mt-6 md:mt-10">
          <motion.div
            className="text-foreground"
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
