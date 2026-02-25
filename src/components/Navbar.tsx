"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  const isGuide = session?.user?.role === "GUIDE";
  const guideName = session?.user?.name || "Guide";
  const guideEmail = session?.user?.email || "";

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!profileRef.current) return;
      if (!profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="group flex items-center space-x-2">
            <div className="text-3xl">LK</div>
            <div>
              <div className="font-display text-2xl font-bold text-gray-900 transition-colors group-hover:text-[#002967]">
                Ceylon Travels
              </div>
              <div className="text-xs tracking-widest text-gray-500">DISCOVER SRI LANKA</div>
            </div>
          </Link>

          <div className="hidden items-center space-x-8 md:flex">
            <NavLink href="/destinations" label="Destinations" />
            <NavLink href="/packages" label="Tour Packages" />
            <NavLink href="/activities" label="Activities" />
            <NavLink href="/hotels" label="Hotels" />
            <NavLink href="/categories" label="Categories" />
            <NavLink href="/news" label="News" />

            {!isGuide ? <NavLink href="/guide/register" label="Become a Guide" /> : null}

            {!isGuide ? (
              <Link
                href="/contact"
                className="rounded-full bg-[#004b9d] px-6 py-2 font-medium text-white transition-all hover:bg-sky-700 hover:shadow-lg"
              >
                Book Now
              </Link>
            ) : (
              <GuideProfileDropdown
                guideName={guideName}
                guideEmail={guideEmail}
                open={profileOpen}
                onToggle={() => setProfileOpen((prev) => !prev)}
                onClose={() => setProfileOpen(false)}
                containerRef={profileRef}
              />
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <div className="space-y-3 px-4 py-4">
            <MobileNavLink href="/destinations" label="Destinations" onClick={() => setIsOpen(false)} />
            <MobileNavLink href="/packages" label="Tour Packages" onClick={() => setIsOpen(false)} />
            <MobileNavLink href="/activities" label="Activities" onClick={() => setIsOpen(false)} />
            <MobileNavLink href="/hotels" label="Hotels" onClick={() => setIsOpen(false)} />
            <MobileNavLink href="/categories" label="Categories" onClick={() => setIsOpen(false)} />
            <MobileNavLink href="/news" label="News" onClick={() => setIsOpen(false)} />

            {!isGuide ? (
              <>
                <MobileNavLink href="/guide/register" label="Become a Guide" onClick={() => setIsOpen(false)} />
                <Link
                  href="/contact"
                  className="block w-full rounded-full bg-[#004b9d] px-6 py-3 text-center font-medium text-white transition-all hover:bg-sky-700"
                  onClick={() => setIsOpen(false)}
                >
                  Book Now
                </Link>
              </>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{guideName}</p>
                {guideEmail ? <p className="mt-1 text-xs text-slate-600">{guideEmail}</p> : null}
                <div className="mt-3 space-y-2">
                  <MobileNavLink href="/guide/dashboard" label="Dashboard" onClick={() => setIsOpen(false)} />
                  <MobileNavLink href="/guide/settings" label="Profile Settings" onClick={() => setIsOpen(false)} />
                  <MobileNavLink href="/guide/packages" label="My Packages" onClick={() => setIsOpen(false)} />
                  <button
                    type="button"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="font-medium text-gray-700 transition-colors hover:text-[#002967]">
      {label}
    </Link>
  );
}

function MobileNavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      className="block py-2 font-medium text-gray-700 transition-colors hover:text-[#002967]"
      onClick={onClick}
    >
      {label}
    </Link>
  );
}

function GuideProfileDropdown({
  guideName,
  guideEmail,
  open,
  onToggle,
  onClose,
  containerRef,
}: {
  guideName: string;
  guideEmail: string;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  containerRef: RefObject<HTMLDivElement>;
}) {
  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#0d3f83] text-xs text-white">
          {guideName.slice(0, 1).toUpperCase()}
        </span>
        <span>{guideName}</span>
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.51a.75.75 0 0 1-1.08 0l-4.25-4.51a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
        </svg>
      </button>

      {open ? (
        <div className="absolute right-0 z-50 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-sm font-semibold text-slate-900">{guideName}</p>
            {guideEmail ? <p className="mt-1 text-xs text-slate-600">{guideEmail}</p> : null}
          </div>

          <div className="mt-2 space-y-1">
            <DropdownLink href="/guide/dashboard" label="Guide Dashboard" onClick={onClose} />
            <DropdownLink href="/guide/settings" label="Profile Settings" onClick={onClose} />
            <DropdownLink href="/guide/packages" label="My Packages" onClick={onClose} />
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DropdownLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
    >
      {label}
    </Link>
  );
}
