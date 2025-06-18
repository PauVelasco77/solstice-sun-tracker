import { useCallback, useState, memo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
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
  <div className="grid h-full w-full grid-cols-9 grid-rows-5 justify-center gap-4 p-4">
    {children}
  </div>
));

const Card = memo(({ image, title, category }: CardProps) => (
  <CardUI className="relative h-full w-full overflow-hidden p-0">
    <img
      src={image}
      alt={title}
      className="h-full w-full object-cover"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
    <div className="absolute right-0 bottom-0 left-0 p-4">
      <Badge className="mb-2 inline-block rounded-full bg-white/20 px-2 py-1 text-xs text-white backdrop-blur-sm">
        {category}
      </Badge>
      <CardTitle className="text-lg font-bold text-white">{title}</CardTitle>
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
      className="relative max-h-[90vh] w-[90vw] max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-gray-800"
    >
      <AspectRatio ratio={21 / 9}>
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </AspectRatio>

      {/* Overlay button and content OUTSIDE layoutId */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
        onClick={onClose}
      >
        <X className="h-4 w-4 text-white" />
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1 }}
        className="p-6"
      >
        <div className="mb-3 flex items-center gap-3">
          <Badge className="inline-block rounded-full border bg-gray-100 px-3 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200">
            {category}
          </Badge>
        </div>

        <CardTitle className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </CardTitle>

        <p className="leading-relaxed text-gray-600 dark:text-gray-300">
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
    switch (index) {
      case 0:
        return 'col-span-3 row-span-3';
      case 1:
        return 'col-span-2 row-span-3 col-start-4 row-start-3';
      case 2:
        return 'col-span-3 row-span-2 col-start-4 row-start-1';
      case 3:
        return 'col-span-4 row-span-3 col-start-6 row-start-3';
      case 4:
        return 'col-span-3 row-span-2 col-start-1 row-start-4';
      case 5:
        return 'col-span-3 row-span-2 col-start-7 row-start-1';
      default:
        return 'md:row-span-3';
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <LayoutGroup>
        <Cards>
          {cards.map((card, index) => (
            <div key={card.id} className={`p-0 ${getBentoGridClass(index)}`}>
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.25 }}
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
