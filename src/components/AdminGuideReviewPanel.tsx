"use client";

import { useEffect, useState } from "react";

type GuideReview = {
  id: string;
  adminReviewStatus: "UNDER_REVIEW" | "REJECTED" | "APPROVED" | "PROFILE_INCOMPLETE";
  adminReviewNotes: string | null;
  reviewSubmittedAt: string | null;
  updatedAt: string;
  location: string | null;
  yearsOfExperience: number;
  user: {
    fullName: string;
    email: string;
  };
};

function statusClass(status: GuideReview["adminReviewStatus"]) {
  if (status === "UNDER_REVIEW") {
    return "border-amber-200 bg-amber-50 text-amber-800";
  }
  if (status === "REJECTED") {
    return "border-red-200 bg-red-50 text-red-800";
  }
  if (status === "APPROVED") {
    return "border-green-200 bg-green-50 text-green-800";
  }
  return "border-slate-200 bg-slate-50 text-slate-700";
}

export default function AdminGuideReviewPanel() {
  const [guides, setGuides] = useState<GuideReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [notesByGuideId, setNotesByGuideId] = useState<Record<string, string>>({});
  const [submittingGuideId, setSubmittingGuideId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/guides/reviews", { cache: "no-store" });
    const data = (await res.json()) as { guides?: GuideReview[]; error?: string };
    if (!res.ok) {
      setMessage(data.error || "Failed to load guide reviews.");
      setLoading(false);
      return;
    }

    const nextGuides = data.guides || [];
    setGuides(nextGuides);
    const initialNotes: Record<string, string> = {};
    for (const guide of nextGuides) {
      initialNotes[guide.id] = guide.adminReviewNotes || "";
    }
    setNotesByGuideId(initialNotes);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function submitReview(guideProfileId: string, status: "APPROVED" | "REJECTED") {
    setMessage("");
    setSubmittingGuideId(guideProfileId);

    const notes = notesByGuideId[guideProfileId]?.trim();
    const res = await fetch("/api/admin/guides/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guideProfileId,
        status,
        notes: notes || undefined,
      }),
    });

    const data = (await res.json()) as { error?: string };
    setSubmittingGuideId(null);
    if (!res.ok) {
      setMessage(data.error || "Failed to update review.");
      return;
    }

    setMessage(`Guide ${status === "APPROVED" ? "approved" : "rejected"} successfully.`);
    await load();
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-display font-bold text-slate-900">Guide Review Queue</h2>
          <p className="mt-1 text-sm text-slate-600">
            Review guide onboarding requests and decide approval status.
          </p>
        </div>
        <button
          type="button"
          onClick={load}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Refresh
        </button>
      </div>

      {message ? <p className="mt-3 text-sm text-slate-700">{message}</p> : null}

      {loading ? (
        <p className="mt-4 text-sm text-slate-600">Loading reviews...</p>
      ) : guides.length === 0 ? (
        <p className="mt-4 text-sm text-slate-600">No pending guide review requests.</p>
      ) : (
        <div className="mt-5 space-y-4">
          {guides.map((guide) => (
            <article key={guide.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-slate-900">{guide.user.fullName}</p>
                  <p className="text-sm text-slate-600">{guide.user.email}</p>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(
                    guide.adminReviewStatus,
                  )}`}
                >
                  {guide.adminReviewStatus}
                </span>
              </div>

              <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
                <p>Location: {guide.location || "Not set"}</p>
                <p>Experience: {guide.yearsOfExperience} years</p>
                <p>
                  Submitted:{" "}
                  {guide.reviewSubmittedAt
                    ? new Date(guide.reviewSubmittedAt).toLocaleDateString()
                    : "Not submitted"}
                </p>
              </div>

              <label className="mt-3 block">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Admin Notes
                </span>
                <textarea
                  value={notesByGuideId[guide.id] || ""}
                  onChange={(event) =>
                    setNotesByGuideId((prev) => ({
                      ...prev,
                      [guide.id]: event.target.value,
                    }))
                  }
                  rows={3}
                  maxLength={2000}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
                  placeholder="Add notes for approval/rejection."
                />
              </label>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => submitReview(guide.id, "APPROVED")}
                  disabled={submittingGuideId === guide.id}
                  className="rounded-full bg-green-700 px-4 py-2 text-xs font-semibold text-white hover:bg-green-800 disabled:opacity-60"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => submitReview(guide.id, "REJECTED")}
                  disabled={submittingGuideId === guide.id}
                  className="rounded-full bg-red-700 px-4 py-2 text-xs font-semibold text-white hover:bg-red-800 disabled:opacity-60"
                >
                  Reject
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
