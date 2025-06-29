import { useCallback, useState, memo, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useReducedMotion,
} from 'motion/react';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card as CardUI, CardTitle } from '../ui/card';
import { AspectRatio } from '../ui/aspect-ratio';

interface Card {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
}

interface CardsProps {
  readonly children: React.ReactNode;
}

interface CardProps {
  readonly id: string;
  readonly image: string;
  readonly title: string;
  readonly category: string;
  readonly onClick?: () => void;
  readonly tabIndex?: number;
  readonly onKeyDown?: (event: React.KeyboardEvent) => void;
  readonly 'aria-describedby'?: string;
}

interface ModalCardProps extends Card {
  readonly onClose: () => void;
}

/**
 * Detect if user is on mobile device
 */
const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const Cards = memo(({ children }: CardsProps) => (
  <div
    className="grid h-full w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-9 md:grid-rows-5 md:gap-4"
    role="grid"
    aria-label="Sant Joan traditions gallery"
  >
    {children}
  </div>
));

const Card = memo(
  ({
    image,
    title,
    category,
    onClick,
    tabIndex,
    onKeyDown,
    'aria-describedby': ariaDescribedBy,
  }: CardProps) => (
    <CardUI
      className="focus-within:ring-ring relative h-64 w-full cursor-pointer overflow-hidden p-0 focus-within:ring-2 focus-within:ring-offset-2 md:h-full"
      style={{ boxShadow: 'none' }}
      role="gridcell"
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      aria-label={`${title} - ${category} tradition`}
      aria-describedby={ariaDescribedBy}
    >
      <img
        src={image}
        alt={`${title} - Traditional ${category.toLowerCase()} celebration during Sant Joan`}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <div className="from-background/90 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
      <div className="absolute right-0 bottom-0 left-0 p-4">
        <Badge className="bg-primary/20 text-foreground mb-2 inline-block rounded-full px-3 py-1 text-sm backdrop-blur-sm">
          {category}
        </Badge>
        <CardTitle className="text-foreground text-base font-bold md:text-lg">
          {title}
        </CardTitle>
      </div>
    </CardUI>
  ),
);

