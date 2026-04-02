export type ProductCategory = "oversized" | "basics" | "outerwear";

export type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  category: ProductCategory;
  sizes: string[];
  colors: string[];
  images: string[];
  description: string;
  summary: string;
  fit: string;
  material: string;
  featured?: boolean;
  bestSeller?: boolean;
  newDrop?: boolean;
};

export const categoryLabels: Record<ProductCategory, string> = {
  oversized: "Oversized",
  basics: "Basics",
  outerwear: "Outerwear",
};

export const products: Product[] = [
  {
    id: 1,
    title: "Motion Heavy Tee",
    slug: "motion-heavy-tee",
    price: 2490,
    category: "oversized",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#D1C7B7", "#000000", "#EDEAE6"],
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=80",
    ],
    description: "Heavyweight cotton oversized tee with premium finish.",
    summary: "A dense oversized tee built for everyday rotation and clean structure.",
    fit: "Oversized fit with room through the chest and sleeve.",
    material: "100% heavyweight cotton",
    featured: true,
    bestSeller: true,
  },
  {
    id: 2,
    title: "Core Rib Tank",
    slug: "core-rib-tank",
    price: 1490,
    category: "basics",
    sizes: ["S", "M", "L"],
    colors: ["#000000", "#F8F5F2"],
    images: [
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80",
    ],
    description: "Minimal rib tank with sculpted fit.",
    summary: "A close-fit tank designed for layering, warm days, and a cleaner line.",
    fit: "Slim fit with natural stretch.",
    material: "95% cotton, 5% elastane rib",
    bestSeller: true,
  },
  {
    id: 3,
    title: "Transit Hooded Layer",
    slug: "transit-hooded-layer",
    price: 4490,
    category: "outerwear",
    sizes: ["M", "L", "XL"],
    colors: ["#333333"],
    images: [
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1400&q=80",
    ],
    description: "Soft fleece hoodie with premium construction.",
    summary: "A soft hooded layer that keeps the silhouette relaxed without feeling bulky.",
    fit: "Relaxed fit for easy layering.",
    material: "Cotton blend fleece",
    bestSeller: true,
  },
  {
    id: 4,
    title: "Drift Box Tee",
    slug: "drift-box-tee",
    price: 2290,
    category: "oversized",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#CFCAC5", "#2F3137", "#D9C7B6"],
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80",
    ],
    description: "Boxy oversized tee with soft structure and washed hand-feel.",
    summary: "A boxy silhouette made for repeat wear and easy layering.",
    fit: "Boxy fit with a slightly cropped body.",
    material: "100% midweight cotton",
    newDrop: true,
  },
  {
    id: 5,
    title: "Studio Weight Tee",
    slug: "studio-weight-tee",
    price: 2590,
    category: "oversized",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#F4EEE6", "#4C4C50", "#B8AA9B"],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=1400&q=80",
    ],
    description: "Premium oversized tee with a soft brushed finish and clean neckline.",
    summary: "An elevated oversized staple with enough weight to hold its shape.",
    fit: "Oversized fit with drop shoulders.",
    material: "100% combed cotton jersey",
    featured: true,
  },
  {
    id: 6,
    title: "Everyday Drape Tee",
    slug: "everyday-drape-tee",
    price: 2190,
    category: "oversized",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#EFE6DB", "#202124"],
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80",
    ],
    description: "Relaxed cotton tee with fluid drape and understated finish.",
    summary: "A lighter oversized option for everyday layering and movement.",
    fit: "Relaxed oversized fit with an easy hem line.",
    material: "100% soft cotton",
  },
  {
    id: 7,
    title: "Contour Baby Tee",
    slug: "contour-baby-tee",
    price: 1690,
    category: "basics",
    sizes: ["S", "M", "L"],
    colors: ["#F6F1EA", "#1F2024", "#B89A82"],
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=1400&q=80",
    ],
    description: "Soft fitted baby tee with smooth finish and close silhouette.",
    summary: "A clean everyday basic designed to sit close without feeling restrictive.",
    fit: "Slim fit with slight stretch.",
    material: "Cotton elastane jersey",
    newDrop: true,
  },
  {
    id: 8,
    title: "Clean Line Tank",
    slug: "clean-line-tank",
    price: 1390,
    category: "basics",
    sizes: ["S", "M", "L"],
    colors: ["#111111", "#EDE8E1", "#C5B7A6"],
    images: [
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80",
    ],
    description: "Refined tank with minimal rib texture and sculpted shoulder line.",
    summary: "A core wardrobe tank that works solo or under outer layers.",
    fit: "Close fit through the body.",
    material: "Stretch rib cotton",
  },
  {
    id: 9,
    title: "Daily Soft Longsleeve",
    slug: "daily-soft-longsleeve",
    price: 1990,
    category: "basics",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#F3EDE4", "#3C3D42"],
    images: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=80",
    ],
    description: "Soft long sleeve basic with a smooth hand-feel and relaxed body.",
    summary: "An easy foundational layer for travel, office days, and cooler evenings.",
    fit: "Regular fit with light room through the body.",
    material: "Cotton modal jersey",
    featured: true,
  },
  {
    id: 10,
    title: "Aero Shell Jacket",
    slug: "aero-shell-jacket",
    price: 5990,
    category: "outerwear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#D1D2D4", "#5D646E", "#C5AF99"],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=80",
    ],
    description: "Lightweight shell jacket built for movement and changing weather.",
    summary: "A clean technical shell that stays light while keeping the silhouette sharp.",
    fit: "Regular fit intended for layering.",
    material: "Technical nylon shell",
    featured: true,
    newDrop: true,
  },
  {
    id: 11,
    title: "Route Zip Jacket",
    slug: "route-zip-jacket",
    price: 4890,
    category: "outerwear",
    sizes: ["M", "L", "XL"],
    colors: ["#26272B", "#8B8478"],
    images: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=80",
    ],
    description: "Structured zip jacket with clean collar and smooth lining.",
    summary: "A refined outer layer made for city movement and easy day-to-night wear.",
    fit: "Relaxed fit with room for a tee or knit underneath.",
    material: "Cotton nylon twill",
    bestSeller: true,
  },
  {
    id: 12,
    title: "Fleece Overshirt",
    slug: "fleece-overshirt",
    price: 4290,
    category: "outerwear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#DDD2C6", "#5B534B", "#141516"],
    images: [
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80",
    ],
    description: "Soft overshirt jacket with brushed texture and clean snap front.",
    summary: "A cozy outer layer that works as a shirt indoors and a jacket outdoors.",
    fit: "Relaxed overshirt fit.",
    material: "Brushed cotton fleece",
    newDrop: true,
  },
];

