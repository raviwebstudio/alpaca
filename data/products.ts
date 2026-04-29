export type ProductCategory = "oversized" | "basics" | "outerwear";

export type ProductColor = {
  name: string;
  hex: string;
};

export type ProductImage = {
  src: string;
  alt: string;
};

export type ProductSeller = {
  id: string;
  name: string;
  slug: string;
  location: string;
  responseTime: string;
};

export type ProductFaq = {
  question: string;
  answer: string;
};

export type Product = {
  id: number;
  sku: string;
  title: string;
  slug: string;
  price: number;
  category: ProductCategory;
  sizes: string[];
  colors: ProductColor[];
  images: ProductImage[];
  description: string;
  summary: string;
  fit: string;
  material: string;
  highlights: string[];
  shippingLeadTime: string;
  seller: ProductSeller;
  faq: ProductFaq[];
  featured?: boolean;
  bestSeller?: boolean;
  newDrop?: boolean;
};

export type ProductFilters = {
  category: ProductCategory | "all";
  size: string | "all";
};

export type ProductCategoryOption = {
  value: ProductCategory;
  label: string;
  description: string;
};

const defaultSeller: ProductSeller = {
  id: "alpaca-studio",
  name: "ALPACA Studio",
  slug: "alpaca-studio",
  location: "New Delhi, India",
  responseTime: "Usually responds within 24 hours",
};

const defaultProductFaqs: ProductFaq[] = [
  {
    question: "How should I choose my size?",
    answer:
      "Pick your usual size for the intended ALPACA fit. Size down for a neater shape or stay true to size for the relaxed silhouette shown on the product page.",
  },
  {
    question: "When will my order ship?",
    answer:
      "In-stock orders normally dispatch within 48 hours. You will review your cart, enter your address, and complete payment before the order is confirmed.",
  },
  {
    question: "Can I return it if the fit is wrong?",
    answer:
      "Yes. Unworn items in original condition can be requested for return within 7 days of delivery, subject to inspection.",
  },
];

const createColor = (name: string, hex: string): ProductColor => ({
  name,
  hex: hex.toUpperCase(),
});

const createImage = (src: string, alt: string): ProductImage => ({
  src,
  alt,
});

const createProduct = (
  product: Omit<Product, "seller" | "faq"> & {
    seller?: ProductSeller;
    faq?: ProductFaq[];
  },
): Product => ({
  seller: product.seller ?? defaultSeller,
  faq: product.faq ?? defaultProductFaqs,
  ...product,
});

export const categoryLabels: Record<ProductCategory, string> = {
  oversized: "Oversized",
  basics: "Basics",
  outerwear: "Outerwear",
};

export const categoryDescriptions: Record<ProductCategory, string> = {
  oversized: "Relaxed silhouettes with premium weight and a roomier line.",
  basics: "Closer-to-body everyday essentials built for repeat wear.",
  outerwear: "Layering pieces for commute, travel, and changing weather.",
};

