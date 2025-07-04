'use client'
import React, { useState, useRef } from 'react';
import { Search, ShoppingCart, User, Menu, X, ArrowRight, LogIn, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SearchSidebar from './SearchBar';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useCategories } from '../hooks/useCategories';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [shouldRenderDropdown, setShouldRenderDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const { categories } = useCategories();

  const handleMouseEnter = (categorySlug: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredCategory(categorySlug);
    setShouldRenderDropdown(true);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    timeoutRef.current = setTimeout(() => {
      setShouldRenderDropdown(false);
      setHoveredCategory(null);
    }, 200);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  // Split categories for left and right positioning
  const leftCategories = categories.slice(0, Math.ceil(categories.length / 2));
  const rightCategories = categories.slice(Math.ceil(categories.length / 2));

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <SearchSidebar />
            </div>
          
            {/* Center */}
            <div className="flex">
              {/* Left Categories */}
              <div className="hidden md:flex items-center space-x-8">
                {leftCategories.map((category) => (
                  <div
                    key={category.id}
                    className="relative group"
                    onMouseEnter={() => handleMouseEnter(category.slug)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      to={`/category/${category.slug}`}
                      className="flex items-center space-x-1 text-slate-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      <div className="relative flex group overflow-hidden cursor-pointer px-6 py-3">
                        <span className="relative z-10 text-black group-hover:text-white ease-in-out transition-transform duration-500">
                          {category.title}
                        </span>
                        <div className="absolute inset-0 z-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.215,0.61,0.355,1)]"></div>
                      </div>
                    </Link>

                    {/* Dropdown */}
                    {shouldRenderDropdown && hoveredCategory === category.slug && (
                      <div
                        className={`fixed top-16 left-0 right-0 bg-white shadow-2xl border-b border-gray-200 z-50 overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen ? 'animate-dropdownOpen' : 'animate-dropdownClose'
                        }`}
                      >
                        <div className="max-w-full mx-auto">
                          <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 px-4 sm:px-6 lg:px-8 py-6 border-b border-gray-100">
                            <div className="max-w-7xl mx-auto flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="p-3 bg-purple-100 rounded-xl">
                                  <div className="h-6 w-6 bg-purple-600 rounded"></div>
                                </div>
                                <div>
                                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                                    {category.title}
                                  </h3>
                                  <p className="text-gray-600 text-sm lg:text-base">
                                    {category.description || 'Discover our exclusive NFT collection'}
                                  </p>
                                </div>
                              </div>
                              <Link
                                to={`/category/${category.slug}`}
                                className="group/btn bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-200 hover:scale-105 text-sm lg:text-base"
                              >
                                <span>See All {category.title}</span>
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Centered Logo */}
              <div className="flex-shrink-0 px-16">
                <Link to="/" className="flex items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">N</span>
                    </div>
                    <div className="hidden sm:block">
                      <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        NFTMarket
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Right Categories */}
              <div className="hidden md:flex items-center space-x-8">
                {rightCategories.map((category) => (
                  <div
                    key={category.id}
                    className="relative group"
                    onMouseEnter={() => handleMouseEnter(category.slug)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      to={`/category/${category.slug}`}
                      className="flex items-center space-x-1 text-slate-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      <div className="relative flex group overflow-hidden cursor-pointer px-6 py-3">
                        <span className="relative z-10 text-black group-hover:text-white ease-in-out transition-transform duration-500">
                          {category.title}
                        </span>
                        <div className="absolute inset-0 z-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.215,0.61,0.355,1)]"></div>
                      </div>
                    </Link>

                    {/* Dropdown */}
                    {shouldRenderDropdown && hoveredCategory === category.slug && (
                      <div
                        className={`fixed top-16 left-0 right-0 bg-white shadow-2xl border-b border-gray-200 z-50 overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen ? 'animate-dropdownOpen' : 'animate-dropdownClose'
                        }`}
                      >
                        <div className="max-w-full mx-auto">
                          <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 px-4 sm:px-6 lg:px-8 py-6 border-b border-gray-100">
                            <div className="max-w-7xl mx-auto flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="p-3 bg-purple-100 rounded-xl">
                                  <div className="h-6 w-6 bg-purple-600 rounded"></div>
                                </div>
                                <div>
                                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">{category.title}</h3>
                                  <p className="text-gray-600 text-sm lg:text-base">{category.description || 'Discover our exclusive NFT collection'}</p>
                                </div>
                              </div>
                              <Link
                                to={`/category/${category.slug}`}
                                className="group/btn bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-200 hover:scale-105 text-sm lg:text-base"
                              >
                                <span>See All {category.title}</span>
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Icons */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-6 w-6" />
                    )}
                    <span className="text-sm font-medium">{user.name}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My NFTs
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors duration-200"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors duration-200"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Register</span>
                  </Link>
                </div>
              )}
              
              <Link
                to="/cart"
                className="relative p-2 text-gray-400 hover:text-gray-500 transition-colors duration-200"
              >
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.slug}`}
                    className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{category.title}</span>
                  </Link>
                ))}
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  {user ? (
                    <>
                      <div className="px-3 py-2 text-sm text-gray-500">
                        Signed in as {user.name}
                      </div>
                      <Link
                        to="/profile"
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My NFTs
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                  
                  <Link
                    to="/cart"
                    className="flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Cart</span>
                    {itemCount > 0 && (
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {itemCount}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      <style jsx>{`
        @keyframes dropdownOpen {
          0% {
            opacity: 0;
            transform: translateY(-3rem);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dropdownClose {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-3rem);
          }
        }

        .animate-dropdownOpen {
          animation: dropdownOpen 0.3s ease-out forwards;
        }
        .animate-dropdownClose {
          animation: dropdownClose 0.2s ease-in-out forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;