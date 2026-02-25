"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type GuideProfileResponse = {
  profile: {
    bio?: string | null;
    phone?: string | null;
    location?: string | null;
    yearsOfExperience: number;
    hourlyRate?: string | number | null;
    specialties?: string[] | null;
    languages?: string[] | null;
    adminReviewStatus?: "PROFILE_INCOMPLETE" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
    adminReviewNotes?: string | null;
  } | null;
};

export default function GuideSettingsPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [languages, setLanguages] = useState("");
  const [specialties, setSpecialties] = useState("");
  const [adminReviewStatus, setAdminReviewStatus] = useState<"PROFILE_INCOMPLETE" | "UNDER_REVIEW" | "APPROVED" | "REJECTED">("PROFILE_INCOMPLETE");
  const [adminReviewNotes, setAdminReviewNotes] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch("/api/guides/profile", { cache: "no-store" });
        const data = (await response.json()) as GuideProfileResponse;

        if (response.ok && data.profile) {
          setBio(data.profile.bio || "");
          setPhone(data.profile.phone || "");
          setLocation(data.profile.location || "");
          setYearsOfExperience(data.profile.yearsOfExperience || 0);
          setHourlyRate(Number(data.profile.hourlyRate || 0));
          setLanguages((data.profile.languages || []).join(", "));
          setSpecialties((data.profile.specialties || []).join(", "));
          setAdminReviewStatus(data.profile.adminReviewStatus || "PROFILE_INCOMPLETE");
          setAdminReviewNotes(data.profile.adminReviewNotes || "");
        }
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const payload = {
      bio,
      phone,
      location,
      yearsOfExperience,
      hourlyRate,
      languages: languages
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      specialties: specialties
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    const response = await fetch("/api/guides/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as {
      error?: string;
      profile?: {
        adminReviewStatus?: "PROFILE_INCOMPLETE" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
        adminReviewNotes?: string | null;
      };
    };
    setSaving(false);

    if (!response.ok) {
      setMessage(data.error || "Failed to save settings");
      return;
    }

    if (data.profile?.adminReviewStatus) {
      setAdminReviewStatus(data.profile.adminReviewStatus);
      setAdminReviewNotes(data.profile.adminReviewNotes || "");
      if (data.profile.adminReviewStatus === "UNDER_REVIEW") {
        setMessage("Profile submitted. Your account is now under admin review.");
        return;
      }
    }
    setMessage("Settings updated successfully.");
  }

  if (loading) {
    return <div className="min-h-screen px-4 py-10">Loading settings...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f5f9ff] py-10 px-4">
      <div className="max-w-3xl mx-auto rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-3xl font-display font-bold text-[#0f376f]">Guide Settings</h1>
        <p className="text-slate-600 mt-1">Update your public guide profile and preferences.</p>
        {searchParams.get("onboarding") === "profile" ? (
          <p className="mt-3 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-800">
            Complete all profile fields below to unlock full dashboard access.
          </p>
        ) : null}
        {adminReviewStatus === "UNDER_REVIEW" ? (
          <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Your profile is under admin review.
          </p>
        ) : null}
        {adminReviewStatus === "APPROVED" ? (
          <p className="mt-3 rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
            Your guide profile is approved by admin.
          </p>
        ) : null}
        {adminReviewStatus === "REJECTED" ? (
          <p className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            Admin requested profile updates. {adminReviewNotes ? `Notes: ${adminReviewNotes}` : ""}
          </p>
        ) : null}

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Bio</span>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              maxLength={2000}
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3"
            />
          </label>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Phone</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Location</span>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Years of Experience</span>
              <input
                type="number"
                min={0}
                max={80}
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Hourly Rate (USD)</span>
              <input
                type="number"
                min={0}
                step="0.01"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Languages (comma separated)</span>
            <input
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Specialties (comma separated)</span>
            <input
              value={specialties}
              onChange={(e) => setSpecialties(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3"
            />
          </label>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-[#0d3f83] text-white py-3 font-semibold hover:bg-[#0a3168] disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>

          {message ? <p className="text-sm text-slate-700">{message}</p> : null}
        </form>
      </div>
    </div>
  );
}
