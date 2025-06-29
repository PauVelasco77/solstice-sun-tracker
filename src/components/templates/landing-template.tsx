import { HeroCountdown } from '../hero-countdown.tsx/hero-countdown';
import { ScrollReveal } from '../ui/scroll-reveal';

export default function LandingTemplate({
  santJoanDate,
}: {
  santJoanDate: Date;
}) {
  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl text-center">
        <header>
          <ScrollReveal animation="fadeInDown" duration={0.8}>
            <h1
              id="hero-heading"
              className="text-foreground text-2xl font-medium tracking-tight sm:text-4xl md:text-6xl lg:text-8xl xl:text-9xl"
            >
              <span className="text-gradient">Revetlla de Sant Joan</span>
            </h1>
          </ScrollReveal>
        </header>
        <main className="mt-6 md:mt-10">
          <ScrollReveal animation="fadeInLeft" delay={0.3} duration={0.8}>
            <div className="text-foreground">
              <div
                role="timer"
                aria-live="polite"
                aria-label="Countdown to Sant Joan celebration"
                aria-describedby="countdown-description"
              >
                <HeroCountdown solsticeDate={santJoanDate} />
              </div>
              <p id="countdown-description" className="sr-only">
                Live countdown showing the time remaining until the Revetlla de
                Sant Joan celebration begins
              </p>
            </div>
          </ScrollReveal>
        </main>
      </div>
    </div>
  );
}
