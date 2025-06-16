'use client'
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, Grid, List, Star, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useCategory } from '../hooks/useCategories';
import { useNFTsByCategory } from '../hooks/useNFTs';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const CategoryPage: React.FC = () => {
  const { category: categorySlug } = useParams<{ category: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({
    priceRange: [0, 50],
    minRating: 0,
    inStock: false
  });
  
  const { addToCart } = useCart();
  const { category, loading: categoryLoading, error: categoryError } = useCategory(categorySlug || '');
  const { nfts, loading: nftsLoading, error: nftsError } = useNFTsByCategory(category?.id || null);

  const [filteredNFTs, setFilteredNFTs] = useState(nfts);

  useEffect(() => {
    let filtered = [...nfts];

    // Apply price filter
    filtered = filtered.filter(nft => 
      nft.price >= filters.priceRange[0] && nft.price <= filters.priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredNFTs(filtered);
  }, [nfts, filters, sortBy]);

  const handleAddToCart = (nft: any) => {
    addToCart({
      id: nft.id,
      name: nft.title,
      price: nft.price,
      image: nft.image || 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=400',
      quantity: 1
    });
  };

  if (categoryLoading || nftsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (categoryError || nftsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage message={categoryError || nftsError || 'Failed to load category'} />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link to="/" className="text-purple-600 hover:text-purple-800">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{category.title} NFTs</h1>
              <p className="text-gray-600 mt-2">{filteredNFTs.length} NFTs found</p>
              {category.description && (
                <p className="text-gray-600 mt-1">{category.description}</p>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Price Range (ETH)</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: [0, parseInt(e.target.value)] 
                    }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>0 ETH</span>
                    <span>{filters.priceRange[1]} ETH</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NFTs Grid */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNFTs.map(nft => (
                  <div key={nft.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group border border-purple-100">
                    <div className="aspect-square overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 relative">
                      <img
                        src={nft.image || 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=400'}
                        alt={nft.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Heart className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{nft.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">NFT #{nft.id}</p>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">(4.8)</span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xl font-bold text-purple-600">{nft.price} ETH</span>
                      </div>
                      <button
                        onClick={() => handleAddToCart(nft)}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>Buy NFT</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNFTs.map(nft => (
                  <div key={nft.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-purple-100">
                    <div className="flex">
                      <div className="w-48 h-48 flex-shrink-0 bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden">
                        <img
                          src={nft.image || 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=400'}
                          alt={nft.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{nft.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">NFT #{nft.id}</p>
                            <div className="flex items-center mb-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="ml-2 text-sm text-gray-600">(4.8)</span>
                            </div>
                            {nft.description && (
                              <p className="text-gray-600 text-sm">{nft.description}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-purple-600 mb-4 block">{nft.price} ETH</span>
                            <button
                              onClick={() => handleAddToCart(nft)}
                              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                            >
                              <ShoppingCart className="h-4 w-4" />
                              <span>Buy NFT</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredNFTs.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No NFTs found</h3>
                <p className="text-gray-600">Try adjusting your filters or search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;