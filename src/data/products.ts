import { Product } from '../types';

export const products: Product[] = [
  // Rings
  {
    id: 'ring-1',
    name: 'Diamante',
    price: 1299,
    imageUrl: 'https://images.pexels.com/photos/9946775/pexels-photo-9946775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Classic solitaire ring with a brilliant-cut diamond set in 18k gold.',
    category: 'ring',
  },
  {
    id: 'ring-2',
    name: 'Anillo de perla',
    price: 899,
    imageUrl: 'https://images.pexels.com/photos/10983783/pexels-photo-10983783.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Elegant pearl ring surrounded by tiny diamonds in a vintage setting.',
    category: 'ring',
  },
  {
    id: 'ring-3',
    name: 'Anillo safiro',
    price: 1599,
    imageUrl: 'https://images.pexels.com/photos/10957670/pexels-photo-10957670.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Eternity ring with alternating sapphires and diamonds in platinum.',
    category: 'ring',
  },
  {
    id: 'ring-4',
    name: 'Anillo oro rosa',
    price: 799,
    imageUrl: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Minimalist rose gold band with a brushed finish.',
    category: 'ring',
  },
  {
    id: 'ring-5',
    name: 'Anillo esmeralda',
    price: 1899,
    imageUrl: 'https://images.pexels.com/photos/12806800/pexels-photo-12806800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Stunning emerald center stone surrounded by a halo of diamonds.',
    category: 'ring',
  },

  // Necklaces
  {
    id: 'necklace-1',
    name: 'Pearl Pendant',
    price: 899,
    imageUrl: 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Elegant freshwater pearl pendant on a delicate gold chain.',
    category: 'necklace',
  },
  {
    id: 'necklace-2',
    name: 'Diamond Solitaire',
    price: 1299,
    imageUrl: 'https://images.pexels.com/photos/10957685/pexels-photo-10957685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Classic diamond solitaire pendant on an 18k white gold chain.',
    category: 'necklace',
  },
  {
    id: 'necklace-3',
    name: 'Emerald Droplet',
    price: 1499,
    imageUrl: 'https://images.pexels.com/photos/5370638/pexels-photo-5370638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Teardrop emerald pendant suspended from a platinum chain.',
    category: 'necklace',
  },
  {
    id: 'necklace-4',
    name: 'Gold Layered Chain',
    price: 799,
    imageUrl: 'https://images.pexels.com/photos/10957748/pexels-photo-10957748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Versatile layered gold chain with varying link sizes.',
    category: 'necklace',
  },
  {
    id: 'necklace-5',
    name: 'Ruby Heart',
    price: 1199,
    imageUrl: 'https://images.pexels.com/photos/9426588/pexels-photo-9426588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Heart-shaped ruby pendant surrounded by tiny diamonds.',
    category: 'necklace',
  },

  // Bracelets
  {
    id: 'bracelet-1',
    name: 'Diamond Tennis',
    price: 2499,
    imageUrl: 'https://images.pexels.com/photos/9428848/pexels-photo-9428848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Classic tennis bracelet with brilliant-cut diamonds in white gold.',
    category: 'bracelet',
  },
  {
    id: 'bracelet-2',
    name: 'Gold Chain Link',
    price: 899,
    imageUrl: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Bold gold chain link bracelet with a toggle clasp.',
    category: 'bracelet',
  },
  {
    id: 'bracelet-3',
    name: 'Pearl Strand',
    price: 699,
    imageUrl: 'https://images.pexels.com/photos/10957786/pexels-photo-10957786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Elegant double strand of freshwater pearls with a silver clasp.',
    category: 'bracelet',
  },
  {
    id: 'bracelet-4',
    name: 'Sapphire Bangle',
    price: 1299,
    imageUrl: 'https://images.pexels.com/photos/10957744/pexels-photo-10957744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Rigid bangle with alternating sapphires and diamonds.',
    category: 'bracelet',
  },
  {
    id: 'bracelet-5',
    name: 'Rose Gold Charm',
    price: 749,
    imageUrl: 'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Delicate rose gold chain with assorted charm pendants.',
    category: 'bracelet',
  },
];

export const getProductsByCategory = (category: 'ring' | 'necklace' | 'bracelet'): Product[] => {
  return products.filter(product => product.category === category);
};