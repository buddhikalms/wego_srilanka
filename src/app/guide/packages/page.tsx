"use client";

import { FormEvent, useMemo, useState } from "react";

type CityItem = {
  city: string;
  state: string;
  label: string;
};

type DraftDay = {
  dayNumber: number;
  city: string;
  title: string;
  description: string;
};

const initialDay: DraftDay = {
  dayNumber: 1,
  city: "",
  title: "",
  description: "",
};

export default function GuidePackagesPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [meetingCity, setMeetingCity] = useState("");
  const [basePrice, setBasePrice] = useState(120);
  const [durationDays, setDurationDays] = useState(3);
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");
  const [days, setDays] = useState<DraftDay[]>([initialDay]);

  const [meetingSuggestions, setMeetingSuggestions] = useState<CityItem[]>([]);
  const [daySuggestions, setDaySuggestions] = useState<Record<number, CityItem[]>>({});

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const feeAmount = useMemo(() => Number(((basePrice * 10) / 100).toFixed(2)), [basePrice]);
  const totalPrice = useMemo(() => Number((basePrice + feeAmount).toFixed(2)), [basePrice, feeAmount]);

  async function fetchCities(query: string): Promise<CityItem[]> {
    if (query.trim().length < 2) {
      return [];
    }

    const response = await fetch(`/api/cities/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as { cities: CityItem[] };
    return data.cities || [];
  }

  async function onMeetingCityChange(value: string) {
    setMeetingCity(value);
    setMeetingSuggestions(await fetchCities(value));
  }

  async function onDayCityChange(index: number, value: string) {
    setDays((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], city: value };
      return next;
    });

    const suggestions = await fetchCities(value);
    setDaySuggestions((prev) => ({ ...prev, [index]: suggestions }));
  }

  function addDay() {
    setDays((prev) => [
      ...prev,
      {
        dayNumber: prev.length + 1,
        city: "",
        title: "",
        description: "",
      },
    ]);
    setDurationDays((d) => d + 1);
  }

  function removeDay(index: number) {
    setDays((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((item, i) => ({ ...item, dayNumber: i + 1 })),
    );
    setDurationDays((d) => Math.max(1, d - 1));
  }

  function updateDay(index: number, key: keyof DraftDay, value: string | number) {
    setDays((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/guides/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          meetingCity,
          basePrice: Number(basePrice),
          durationDays: Number(durationDays),
          status,
          itineraries: days.map((d, i) => ({
            dayNumber: i + 1,
            city: d.city,
            title: d.title,
            description: d.description || undefined,
          })),
        }),
      });

      const json = (await response.json()) as { error?: string; package?: { slug: string } };
      if (!response.ok) {
        setMessage(json.error || "Failed to create package");
        return;
      }

      setMessage(`Package created successfully: ${json.package?.slug || "saved"}`);
      setTitle("");
      setDescription("");
      setMeetingCity("");
      setBasePrice(120);
      setDurationDays(1);
      setDays([initialDay]);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while creating package");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f8ff] to-[#fff7eb] py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-slate-100">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-[#0f2b55]">Create Tour Package</h1>
        <p className="text-slate-600 mt-2">Add itinerary, pricing, and publish packages with automatic 10% website fee.</p>

        <form onSubmit={handleSubmit} className="space-y-8 mt-8">
          <div className="grid md:grid-cols-2 gap-5">
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-semibold text-slate-700">Package Title</span>
              <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full rounded-xl border border-slate-300 px-4 py-3" />
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-semibold text-slate-700">Description</span>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} className="w-full rounded-xl border border-slate-300 px-4 py-3" />
            </label>

            <label className="space-y-2 relative">
              <span className="text-sm font-semibold text-slate-700">Meeting City (Sri Lanka)</span>
              <input value={meetingCity} onChange={(e) => onMeetingCityChange(e.target.value)} required className="w-full rounded-xl border border-slate-300 px-4 py-3" />
              {meetingSuggestions.length > 0 && (
                <div className="absolute z-20 mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-lg max-h-48 overflow-auto">
                  {meetingSuggestions.map((item, idx) => (
                    <button key={`${item.label}-${idx}`} type="button" className="block w-full text-left px-3 py-2 hover:bg-slate-100" onClick={() => { setMeetingCity(item.city || item.label); setMeetingSuggestions([]); }}>
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Status</span>
              <select value={status} onChange={(e) => setStatus(e.target.value as "DRAFT" | "PUBLISHED")} className="w-full rounded-xl border border-slate-300 px-4 py-3">
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Base Price (USD)</span>
              <input type="number" min="1" step="0.01" value={basePrice} onChange={(e) => setBasePrice(Number(e.target.value))} required className="w-full rounded-xl border border-slate-300 px-4 py-3" />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Duration (days)</span>
              <input type="number" min="1" max="60" value={durationDays} onChange={(e) => setDurationDays(Number(e.target.value))} required className="w-full rounded-xl border border-slate-300 px-4 py-3" />
            </label>
          </div>

          <div className="rounded-2xl border border-[#d5e3ff] bg-[#f7fbff] p-5">
            <h2 className="font-semibold text-[#163d77]">Price Breakdown</h2>
            <div className="mt-3 text-sm text-slate-700 grid sm:grid-cols-3 gap-2">
              <p>Base Price: <strong>${basePrice.toFixed(2)}</strong></p>
              <p>Website Fee (10%): <strong>${feeAmount.toFixed(2)}</strong></p>
              <p>Total Customer Price: <strong>${totalPrice.toFixed(2)}</strong></p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-bold text-[#0f2b55]">Itinerary</h2>
              <button type="button" onClick={addDay} className="rounded-full bg-[#114488] px-5 py-2 text-white text-sm font-medium">Add Day</button>
            </div>

            {days.map((day, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-700">Day {index + 1}</p>
                  {days.length > 1 && (
                    <button type="button" onClick={() => removeDay(index)} className="text-sm text-red-600">Remove</button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <label className="space-y-1 relative">
                    <span className="text-xs font-semibold text-slate-600">City</span>
                    <input value={day.city} onChange={(e) => onDayCityChange(index, e.target.value)} required className="w-full rounded-xl border border-slate-300 px-3 py-2" />
                    {(daySuggestions[index] || []).length > 0 && (
                      <div className="absolute z-10 mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-lg max-h-48 overflow-auto">
                        {(daySuggestions[index] || []).map((item, idx) => (
                          <button key={`${item.label}-${idx}`} type="button" className="block w-full text-left px-3 py-2 hover:bg-slate-100" onClick={() => { updateDay(index, "city", item.city || item.label); setDaySuggestions((prev) => ({ ...prev, [index]: [] })); }}>
                            {item.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </label>

                  <label className="space-y-1">
                    <span className="text-xs font-semibold text-slate-600">Title</span>
                    <input value={day.title} onChange={(e) => updateDay(index, "title", e.target.value)} required className="w-full rounded-xl border border-slate-300 px-3 py-2" />
                  </label>

                  <label className="space-y-1 md:col-span-2">
                    <span className="text-xs font-semibold text-slate-600">Description</span>
                    <textarea value={day.description} onChange={(e) => updateDay(index, "description", e.target.value)} rows={2} className="w-full rounded-xl border border-slate-300 px-3 py-2" />
                  </label>
                </div>
              </div>
            ))}
          </div>

          <button type="submit" disabled={loading} className="w-full rounded-2xl bg-[#0d3a79] py-3 text-white font-semibold hover:bg-[#0a2e61] disabled:opacity-60">
            {loading ? "Saving..." : "Save Package"}
          </button>

          {message && <p className="text-sm font-medium text-slate-700">{message}</p>}
        </form>
      </div>
    </div>
  );
}
