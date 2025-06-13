import NumberFlow, { NumberFlowGroup } from '@number-flow/react';
import { useEffect, useState } from 'react';

interface HeroCountdownProps {
  solsticeDate: Date;
}

export const HeroCountdown = ({ solsticeDate }: HeroCountdownProps) => {
  const [countdown, setCountdown] = useState<number>(
    solsticeDate.getTime() - Date.now(),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(solsticeDate.getTime() - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [solsticeDate]);

  const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countdown % (1000 * 60)) / 1000);

  return (
    <NumberFlowGroup>
      <div className="flex min-w-full items-center gap-12 tabular-nums">
        <div>
          <NumberFlow
            trend={-1}
            className="text-8xl font-medium tracking-tighter whitespace-pre-wrap text-black dark:text-white"
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
            className="text-8xl font-medium tracking-tighter whitespace-pre-wrap text-black dark:text-white"
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
            className="text-8xl font-medium tracking-tighter whitespace-pre-wrap text-black dark:text-white"
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
            className="text-8xl font-medium tracking-tighter whitespace-pre-wrap text-black dark:text-white"
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
