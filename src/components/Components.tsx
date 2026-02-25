import Link from "next/link";
import Image from "next/image";

// Hero Section Component
export function HeroSection({
  title,
  subtitle,
  image,
  showSearch = false,
}: {
  title: string;
  subtitle?: string;
  image: string;
  showSearch?: boolean;
}) {
  return (
    <div className="relative h-[600px] flex items-center justify-center">
      <div className="absolute inset-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-4 text-shadow animate-fade-in">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-white/90 mb-8 text-shadow animate-fade-in stagger-1">
            {subtitle}
          </p>
        )}

        {showSearch && (
          <div className="max-w-2xl mx-auto animate-fade-in stagger-2">
            <div className="bg-white rounded-full shadow-2xl p-2 flex items-center">
              <input
                type="text"
                placeholder="Search destinations, activities, or packages..."
                className="flex-1 px-6 py-3 rounded-full focus:outline-none text-gray-700"
              />
              <button className="bg-[#004b9d] text-white px-8 py-3 rounded-full hover:bg-sky-700 transition-all font-medium whitespace-nowrap">
                Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Section Title Component
export function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-12">
      <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}

// Destination Card Component
export function DestinationCard({
  destination,
}: {
  destination: {
    slug: string;
    name: string;
    category: string;
    shortDescription: string;
    image: string;
    location: string;
  };
}) {
  return (
    <Link href={`/destinations/${destination.slug}`}>
      <div className="group relative overflow-hidden rounded-2xl shadow-lg hover-lift bg-white">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="inline-block px-3 py-1 bg-[#004b9d] rounded-full text-xs font-medium mb-2">
            {destination.category}
          </div>
          <h3 className="font-display text-2xl font-bold mb-2 text-shadow">
            {destination.name}
          </h3>
          <p className="text-sm text-white/90 text-shadow">
            {destination.shortDescription}
          </p>
          <div className="mt-3 flex items-center text-sm">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {destination.location}
          </div>
        </div>
      </div>
    </Link>
  );
}

// Package Card Component
export function PackageCard({
  pkg,
}: {
  pkg: {
    slug: string;
    name: string;
    duration: string;
    price: number;
    category: string;
    image: string;
    highlights: string[];
  };
}) {
  return (
    <Link href={`/packages/${pkg.slug}`}>
      <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover-lift">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-block px-3 py-1 bg-amber-100 text-[#1a4f9d] rounded-full text-xs font-medium">
              {pkg.category}
            </span>
            <span className="text-sm text-gray-500 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              {pkg.duration}
            </span>
          </div>
          <h3 className="font-display text-xl font-bold text-gray-900 mb-2 group-hover:text-[#002967] transition-colors">
            {pkg.name}
          </h3>
          <ul className="space-y-1 mb-4">
            {pkg.highlights.slice(0, 3).map((highlight, index) => (
              <li
                key={index}
                className="text-sm text-gray-600 flex items-start"
              >
                <svg
                  className="w-4 h-4 text-[#1a4f9d] mr-2 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {highlight}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <div className="text-sm text-gray-500">Starting from</div>
              <div className="font-display text-2xl font-bold text-[#002967]">
                ${pkg.price}
              </div>
            </div>
            <button className="text-[#002967] font-medium group-hover:text-[#1a4f9d] flex items-center">
              View Details
              <svg
                className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Activity Card Component
export function ActivityCard({
  activity,
}: {
  activity: {
    id: string;
    name: string;
    category: string;
    description: string;
    image: string;
    duration: string;
    price: string;
  };
}) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover-lift">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={activity.image}
          alt={activity.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <span className="inline-block px-3 py-1 bg-amber-100 text-[#1a4f9d] rounded-full text-xs font-medium mb-3">
          {activity.category}
        </span>
        <h3 className="font-display text-xl font-bold text-gray-900 mb-2 group-hover:text-[#002967] transition-colors">
          {activity.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {activity.description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            {activity.duration}
          </div>
          <div className="font-semibold text-[#002967]">{activity.price}</div>
        </div>
      </div>
    </div>
  );
}

// Category Card Component
export function CategoryCard({
  category,
}: {
  category: {
    id: string;
    name: string;
    description: string;
    icon: string;
    image: string;
  };
}) {
  return (
    <Link href={`/categories?filter=${category.id}`}>
      <div className="group relative overflow-hidden rounded-2xl shadow-lg hover-lift h-72">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
          <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform">
            {category.icon}
          </div>
          <h3 className="font-display text-2xl font-bold mb-2 text-shadow">
            {category.name}
          </h3>
          <p className="text-sm text-white/90 text-shadow">
            {category.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

// CTA Section Component
export function CTASection() {
  return (
    <div className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&auto=format&fit=crop"
          alt="Beach sunset"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r 
from-[#003b96]/90 
to-[#003b96]/80"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 text-shadow">
          Ready for Your Sri Lankan Adventure?
        </h2>
        <p className="text-xl text-white/90 mb-8 text-shadow">
          Let us craft your perfect journey through the Pearl of the Indian
          Ocean
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/packages"
            className="bg-white text-[#1a4f9d] px-8 py-4 rounded-full hover:bg-gray-100 transition-all font-semibold text-lg shadow-xl"
          >
            Browse Packages
          </Link>
          <Link
            href="/contact"
            className="bg-[#004b9d] text-white px-8 py-4 rounded-full hover:bg-sky-700 transition-all font-semibold text-lg shadow-xl"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
