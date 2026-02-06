export const destinations = [
  {
    id: 'sigiriya',
    name: 'Sigiriya',
    slug: 'sigiriya',
    category: 'Historical',
    shortDescription: 'Ancient rock fortress rising 200m above jungle canopy',
    description: 'Sigiriya, also known as Lion Rock, is an ancient rock fortress and palace ruin surrounded by the remains of an extensive network of gardens, reservoirs, and other structures. This archaeological site is a UNESCO World Heritage Site and one of the best preserved examples of ancient urban planning.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop',
    attractions: [
      'Ancient frescoes of celestial maidens',
      'Mirror Wall with ancient graffiti',
      'Water gardens and fountains',
      'Summit palace ruins with panoramic views'
    ],
    activities: ['Hiking', 'Photography', 'Cultural Tours'],
    location: 'Central Province'
  },
  {
    id: 'ella',
    name: 'Ella',
    slug: 'ella',
    category: 'Nature',
    shortDescription: 'Misty mountain town with tea plantations and waterfalls',
    description: 'Nestled in the hill country, Ella offers breathtaking views, lush tea plantations, and cool mountain air. This charming town has become a favorite among travelers seeking natural beauty and adventure.',
    image: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=1200&auto=format&fit=crop',
    attractions: [
      'Nine Arch Bridge',
      'Little Adam\'s Peak',
      'Ella Rock hike',
      'Ravana Falls',
      'Tea factory tours'
    ],
    activities: ['Hiking', 'Train Rides', 'Tea Tasting'],
    location: 'Uva Province'
  },
  {
    id: 'kandy',
    name: 'Kandy',
    slug: 'kandy',
    category: 'Cultural',
    shortDescription: 'Sacred city home to the Temple of the Tooth Relic',
    description: 'The last capital of the ancient kings of Sri Lanka, Kandy is a sacred Buddhist site known for the Temple of the Tooth Relic. The city is surrounded by hills and features a beautiful lake at its center.',
    image: 'https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=1200&auto=format&fit=crop',
    attractions: [
      'Temple of the Sacred Tooth Relic',
      'Kandy Lake',
      'Royal Botanical Gardens',
      'Cultural dance performances',
      'Bahirawakanda Vihara Buddha Statue'
    ],
    activities: ['Cultural Tours', 'Temple Visits', 'Garden Tours'],
    location: 'Central Province'
  },
  {
    id: 'galle',
    name: 'Galle',
    slug: 'galle',
    category: 'Historical',
    shortDescription: 'Colonial fort city by the sea with Dutch architecture',
    description: 'Galle Fort is a UNESCO World Heritage Site, built first by the Portuguese, then extensively fortified by the Dutch. The fort is a showcase of a fortified city built by Europeans in South and Southeast Asia.',
    image: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?w=1200&auto=format&fit=crop',
    attractions: [
      'Galle Fort walls',
      'Dutch Reformed Church',
      'Lighthouse',
      'Maritime Museum',
      'Colonial architecture streets'
    ],
    activities: ['Walking Tours', 'Shopping', 'Dining', 'Photography'],
    location: 'Southern Province'
  },
  {
    id: 'yala',
    name: 'Yala National Park',
    slug: 'yala',
    category: 'Wildlife',
    shortDescription: 'Premier wildlife sanctuary with leopards and elephants',
    description: 'Yala National Park is Sri Lanka\'s most visited and second largest national park. It\'s renowned for having one of the highest leopard densities in the world, along with elephants, sloth bears, and countless bird species.',
    image: 'https://images.unsplash.com/photo-1535338454770-c935e2d036b2?w=1200&auto=format&fit=crop',
    attractions: [
      'Leopard safaris',
      'Elephant herds',
      'Sloth bears',
      'Over 200 bird species',
      'Ancient temples within the park'
    ],
    activities: ['Safari', 'Wildlife Photography', 'Bird Watching'],
    location: 'Southern Province'
  },
  {
    id: 'mirissa',
    name: 'Mirissa',
    slug: 'mirissa',
    category: 'Beaches',
    shortDescription: 'Pristine beach paradise for whale watching and surfing',
    description: 'Mirissa is a small beach town on Sri Lanka\'s south coast, known for its beautiful beaches, whale watching opportunities, and relaxed atmosphere. It\'s one of the best places in the world to see blue whales.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&auto=format&fit=crop',
    attractions: [
      'Mirissa Beach',
      'Whale and dolphin watching',
      'Coconut Tree Hill',
      'Secret Beach',
      'Parrot Rock'
    ],
    activities: ['Whale Watching', 'Surfing', 'Snorkeling', 'Beach Activities'],
    location: 'Southern Province'
  }
];

