import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import type { HeroContent } from "../../types/bakery";

interface HeroSectionProps {
  hero: HeroContent;
}

export default function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-16">
      <div
        className="absolute -top-20 -right-40 w-[700px] h-[700px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.82 0.13 75)" }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.58 0.13 10)" }}
      />
      <div className="container max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center py-20">
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-sans tracking-[0.25em] uppercase text-muted-foreground mb-6"
          >
            {hero.tagline}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-foreground mb-6 whitespace-pre-line"
          >
            {hero.headline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-lg text-muted-foreground max-w-md leading-relaxed mb-10"
          >
            {hero.subheading}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              size="lg"
              asChild
              className="rounded-full px-10 py-6 text-base font-sans shadow-warm hover:shadow-warm-lg transition-shadow"
              data-ocid="hero.primary_button"
            >
              <a href="#products">{hero.ctaLabel}</a>
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative"
        >
          <div className="relative rounded-[2rem] overflow-hidden shadow-warm-lg aspect-[4/3]">
            <img
              src="/assets/generated/bakery-hero.dim_1400x800.jpg"
              alt="Fresh baked goods from Magnolia Bakery"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
          </div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-warm-lg px-6 py-4 hidden md:block"
          >
            <p className="font-display text-3xl font-semibold text-primary">
              15+
            </p>
            <p className="font-sans text-xs text-muted-foreground">
              Years of craft
            </p>
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -top-6 -right-6 bg-card rounded-2xl shadow-warm-lg px-6 py-4 hidden md:block"
          >
            <p
              className="font-display text-3xl font-semibold"
              style={{ color: "oklch(0.82 0.13 75)" }}
            >
              3
            </p>
            <p className="font-sans text-xs text-muted-foreground">Locations</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
