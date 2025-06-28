import { useCallback, useState, memo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
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

interface CardProps extends Pick<Card, 'image' | 'title' | 'category' | 'id'> {}

interface CardsProps extends React.PropsWithChildren {}

interface ModalCardProps extends Card {
  onClose: () => void;
}

const Cards = memo(({ children }: CardsProps) => (
  <div className="grid h-full w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-9 md:grid-rows-5 md:gap-4">
    {children}
  </div>
));

const Card = memo(({ image, title, category }: CardProps) => (
  <CardUI className="relative h-64 w-full overflow-hidden p-0 md:h-full">
    <img
      src={image}
      alt={title}
      className="h-full w-full object-cover"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
    <div className="absolute right-0 bottom-0 left-0 p-4">
      <Badge className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-sm text-white backdrop-blur-sm">
        {category}
      </Badge>
      <CardTitle className="text-base font-bold text-white md:text-lg">
        {title}
      </CardTitle>
    </div>
  </CardUI>
));

const ModalCard = ({
  image,
  title,
  category,
  description,
  id,
  onClose,
}: ModalCardProps) => (
  <motion.div className="fixed top-1/2 left-1/2 z-50 h-fit w-fit -translate-x-1/2 -translate-y-1/2 transform">
    <motion.div
      layoutId={id}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="relative max-h-[90vh] w-[95vw] max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl md:w-[90vw] dark:bg-gray-800"
    >
      <AspectRatio ratio={21 / 9}>
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </AspectRatio>

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 z-10 aspect-square w-fit rounded-full bg-black/50 p-0 text-white transition-colors hover:bg-black/70"
        onClick={onClose}
      >
        <X className="h-5 w-5 text-white md:h-4 md:w-4" />
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1 }}
        className="p-4 md:p-6"
      >
        <div className="mb-3 flex items-center gap-3">
          <Badge className="inline-block rounded-full border bg-gray-100 px-3 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200">
            {category}
          </Badge>
        </div>

        <CardTitle className="mb-4 text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
          {title}
        </CardTitle>

        <p className="text-sm leading-relaxed text-gray-600 md:text-base dark:text-gray-300">
          {description}
        </p>
      </motion.div>
    </motion.div>
  </motion.div>
);

export function BentoGrid({ cards }: { cards: Card[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleCloseModal = useCallback(() => setSelectedIndex(null), []);
  const handleSetIndex = useCallback(
    (index: number) => setSelectedIndex(index),
    [],
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
          {cards.map((card, index) => (
            <div key={card.id} className={`p-0 ${getBentoGridClass(index)}`}>
              <motion.div
                whileHover={{ scale: 0.98 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                layoutId={card.id}
                className="h-full w-full cursor-pointer overflow-hidden rounded-lg shadow-lg"
                onClick={() => handleSetIndex(index)}
              >
                <Card
                  id={card.id}
                  image={card.image}
                  title={card.title}
                  category={card.category}
                />
              </motion.div>
            </div>
          ))}
        </Cards>

        <AnimatePresence>
          {selectedIndex !== null && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                key="overlay"
                className="fixed inset-0 z-40 cursor-pointer bg-black/80"
                onClick={handleCloseModal}
              />
              <ModalCard {...cards[selectedIndex]} onClose={handleCloseModal} />
            </>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
}
