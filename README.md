# 🇱🇰 Ceylon Travels - Sri Lanka Tourism Website

A modern, responsive tourism website for Sri Lanka built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. Features a refined editorial design with amber accents throughout.

## ✨ Features

### Pages
- **Home Page** - Hero section, featured destinations, popular packages, categories, and why choose us
- **Destinations** - Browse all destinations with category filters
- **Destination Details** - Dynamic pages with full information, attractions, and related packages
- **Tour Packages** - Filterable package listings
- **Package Details** - Complete itinerary, inclusions, pricing, and booking options
- **Activities** - Browse activities by category
- **Hotels** - Featured accommodations with ratings and amenities
- **Categories** - Explore by interest (Historical, Wildlife, Beaches, Cultural, Adventure, Nature)
- **About Us** - Company story, mission, vision, and values
- **Contact** - Contact form, information, and FAQ

### Design Features
- Clean, editorial travel magazine aesthetic
- Amber (#f59e0b) primary color throughout
- Custom fonts: Playfair Display (headings) + Crimson Pro (body)
- Smooth animations and hover effects
- Fully responsive mobile-first design
- Sticky navigation
- Professional imagery from Unsplash

### Technical Features
- Next.js 14 App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Dynamic routes for destinations and packages
- Client-side filtering
- Reusable component architecture
- Mock data structure for easy content management

## 📁 Project Structure

```
sri-lanka-tourism/
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── activities/
│   │   │   └── page.tsx
│   │   ├── categories/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── destinations/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── hotels/
│   │   │   └── page.tsx
│   │   ├── packages/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Components.tsx (Reusable UI components)
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   └── data/
│       └── mockData.ts (All content data)
├── public/
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Extract or clone the project**
```bash
cd sri-lanka-tourism
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 🎨 Customization

### Updating Content

All content (destinations, packages, activities, hotels, categories) is stored in `src/data/mockData.ts`. Simply edit this file to update:
- Destinations and their details
- Tour packages and itineraries
- Available activities
- Hotel listings
- Category information

### Changing Colors

The primary amber color can be adjusted in `tailwind.config.js` and `src/app/globals.css`. Search for amber references and update to your preferred color.

### Adding Images

Currently using Unsplash images. To use your own:
1. Add images to the `public/images/` folder
2. Update image paths in `mockData.ts`
3. Replace Unsplash URLs with `/images/your-image.jpg`

### Customizing Fonts

Fonts are imported in `src/app/globals.css`. Current fonts:
- **Display**: Playfair Display (headings)
- **Body**: Crimson Pro (paragraphs)

To change fonts:
1. Update Google Fonts import in `globals.css`
2. Update `tailwind.config.js` font family settings

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔧 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Playfair Display, Crimson Pro)
- **Images**: Unsplash (placeholder images)

## 📄 Key Components

### Reusable Components (`Components.tsx`)
- `HeroSection` - Large hero banners with images
- `SectionTitle` - Consistent section headings
- `DestinationCard` - Destination preview cards
- `PackageCard` - Tour package cards
- `ActivityCard` - Activity listing cards
- `CategoryCard` - Category cards with icons
- `CTASection` - Call-to-action sections

### Layout Components
- `Navbar` - Sticky navigation with mobile menu
- `Footer` - Site-wide footer with links and contact info

## 🌟 Features to Add (Optional Enhancements)

- Image gallery/lightbox for destinations
- Booking system integration
- User reviews and ratings
- Blog/travel tips section
- Multi-language support
- Search functionality
- Newsletter signup
- Social media integration
- Live chat support
- Payment gateway
- Admin panel for content management

## 📞 Support

For questions or issues with this project:
- Check the code comments for guidance
- Review Next.js documentation: https://nextjs.org/docs
- Review Tailwind CSS documentation: https://tailwindcss.com/docs

## 📝 License

This is a demonstration project. Adapt and use as needed for your purposes.

## 🙏 Credits

- Images: [Unsplash](https://unsplash.com)
- Icons: Heroicons (built into Tailwind)
- Fonts: Google Fonts

---

**Built with ❤️ for Sri Lanka Tourism**

## Auth + Prisma (MySQL) Setup

1. Copy env template and update values:
```bash
cp .env.example .env
```

2. Run migration and generate Prisma client:
```bash
npm run prisma:migrate
npm run prisma:generate
```

3. Start app:
```bash
npm run dev
```

### New API Endpoints

- `POST /api/register`
- `GET /api/guides/profile`
- `POST /api/guides/profile`
- `POST /api/guides/activities`
- `POST /api/guides/experiences`
- `POST /api/guides/ratings`
- `GET|POST /api/auth/[...nextauth]`

## Guide Packages + Payments + City Search

### Package Management for Guides
- `GET /api/guides/packages` (guide only)
- `POST /api/guides/packages` (guide only)
  - Accepts itinerary days and pricing
  - Automatically adds website fee: **10%**
  - Stores: `basePrice`, `websiteFeeAmount`, `totalPrice`

Guide UI page:
- `/guide/packages` (create package, itinerary, Sri Lanka city autocomplete)

### Public Package Browse
- `GET /api/packages?city=Kandy`
- `/packages` page now uses DB packages and shows price breakdown

### Stripe Checkout
- `POST /api/payments/checkout`
- `POST /api/payments/webhook`

Stripe webhook updates booking status to `PAID` when checkout completes.

### Required Environment Variables
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `GEOAPIFY_API_KEY`

### Stripe local webhook example
```bash
stripe listen --forward-to localhost:3000/api/payments/webhook
```