export const tourPackages = [
  {
    id: 'cultural-triangle',
    name: 'Cultural Triangle Explorer',
    slug: 'cultural-triangle',
    duration: '5 Days / 4 Nights',
    price: 899,
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&auto=format&fit=crop',
    highlights: [
      'Sigiriya Rock Fortress',
      'Dambulla Cave Temple',
      'Ancient city of Polonnaruwa',
      'Temple of the Tooth in Kandy',
      'Spice garden tour'
    ],
    included: [
      'Accommodation in 4-star hotels',
      'Daily breakfast',
      'All entrance fees',
      'Private vehicle with driver',
      'English-speaking guide'
    ],
    notIncluded: [
      'International flights',
      'Lunch and dinner',
      'Personal expenses',
      'Travel insurance'
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Sigiriya', description: 'Airport pickup and transfer to Sigiriya. Afternoon climb of Sigiriya Rock Fortress.' },
      { day: 2, title: 'Polonnaruwa Ancient City', description: 'Full day exploring the ancient ruins of Polonnaruwa, a UNESCO World Heritage Site.' },
      { day: 3, title: 'Dambulla & Kandy', description: 'Visit Dambulla Cave Temple and spice garden. Transfer to Kandy with cultural dance show.' },
      { day: 4, title: 'Kandy Exploration', description: 'Temple of the Tooth Relic, Royal Botanical Gardens, and Kandy Lake.' },
      { day: 5, title: 'Departure', description: 'Morning at leisure. Transfer to airport for departure.' }
    ]
  },
  {
    id: 'hill-country-escape',
    name: 'Hill Country Escape',
    slug: 'hill-country-escape',
    duration: '6 Days / 5 Nights',
    price: 1099,
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1586621549054-f43e40993ff4?w=1200&auto=format&fit=crop',
    highlights: [
      'Scenic train journey to Ella',
      'Tea plantation visits',
      'Horton Plains & World\'s End',
      'Nine Arch Bridge',
      'Waterfall trekking'
    ],
    included: [
      'Boutique hotel accommodation',
      'Daily breakfast and dinner',
      'Train tickets (2nd class observation)',
      'All transfers',
      'Trek guides'
    ],
    notIncluded: [
      'Flights',
      'Lunches',
      'Optional activities',
      'Tips'
    ],
    itinerary: [
      { day: 1, title: 'Colombo to Kandy', description: 'Transfer to Kandy, visit Temple of the Tooth and explore the city.' },
      { day: 2, title: 'Kandy to Nuwara Eliya', description: 'Scenic drive through tea country. Visit tea factory and stay in colonial-era town.' },
      { day: 3, title: 'Horton Plains Trek', description: 'Early morning hike to World\'s End viewpoint in Horton Plains National Park.' },
      { day: 4, title: 'Train to Ella', description: 'Famous scenic train journey. Afternoon explore Ella town and Little Adam\'s Peak.' },
      { day: 5, title: 'Ella Adventures', description: 'Hike to Nine Arch Bridge, visit Ravana Falls, and optional Ella Rock trek.' },
      { day: 6, title: 'Departure', description: 'Transfer to Colombo or southern beaches for onward journey.' }
    ]
  },
  {
    id: 'wildlife-safari',
    name: 'Wildlife Safari Adventure',
    slug: 'wildlife-safari',
    duration: '4 Days / 3 Nights',
    price: 799,
    category: 'Wildlife',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=1200&auto=format&fit=crop',
    highlights: [
      'Multiple Yala safari drives',
      'Udawalawe elephant sanctuary',
      'Bird watching',
      'Leopard tracking',
      'Photography opportunities'
    ],
    included: [
      'Safari lodge accommodation',
      'All meals',
      '4 safari drives with expert tracker',
      'Park entrance fees',
      'Binoculars and wildlife guide'
    ],
    notIncluded: [
      'Transfers from Colombo',
      'Drinks',
      'Camera/drone permits',
      'Travel insurance'
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Evening Safari', description: 'Transfer to Yala. Evening safari drive in Yala National Park.' },
      { day: 2, title: 'Full Day Yala', description: 'Dawn and afternoon safari drives. Best chances for leopard sightings.' },
      { day: 3, title: 'Udawalawe Transfer', description: 'Morning safari in Yala. Transfer to Udawalawe for evening elephant watching.' },
      { day: 4, title: 'Udawalawe & Departure', description: 'Morning safari at Udawalawe. Visit elephant orphanage. Departure transfers.' }
    ]
  },
  {
    id: 'coastal-explorer',
    name: 'Coastal Paradise',
    slug: 'coastal-explorer',
    duration: '7 Days / 6 Nights',
    price: 1299,
    category: 'Beaches',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop',
    highlights: [
      'Whale watching in Mirissa',
      'Galle Fort exploration',
      'Beach hopping',
      'Snorkeling and diving',
      'Seafood dining experiences'
    ],
    included: [
      'Beachfront hotel stays',
      'Daily breakfast',
      'Whale watching tour',
      'Snorkeling equipment',
      'All coastal transfers'
    ],
    notIncluded: [
      'International flights',
      'Lunches and dinners',
      'Diving courses',
      'Personal expenses'
    ],
    itinerary: [
      { day: 1, title: 'Arrival Negombo', description: 'Relax at beach hotel near airport.' },
      { day: 2, title: 'Negombo to Galle', description: 'Coastal drive to Galle. Afternoon Fort walking tour.' },
      { day: 3, title: 'Galle Exploration', description: 'Full day in Galle - museums, lighthouse, shopping, and cafes.' },
      { day: 4, title: 'Mirissa Transfer', description: 'Drive to Mirissa. Beach time and sunset at Coconut Tree Hill.' },
      { day: 5, title: 'Whale Watching', description: 'Early morning whale and dolphin watching tour. Afternoon beach relaxation.' },
      { day: 6, title: 'Snorkeling & Beach', description: 'Snorkeling excursion. Visit secret beaches. Beach activities.' },
      { day: 7, title: 'Departure', description: 'Morning at beach. Transfer to Colombo for departure.' }
    ]
  }
];

