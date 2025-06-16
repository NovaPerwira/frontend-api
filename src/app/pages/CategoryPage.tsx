'use client'
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, Grid, List, ChevronDown, Star, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { nftProducts } from '../data/nfts';
import { NFTItem } from '../data/categories';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<NFTItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<NFTItem[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 50],
    creators: [] as string[],
    categories: [] as string[],
    inStock: false,
    minRating: 0
  });
  
  const { addToCart } = useCart();

  useEffect(() => {
    if (category && nftProducts[category as keyof typeof nftProducts]) {
      const categoryData = nftProducts[category as keyof typeof nftProducts];
      setProducts(categoryData);
      setFilteredProducts(categoryData);
    }
  }, [category]);

  useEffect(() => {
    let filtered = [...products];

    // Apply filters
    if (filters.creators.length > 0) {
      filtered = filtered.filter(product => filters.creators.includes(product.creator));
    }

    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => filters.categories.includes(product.category));
    }

    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    if (filters.minRating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.minRating);
    }

    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Keep original order as newest
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, filters, sortBy]);

  const handleAddToCart = (product: NFTItem) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  const uniqueCreators = [...new Set(products.map(p => p.creator))];
  const uniqueCategories = [...new Set(products.map(p => p.category))];

  if (!category || !nftProducts[category as keyof typeof nftProducts]) {
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
              <h1 className="text-3xl font-bold text-gray-900 capitalize">{category} NFTs</h1>
              <p className="text-gray-600 mt-2">{filteredProducts.length} NFTs found</p>
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
                <option value="rating">Highest Rated</option>
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
              
              {/* Creators */}
              {uniqueCreators.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Creator</h4>
                  <div className="space-y-2">
                    {uniqueCreators.map(creator => (
                      <label key={creator} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.creators.includes(creator)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters(prev => ({ ...prev, creators: [...prev.creators, creator] }));
                            } else {
                              setFilters(prev => ({ ...prev, creators: prev.creators.filter(c => c !== creator) }));
                            }
                          }}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">{creator}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              {uniqueCategories.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Category</h4>
                  <div className="space-y-2">
                    {uniqueCategories.map(cat => (
                      <label key={cat} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(cat)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters(prev => ({ ...prev, categories: [...prev.categories, cat] }));
                            } else {
                              setFilters(prev => ({ ...prev, categories: prev.categories.filter(c => c !== cat) }));
                            }
                          }}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* In Stock */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Available Only</span>
                </label>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Minimum Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map(rating => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.minRating === rating}
                        onChange={() => setFilters(prev => ({ ...prev, minRating: rating }))}
                        className="border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <div className="ml-2 flex items-center">
                        {[...Array(rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="ml-1 text-sm text-gray-600">& Up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group border border-purple-100">
                    <div className="aspect-square overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Heart className="h-4 w-4 text-gray-600" />
                      </button>
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white font-semibold">Sold Out</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">by {product.creator}</p>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600">{product.price} ETH</span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">{product.originalPrice} ETH</span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-400 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>{product.inStock ? 'Buy NFT' : 'Sold Out'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-purple-100">
                    <div className="flex">
                      <div className="w-48 h-48 flex-shrink-0 bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">by {product.creator}</p>
                            <div className="flex items-center mb-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Math.floor(product.rating)
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                            </div>
                            <p className="text-gray-600 mb-4">{product.category}</p>
                            {product.description && (
                              <p className="text-gray-600 text-sm">{product.description}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-4">
                              <span className="text-2xl font-bold text-purple-600">{product.price} ETH</span>
                              {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-lg text-gray-500 line-through">{product.originalPrice} ETH</span>
                              )}
                            </div>
                            <button
                              onClick={() => handleAddToCart(product)}
                              disabled={!product.inStock}
                              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-400 text-white py-2 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                            >
                              <ShoppingCart className="h-4 w-4" />
                              <span>{product.inStock ? 'Buy NFT' : 'Sold Out'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
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