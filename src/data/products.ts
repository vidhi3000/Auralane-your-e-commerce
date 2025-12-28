import { Product } from '@/types';

import blazerMen from '@/assets/products/blazer-men.jpg';
import silkDress from '@/assets/products/silk-dress.jpg';
import cottonShirt from '@/assets/products/cotton-shirt.jpg';
import cashmereCardigan from '@/assets/products/cashmere-cardigan.jpg';
import tailoredTrousers from '@/assets/products/tailored-trousers.jpg';
import linenSkirt from '@/assets/products/linen-skirt.jpg';
import oxfordShoes from '@/assets/products/oxford-shoes.jpg';
import velvetGown from '@/assets/products/velvet-gown.jpg';
import merinoSweater from '@/assets/products/merino-sweater.jpg';
import structuredBlazer from '@/assets/products/structured-blazer.jpg';
import slimDenim from '@/assets/products/slim-denim.jpg';
import silkBlouse from '@/assets/products/silk-blouse.jpg';

export const products: Product[] = [
  {
    id: 1,
    name: "Classic Wool Blazer",
    price: 9999,
    category: "men",
    image: blazerMen,
    description: "A timeless charcoal wool blazer crafted from premium Italian fabric. Perfect for formal occasions and business meetings.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Charcoal", "Navy", "Beige"]
  },
  {
    id: 2,
    name: "Silk Midi Dress",
    price: 2299,
    category: "women",
    image: silkDress,
    description: "Elegant champagne silk midi dress with a flattering silhouette. Ideal for evening events and special occasions.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Ivory", "Champagne", "Blush"]
  },
  {
    id: 3,
    name: "Premium Cotton Shirt",
    price: 1599,
    category: "men",
    image: cottonShirt,
    description: "Crisp white cotton shirt with mother-of-pearl buttons. A wardrobe essential for the modern gentleman.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Light Blue", "Pink"]
  },
  {
    id: 4,
    name: "Cashmere Cardigan",
    price: 2599,
    category: "women",
    image: cashmereCardigan,
    description: "Luxuriously soft cream cashmere cardigan with elegant ribbing. Perfect for layering during cooler months.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Cream", "Oatmeal", "Camel"]
  },
  {
    id: 5,
    name: "Tailored Trousers",
    price: 1899,
    category: "men",
    image: tailoredTrousers,
    description: "Impeccably tailored navy trousers with a modern slim fit. Made from wrinkle-resistant premium fabric.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Navy", "Black", "Charcoal"]
  },
  {
    id: 6,
    name: "Linen Maxi Dress",
    price: 2799,
    category: "women",
    image: linenSkirt,
    description: "Flowing ivory linen maxi dress with elegant drape. Perfect for summer days and resort getaways.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Ivory", "Sand", "Sage"]
  },
  {
    id: 7,
    name: "Leather Oxford Shoes",
    price: 11999,
    category: "men",
    image: oxfordShoes,
    description: "Handcrafted cognac leather oxford shoes with Goodyear welt construction. Built to last a lifetime.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Cognac", "Brown", "Black"]
  },
  {
    id: 8,
    name: "Velvet Evening Gown",
    price: 3999,
    category: "women",
    image: velvetGown,
    description: "Stunning emerald velvet evening gown with a dramatic silhouette. Make an unforgettable entrance at any event.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Emerald", "Burgundy", "Midnight Blue"]
  },
  {
    id: 9,
    name: "Merino Wool Sweater",
    price: 2499,
    category: "men",
    image: merinoSweater,
    description: "Ultra-soft burgundy merino wool turtleneck with ribbed detailing. A sophisticated cold-weather essential.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Burgundy", "Forest Green", "Navy"]
  },
  {
    id: 10,
    name: "Structured Blazer",
    price: 9999,
    category: "women",
    image: structuredBlazer,
    description: "Power dressing at its finest. A structured camel blazer that commands attention and exudes confidence.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Camel", "Black", "Ivory"]
  },
  {
    id: 11,
    name: "Slim Fit Denim",
    price: 1899,
    category: "men",
    image: slimDenim,
    description: "Premium Japanese selvedge denim with a modern slim fit. The perfect indigo that only gets better with wear.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Indigo", "Black", "Washed Blue"]
  },
  {
    id: 12,
    name: "Silk Blouse",
    price: 2199,
    category: "women",
    image: silkBlouse,
    description: "Delicate blush silk blouse with subtle pleating. Transitions effortlessly from boardroom to dinner.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Blush", "Ivory", "Sage"]
  }
];
