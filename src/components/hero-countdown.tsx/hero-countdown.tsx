import NumberFlow, { NumberFlowGroup } from '@number-flow/react';
import { useCallback, useEffect, useState } from 'react';
import { ScrollReveal } from '../ui/scroll-reveal';

interface HeroCountdownProps {
  solsticeDate: Date;
}

export const HeroCountdown = ({ solsticeDate }: HeroCountdownProps) => {
  const getCountdownValues = useCallback((target: Date) => {
    const now = Date.now();
    const diff = Math.max(target.getTime() - now, 0);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }, []);

  const [countdown, setCountdown] = useState(getCountdownValues(solsticeDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        const next = getCountdownValues(solsticeDate);
        if (
          prev.days !== next.days ||
          prev.hours !== next.hours ||
          prev.minutes !== next.minutes ||
          prev.seconds !== next.seconds
        ) {
          return next;
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [getCountdownValues, solsticeDate]);

  const { days, hours, minutes, seconds } = countdown;

  return (
    <NumberFlowGroup>
      <div className="flex w-full items-center justify-center gap-2 tabular-nums sm:gap-4 md:gap-6 lg:gap-10">
        <ScrollReveal animation="scaleIn" delay={0.1} duration={0.6}>
          <div className="text-center">
            <NumberFlow
              trend={-1}
              className="font-mono text-2xl font-medium tracking-tighter sm:text-4xl md:text-6xl lg:text-8xl"
              value={days}
              format={{
                style: 'unit',
                unitDisplay: 'narrow',
                unit: 'day',
              }}
            />
          </div>
        </ScrollReveal>
        <ScrollReveal animation="scaleIn" delay={0.2} duration={0.6}>
          <div className="text-center">
            <NumberFlow
              trend={-1}
              className="font-mono text-2xl font-medium tracking-tighter sm:text-4xl md:text-6xl lg:text-8xl"
              value={hours}
              format={{
                style: 'unit',
                unitDisplay: 'narrow',
                unit: 'hour',
              }}
            />
          </div>
        </ScrollReveal>
        <ScrollReveal animation="scaleIn" delay={0.3} duration={0.6}>
          <div className="text-center">
            <NumberFlow
              trend={-1}
              className="font-mono text-2xl font-medium tracking-tighter sm:text-4xl md:text-6xl lg:text-8xl"
              value={minutes}
              format={{
                style: 'unit',
                unitDisplay: 'narrow',
                unit: 'minute',
                minimumIntegerDigits: 2,
              }}
            />
          </div>
        </ScrollReveal>
        <ScrollReveal animation="scaleIn" delay={0.4} duration={0.6}>
          <div className="text-center">
            <NumberFlow
              trend={-1}
              className="font-mono text-2xl font-medium tracking-tighter sm:text-4xl md:text-6xl lg:text-8xl"
              value={seconds}
              format={{
                style: 'unit',
                unitDisplay: 'narrow',
                unit: 'second',
                minimumIntegerDigits: 2,
              }}
            />
          </div>
        </ScrollReveal>
      </div>
    </NumberFlowGroup>
  );
};
