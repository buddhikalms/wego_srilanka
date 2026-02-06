import Link from 'next/link';
import { notFound } from 'next/navigation';
import { tourPackages } from '@/data/mockData';

export async function generateStaticParams() {
  return tourPackages.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export default function PackageDetailPage({ params }: { params: { slug: string } }) {
  const pkg = tourPackages.find(p => p.slug === params.slug);
  
  if (!pkg) {
    notFound();
  }

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative h-[500px]">
        <img 
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 mb-4">
            <span className="px-4 py-2 bg-amber-600 rounded-full text-white text-sm font-medium">
              {pkg.category}
            </span>
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              {pkg.duration}
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4 text-shadow">
            {pkg.name}
          </h1>
          <div className="text-3xl font-bold text-amber-400">
            From ${pkg.price} per person
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Highlights */}
              <div>
                <h2 className="font-display text-3xl font-bold mb-6">Package Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pkg.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-amber-50 rounded-xl">
                      <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div>
                <h2 className="font-display text-3xl font-bold mb-6">Day by Day Itinerary</h2>
                <div className="space-y-6">
                  {pkg.itinerary.map((day, index) => (
                    <div key={index} className="flex space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center font-display font-bold text-lg">
                          {day.day}
                        </div>
                      </div>
                      <div className="flex-1 bg-white rounded-xl border-2 border-gray-200 p-6">
                        <h3 className="font-display text-xl font-bold mb-2">{day.title}</h3>
                        <p className="text-gray-600">{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included / Not Included */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-green-50 rounded-2xl p-6">
                  <h3 className="font-display text-xl font-bold mb-4 flex items-center">
                    <svg className="w-6 h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    What's Included
                  </h3>
                  <ul className="space-y-2">
                    {pkg.included.map((item, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <span className="mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 rounded-2xl p-6">
                  <h3 className="font-display text-xl font-bold mb-4 flex items-center">
                    <svg className="w-6 h-6 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                    </svg>
                    Not Included
                  </h3>
                  <ul className="space-y-2">
                    {pkg.notIncluded.map((item, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <span className="mr-2">✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-24 space-y-6">
                {/* Booking Card */}
                <div className="bg-amber-600 text-white rounded-2xl p-6">
                  <div className="text-center mb-6">
                    <div className="text-sm text-amber-100 mb-2">Starting from</div>
                    <div className="font-display text-4xl font-bold mb-1">${pkg.price}</div>
                    <div className="text-sm text-amber-100">per person</div>
                  </div>
                  
                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-100">Duration:</span>
                      <span className="font-semibold">{pkg.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-100">Category:</span>
                      <span className="font-semibold">{pkg.category}</span>
                    </div>
                  </div>

                  <Link 
                    href="/contact"
                    className="block w-full bg-white text-amber-700 py-4 rounded-full font-bold text-center hover:bg-gray-100 transition-colors mb-3"
                  >
                    Book Now
                  </Link>
                  
                  <Link 
                    href="/contact"
                    className="block w-full border-2 border-white text-white py-3 rounded-full font-semibold text-center hover:bg-white/10 transition-colors"
                  >
                    Request Custom Quote
                  </Link>
                </div>

                {/* Help Card */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-display text-lg font-bold mb-3">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Our travel experts are here to help you plan the perfect trip.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                      <span>+94 11 234 5678</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      <span>info@ceylontravels.lk</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
