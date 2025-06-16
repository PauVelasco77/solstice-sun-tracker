import { Badge } from '../ui/badge';
import { Card as CardUI, CardTitle } from '../ui/card';

interface CardProps {
  image: string;
  title: string;
  category: string;
}

export function Card({ image, title, category }: CardProps) {
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
