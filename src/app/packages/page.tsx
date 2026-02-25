"use client";

import { useEffect, useMemo, useState } from "react";
import { HeroSection, SectionTitle } from "@/components/Components";

type ApiPackage = {
  id: string;
  slug: string;
  title: string;
  description: string;
  basePrice: string;
  websiteFeePercent: string;
  websiteFeeAmount: string;
  totalPrice: string;
  durationDays: number;
  meetingCity: string;
  currency: string;
  itineraries: Array<{ dayNumber: number; city: string; title: string }>;
  guideProfile?: { user?: { fullName?: string } };
};

type CitySuggestion = { label: string; city: string };

export default function PackagesPage() {
  const [packages, setPackages] = useState<ApiPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [citySuggestions, setCitySuggestions] = useState<CitySuggestion[]>([]);
  const [error, setError] = useState("");

  async function loadPackages(cityFilter?: string) {
    setLoading(true);
    setError("");

    try {
      const query = cityFilter ? `?city=${encodeURIComponent(cityFilter)}` : "";
      const response = await fetch(`/api/packages${query}`, { cache: "no-store" });
      const json = (await response.json()) as { packages?: ApiPackage[]; error?: string };

      if (!response.ok) {
        setError(json.error || "Failed to load packages");
        return;
      }

      setPackages(json.packages || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load packages");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPackages();
  }, []);

  async function handleCityInput(value: string) {
    setCity(value);
    if (value.trim().length < 2) {
      setCitySuggestions([]);
      return;
    }

    const response = await fetch(`/api/cities/search?query=${encodeURIComponent(value)}`);
    if (!response.ok) {
      setCitySuggestions([]);
      return;
    }

    const data = (await response.json()) as { cities: Array<{ city: string; label: string }> };
    setCitySuggestions((data.cities || []).map((item) => ({ label: item.label, city: item.city })));
  }

  async function bookNow(packageId: string, travelersCount = 1) {
    const response = await fetch("/api/payments/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ packageId, travelersCount }),
    });

    const data = (await response.json()) as { checkoutUrl?: string; error?: string };

    if (!response.ok || !data.checkoutUrl) {
      alert(data.error || "Unable to start checkout. Please login and try again.");
      return;
    }

    window.location.href = data.checkoutUrl;
  }

  const hasPackages = useMemo(() => packages.length > 0, [packages]);

  return (
    <div>
      <HeroSection
        title="Tour Packages"
        subtitle="Book verified local guide packages with transparent pricing and secure Stripe checkout"
        image="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&auto=format&fit=crop"
      />

      <section className="py-20 px-4 bg-gradient-to-b from-white to-[#f5f9ff]">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Explore Guide Packages"
            subtitle="Base price + 10% website fee shown clearly before payment"
          />

          <div className="mb-10 flex flex-col md:flex-row gap-3 items-start md:items-center">
            <div className="relative w-full md:w-[420px]">
              <input
                value={city}
                onChange={(e) => handleCityInput(e.target.value)}
                placeholder="Search Sri Lanka city..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
              {citySuggestions.length > 0 && (
                <div className="absolute z-20 mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-lg max-h-52 overflow-auto">
                  {citySuggestions.map((item, idx) => (
                    <button
                      key={`${item.label}-${idx}`}
                      type="button"
                      className="w-full text-left px-3 py-2 hover:bg-slate-100"
                      onClick={() => {
                        setCity(item.city || item.label);
                        setCitySuggestions([]);
                        loadPackages(item.city || item.label);
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => loadPackages(city)}
              className="rounded-full bg-[#004b9d] text-white px-6 py-3 font-medium"
            >
              Search
            </button>
            <button
              onClick={() => {
                setCity("");
                setCitySuggestions([]);
                loadPackages();
              }}
              className="rounded-full border border-slate-300 px-6 py-3 font-medium text-slate-700"
            >
              Reset
            </button>
          </div>

          {loading && <p className="text-slate-600">Loading packages...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && !hasPackages && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
              No published packages found.
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {packages.map((pkg) => (
              <article key={pkg.id} className="rounded-3xl bg-white shadow-lg border border-slate-100 p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-2xl font-bold text-[#0e2e5f]">{pkg.title}</h3>
                  <span className="text-xs px-3 py-1 rounded-full bg-[#e7f0ff] text-[#103d7a]">{pkg.durationDays} days</span>
                </div>

                <p className="text-slate-600 mt-3 line-clamp-3">{pkg.description}</p>

                <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
                  <p>Guide: <strong>{pkg.guideProfile?.user?.fullName || "Local Guide"}</strong></p>
                  <p>Starts at: <strong>{pkg.meetingCity}</strong></p>
                </div>

                <div className="mt-4 rounded-2xl border border-[#d8e7ff] bg-[#f6faff] p-4 text-sm">
                  <p>Base Price: <strong>${Number(pkg.basePrice).toFixed(2)}</strong></p>
                  <p>Website Fee ({Number(pkg.websiteFeePercent).toFixed(0)}%): <strong>${Number(pkg.websiteFeeAmount).toFixed(2)}</strong></p>
                  <p className="text-base text-[#0d3876] mt-1">Total: <strong>${Number(pkg.totalPrice).toFixed(2)}</strong> / person</p>
                </div>

                <div className="mt-5">
                  <h4 className="font-semibold text-slate-800">Itinerary</h4>
                  <ul className="mt-2 space-y-2">
                    {pkg.itineraries.slice(0, 4).map((day) => (
                      <li key={day.dayNumber} className="text-sm text-slate-700">
                        Day {day.dayNumber} - {day.city}: {day.title}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => bookNow(pkg.id)}
                  className="mt-6 w-full rounded-2xl bg-[#0f3f84] text-white py-3 font-semibold hover:bg-[#0a2f62]"
                >
                  Pay with Stripe
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
