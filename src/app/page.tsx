import Link from "next/link";
import {
  HeroSection,
  SectionTitle,
  DestinationCard,
  PackageCard,
  CategoryCard,
  CTASection,
} from "@/components/Components";
import { destinations, tourPackages, categories } from "@/data/mockData";

export default function Home() {
  return (
    <div>
      <HeroSection
        title="Explore the Pearl of the Indian Ocean"
        subtitle="Discover ancient wonders, pristine beaches, and unforgettable adventures"
        image="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&auto=format&fit=crop"
        showSearch={true}
      />

      <section className="px-4 -mt-14 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white shadow-xl border border-slate-100 p-5">
            <p className="text-sm text-slate-500">Trusted Local Network</p>
            <p className="text-2xl font-display font-bold text-[#0d376f] mt-1">120+ Guides</p>
          </div>
          <div className="rounded-2xl bg-white shadow-xl border border-slate-100 p-5">
            <p className="text-sm text-slate-500">Transparent pricing</p>
            <p className="text-2xl font-display font-bold text-[#0d376f] mt-1">10% Platform Fee</p>
          </div>
          <div className="rounded-2xl bg-white shadow-xl border border-slate-100 p-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">For tour guides</p>
              <p className="text-xl font-display font-bold text-[#0d376f] mt-1">Build packages fast</p>
            </div>
            <Link href="/guide/packages" className="rounded-full bg-[#004b9d] text-white px-4 py-2 text-sm font-semibold">
              Start
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-[#f8fbff] to-[#f6f6f6]">
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
              className="inline-block bg-[#004b9d] text-white px-8 py-3 rounded-full hover:bg-sky-700 transition-all font-medium shadow-lg"
            >
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

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
          <div className="text-center mt-12 flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/packages"
              className="inline-block bg-[#004b9d] text-white px-8 py-3 rounded-full hover:bg-sky-700 transition-all font-medium shadow-lg"
            >
              Explore All Packages
            </Link>
            <Link
              href="/guide/packages"
              className="inline-block bg-white border border-[#004b9d] text-[#004b9d] px-8 py-3 rounded-full transition-all font-medium"
            >
              Create a Package
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#f7fbff]">
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

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Why Choose Ceylon Travels"
            subtitle="Experience the difference of traveling with local experts"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center rounded-2xl border border-slate-200 p-8">
              <h3 className="font-display text-xl font-bold mb-3">15+ Years Experience</h3>
              <p className="text-gray-600">
                Trusted by thousands of travelers since 2010, creating unforgettable Sri Lankan journeys.
              </p>
            </div>

            <div className="text-center rounded-2xl border border-slate-200 p-8">
              <h3 className="font-display text-xl font-bold mb-3">Local Expertise</h3>
              <p className="text-gray-600">
                Our team of local guides knows every hidden gem and authentic experience.
              </p>
            </div>

            <div className="text-center rounded-2xl border border-slate-200 p-8">
              <h3 className="font-display text-xl font-bold mb-3">Secure Stripe Payments</h3>
              <p className="text-gray-600">
                Clear package pricing with platform fee transparency and secure checkout.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
