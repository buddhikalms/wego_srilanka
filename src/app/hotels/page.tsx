import { HeroSection, SectionTitle } from '@/components/Components';
import { hotels } from '@/data/mockData';

export const metadata = {
  title: 'Hotels - Ceylon Travels',
  description: 'Find the perfect accommodation for your Sri Lankan adventure',
};

export default function HotelsPage() {
  return (
    <div>
      <HeroSection 
        title="Accommodation"
        subtitle="From boutique hotels to luxury resorts"
        image="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&auto=format&fit=crop"
      />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Featured Hotels"
            subtitle="Carefully selected properties for your comfort"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover-lift group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                      {hotel.category}
                    </span>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <span className="ml-1 text-sm font-semibold">{hotel.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
                    {hotel.name}
                  </h3>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    {hotel.location}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    {hotel.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.slice(0, 4).map((amenity, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <div className="text-xs text-gray-500">From</div>
                      <div className="font-display text-2xl font-bold text-amber-600">
                        ${hotel.pricePerNight}
                      </div>
                      <div className="text-xs text-gray-500">per night</div>
                    </div>
                    <button className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-all font-medium text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