export const products: Product[] = [
  createProduct({
    id: 1,
    sku: "ALP-OVR-001",
    title: "Plain White T-shirt for Men",
    slug: "plain-white-t-shirt-for-men",
    price: 490,
    category: "oversized",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      createColor("Warm Sand", "#D1C7B7"),
      createColor("Black", "#000000"),
      createColor("Soft Ivory", "#EDEAE6"),
    ],
    images: [
      createImage(
        "/inventory/men/tshirts/plain-white-t-shirt01.jpg",
        "Plain White T-shirt for Men",
      ),
      createImage(
        "/inventory/men/tshirts/plain-white-t-shirt02.webp",
        "Plain White T-shirt for Men",
      ),
      createImage(
        "/inventory/men/tshirts/plain-white-t-shirt03.jpg",
        "Plain White T-shirt for Men",
      ),
    ],
    description: "Plain White T-shirt for MenHeavyweight cotton oversized tee with premium finish.",
    summary: "A dense oversized tee built for everyday rotation and clean structure.",
    fit: "Oversized fit with room through the chest and sleeve.",
    material: "100% heavyweight cotton",
    highlights: ["240 GSM knit", "Structured neckline", "Easy everyday drape"],
    shippingLeadTime: "Dispatches within 48 hours",
    featured: true,
    bestSeller: true,
  }),
  createProduct({
    id: 2,
    sku: "ALP-BSC-002",
    title: "Men's Black T-shirt",
    slug: "mens-black-t-shirt",
    price: 490,
    category: "basics",
    sizes: ["S", "M", "L"],
    colors: [createColor("Black", "#000000"), createColor("White", "#FFFFFF")],
    images: [
      createImage(
        "/inventory/men/tshirts/mens-black-t-shirt01.webp",
        "mens-black-t-shirt",
      ),
      createImage(
        "/inventory/men/tshirts/mens-black-t-shirt02.webp",
        "mens-black-t-shirt",
      ),
    ],
    description: "Mens Black T Shirt Minimal rib tank with sculpted fit.",
    summary: "A close-fit tank designed for layering, warm days, and a cleaner line.",
    fit: "Slim fit with natural stretch.",
    material: "95% cotton, 5% elastane rib",
    highlights: ["Stretch rib texture", "Clean shoulder line", "Layering-ready"],
    shippingLeadTime: "Dispatches within 48 hours",
    bestSeller: true,
  }),
  createProduct({
    id: 3,
    sku: "ALP-OUT-003",
    title: "Transit Hooded Layer",
    slug: "transit-hooded-layer",
    price: 4490,
    category: "outerwear",
    sizes: ["M", "L", "XL"],
    colors: [createColor("Charcoal", "#333333")],
    images: [
      createImage(
        "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=1400&q=80",
        "Transit Hooded Layer front view",
      ),
      createImage(
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1400&q=80",
        "Transit Hooded Layer off-duty styling",
      ),
    ],
    description: "Soft fleece hoodie with premium construction.",
    summary: "A soft hooded layer that keeps the silhouette relaxed without feeling bulky.",
    fit: "Relaxed fit for easy layering.",
    material: "Cotton blend fleece",
    highlights: ["Brushed interior", "Layer-friendly fit", "Soft premium hand-feel"],
    shippingLeadTime: "Dispatches within 2-3 days",
    bestSeller: true,
  }),
  createProduct({
    id: 4,
    sku: "ALP-OVR-004",
    title: "Drift Box Tee",
    slug: "drift-box-tee",
    price: 2290,
    category: "oversized",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      createColor("Fog", "#CFCAC5"),
      createColor("Coal", "#2F3137"),
      createColor("Sandstone", "#D9C7B6"),
    ],
    images: [
      createImage(
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=80",
        "Drift Box Tee front campaign image",
      ),
      createImage(
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80",
        "Drift Box Tee side profile",
      ),
    ],
    description: "Boxy oversized tee with soft structure and washed hand-feel.",
    summary: "A boxy silhouette made for repeat wear and easy layering.",
    fit: "Boxy fit with a slightly cropped body.",
    material: "100% midweight cotton",
    highlights: ["Washed finish", "Boxy shoulder line", "Easy layering length"],
    shippingLeadTime: "Dispatches within 48 hours",
    newDrop: true,
  }),
  createProduct({
    id: 5,
    sku: "ALP-OVR-005",
    title: "Studio Weight Tee",
    slug: "studio-weight-tee",
    price: 2590,
    category: "oversized",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      createColor("Bone", "#F4EEE6"),
      createColor("Graphite", "#4C4C50"),
      createColor("Taupe", "#B8AA9B"),
    ],
    images: [
      createImage(
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1400&q=80",
        "Studio Weight Tee clean front image",
      ),
      createImage(
        "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=1400&q=80",
        "Studio Weight Tee styled with soft tailoring",
      ),
    ],
    description: "Premium oversized tee with a soft brushed finish and clean neckline.",
    summary: "An elevated oversized staple with enough weight to hold its shape.",
    fit: "Oversized fit with drop shoulders.",
    material: "100% combed cotton jersey",
    highlights: ["Combed cotton jersey", "Drop shoulder shape", "Refined neckline"],
    shippingLeadTime: "Dispatches within 48 hours",
    featured: true,
  }),
  createProduct({
    id: 6,
    sku: "ALP-OVR-006",
    title: "Everyday Drape Tee",
    slug: "everyday-drape-tee",
    price: 2190,
    category: "oversized",
    sizes: ["S", "M", "L", "XL"],
    colors: [createColor("Oat", "#EFE6DB"), createColor("Ink", "#202124")],
    images: [
      createImage(
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=80",
        "Everyday Drape Tee editorial look",
      ),
      createImage(
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80",
        "Everyday Drape Tee styled for daily movement",
      ),
    ],
    description: "Relaxed cotton tee with fluid drape and understated finish.",
    summary: "A lighter oversized option for everyday layering and movement.",
    fit: "Relaxed oversized fit with an easy hem line.",
    material: "100% soft cotton",
    highlights: ["Fluid drape", "Lighter feel", "Easy everyday shape"],
    shippingLeadTime: "Dispatches within 48 hours",
  }),
  createProduct({
    id: 7,
    sku: "ALP-BSC-007",
    title: "Contour Baby Tee",
    slug: "contour-baby-tee",
    price: 1690,
    category: "basics",
    sizes: ["S", "M", "L"],
    colors: [
      createColor("Cream", "#F6F1EA"),
      createColor("Midnight", "#1F2024"),
      createColor("Clay", "#B89A82"),
    ],
    images: [
      createImage(
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80",
        "Contour Baby Tee front styling",
      ),
      createImage(
        "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=1400&q=80",
        "Contour Baby Tee close fit profile",
      ),
    ],
    description: "Soft fitted baby tee with smooth finish and close silhouette.",
    summary: "A clean everyday basic designed to sit close without feeling restrictive.",
    fit: "Slim fit with slight stretch.",
    material: "Cotton elastane jersey",
    highlights: ["Close fit", "Soft stretch", "Works solo or layered"],
    shippingLeadTime: "Dispatches within 48 hours",
    newDrop: true,
  }),
  createProduct({
    id: 8,
    sku: "ALP-BSC-008",
    title: "Clean Line Tank",
    slug: "clean-line-tank",
    price: 1390,
    category: "basics",
    sizes: ["S", "M", "L"],
    colors: [
      createColor("Onyx", "#111111"),
      createColor("Shell", "#EDE8E1"),
      createColor("Mushroom", "#C5B7A6"),
    ],
    images: [
      createImage(
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80",
        "Clean Line Tank front view",
      ),
      createImage(
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80",
        "Clean Line Tank layered styling",
      ),
    ],
    description: "Refined tank with minimal rib texture and sculpted shoulder line.",
    summary: "A core wardrobe tank that works solo or under outer layers.",
    fit: "Close fit through the body.",
    material: "Stretch rib cotton",
    highlights: ["Minimal rib texture", "Sculpted shoulder line", "Warm-weather staple"],
    shippingLeadTime: "Dispatches within 48 hours",
  }),
  createProduct({
    id: 9,
    sku: "ALP-BSC-009",
    title: "Daily Soft Longsleeve",
    slug: "daily-soft-longsleeve",
    price: 1990,
    category: "basics",
    sizes: ["S", "M", "L", "XL"],
    colors: [createColor("Sand", "#F3EDE4"), createColor("Slate", "#3C3D42")],
    images: [
      createImage(
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80",
        "Daily Soft Longsleeve front portrait",
      ),
      createImage(
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=80",
        "Daily Soft Longsleeve layered look",
      ),
    ],
    description: "Soft long sleeve basic with a smooth hand-feel and relaxed body.",
    summary: "An easy foundational layer for travel, office days, and cooler evenings.",
    fit: "Regular fit with light room through the body.",
    material: "Cotton modal jersey",
    highlights: ["Cotton modal softness", "Travel-friendly layer", "Easy regular fit"],
    shippingLeadTime: "Dispatches within 48 hours",
    featured: true,
  }),
  createProduct({
    id: 10,
    sku: "ALP-OUT-010",
    title: "Aero Shell Jacket",
    slug: "aero-shell-jacket",
    price: 5990,
    category: "outerwear",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      createColor("Mist", "#D1D2D4"),
      createColor("Steel", "#5D646E"),
      createColor("Stone", "#C5AF99"),
    ],
    images: [
      createImage(
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1400&q=80",
        "Aero Shell Jacket front image",
      ),
      createImage(
        "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=1400&q=80",
        "Aero Shell Jacket side angle",
      ),
      createImage(
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=80",
        "Aero Shell Jacket styled with basics",
      ),
    ],
    description: "Lightweight shell jacket built for movement and changing weather.",
    summary: "A clean technical shell that stays light while keeping the silhouette sharp.",
    fit: "Regular fit intended for layering.",
    material: "Technical nylon shell",
    highlights: ["Technical shell fabric", "Weather-ready layer", "Clean front finish"],
    shippingLeadTime: "Dispatches within 2-3 days",
    featured: true,
    newDrop: true,
  }),
  createProduct({
    id: 11,
    sku: "ALP-OUT-011",
    title: "Route Zip Jacket",
    slug: "route-zip-jacket",
    price: 4890,
    category: "outerwear",
    sizes: ["M", "L", "XL"],
    colors: [createColor("Jet", "#26272B"), createColor("Pebble", "#8B8478")],
    images: [
      createImage(
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80",
        "Route Zip Jacket front portrait",
      ),
      createImage(
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=80",
        "Route Zip Jacket everyday styling",
      ),
    ],
    description: "Structured zip jacket with clean collar and smooth lining.",
    summary: "A refined outer layer made for city movement and easy day-to-night wear.",
    fit: "Relaxed fit with room for a tee or knit underneath.",
    material: "Cotton nylon twill",
    highlights: ["Structured collar", "Day-to-night utility", "Smooth lining"],
    shippingLeadTime: "Dispatches within 2-3 days",
    bestSeller: true,
  }),
  createProduct({
    id: 12,
    sku: "ALP-OUT-012",
    title: "Fleece Overshirt",
    slug: "fleece-overshirt",
    price: 4290,
    category: "outerwear",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      createColor("Ecru", "#DDD2C6"),
      createColor("Umber", "#5B534B"),
      createColor("Night", "#141516"),
    ],
    images: [
      createImage(
        "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=1400&q=80",
        "Fleece Overshirt front image",
      ),
      createImage(
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80",
        "Fleece Overshirt styled as a light jacket",
      ),
    ],
    description: "Soft overshirt jacket with brushed texture and clean snap front.",
    summary: "A cozy outer layer that works as a shirt indoors and a jacket outdoors.",
    fit: "Relaxed overshirt fit.",
    material: "Brushed cotton fleece",
    highlights: ["Brushed texture", "Snap front", "Indoor-to-outdoor layer"],
    shippingLeadTime: "Dispatches within 2-3 days",
    newDrop: true,
  }),
];