export const activities = [
  {
    id: 'safari',
    name: 'Wildlife Safari',
    category: 'Wildlife',
    description: 'Experience thrilling encounters with leopards, elephants, and exotic wildlife in their natural habitat.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop',
    duration: 'Half day or Full day',
    price: 'From $50'
  },
  {
    id: 'whale-watching',
    name: 'Whale Watching',
    category: 'Wildlife',
    description: 'Witness majestic blue whales and playful dolphins in the waters off Sri Lanka\'s southern coast.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop',
    duration: '3-4 hours',
    price: 'From $40'
  },
  {
    id: 'surfing',
    name: 'Surfing Lessons',
    category: 'Adventure',
    description: 'Catch waves on Sri Lanka\'s beautiful beaches with experienced instructors.',
    image: 'https://images.unsplash.com/photo-1502933691298-84fc14542831?w=800&auto=format&fit=crop',
    duration: '2 hours',
    price: 'From $30'
  },
  {
    id: 'hiking',
    name: 'Mountain Hiking',
    category: 'Adventure',
    description: 'Trek through misty mountains, tea plantations, and reach spectacular viewpoints.',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop',
    duration: '3-6 hours',
    price: 'From $25'
  },
  {
    id: 'cultural-show',
    name: 'Cultural Dance Show',
    category: 'Cultural',
    description: 'Experience traditional Kandyan dance performances featuring fire walking and drumming.',
    image: 'https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=800&auto=format&fit=crop',
    duration: '1.5 hours',
    price: 'From $15'
  },
  {
    id: 'tea-tasting',
    name: 'Tea Plantation Tour',
    category: 'Cultural',
    description: 'Visit working tea estates, learn about tea production, and taste Ceylon\'s finest brews.',
    image: 'https://images.unsplash.com/photo-1586621549054-f43e40993ff4?w=800&auto=format&fit=crop',
    duration: '2 hours',
    price: 'From $20'
  },
  {
    id: 'snorkeling',
    name: 'Snorkeling & Diving',
    category: 'Adventure',
    description: 'Explore vibrant coral reefs and shipwrecks teeming with marine life.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop',
    duration: '2-3 hours',
    price: 'From $35'
  },
  {
    id: 'ayurveda',
    name: 'Ayurveda Spa',
    category: 'Wellness',
    description: 'Rejuvenate with traditional Ayurvedic treatments and massages.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop',
    duration: '1-2 hours',
    price: 'From $40'
  }
];

