import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import type { Product } from "../../types/bakery";

const categoryColors: Record<string, string> = {
  Breads: "bg-accent/20 text-accent-foreground border-0",
  Pastries: "bg-primary/15 text-primary border-0",
  Cakes: "bg-secondary text-secondary-foreground border-0",
  Seasonal: "bg-muted text-muted-foreground border-0",
};

function getCategoryClass(category: string): string {
  return categoryColors[category] ?? "bg-muted text-muted-foreground border-0";
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface ProductsSectionProps {
  products: Product[];
}

export default function ProductsSection({ products }: ProductsSectionProps) {
  const available = products.filter((p) => p.available);
  return (
    <section id="products" className="py-24 bg-secondary/30 px-4">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-sans tracking-[0.3em] uppercase text-muted-foreground mb-4">
            From Our Kitchen
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            Today's Selection
          </h2>
        </motion.div>
        {available.length === 0 ? (
          <div
            className="text-center py-20 text-muted-foreground"
            data-ocid="products.empty_state"
          >
            <p className="font-sans text-lg">No items available right now.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {available.map((product, idx) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                data-ocid={`products.item.${idx + 1}`}
                className="group bg-card rounded-2xl overflow-hidden shadow-xs hover:shadow-warm transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display text-xl font-light text-foreground leading-tight">
                      {product.name}
                    </h3>
                    <Badge
                      className={`text-xs font-sans shrink-0 ${getCategoryClass(product.category)}`}
                    >
                      {product.category}
                    </Badge>
                  </div>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <p className="font-display text-2xl text-primary">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
