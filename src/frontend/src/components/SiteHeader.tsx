import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { motion } from "motion/react";

interface SiteHeaderProps {
  onNavigateAdmin: () => void;
}

export default function SiteHeader({ onNavigateAdmin }: SiteHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border"
    >
      <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#/" className="flex items-center gap-2" data-ocid="nav.link">
          <span className="font-display text-2xl font-light tracking-wide text-foreground">
            Magnolia
          </span>
          <span className="text-xs font-sans text-muted-foreground tracking-[0.2em] uppercase mt-1">
            Bakery
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#products"
            className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="nav.products.link"
          >
            Menu
          </a>
          <a
            href="#story"
            className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="nav.story.link"
          >
            Our Story
          </a>
          <a
            href="#locations"
            className="text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="nav.locations.link"
          >
            Locations
          </a>
        </nav>
        <Button
          variant="ghost"
          size="sm"
          onClick={onNavigateAdmin}
          className="text-muted-foreground hover:text-foreground"
          data-ocid="nav.admin.button"
        >
          <Settings className="h-4 w-4" />
          <span className="ml-2 hidden sm:inline text-xs">Admin</span>
        </Button>
      </div>
    </motion.header>
  );
}
