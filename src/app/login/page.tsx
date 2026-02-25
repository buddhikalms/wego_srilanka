"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleEnabled, setGoogleEnabled] = useState(false);
  const [loadingProviders, setLoadingProviders] = useState(true);
  const verifyState = searchParams.get("verify");
  const isGuideNext = searchParams.get("next") === "guide";

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
    setLoading(true);
    setError("");

    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (!result || result.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    const sessionRes = await fetch("/api/auth/session", { cache: "no-store" });
    const session = await sessionRes.json();
    const role = session?.user?.role;

    if (role === "ADMIN") {
      router.push("/admin/dashboard");
    } else if (role === "GUIDE") {
      try {
        const onboardingRes = await fetch(
          "/api/guides/onboarding-status?triggerVerificationEmail=1",
          { cache: "no-store" },
        );

        if (onboardingRes.ok) {
          const onboarding = (await onboardingRes.json()) as {
            emailVerified: boolean;
            profileComplete: boolean;
          };

          if (!onboarding.emailVerified) {
            router.push("/guide/dashboard?verify=pending");
          } else if (!onboarding.profileComplete) {
            router.push("/guide/settings?onboarding=profile");
          } else {
            router.push("/guide/dashboard");
          }
        } else {
          router.push("/guide/dashboard");
        }
      } catch {
        router.push("/guide/dashboard");
      }
    } else {
      router.push(callbackUrl);
    }

    router.refresh();
  }

  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-[#f5f9ff] to-[#fff7ea] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-3xl bg-white border border-slate-100 shadow-xl p-8">
        <h1 className="text-3xl font-display font-bold text-[#103a76]">Login</h1>
        <p className="text-slate-600 mt-2">Use your account to access your dashboard.</p>
        {verifyState === "success" && (
          <p className="mt-3 rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
            Email verified successfully{isGuideNext ? ". You can now complete your guide profile." : "."}
          </p>
        )}
        {verifyState === "sent" && (
          <p className="mt-3 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-800">
            Verification email sent. Please verify your guide account before full dashboard access.
          </p>
        )}
        {verifyState === "expired" && (
          <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Verification link expired. Sign in and request a new verification email.
          </p>
        )}
        {verifyState === "invalid" && (
          <p className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            Invalid verification link. Sign in and request a new email.
          </p>
        )}
        {verifyState === "missing" && (
          <p className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            Missing verification token.
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#0d3f83] text-white py-3 font-semibold hover:bg-[#0a3168] disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <button
            type="button"
            disabled={!googleEnabled || loadingProviders}
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full rounded-xl border border-slate-300 bg-white py-3 font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Continue with Google
          </button>
          {!loadingProviders && !googleEnabled ? (
            <p className="text-xs text-amber-700">
              Google login is not configured. Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to your `.env.local`.
            </p>
          ) : null}
        </form>

        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-700">
            New tour guide?{" "}
            <Link href="/guide/register" className="font-semibold text-[#0d3f83]">
              Register here first
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
