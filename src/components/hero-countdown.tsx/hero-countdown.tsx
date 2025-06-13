import NumberFlow, { NumberFlowGroup } from '@number-flow/react';
import { useCallback, useEffect, useState } from 'react';

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
  }, [solsticeDate]);

  const { days, hours, minutes, seconds } = countdown;

  return (
    <NumberFlowGroup>
      <div className="flex min-w-full items-center gap-12 tabular-nums">
        <div>
          <NumberFlow
            trend={-1}
            className="text-8xl font-medium tracking-tighter whitespace-pre-wrap"
            value={days}
            format={{
              style: 'unit',
              unitDisplay: 'short',
              unit: 'day',
              minimumIntegerDigits: 2,
            }}
          />
        </div>
        <div>
          <NumberFlow
            trend={-1}
            className="text-8xl font-medium tracking-tighter whitespace-pre-wrap"
            value={hours}
            format={{
              style: 'unit',
              unitDisplay: 'short',
              unit: 'hour',
              minimumIntegerDigits: 2,
            }}
          />
        </div>
        <div>
          <NumberFlow
            trend={-1}
            className="text-8xl font-medium tracking-tighter whitespace-pre-wrap"
            value={minutes}
            format={{
              style: 'unit',
              unitDisplay: 'short',
              unit: 'minute',
              minimumIntegerDigits: 2,
            }}
          />
        </div>
        <div>
          <NumberFlow
            trend={-1}
            className="text-8xl font-medium tracking-tighter whitespace-pre-wrap"
            value={seconds}
            format={{
              style: 'unit',
              unitDisplay: 'short',
              unit: 'second',
              minimumIntegerDigits: 2,
            }}
          />
        </div>
      </div>
    </NumberFlowGroup>
  );
};