export const productCategories = Array.from(
  new Set(products.map((product) => product.category)),
) as ProductCategory[];

export const productSizes = Array.from(
  new Set(products.flatMap((product) => product.sizes)),
);

const colorLabels: Record<string, string> = {
  "#D1C7B7": "Warm Sand",
  "#000000": "Black",
  "#EDEAE6": "Soft Ivory",
  "#F8F5F2": "Porcelain",
  "#333333": "Charcoal",
  "#CFCAC5": "Fog",
  "#2F3137": "Coal",
  "#D9C7B6": "Sandstone",
  "#F4EEE6": "Bone",
  "#4C4C50": "Graphite",
  "#B8AA9B": "Taupe",
  "#EFE6DB": "Oat",
  "#202124": "Ink",
  "#F6F1EA": "Cream",
  "#1F2024": "Midnight",
  "#B89A82": "Clay",
  "#111111": "Onyx",
  "#EDE8E1": "Shell",
  "#C5B7A6": "Mushroom",
  "#F3EDE4": "Sand",
  "#3C3D42": "Slate",
  "#D1D2D4": "Mist",
  "#5D646E": "Steel",
  "#C5AF99": "Stone",
  "#26272B": "Jet",
  "#8B8478": "Pebble",
  "#DDD2C6": "Ecru",
  "#5B534B": "Umber",
  "#141516": "Night",
};

export const getColorLabel = (colorHex: string) =>
  colorLabels[colorHex.toUpperCase()] ?? colorHex.toUpperCase();

export const normalizeProductCategory = (
  value: string | string[] | null | undefined,
): ProductCategory | "all" => {
  if (typeof value !== "string") {
    return "all";
  }

  return productCategories.includes(value as ProductCategory)
    ? (value as ProductCategory)
    : "all";
};

export const normalizeProductSize = (value: string | string[] | null | undefined) => {
  if (typeof value !== "string") {
    return "all";
  }

  return productSizes.includes(value) ? value : "all";
};
