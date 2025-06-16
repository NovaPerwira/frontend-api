import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Zap, Shield, Truck } from 'lucide-react';

const HomePage: React.FC = () => {
  const featuredNFTs = [
    {
      id: 1,
      name: 'Cyber Punk Jacket',
      price: 2.5,
      originalPrice: 3.2,
      image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'wearables',
      rating: 4.8,
      creator: 'CyberArt'
    },
    {
      id: 2,
      name: 'Quantum Phone NFT',
      price: 15.8,
      originalPrice: 18.9,
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'electronics',
      rating: 4.9,
      creator: 'QuantumTech'
    },
    {
      id: 3,
      name: 'Ethereum Ring',
      price: 8.5,
      originalPrice: 10.2,
      image: 'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'accessories',
      rating: 4.8,
      creator: 'CryptoJewels'
    },
    {
      id: 4,
      name: 'Golden Crown NFT',
      price: 5.8,
      originalPrice: 7.2,
      image: 'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'wearables',
      rating: 4.9,
      creator: 'RoyalNFT'
    }
  ];

  const categories = [
    {
      name: 'Wearables',
      slug: 'wearables',
      image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Digital fashion and avatar accessories for the metaverse'
    },
    {
      name: 'Electronics',
      slug: 'electronics',
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Revolutionary digital gadgets and virtual devices'
    },
    {
      name: 'Accessories',
      slug: 'accessories',
      image: 'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Premium digital accessories and luxury items'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Exclusive
              <span className="block bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                Digital Assets
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Explore, collect, and trade unique NFTs from top creators. Join the future of digital ownership and express your identity in the metaverse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/category/wearables"
                className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Explore NFTs</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors duration-200">
                Create NFT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Trading</h3>
              <p className="text-gray-600">Buy and sell NFTs instantly with our secure blockchain technology</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Authenticity</h3>
              <p className="text-gray-600">Every NFT is verified and secured on the blockchain</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Marketplace</h3>
              <p className="text-gray-600">Connect with creators and collectors worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Categories
            </h2>
            <p className="text-xl text-gray-600">
              Discover unique digital assets across different categories
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-purple-100"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured NFTs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured NFTs
              </h2>
              <p className="text-xl text-gray-600">
                Hand-picked exclusive digital assets from top creators
              </p>
            </div>
            <Link
              to="/category/wearables"
              className="hidden md:flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-semibold"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredNFTs.map((nft) => (
              <div
                key={nft.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-purple-100"
              >
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors duration-200">
                    {nft.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">by {nft.creator}</p>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(nft.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">({nft.rating})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-purple-600">{nft.price} ETH</span>
                      {nft.originalPrice > nft.price && (
                        <span className="text-sm text-gray-500 line-through">{nft.originalPrice} ETH</span>
                      )}
                    </div>
                  </div>
                  <Link
                    to={`/category/${nft.category}`}
                    className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 block text-center"
                  >
                    View NFT
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-pink-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay in the Loop
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to discover new NFT drops, exclusive collections, and creator spotlights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;