const ModalCard = ({
  image,
  title,
  category,
  description,
  id,
  onClose,
}: ModalCardProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  // Focus management
  useEffect(() => {
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Trap focus within modal
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstFocusable) {
            event.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            event.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, []);

  // Optimized animation settings for mobile
  const modalTransition = shouldReduceMotion
    ? { duration: 0.01 }
    : isMobile
      ? { type: 'tween' as const, duration: 0.2, ease: 'easeOut' as const }
      : { type: 'spring' as const, stiffness: 300, damping: 30, mass: 0.8 };

  const contentTransition = shouldReduceMotion
    ? { duration: 0.01 }
    : {
        duration: isMobile ? 0.15 : 0.3,
        ease: 'easeOut' as const,
        delay: isMobile ? 0 : 0.1,
      };

  return (
    <motion.div
      ref={modalRef}
      className="fixed top-1/2 left-1/2 z-50 h-fit w-fit -translate-x-1/2 -translate-y-1/2 transform"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${id}`}
      aria-describedby={`modal-description-${id}`}
    >
      <motion.div
        layoutId={shouldReduceMotion ? undefined : id}
        transition={modalTransition}
        className={`bg-card relative max-h-[90vh] w-[95vw] max-w-2xl overflow-hidden rounded-xl shadow-2xl md:w-[90vw] ${
          isMobile ? '' : 'backdrop-blur-sm'
        }`}
      >
        <AspectRatio ratio={21 / 9}>
          <img
            src={image}
            alt={`${title} - Traditional ${category.toLowerCase()} celebration during Sant Joan`}
            className="h-full w-full object-cover"
          />
        </AspectRatio>

        <Button
          ref={closeButtonRef}
          variant="ghost"
          size="icon"
          className={`bg-background/80 text-foreground hover:bg-background/90 absolute top-3 right-3 z-10 aspect-square w-fit rounded-full p-0 transition-colors ${
            isMobile ? '' : 'backdrop-blur-sm'
          }`}
          onClick={onClose}
          aria-label={`Close ${title} details`}
        >
          <X
            className="text-foreground h-5 w-5 md:h-4 md:w-4"
            aria-hidden="true"
          />
        </Button>

        <motion.div
          initial={
            shouldReduceMotion
              ? undefined
              : { opacity: 0, y: isMobile ? 10 : 20 }
          }
          animate={{ opacity: 1, y: 0 }}
          exit={
            shouldReduceMotion
              ? undefined
              : { opacity: 0, y: isMobile ? 10 : 20 }
          }
          transition={contentTransition}
          className="p-4 md:p-6"
        >
          <div className="mb-3 flex items-center gap-3">
            <Badge className="bg-muted text-muted-foreground inline-block rounded-full border px-3 py-1 text-sm">
              {category}
            </Badge>
          </div>

          <CardTitle
            id={`modal-title-${id}`}
            className="text-card-foreground mb-4 text-xl font-bold md:text-2xl"
          >
            {title}
          </CardTitle>

          <p
            id={`modal-description-${id}`}
            className="text-muted-foreground text-sm leading-relaxed md:text-base"
          >
            {description}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export function BentoGrid({ cards }: { cards: Card[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const handleCloseModal = useCallback(() => {
    setSelectedIndex(null);
    // Return focus to the card that opened the modal
    if (focusedIndex !== null && cardRefs.current[focusedIndex]) {
      cardRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  const handleSetIndex = useCallback((index: number) => {
    setSelectedIndex(index);
    setFocusedIndex(index);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      const { key } = event;

      if (key === 'Enter' || key === ' ') {
        event.preventDefault();
        handleSetIndex(index);
        return;
      }

      // Arrow key navigation
      let newIndex = focusedIndex;

      switch (key) {
        case 'ArrowRight':
          event.preventDefault();
          newIndex = (focusedIndex + 1) % cards.length;
          break;
        case 'ArrowLeft':
          event.preventDefault();
          newIndex = focusedIndex === 0 ? cards.length - 1 : focusedIndex - 1;
          break;
        case 'ArrowDown':
          event.preventDefault();
          // Move to next row (simplified grid navigation)
          newIndex = Math.min(focusedIndex + 2, cards.length - 1);
          break;
        case 'ArrowUp':
          event.preventDefault();
          // Move to previous row (simplified grid navigation)
          newIndex = Math.max(focusedIndex - 2, 0);
          break;
        case 'Home':
          event.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          newIndex = cards.length - 1;
          break;
        default:
          return;
      }

      setFocusedIndex(newIndex);
      cardRefs.current[newIndex]?.focus();
    },
    [focusedIndex, cards.length, handleSetIndex],
  );

  const getBentoGridClass = useCallback((index: number): string => {
    // Mobile: all cards take full width
    // Desktop: complex grid layout
    const mobileClass = 'w-full';
    const desktopClasses = {
      0: 'md:col-span-3 md:row-span-3',
      1: 'md:col-span-2 md:row-span-3 md:col-start-4 md:row-start-3',
      2: 'md:col-span-3 md:row-span-2 md:col-start-4 md:row-start-1',
      3: 'md:col-span-4 md:row-span-3 md:col-start-6 md:row-start-3',
      4: 'md:col-span-3 md:row-span-2 md:col-start-1 md:row-start-4',
      5: 'md:col-span-3 md:row-span-2 md:col-start-7 md:row-start-1',
    };

    return `${mobileClass} ${desktopClasses[index as keyof typeof desktopClasses] || 'md:row-span-3'}`;
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center py-4 md:h-screen md:py-0">
      <LayoutGroup>
        <Cards>
          {cards.map((card, index) => {
            // Optimize animation settings for mobile
            const cardTransition = shouldReduceMotion
              ? { duration: 0.01 }
              : {
                  duration: isMobile ? 0.4 : 0.6,
                  delay: isMobile ? index * 0.05 : index * 0.1,
                  ease: 'easeOut' as const,
                };

            const hoverTransition = shouldReduceMotion
              ? { duration: 0.01 }
              : { duration: isMobile ? 0.1 : 0.2 };

            return (
              <motion.div
                key={card.id}
                className={`p-0 ${getBentoGridClass(index)}`}
                initial={shouldReduceMotion ? undefined : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: isMobile ? 0.1 : 0.2 }}
                transition={cardTransition}
                role="gridcell"
              >
                <motion.div
                  whileHover={
                    shouldReduceMotion || isMobile ? undefined : { scale: 0.98 }
                  }
                  whileTap={
                    shouldReduceMotion
                      ? undefined
                      : { scale: isMobile ? 0.98 : 0.95 }
                  }
                  transition={hoverTransition}
                  layoutId={shouldReduceMotion ? undefined : card.id}
                  className="h-full w-full cursor-pointer overflow-hidden rounded-lg shadow-lg"
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                >
                  <Card
                    id={card.id}
                    image={card.image}
                    title={card.title}
                    category={card.category}
                    onClick={() => handleSetIndex(index)}
                    tabIndex={index === focusedIndex ? 0 : -1}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    aria-describedby={`card-description-${index}`}
                  />
                  <div id={`card-description-${index}`} className="sr-only">
                    {card.description}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </Cards>

        <AnimatePresence>
          {selectedIndex !== null && (
            <>
              <motion.div
                initial={shouldReduceMotion ? undefined : { opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0.01 }
                    : { duration: isMobile ? 0.15 : 0.25 }
                }
                key="overlay"
                className={`bg-background/80 fixed inset-0 z-40 cursor-pointer ${
                  isMobile ? '' : 'backdrop-blur-sm'
                }`}
                onClick={handleCloseModal}
                aria-hidden="true"
              />
              <ModalCard {...cards[selectedIndex]} onClose={handleCloseModal} />
            </>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
}
