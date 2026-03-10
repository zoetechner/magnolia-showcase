import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import HeroSection from "../components/sections/HeroSection";
import LocationsSection from "../components/sections/LocationsSection";
import ProductsSection from "../components/sections/ProductsSection";
import StorySection from "../components/sections/StorySection";
import type { BakeryData } from "../types/bakery";

interface LandingPageProps {
  data: BakeryData;
  onNavigateAdmin: () => void;
}

export default function LandingPage({
  data,
  onNavigateAdmin,
}: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader onNavigateAdmin={onNavigateAdmin} />
      <main>
        <HeroSection hero={data.hero} />
        <ProductsSection products={data.products} />
        <StorySection story={data.story} />
        <LocationsSection locations={data.locations} />
      </main>
      <SiteFooter name="Magnolia Bakery" tagline={data.hero.tagline} />
    </div>
  );
}
