import { motion } from "motion/react";
import type { StoryContent } from "../../types/bakery";

interface StorySectionProps {
  story: StoryContent;
}

export default function StorySection({ story }: StorySectionProps) {
  const paragraphs = story.body.split("\n\n");

  return (
    <section id="story" className="py-24 px-4 overflow-hidden">
      <div className="container max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div
              className="absolute inset-0 rounded-[3rem] -rotate-3 opacity-20"
              style={{ background: "oklch(0.58 0.13 10)" }}
            />
            <div className="relative rounded-[3rem] overflow-hidden aspect-[3/4] rotate-1 shadow-warm-lg">
              <img
                src="/assets/generated/bakery-hero.dim_1400x800.jpg"
                alt="Inside Magnolia Bakery"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            </div>
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-8 -right-8 bg-card rounded-2xl shadow-warm-lg p-6 max-w-xs hidden md:block"
            >
              <p className="font-display text-lg font-light text-foreground italic leading-snug">
                &ldquo;The best bread takes its time.&rdquo;
              </p>
              <p className="font-sans text-xs text-muted-foreground mt-2">
                &mdash; Clara Whitmore, Founder
              </p>
            </motion.blockquote>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="text-xs font-sans tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Our Journey
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-8 leading-[1.15]">
              {story.title}
            </h2>
            <div className="space-y-5">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="font-sans text-base text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
