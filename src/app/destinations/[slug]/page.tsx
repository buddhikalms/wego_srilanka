import Link from "next/link";
import { notFound } from "next/navigation";
import { destinations, tourPackages, activities } from "@/data/mockData";
import { PackageCard } from "@/components/Components";

export async function generateStaticParams() {
  return destinations.map((destination) => ({
    slug: destination.slug,
  }));
}

export default function DestinationDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const destination = destinations.find((d) => d.slug === params.slug);

  if (!destination) {
    notFound();
  }

  // Find related packages and activities
  const relatedPackages = tourPackages.filter((pkg) =>
    pkg.highlights.some((h) =>
      h.toLowerCase().includes(destination.name.toLowerCase()),
    ),
  );

  const relatedActivities = activities.filter(
    (activity) =>
      destination.activities.includes(activity.name.split(" ")[0]) ||
      destination.activities.includes(activity.category),
  );

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative h-[500px]">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <div className="inline-block px-4 py-2 bg-[#004b9d] rounded-full text-white text-sm font-medium mb-4">
            {destination.category}
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4 text-shadow">
            {destination.name}
          </h1>
          <div className="flex items-center text-white text-lg">
            <svg
              className="w-5 h-5 mr-2"
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

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none mb-12">
                <h2 className="font-display text-3xl font-bold mb-4">
                  Overview
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {destination.description}
                </p>
              </div>

              {/* Top Attractions */}
              <div className="mb-12">
                <h2 className="font-display text-3xl font-bold mb-6">
                  Top Attractions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.attractions.map((attraction, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-4 bg-[#a6aaaf]/25 rounded-xl"
                    >
                      <svg
                        className="w-6 h-6 text-[#002967] flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{attraction}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Available Activities */}
              <div>
                <h2 className="font-display text-3xl font-bold mb-6">
                  Available Activities
                </h2>
                <div className="flex flex-wrap gap-3">
                  {destination.activities.map((activity, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white border-2 border-amber-600 text-[#1a4f9d] rounded-full font-medium hover:bg-[#004b9d] hover:text-white transition-colors"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-24 space-y-6">
                {/* Quick Info */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-display text-xl font-bold mb-4">
                    Quick Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-semibold">
                        {destination.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-semibold">
                        {destination.location}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Best Time:</span>
                      <span className="font-semibold">Dec - Apr</span>
                    </div>
                  </div>
                </div>

                {/* CTA Box */}
                <div className="bg-[#004b9d] text-white rounded-2xl p-6 text-center">
                  <h3 className="font-display text-xl font-bold mb-3">
                    Plan Your Visit
                  </h3>
                  <p className="text-amber-100 mb-6 text-sm">
                    Let us create a custom itinerary for you
                  </p>
                  <Link
                    href="/contact"
                    className="block w-full bg-white text-[#1a4f9d] py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Packages */}
      {relatedPackages.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display text-3xl font-bold mb-8">
              Related Tour Packages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPackages.slice(0, 2).map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
