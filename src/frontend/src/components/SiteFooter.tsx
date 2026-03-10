export default function SiteFooter({
  name,
  tagline,
}: { name?: string; tagline?: string }) {
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(window.location.hostname);
  return (
    <footer className="bg-foreground text-background/80 py-16 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="font-display text-3xl font-light text-background mb-2">
              {name ?? "Magnolia"}
            </p>
            <p className="text-sm font-sans text-background/60">
              {tagline ?? "Baked with love since 2008"}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm font-sans">
            <p className="text-background/40 uppercase tracking-widest text-xs mb-2">
              Find Us
            </p>
            <a
              href="#locations"
              className="text-background/70 hover:text-background transition-colors"
            >
              Locations
            </a>
            <a
              href="#products"
              className="text-background/70 hover:text-background transition-colors"
            >
              Menu
            </a>
            <a
              href="#story"
              className="text-background/70 hover:text-background transition-colors"
            >
              Our Story
            </a>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/40">
            © {year} {name ?? "Magnolia Bakery"}. All rights reserved.
          </p>
          <p className="text-xs text-background/30">
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-background/50 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
