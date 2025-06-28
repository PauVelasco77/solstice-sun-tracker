import { ScrollReveal } from '../ui/scroll-reveal';

export default function DescriptionTemplate() {
  return (
    <div className="flex h-full min-h-screen items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <ScrollReveal animation="fadeInUp" threshold={0.3} duration={0.8}>
          <p className="text-foreground text-base leading-relaxed tracking-tight sm:text-lg md:text-xl lg:text-2xl lg:leading-relaxed">
            The "revetlla de Sant Joan," celebrated on the night of June 23rd to
            24th, is an ancient festival linked to the summer solstice and
            deeply connected to fire. Traditionally, bonfires are lit and
            firecrackers set off to symbolize the transition from bad weather to
            calm, from darkness to light, and from winter to summer—serving as a
            form of purification and protection against negative energies. In
            Catalonia, the "Flama del Canigó" stands out, a symbolic flame that
            has been shared from the Pyrenees to cities across the region since
            1966. The night includes communal dinners, music, nighttime sea
            bathing, and rituals with herbs that blend pagan traditions with
            Christian celebrations of Saint John the Baptist.
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}
