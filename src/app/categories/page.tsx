'use client';

import { useSearchParams } from 'next/navigation';
import { HeroSection, SectionTitle, CategoryCard, DestinationCard } from '@/components/Components';
import { categories, destinations } from '@/data/mockData';

export default function CategoriesPage() {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');

  const filteredDestinations = filter 
    ? destinations.filter(d => d.category.toLowerCase() === filter.toLowerCase())
    : [];

  return (
    <div>
      <HeroSection 
        title="Explore by Category"
        subtitle="Find experiences that match your interests"
        image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&auto=format&fit=crop"
      />

      {/* Categories Grid */}
      {!filter && (
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <SectionTitle 
              title="Browse Categories"
              subtitle="Discover Sri Lanka through different themes"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filtered Results */}
      {filter && filteredDestinations.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <SectionTitle 
              title={`${filter.charAt(0).toUpperCase() + filter.slice(1)} Destinations`}
              subtitle="Explore places in this category"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          </div>
        </section>
      )}

      {filter && filteredDestinations.length === 0 && (
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-500 text-lg">No destinations found in this category.</p>
          </div>
        </section>
      )}
    </div>
  );
}
