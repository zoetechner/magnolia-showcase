import { useCallback, useState } from "react";
import type {
  BakeryData,
  HeroContent,
  Location,
  Product,
  StoryContent,
} from "../types/bakery";

const STORAGE_KEY = "magnolia_bakery_data";

const DEFAULT_DATA: BakeryData = {
  hero: {
    headline: "Baked with Love,\nServed with Joy",
    subheading:
      "Handcrafted breads, pastries, and cakes made fresh every morning in the heart of Brooklyn.",
    tagline: "Est. 2008 · Brooklyn, New York",
    ctaLabel: "Explore Our Menu",
  },
  products: [
    {
      id: "1",
      name: "Grandmother's Sourdough",
      description:
        "A slow-fermented country loaf with a crackling crust and open, chewy crumb. Made with our 15-year-old starter.",
      price: 8.5,
      category: "Breads",
      available: true,
      image: "/assets/generated/product-sourdough.dim_600x600.jpg",
    },
    {
      id: "2",
      name: "Almond Croissant",
      description:
        "Twice-baked with house-made frangipane, toasted almond flakes, and a dusting of powdered sugar.",
      price: 4.75,
      category: "Pastries",
      available: true,
      image: "/assets/generated/product-croissant.dim_600x600.jpg",
    },
    {
      id: "3",
      name: "Lavender Honey Cake",
      description:
        "A delicate three-layer cake scented with Provence lavender, filled with honey mascarpone cream.",
      price: 42.0,
      category: "Cakes",
      available: true,
      image: "/assets/generated/product-lavender-cake.dim_600x600.jpg",
    },
    {
      id: "4",
      name: "Rosemary Sea Salt Focaccia",
      description:
        "Pillowy-soft focaccia dimpled with extra virgin olive oil, fresh rosemary, and fleur de sel.",
      price: 9.0,
      category: "Breads",
      available: true,
      image: "/assets/generated/product-focaccia.dim_600x600.jpg",
    },
    {
      id: "5",
      name: "Raspberry Tart",
      description:
        "Crisp pâte sucrée filled with silky vanilla pastry cream and crowned with hand-picked raspberries.",
      price: 6.25,
      category: "Pastries",
      available: true,
      image: "/assets/generated/product-raspberry-tart.dim_600x600.jpg",
    },
    {
      id: "6",
      name: "Pain au Chocolat",
      description:
        "Classic French viennoiserie laminated with 72% Valrhona dark chocolate batons. Shatteringly crisp.",
      price: 4.5,
      category: "Pastries",
      available: true,
      image: "/assets/generated/product-croissant.dim_600x600.jpg",
    },
  ],
  story: {
    title: "A Story Worth Savoring",
    body: "Magnolia Bakery began with a single sourdough starter, a borrowed oven, and a deeply held belief: that the best bread is the kind that takes its time.\n\nFounded by sisters Clara and Rose Whitmore in 2008, our bakery grew from a tiny weekend market stall into the neighborhood institution it is today. We still wake before dawn, still mill our own flour, still proof our loaves overnight in the same linen-lined baskets our grandmother sent from France.\n\nEvery morning the scent of butter and warm sugar drifts down the street before we even open the door. That smell — that moment — is what we're chasing with every recipe, every batch, every carefully shaped loaf.\n\nWe bake for the neighbour who stops by every Tuesday, for the couple celebrating an anniversary, for the tired parent who just needs something beautiful. We bake because we love it. And we hope you can taste the difference.",
  },
  locations: [
    {
      id: "1",
      name: "Magnolia Brooklyn",
      address: "147 Court Street, Brooklyn Heights, NY 11201",
      hours: "Mon–Fri: 7am–6pm · Sat–Sun: 7am–4pm",
    },
    {
      id: "2",
      name: "Magnolia West Village",
      address: "38 Bleecker Street, West Village, NY 10014",
      hours: "Mon–Sat: 8am–7pm · Sun: 8am–5pm",
    },
    {
      id: "3",
      name: "Magnolia Williamsburg",
      address: "224 Bedford Ave, Williamsburg, NY 11211",
      hours: "Daily: 7am–8pm",
    },
  ],
};

function loadData(): BakeryData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as BakeryData;
  } catch {
    // ignore
  }
  return DEFAULT_DATA;
}

function saveData(data: BakeryData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function useBakeryStore() {
  const [data, setData] = useState<BakeryData>(loadData);

  const updateHero = useCallback((hero: HeroContent) => {
    setData((prev) => {
      const next = { ...prev, hero };
      saveData(next);
      return next;
    });
  }, []);

  const updateStory = useCallback((story: StoryContent) => {
    setData((prev) => {
      const next = { ...prev, story };
      saveData(next);
      return next;
    });
  }, []);

  const addProduct = useCallback((product: Omit<Product, "id">) => {
    setData((prev) => {
      const next = {
        ...prev,
        products: [...prev.products, { ...product, id: Date.now().toString() }],
      };
      saveData(next);
      return next;
    });
  }, []);

  const updateProduct = useCallback((product: Product) => {
    setData((prev) => {
      const next = {
        ...prev,
        products: prev.products.map((p) => (p.id === product.id ? product : p)),
      };
      saveData(next);
      return next;
    });
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setData((prev) => {
      const next = {
        ...prev,
        products: prev.products.filter((p) => p.id !== id),
      };
      saveData(next);
      return next;
    });
  }, []);

  const addLocation = useCallback((location: Omit<Location, "id">) => {
    setData((prev) => {
      const next = {
        ...prev,
        locations: [
          ...prev.locations,
          { ...location, id: Date.now().toString() },
        ],
      };
      saveData(next);
      return next;
    });
  }, []);

  const deleteLocation = useCallback((id: string) => {
    setData((prev) => {
      const next = {
        ...prev,
        locations: prev.locations.filter((l) => l.id !== id),
      };
      saveData(next);
      return next;
    });
  }, []);

  return {
    data,
    updateHero,
    updateStory,
    addProduct,
    updateProduct,
    deleteProduct,
    addLocation,
    deleteLocation,
  };
}
