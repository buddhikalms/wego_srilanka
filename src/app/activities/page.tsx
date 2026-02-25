"use client";

import { useState } from "react";
import {
  HeroSection,
  SectionTitle,
  ActivityCard,
} from "@/components/Components";
import { activities } from "@/data/mockData";

export default function ActivitiesPage() {
  const [filter, setFilter] = useState("all");

  const categories = [
    "all",
    ...new Set(activities.map((activity) => activity.category)),
  ];

  const filteredActivities =
    filter === "all"
      ? activities
      : activities.filter((activity) => activity.category === filter);

  return (
    <div>
      <HeroSection
        title="Activities & Experiences"
        subtitle="Create unforgettable memories in Sri Lanka"
        image="https://images.unsplash.com/photo-1502933691298-84fc14542831?w=1600&auto=format&fit=crop"
      />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Discover Activities"
            subtitle="From adrenaline-pumping adventures to cultural immersions"
          />

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === category
                    ? "bg-[#004b9d] text-white shadow-lg"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-600"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No activities found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
