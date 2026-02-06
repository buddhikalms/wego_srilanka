'use client';

import { useState } from 'react';
import { HeroSection, SectionTitle, PackageCard } from '@/components/Components';
import { tourPackages } from '@/data/mockData';

export default function PackagesPage() {
  const [filter, setFilter] = useState('all');
  
  const categories = ['all', ...new Set(tourPackages.map(pkg => pkg.category))];
  
  const filteredPackages = filter === 'all' 
    ? tourPackages 
    : tourPackages.filter(pkg => pkg.category === filter);

  return (
    <div>
      <HeroSection 
        title="Tour Packages"
        subtitle="Curated experiences for every traveler"
        image="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&auto=format&fit=crop"
      />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Choose Your Perfect Package"
            subtitle="From cultural immersions to wildlife adventures"
          />

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === category
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-600'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Package Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          {filteredPackages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No packages found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