export const productCategories = Object.keys(categoryLabels) as ProductCategory[];

export const productCategoryOptions: ProductCategoryOption[] = productCategories.map((value) => ({
  value,
  label: categoryLabels[value],
  description: categoryDescriptions[value],
}));

const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];

export const productSizes = Array.from(new Set(products.flatMap((product) => product.sizes))).sort(
  (left, right) => sizeOrder.indexOf(left) - sizeOrder.indexOf(right),
);

const colorLabelMap = Object.fromEntries(
  products.flatMap((product) =>
    product.colors.map((color) => [color.hex.toUpperCase(), color.name] as const),
  ),
);

export const getCategoryLabel = (category: ProductCategory) => categoryLabels[category];

export const getColorLabel = (colorHex: string) =>
  colorLabelMap[colorHex.toUpperCase()] ?? colorHex.toUpperCase();

export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);

export const getRelatedProducts = (
  slug: string,
  category: ProductCategory,
  limit = 4,
) =>
  products
    .filter((product) => product.slug !== slug && product.category === category)
    .slice(0, limit);

export const getFeaturedProducts = (limit = 6) =>
  products.filter((product) => product.featured).slice(0, limit);

export const getBestSellerProducts = (limit = 6) =>
  products.filter((product) => product.bestSeller).slice(0, limit);

export const getNewDropProducts = (limit = 6) =>
  products.filter((product) => product.newDrop).slice(0, limit);

export const getFallbackProducts = (limit = 4) => {
  const featured = getFeaturedProducts(limit);

  return featured.length ? featured : products.slice(0, limit);
};

export const filterProducts = (items: Product[], filters: ProductFilters) =>
  items.filter(
    (product) =>
      (filters.category === "all" || product.category === filters.category) &&
      (filters.size === "all" || product.sizes.includes(filters.size)),
  );

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
