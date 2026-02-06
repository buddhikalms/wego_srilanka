import { HeroSection } from '@/components/Components';
import Link from 'next/link';

export const metadata = {
  title: 'About Us - Ceylon Travels',
  description: 'Learn about Ceylon Travels and our passion for sharing Sri Lanka with the world',
};

export default function AboutPage() {
  return (
    <div>
      <HeroSection 
        title="About Ceylon Travels"
        subtitle="Passionate about Sri Lanka since 2010"
        image="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&auto=format&fit=crop"
      />

      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl font-bold text-center mb-6">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              Ceylon Travels was founded in 2010 with a simple mission: to share the incredible beauty and rich culture of Sri Lanka with travelers from around the world. What started as a small family business has grown into one of the island's most trusted travel companies.
            </p>
            <p>
              We are a team of passionate locals who know every corner of our beautiful island. From the misty mountains of the Hill Country to the pristine beaches of the south coast, from ancient kingdoms to modern cities – we've explored it all, and we're excited to share these experiences with you.
            </p>
            <p>
              Our expertise comes from years of living, working, and traveling throughout Sri Lanka. We don't just plan trips; we craft experiences that connect you with the heart and soul of our nation. Every itinerary is designed with care, every hotel is personally inspected, and every guide is chosen for their knowledge and passion.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To create authentic, sustainable, and unforgettable travel experiences that showcase the true essence of Sri Lanka while supporting local communities and preserving our natural heritage for future generations.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be recognized as Sri Lanka's leading travel company, known for exceptional service, authentic experiences, and our commitment to responsible tourism that benefits both travelers and local communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl font-bold text-center mb-12">Why Travel With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Local Expertise</h3>
              <p className="text-gray-600">
                Our team of local guides and travel experts know Sri Lanka intimately and share their knowledge with passion.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-3">24/7 Support</h3>
              <p className="text-gray-600">
                We're always available to assist you before, during, and after your journey through Sri Lanka.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Best Value</h3>
              <p className="text-gray-600">
                Competitive pricing without compromising on quality. We ensure you get the best experience for your investment.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Responsible Tourism</h3>
              <p className="text-gray-600">
                We support local communities and promote sustainable practices that protect Sri Lanka's natural beauty.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/>
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Custom Itineraries</h3>
              <p className="text-gray-600">
                Every traveler is unique. We create personalized itineraries tailored to your interests and preferences.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Safety First</h3>
              <p className="text-gray-600">
                Your safety and comfort are our top priorities. All our partners are carefully vetted and insured.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-amber-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="font-display text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-amber-100 mb-8">
            Let us help you create memories that will last a lifetime
          </p>
          <Link 
            href="/contact"
            className="inline-block bg-white text-amber-700 px-8 py-4 rounded-full hover:bg-gray-100 transition-all font-semibold text-lg shadow-xl"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
}