export const hotels = [
  {
    id: 'cinnamon-lodge',
    name: 'Cinnamon Lodge Habarana',
    location: 'Habarana',
    category: '4-Star',
    rating: 4.5,
    description: 'Nestled within a natural habitat, this resort offers a unique blend of comfort and wilderness.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop',
    amenities: ['Pool', 'Restaurant', 'Safari Tours', 'Spa'],
    pricePerNight: 120
  },
  {
    id: 'jetwing-yala',
    name: 'Jetwing Yala',
    location: 'Yala',
    category: '4-Star',
    rating: 4.7,
    description: 'Luxury beach resort adjacent to Yala National Park, perfect for wildlife enthusiasts.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop',
    amenities: ['Beach Access', 'Pool', 'Safari Desk', 'Fine Dining'],
    pricePerNight: 150
  },
  {
    id: 'heritance-kandalama',
    name: 'Heritance Kandalama',
    location: 'Dambulla',
    category: '5-Star',
    rating: 4.8,
    description: 'Award-winning eco-hotel carved into a cliff face, designed by Geoffrey Bawa.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop',
    amenities: ['Infinity Pool', 'Spa', 'Multiple Restaurants', 'Nature Trails'],
    pricePerNight: 200
  },
  {
    id: 'grand-hotel',
    name: 'The Grand Hotel',
    location: 'Nuwara Eliya',
    category: '4-Star',
    rating: 4.3,
    description: 'Colonial-era charm in the heart of tea country with stunning mountain views.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop',
    amenities: ['Golf Course', 'Restaurant', 'Bar', 'Gardens'],
    pricePerNight: 90
  },
  {
    id: 'shangri-la-colombo',
    name: 'Shangri-La Colombo',
    location: 'Colombo',
    category: '5-Star',
    rating: 4.9,
    description: 'Luxury urban resort with panoramic ocean views and world-class dining.',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop',
    amenities: ['Rooftop Pool', 'Multiple Restaurants', 'Spa', 'Business Center'],
    pricePerNight: 250
  },
  {
    id: 'fortress-galle',
    name: 'Amangalla',
    location: 'Galle Fort',
    category: '5-Star',
    rating: 4.9,
    description: 'Historic luxury hotel within Galle Fort, offering colonial elegance and modern comfort.',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop',
    amenities: ['Pool', 'Spa', 'Fine Dining', 'Library'],
    pricePerNight: 400
  }
];

export const categories = [
  {
    id: 'historical',
    name: 'Historical',
    description: 'Ancient cities, temples, and archaeological wonders',
    icon: '🏛️',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop'
  },
  {
    id: 'wildlife',
    name: 'Wildlife',
    description: 'Safari adventures and animal encounters',
    icon: '🐘',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&auto=format&fit=crop'
  },
  {
    id: 'beaches',
    name: 'Beaches',
    description: 'Pristine coastlines and tropical paradises',
    icon: '🏖️',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop'
  },
  {
    id: 'cultural',
    name: 'Cultural',
    description: 'Traditions, festivals, and local experiences',
    icon: '🎭',
    image: 'https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=600&auto=format&fit=crop'
  },
  {
    id: 'adventure',
    name: 'Adventure',
    description: 'Thrilling activities and outdoor pursuits',
    icon: '🏔️',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&auto=format&fit=crop'
  },
  {
    id: 'nature',
    name: 'Nature',
    description: 'Lush landscapes, waterfalls, and scenic beauty',
    icon: '🌿',
    image: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=600&auto=format&fit=crop'
  }
];
