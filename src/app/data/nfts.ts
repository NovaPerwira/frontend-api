import { NFTItem } from './categories';

export const nftProducts: Record<string, NFTItem[]> = {
  wearables: [
    {
      id: 1,
      name: 'Cyber Punk Jacket',
      price: 2.5,
      originalPrice: 3.2,
      image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      reviews: 324,
      category: 'Avatar Clothing',
      creator: 'CyberArt',
      inStock: true,
      description: 'Exclusive cyberpunk-style jacket for your metaverse avatar'
    },
    {
      id: 2,
      name: 'Golden Crown NFT',
      price: 5.8,
      originalPrice: 7.2,
      image: 'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      reviews: 156,
      category: 'Digital Accessories',
      creator: 'RoyalNFT',
      inStock: true,
      description: 'Majestic golden crown for virtual royalty'
    },
    {
      id: 3,
      name: 'Neon Sneakers',
      price: 1.8,
      originalPrice: 2.4,
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.6,
      reviews: 89,
      category: 'Virtual Shoes',
      creator: 'NeonStyle',
      inStock: true,
      description: 'Glowing neon sneakers for the digital world'
    },
    {
      id: 4,
      name: 'VR Headset Rare',
      price: 12.5,
      originalPrice: 15.0,
      image: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      reviews: 243,
      category: 'Metaverse Gear',
      creator: 'VirtualTech',
      inStock: false,
      description: 'Ultra-rare VR headset NFT with special abilities'
    },
    {
      id: 5,
      name: 'Diamond Dress',
      price: 8.9,
      originalPrice: 11.2,
      image: 'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.5,
      reviews: 178,
      category: 'Fashion Items',
      creator: 'LuxuryNFT',
      inStock: true,
      description: 'Sparkling diamond dress for special occasions'
    },
    {
      id: 6,
      name: 'Holographic Cape',
      price: 4.2,
      originalPrice: 5.8,
      image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.4,
      reviews: 234,
      category: 'Avatar Clothing',
      creator: 'HoloArt',
      inStock: true,
      description: 'Mesmerizing holographic cape with color-shifting effects'
    }
  ],
  electronics: [
    {
      id: 7,
      name: 'Quantum Phone NFT',
      price: 15.8,
      originalPrice: 18.9,
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      reviews: 312,
      category: 'Digital Gadgets',
      creator: 'QuantumTech',
      inStock: true,
      description: 'Revolutionary quantum-powered smartphone NFT'
    },
    {
      id: 8,
      name: 'Cyber Laptop Pro',
      price: 22.5,
      originalPrice: 28.0,
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.3,
      reviews: 445,
      category: 'Virtual Devices',
      creator: 'CyberCorp',
      inStock: true,
      description: 'High-performance laptop for digital creators'
    },
    {
      id: 9,
      name: 'Hologram Display',
      price: 35.2,
      originalPrice: 42.8,
      image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      reviews: 567,
      category: 'Tech Art',
      creator: 'HoloDisplay',
      inStock: true,
      description: '3D holographic display for immersive experiences'
    },
    {
      id: 10,
      name: 'Neural Interface',
      price: 45.9,
      originalPrice: 55.0,
      image: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.5,
      reviews: 234,
      category: 'Cyber Items',
      creator: 'NeuroTech',
      inStock: true,
      description: 'Advanced neural interface for mind-machine connection'
    }
  ],
  accessories: [
    {
      id: 11,
      name: 'Ethereum Ring',
      price: 8.5,
      originalPrice: 10.2,
      image: 'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      reviews: 892,
      category: 'Digital Jewelry',
      creator: 'CryptoJewels',
      inStock: true,
      description: 'Elegant Ethereum-themed ring with blockchain verification'
    },
    {
      id: 12,
      name: 'Virtual Handbag',
      price: 6.8,
      originalPrice: 8.5,
      image: 'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.6,
      reviews: 234,
      category: 'Virtual Bags',
      creator: 'LuxBags',
      inStock: true,
      description: 'Luxury virtual handbag for metaverse fashion'
    },
    {
      id: 13,
      name: 'Time Warp Watch',
      price: 12.8,
      originalPrice: 16.2,
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      reviews: 156,
      category: 'Cyber Watches',
      creator: 'TimeNFT',
      inStock: true,
      description: 'Futuristic watch that bends time in virtual worlds'
    }
  ]
};