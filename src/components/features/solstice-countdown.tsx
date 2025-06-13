import { useEffect, useState } from 'react';
import NumberFlow from '@number-flow/react';

interface SolsticeCountdownProps {
  solsticeDate: Date;
}

export const SolsticeCountdown = ({ solsticeDate }: SolsticeCountdownProps) => {
  const [countdown, setCountdown] = useState<number>(0);

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
    <div>
      <NumberFlow
        className="text-8xl font-medium tracking-tighter whitespace-pre-wrap text-black dark:text-white"
        value={days}
      />
      days
      <NumberFlow
        className="text-8xl font-medium tracking-tighter whitespace-pre-wrap text-black dark:text-white"
        value={hours}
      />
      hours
      <NumberFlow
        className="text-8xl font-medium tracking-tighter whitespace-pre-wrap text-black dark:text-white"
        value={minutes}
      />
      minutes
      <NumberFlow
        className="text-8xl font-medium tracking-tighter whitespace-pre-wrap text-black dark:text-white"
        value={seconds}
      />
      seconds
    </div>
  );
};
