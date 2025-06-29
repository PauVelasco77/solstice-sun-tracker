import { Suspense } from 'react';
import LandingTemplate from './components/templates/landing-template';
import { useSantJoan } from './hooks/useSantJoan';
import BentoGridTemplate from './components/templates/bento-template';
import DescriptionTemplate from './components/templates/description-template';
import { Meteors } from './components/ui/meteors';

export default function App() {
  const { getNextSantJoan } = useSantJoan();
  const santJoanDate = getNextSantJoan;

  return (
    <Suspense fallback={<BigSpinner />}>
      {/* Skip Navigation Link */}
      <a
        href="#main-content"
        className="focus:bg-primary focus:text-primary-foreground focus:ring-ring sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:ring-2 focus:outline-none"
      >
        Skip to main content
      </a>

      <div
        className="h-screen max-w-full snap-y snap-mandatory overflow-x-hidden overflow-y-auto scroll-smooth"
        role="main"
        id="main-content"
      >
        <section
          className="relative h-screen w-full flex-shrink-0 snap-start snap-always overflow-hidden"
          aria-labelledby="hero-heading"
          role="banner"
        >
          <Meteors />
          <LandingTemplate santJoanDate={santJoanDate} />
        </section>

        <section
          className="relative h-screen w-full flex-shrink-0 snap-start snap-always overflow-hidden"
          aria-labelledby="description-heading"
        >
          <DescriptionTemplate />
        </section>

        <section
          className="relative h-screen w-full flex-shrink-0 snap-start snap-always overflow-auto"
          aria-labelledby="gallery-heading"
        >
          <BentoGridTemplate />
        </section>
      </div>
    </Suspense>
  );
}

function BigSpinner() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading application content"
      className="flex h-screen items-center justify-center overflow-hidden"
    >
      <h2 className="text-2xl">🌀 Loading...</h2>
      <span className="sr-only">Please wait while the application loads</span>
    </div>
  );
}
