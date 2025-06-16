import { useCallback, useState } from 'react';
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

function Cards({ children }: CardsProps) {
  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-4 justify-center gap-4 p-4 md:grid-rows-6">
      {children}
    </div>
  );
}

function Card({ image, title, category }: CardProps) {
  return (
    <CardUI className="relative h-full w-full overflow-hidden p-0">
      <img src={image} alt={title} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className="absolute right-0 bottom-0 left-0 p-4">
        <Badge className="mb-2 inline-block rounded-full bg-white/20 px-2 py-1 text-xs text-white backdrop-blur-sm">
          {category}
        </Badge>
        <CardTitle className="text-lg font-bold text-white">{title}</CardTitle>
      </div>
    </CardUI>
  );
}

function ModalCard({
  image,
  title,
  category,
  description,
  id,
  onClose,
}: ModalCardProps) {
  return (
    <motion.div className="fixed top-1/2 left-1/2 z-50 h-fit w-fit -translate-x-1/2 -translate-y-1/2 transform">
      <motion.div
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
          duration: 0.3,
          ease: 'easeInOut',
        }}
        layoutId={id}
        className="max-h-[90vh] w-[90vw] max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-gray-800"
      >
        <CardUI className="overflow-hidden p-0">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
              onClick={onClose}
            >
              <X className="h-4 w-4 text-white" />
            </Button>

            <AspectRatio ratio={21 / 9}>
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover"
              />
            </AspectRatio>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
              delay: 0.1,
            }}
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
        </CardUI>
      </motion.div>
    </motion.div>
  );
}

export function BentoGrid({ cards }: { cards: Card[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | false>(false);

  const handleCloseModal = useCallback(() => {
    setSelectedIndex(false);
  }, []);

  const handleSetIndex = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const getBentoGridClass = useCallback((index: number): string => {
    switch (index) {
      case 1:
        return 'md:row-span-4';
      case 3:
        return 'md:row-span-2';
      default:
        return 'md:row-span-3';
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <LayoutGroup>
        <AnimatePresence>
          <Cards>
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`col-span-1 p-0 md:col-span-1 ${getBentoGridClass(index)}`}
              >
                <motion.div
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                  }}
                  whileHover={{ scale: 0.98 }}
                  className="h-full w-full cursor-pointer overflow-hidden rounded-lg shadow-lg"
                  onClick={() => handleSetIndex(index)}
                  layoutId={card.id}
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

          {selectedIndex !== false && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
              key="overlay"
              className="fixed inset-0 z-40 cursor-pointer bg-black/80"
              onClick={handleCloseModal}
            />
          )}

          {selectedIndex !== false && (
            <>
              <ModalCard
                onClose={handleCloseModal}
                category={cards[selectedIndex].category}
                description={cards[selectedIndex].description}
                id={cards[selectedIndex].id}
                image={cards[selectedIndex].image}
                title={cards[selectedIndex].title}
              />
            </>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
}
