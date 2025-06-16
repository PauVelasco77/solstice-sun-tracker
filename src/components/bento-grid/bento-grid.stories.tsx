import { BentoGrid } from './bento-grid';

export default {
  title: 'Components/BentoGrid',
  component: BentoGrid,
};

const cards = [
  {
    id: '0',
    title: 'Mountain Vista',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    description:
      'A breathtaking view of snow-capped mountains during golden hour. The serene landscape captures the raw beauty of nature at its finest.',
    category: 'Nature',
  },
  {
    id: '1',
    title: 'Urban Architecture',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    description:
      'Modern skyscrapers reaching toward the sky, showcasing contemporary architectural design and urban development.',
    category: 'Architecture',
  },
  {
    id: '2',
    title: 'Ocean Waves',
    image:
      'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop',
    description:
      "Crystal clear ocean waves crashing against the shore, creating a mesmerizing display of nature's power and beauty.",
    category: 'Ocean',
  },
  {
    id: '3',
    title: 'Forest Path',
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    description:
      'A winding path through an ancient forest, dappled with sunlight filtering through the canopy above.',
    category: 'Forest',
  },
];

export const Default = () => <BentoGrid cards={cards} />;
