'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="text-3xl">🇱🇰</div>
            <div>
              <div className="font-display text-2xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                Ceylon Travels
              </div>
              <div className="text-xs text-gray-500 tracking-widest">DISCOVER SRI LANKA</div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/destinations" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Destinations
            </Link>
            <Link href="/packages" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Tour Packages
            </Link>
            <Link href="/activities" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Activities
            </Link>
            <Link href="/hotels" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Hotels
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Categories
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Contact
            </Link>
            <Link 
              href="/contact" 
              className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-all hover:shadow-lg font-medium"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <Link 
              href="/destinations" 
              className="block py-2 text-gray-700 hover:text-amber-600 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Destinations
            </Link>
            <Link 
              href="/packages" 
              className="block py-2 text-gray-700 hover:text-amber-600 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Tour Packages
            </Link>
            <Link 
              href="/activities" 
              className="block py-2 text-gray-700 hover:text-amber-600 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Activities
            </Link>
            <Link 
              href="/hotels" 
              className="block py-2 text-gray-700 hover:text-amber-600 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Hotels
            </Link>
            <Link 
              href="/categories" 
              className="block py-2 text-gray-700 hover:text-amber-600 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Categories
            </Link>
            <Link 
              href="/about" 
              className="block py-2 text-gray-700 hover:text-amber-600 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="block py-2 text-gray-700 hover:text-amber-600 transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/contact" 
              className="block w-full bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-all text-center font-medium"
              onClick={() => setIsOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
