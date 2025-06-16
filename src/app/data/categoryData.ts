import { Shirt, Smartphone, Gem } from 'lucide-react';
import { CategoryData } from './categories';

export const categoryData: Record<string, CategoryData> = {
  Wearables: {
    icon: Shirt,
    description: "Exclusive digital fashion and avatar accessories for the metaverse. From cyberpunk jackets to holographic capes, express your unique style in virtual worlds.",
    bestItems: [
      { name: 'Cyber Punk Jacket', image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=400', price: '2.5 ETH', originalPrice: '3.2 ETH' },
      { name: 'Golden Crown NFT', image: 'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=400', price: '5.8 ETH', originalPrice: '7.2 ETH' },
      { name: 'Neon Sneakers', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400', price: '1.8 ETH', originalPrice: '2.4 ETH' }
    ]
  },
  Electronics: {
    icon: Smartphone,
    description: "Revolutionary digital gadgets and virtual devices that push the boundaries of technology. Own exclusive tech NFTs that represent the future of digital innovation.",
    bestItems: [
      { name: 'Quantum Phone NFT', image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400', price: '15.8 ETH', originalPrice: '18.9 ETH' },
      { name: 'Cyber Laptop Pro', image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400', price: '22.5 ETH', originalPrice: '28.0 ETH' },
      { name: 'Hologram Display', image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=400', price: '35.2 ETH', originalPrice: '42.8 ETH' }
    ]
  },
  Accessories: {
    icon: Gem,
    description: "Premium digital accessories and jewelry for the modern NFT collector. From blockchain-verified rings to virtual luxury bags, complete your digital collection.",
    bestItems: [
      { name: 'Ethereum Ring', image: 'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=400', price: '8.5 ETH', originalPrice: '10.2 ETH' },
      { name: 'Virtual Handbag', image: 'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=400', price: '6.8 ETH', originalPrice: '8.5 ETH' },
      { name: 'Time Warp Watch', image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400', price: '12.8 ETH', originalPrice: '16.2 ETH' }
    ]
  }
};