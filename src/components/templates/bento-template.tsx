import { BentoGrid } from '../bento-grid/bento-grid';

const stories = [
  {
    id: '0',
    title: 'Bonfires',
    image:
      'https://estaticos-cdn.prensaiberica.es/clip/95499b98-d1d6-4e48-b479-dbfd7cff8cce_16-9-aspect-ratio_default_0.jpg',
    description:
      'Bonfires are the central symbol of the San Juan celebration. Lighting a fire represents purification, letting go of the old, and welcoming the new. In many parts of Spain, people jump over the flames—usually three times—to bring good luck or ward off bad spirits. This tradition has pagan roots linked to solar rituals around the summer solstice. Fires are lit in public squares, streets, and especially on beaches. Many people burn pieces of paper with their wishes or negative thoughts, using fire as a symbolic way to reset and renew their energy for the coming season.',
    category: 'Meeting point',
  },
  {
    id: '1',
    title: 'Midnight Sea Baths',
    image:
      'https://img.beteve.cat/wp-content/uploads/2021/06/platja-barceloneta-nit-sant-joan-230621.jpg',
    description:
      "In coastal areas, it's very common to take a dip in the sea just after midnight on June 23rd. It's believed that the water has magical, healing powers on this night. People wade into the ocean to attract health, love, or good fortune, and to wash away bad vibes. Some rituals include washing your face without looking in a mirror afterward, or making a wish while touching the waves. In cities like Alicante or Málaga, thousands gather on the beach, making the sea a central part of the celebration and its spiritual renewal rituals.",
    category: 'Health',
  },
  {
    id: '2',
    title: 'Fireworks and Firecrackers',
    image:
      'https://www.santjordihostels.com/wp-content/uploads/sant-joan-festival-02.png',
    description:
      "Fireworks are another key element of San Juan. They symbolize light, joy, and the victory of summer over darkness. In cities like Valencia or A Coruña, large public firework displays accompany the bonfires. It's also common for people—especially kids and teens—to set off firecrackers in the streets. Although this depends on local regulations, the noise and light are essential to the festive atmosphere. Fireworks help create the magical feeling of the night and reflect the excitement of entering a new season filled with warmth, energy, and community gatherings.",
    category: 'Festival',
  },
  {
    id: '3',
    title: 'Food and Gatherings',
    image:
      'https://www.pavisucre.cat/wp-content/uploads/2020/06/Coca-de-Sant-Joan.jpg',
    description:
      'San Juan is a time for socializing with friends and family. Many people organize outdoor dinners on the beach, in town squares, or at home. Food is often shared potluck-style, including dishes like empanadas, grilled sardines, and the traditional "coca" in Catalonia. Music, dancing, and community events are common, adding to the festive mood. More than a religious celebration, it\'s a social and cultural tradition that marks the arrival of summer with a relaxed, joyful atmosphere. It\'s all about enjoying the night, eating well, and sharing laughs and stories under the stars.',
    category: 'Gastronomy',
  },
  {
    id: '4',
    title: 'Origins and Symbolism',
    image: 'https://www.vilanova.cat/img/img_13775775.jpg',
    description:
      'The celebration of San Juan has ancient roots, dating back to pre-Christian pagan rituals honoring the summer solstice—the longest day of the year. These traditions celebrated the power of the sun and the start of a new agricultural cycle. With the rise of Christianity, the festival was adapted to honor the birth of Saint John the Baptist on June 24th, and the festivities take place the night before. It blends pagan and Christian elements and is deeply connected to nature, symbolizing transition, rebirth, and the power of the elements: fire, water, earth, and air.',
    category: 'History',
  },
  {
    id: '5',
    title: 'Correfocs (Fire Runs)',
    image:
      'https://abcmallorcastorage.blob.core.windows.net/images/2019/05/sant-joan-celebrations-palma-mallorca-img03.jpg',
    description:
      'Correfocs are one of the most thrilling and unique traditions during San Juan, especially in Catalonia and the Balearic Islands. They feature street parades where groups of diables (devils) dressed in traditional costumes run through the streets surrounded by fireworks, sparklers, and firecrackers. The event often includes rhythmic drumming, loud music, and mythical creatures like dragons or fire beasts. Spectators are encouraged to participate by running under the sparks—usually wearing protective clothing. It is a dramatic mix of performance, fire, and folklore that transforms the night into a dazzling, high-energy celebration of chaos and joy.',
    category: 'Culture',
  },
];

export default function BentoGridTemplate() {
  return (
    <div>
      <h2 id="gallery-heading" className="sr-only">
        Sant Joan Traditions Gallery
      </h2>
      <BentoGrid cards={stories} />
    </div>
  );
}
