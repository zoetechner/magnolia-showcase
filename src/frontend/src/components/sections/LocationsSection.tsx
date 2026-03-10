import { Clock, MapPin } from "lucide-react";
import { motion } from "motion/react";
import type { Location } from "../../types/bakery";

interface LocationsSectionProps {
  locations: Location[];
}

export default function LocationsSection({ locations }: LocationsSectionProps) {
  return (
    <section id="locations" className="py-24 px-4 bg-foreground">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-sans tracking-[0.3em] uppercase text-background/40 mb-4">
            Come Visit
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-background">
            Find Magnolia
          </h2>
        </motion.div>
        {locations.length === 0 ? (
          <div
            className="text-center py-12 text-background/40"
            data-ocid="locations.empty_state"
          >
            <p className="font-sans">No locations listed yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location, idx) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                data-ocid={`locations.item.${idx + 1}`}
                className="bg-background/5 border border-background/10 rounded-2xl p-8 hover:bg-background/10 transition-colors"
              >
                <h3 className="font-display text-2xl font-light text-background mb-6">
                  {location.name}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-background/40 mt-0.5 shrink-0" />
                    <p className="font-sans text-sm text-background/70 leading-snug">
                      {location.address}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-background/40 mt-0.5 shrink-0" />
                    <p className="font-sans text-sm text-background/70">
                      {location.hours}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
