"use client";

import { useState } from "react";

export default function GuideVerificationCard() {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  async function resend() {
    setSending(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/verify-email/request", {
        method: "POST",
      });
      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        setMessage(data.error || "Unable to send verification email.");
        return;
      }

      setMessage(data.message || "Verification email sent.");
    } catch {
      setMessage("Unable to send verification email.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
      <h2 className="text-xl font-display font-semibold text-amber-900">Verify Your Guide Email</h2>
      <p className="mt-2 text-sm text-amber-800">
        Check your inbox and click the verification link to unlock packages, analytics, and guide tools.
      </p>
      <button
        type="button"
        onClick={resend}
        disabled={sending}
        className="mt-4 rounded-full bg-amber-700 px-5 py-2 text-sm font-semibold text-white hover:bg-amber-800 disabled:opacity-60"
      >
        {sending ? "Sending..." : "Resend Verification Email"}
      </button>
      {message ? <p className="mt-3 text-sm text-amber-900">{message}</p> : null}
    </div>
  );
}
