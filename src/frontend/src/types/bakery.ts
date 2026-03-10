export interface HeroContent {
  headline: string;
  subheading: string;
  tagline: string;
  ctaLabel: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  image: string;
}

export interface StoryContent {
  title: string;
  body: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  hours: string;
}

export interface BakeryData {
  hero: HeroContent;
  products: Product[];
  story: StoryContent;
  locations: Location[];
}
