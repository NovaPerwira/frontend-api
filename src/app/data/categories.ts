export interface NFTItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  creator: string;
  inStock: boolean;
  description?: string;
}

export interface CategoryCollection {
  name: string;
  icon: string;
  active: boolean;
}

export interface CategoryData {
  icon: any;
  description: string;
  bestItems: {
    name: string;
    image: string;
    price: string;
    originalPrice: string;
  }[];
}

export const categoryCollections: Record<string, CategoryCollection[]> = {
  Wearables: [
    { name: "Avatar Clothing", icon: "👕", active: true },
    { name: "Digital Accessories", icon: "👑", active: false },
    { name: "Virtual Shoes", icon: "👟", active: false },
    { name: "Metaverse Gear", icon: "🥽", active: false },
    { name: "Fashion Items", icon: "💎", active: false },
  ],
  Electronics: [
    { name: "Digital Gadgets", icon: "📱", active: true },
    { name: "Virtual Devices", icon: "💻", active: false },
    { name: "Tech Art", icon: "🖥️", active: false },
    { name: "Cyber Items", icon: "🔌", active: false },
    { name: "Future Tech", icon: "🚀", active: false },
  ],
  Accessories: [
    { name: "Digital Jewelry", icon: "💍", active: true },
    { name: "Virtual Bags", icon: "👜", active: false },
    { name: "Cyber Watches", icon: "⌚", active: false },
    { name: "Meta Glasses", icon: "🕶️", active: false },
    { name: "Digital Pins", icon: "📌", active: false },
  ],
  NFTs: [
    { name: "Digital Jewelry", icon: "💍", active: true },
    { name: "Virtual Bags", icon: "👜", active: false },
    { name: "Cyber Watches", icon: "⌚", active: false },
    { name: "Meta Glasses", icon: "🕶️", active: false },
    { name: "Digital Pins", icon: "📌", active: false },
  ]
};