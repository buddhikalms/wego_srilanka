import Link from 'next/link';
import { HeroSection, SectionTitle, DestinationCard, PackageCard, CategoryCard, CTASection } from '@/components/Components';
import { destinations, tourPackages, categories } from '@/data/mockData';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection 
        title="Explore the Pearl of the Indian Ocean"
        subtitle="Discover ancient wonders, pristine beaches, and unforgettable adventures"
        image="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&auto=format&fit=crop"
        showSearch={true}
      />

      {/* Featured Destinations */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Featured Destinations"
            subtitle="Explore the most captivating places Sri Lanka has to offer"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/destinations" 
              className="inline-block bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition-all font-medium shadow-lg"
            >
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Tour Packages */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Popular Tour Packages"
            subtitle="Carefully curated experiences for every type of traveler"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {tourPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/packages" 
              className="inline-block bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition-all font-medium shadow-lg"
            >
              Explore All Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Explore by Category"
            subtitle="Find experiences that match your interests"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Why Choose Ceylon Travels"
            subtitle="Experience the difference of traveling with local experts"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-3">15+ Years Experience</h3>
              <p className="text-gray-600">
                Trusted by thousands of travelers since 2010, creating unforgettable Sri Lankan journeys.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Local Expertise</h3>
              <p className="text-gray-600">
                Our team of local guides knows every hidden gem and authentic experience.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Best Price Guarantee</h3>
              <p className="text-gray-600">
                Competitive pricing with no hidden fees. Get the best value for your adventure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
