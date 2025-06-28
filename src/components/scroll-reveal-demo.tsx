import { ScrollReveal } from './ui/scroll-reveal';

/**
 * Demo component showcasing all available scroll reveal animations
 * This can be used for testing and demonstration purposes
 */
export const ScrollRevealDemo = () => {
  const animations = [
    'fadeIn',
    'fadeInUp',
    'fadeInDown',
    'fadeInLeft',
    'fadeInRight',
    'scaleIn',
    'rotateIn',
  ] as const;

  return (
    <div className="min-h-screen space-y-20 p-8">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Scroll Reveal Demo</h1>
        <p className="text-lg text-gray-600">
          Scroll down to see different animations
        </p>
      </div>

      {animations.map((animation, index) => (
        <ScrollReveal
          key={animation}
          animation={animation}
          delay={index * 0.1}
          duration={0.6}
          threshold={0.3}
        >
          <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              {animation}
            </h2>
            <p className="text-gray-600">
              This card demonstrates the <strong>{animation}</strong> animation.
              It will trigger when scrolled into view with a {index * 0.1}s
              delay.
            </p>
          </div>
        </ScrollReveal>
      ))}

      <ScrollReveal animation="fadeInUp" delay={0.2}>
        <div className="mx-auto max-w-2xl rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
          <h2 className="mb-4 text-3xl font-bold">Custom Styled Card</h2>
          <p className="text-lg">
            You can combine scroll reveals with any styling, including
            gradients, shadows, and custom layouts. The animations work
            seamlessly with your existing design system.
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
};
