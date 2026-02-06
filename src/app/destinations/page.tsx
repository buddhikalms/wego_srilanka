import { HeroSection, SectionTitle, DestinationCard } from '@/components/Components';
import { destinations } from '@/data/mockData';

export const metadata = {
  title: 'Destinations - Ceylon Travels',
  description: 'Explore the most beautiful destinations in Sri Lanka',
};

export default function DestinationsPage() {
  return (
    <div>
      <HeroSection 
        title="Discover Sri Lanka"
        subtitle="From ancient fortresses to pristine beaches"
        image="https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=1600&auto=format&fit=crop"
      />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="All Destinations"
            subtitle="Explore the diverse landscapes and cultural treasures of Sri Lanka"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
