"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function GuideRegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleEnabled, setGoogleEnabled] = useState(false);
  const [loadingProviders, setLoadingProviders] = useState(true);

  useEffect(() => {
    async function loadProviders() {
      const providers = await getProviders();
      setGoogleEnabled(Boolean(providers?.google));
      setLoadingProviders(false);
    }

    loadProviders();
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
          role: "GUIDE",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || "Registration failed");
        setLoading(false);
        return;
      }

      router.push("/login?registered=guide&verify=sent");
    } catch (e) {
      console.error(e);
      setError("Registration failed");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-[#f5f9ff] to-[#fff7ea] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-3xl bg-white border border-slate-100 shadow-xl p-8">
        <h1 className="text-3xl font-display font-bold text-[#103a76]">Guide Registration</h1>
        <p className="text-slate-600 mt-2">Create your guide account. We will send a verification email before dashboard setup.</p>
        {searchParams.get("required") === "guide" ? (
          <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Guide role is required to access the guide dashboard. Register as a guide first.
          </p>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Full Name</span>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3"
              required
              minLength={8}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Confirm Password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3"
              required
              minLength={8}
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#0d3f83] text-white py-3 font-semibold hover:bg-[#0a3168] disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register as Guide"}
          </button>
          <button
            type="button"
            disabled={!googleEnabled || loadingProviders}
            onClick={() => signIn("google", { callbackUrl: "/guide/register/complete" })}
            className="w-full rounded-xl border border-slate-300 bg-white py-3 font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Continue with Google
          </button>
          {!loadingProviders && !googleEnabled ? (
            <p className="text-xs text-amber-700">
              Google sign-up is not configured. Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to `.env.local`.
            </p>
          ) : null}
        </form>

        <p className="mt-6 text-sm text-slate-600">
          Already registered?{" "}
          <Link href="/login" className="text-[#0d3f83] font-medium">Sign in here</Link>
        </p>
      </div>
    </div>
  );
}
