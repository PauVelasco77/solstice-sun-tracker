import { Suspense } from 'react';
import LandingTemplate from './components/templates/landing-template';
import { useSantJoan } from './hooks/useSantJoan';
import BentoGridTemplate from './components/templates/bento-template';
import DescriptionTemplate from './components/templates/description-template';
import { ScrollProgress } from './components/ui/scroll-progress';
import { Meteors } from './components/ui/meteors';

export default function App() {
  const { getNextSantJoan } = useSantJoan();
  const santJoanDate = getNextSantJoan;

  return (
    <Suspense fallback={<BigSpinner />}>
      <ScrollProgress />

      <div className="h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth">
        <div className="relative h-screen w-full flex-shrink-0 snap-start snap-always">
          <Meteors />
          <LandingTemplate santJoanDate={santJoanDate} />
        </div>

        <div className="relative h-screen w-full flex-shrink-0 snap-start snap-always">
          <DescriptionTemplate />
        </div>

        <div className="relative h-screen w-full flex-shrink-0 snap-start snap-always overflow-auto">
          <BentoGridTemplate />
        </div>
      </div>
    </Suspense>
  );
}

function BigSpinner() {
  return <h2>🌀 Loading...</h2>;
}
