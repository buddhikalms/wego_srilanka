import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import GuideVerificationCard from "@/components/GuideVerificationCard";
import SignOutButton from "@/components/SignOutButton";
import { authOptions } from "@/lib/auth";
import { isGuideProfileComplete } from "@/lib/guide-profile";
import { prisma } from "@/lib/prisma";

export default async function GuideDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.role !== "GUIDE") {
    redirect("/unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, fullName: true, emailVerified: true },
  });

  if (!user) {
    redirect("/login");
  }

  const guideProfile = await prisma.guideProfile.findUnique({
    where: { userId: session.user.id },
    include: {
      _count: {
        select: {
          activities: true,
          experiences: true,
          packages: true,
          ratings: true,
        },
      },
      packages: {
        select: {
          id: true,
          title: true,
          status: true,
          totalPrice: true,
          meetingCity: true,
          createdAt: true,
          itineraries: {
            select: {
              id: true,
              dayNumber: true,
              city: true,
              title: true,
            },
            orderBy: { dayNumber: "asc" },
            take: 8,
          },
        },
        orderBy: { createdAt: "desc" },
        take: 8,
      },
      activities: {
        select: {
          id: true,
          title: true,
          category: true,
          durationHours: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      experiences: {
        select: {
          id: true,
          title: true,
          organization: true,
          isCurrent: true,
        },
        orderBy: { updatedAt: "desc" },
        take: 8,
      },
      ratings: {
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          reviewer: {
            select: {
              fullName: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  const profileComplete = isGuideProfileComplete(guideProfile);
  const adminReviewStatus = guideProfile?.adminReviewStatus || "PROFILE_INCOMPLETE";

  const [paidBookingCount, paidBookingRevenue] = guideProfile
    ? await Promise.all([
        prisma.booking.count({
          where: {
            status: "PAID",
            package: { guideProfileId: guideProfile.id },
          },
        }),
        prisma.booking.aggregate({
          where: {
            status: "PAID",
            package: { guideProfileId: guideProfile.id },
          },
          _sum: {
            amountTotal: true,
          },
        }),
      ])
    : [0, { _sum: { amountTotal: 0 } }];

  const packageLocations = guideProfile
    ? Array.from(
        new Set(
          guideProfile.packages.flatMap((pkg) => [
            pkg.meetingCity,
            ...pkg.itineraries.map((day) => day.city),
          ]),
        ),
      ).filter(Boolean)
    : [];

  const itineraryItems = guideProfile
    ? guideProfile.packages
        .flatMap((pkg) =>
          pkg.itineraries.map((day) => ({
            id: day.id,
            packageTitle: pkg.title,
            dayNumber: day.dayNumber,
            city: day.city,
            title: day.title,
          })),
        )
        .slice(0, 12)
    : [];

  const specialties = getStringArray(guideProfile?.specialties);
  const languages = getStringArray(guideProfile?.languages);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f8ff] via-[#f9fbff] to-[#f6f7fb] px-4 py-10">
      <div className="mx-auto w-full">
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Guide Workspace
              </p>
              <h1 className="mt-2 text-3xl font-display font-bold text-[#112f5f]">
                Welcome, {user.fullName}
              </h1>
              <p className="mt-2 text-slate-600">
                Manage your tours, profile, pricing, and performance in one place.
              </p>
            </div>
            <SignOutButton />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <OnboardingPill done={user.emailVerified} label="Email Verified" />
            <OnboardingPill done={Boolean(guideProfile)} label="Profile Created" />
            <OnboardingPill done={adminReviewStatus === "APPROVED"} label="Admin Approved" />
          </div>
        </div>

        {!user.emailVerified ? (
          <div className="grid gap-6 lg:grid-cols-3">
            <section className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-display font-bold text-slate-900">Action Required</h2>
              <p className="mt-2 text-slate-600">
                Your guide account is currently in limited mode. Verify your email to continue setup.
              </p>
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                Full dashboard access will open immediately after verification.
              </div>
            </section>
            <GuideVerificationCard />
          </div>
        ) : !profileComplete ? (
          <div className="grid gap-6 lg:grid-cols-3">
            <section className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-display font-bold text-slate-900">
                Complete Your Guide Profile
              </h2>
              <p className="mt-2 text-slate-600">
                Add your core details so travelers can trust your profile and book confidently.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <ChecklistItem label="Professional bio" done={Boolean(guideProfile?.bio?.trim())} />
                <ChecklistItem
                  label="Phone and location"
                  done={Boolean(guideProfile?.phone?.trim() && guideProfile?.location?.trim())}
                />
                <ChecklistItem
                  label="Languages and specialties"
                  done={Boolean(
                    Array.isArray(guideProfile?.languages) &&
                      guideProfile.languages.length > 0 &&
                      Array.isArray(guideProfile?.specialties) &&
                      guideProfile.specialties.length > 0,
                  )}
                />
                <ChecklistItem label="Hourly rate" done={Number(guideProfile?.hourlyRate || 0) > 0} />
              </div>
            </section>
            <section className="rounded-3xl border border-[#d6e2f5] bg-[#f1f6ff] p-6 shadow-sm">
              <h3 className="text-lg font-display font-bold text-[#123a72]">Next Step</h3>
              <p className="mt-2 text-sm text-[#34527f]">
                Open Guide Settings and complete all required fields.
              </p>
              <Link
                href="/guide/settings?onboarding=profile"
                className="mt-5 inline-block rounded-full bg-[#0d3f83] px-5 py-2 text-sm font-semibold text-white hover:bg-[#0a3168]"
              >
                Complete Profile
              </Link>
            </section>
          </div>
        ) : adminReviewStatus !== "APPROVED" ? (
          <div className="grid gap-6 lg:grid-cols-3">
            <section className="lg:col-span-2 rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
              <h2 className="text-xl font-display font-bold text-amber-900">Under Admin Review</h2>
              <p className="mt-2 text-amber-800">
                Your profile is complete and is waiting for admin approval.
              </p>
              {guideProfile?.adminReviewStatus === "REJECTED" && guideProfile.adminReviewNotes ? (
                <p className="mt-3 text-sm text-amber-900">
                  Admin notes: {guideProfile.adminReviewNotes}
                </p>
              ) : null}
              <p className="mt-3 text-sm text-amber-800">
                You can update profile details while waiting.
              </p>
            </section>
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-display font-bold text-slate-900">Profile Updates</h3>
              <p className="mt-2 text-sm text-slate-600">
                Open settings to make changes requested by admin.
              </p>
              <Link
                href="/guide/settings"
                className="mt-5 inline-block rounded-full bg-[#0d3f83] px-5 py-2 text-sm font-semibold text-white hover:bg-[#0a3168]"
              >
                Open Settings
              </Link>
            </section>
          </div>
        ) : guideProfile ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
              <MetricCard title="Activities" value={String(guideProfile._count.activities)} />
              <MetricCard title="Experiences" value={String(guideProfile._count.experiences)} />
              <MetricCard title="Packages" value={String(guideProfile._count.packages)} />
              <MetricCard title="Locations" value={String(packageLocations.length)} />
              <MetricCard
                title="Rating"
                value={`${Number(guideProfile.averageRating).toFixed(2)} (${guideProfile._count.ratings})`}
              />
              <MetricCard
                title="Paid Revenue"
                value={`$${Number(paidBookingRevenue._sum.amountTotal || 0).toFixed(2)}`}
              />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-12">
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-display font-bold text-slate-900">Package Portfolio</h2>
                  <Link
                    href="/guide/packages"
                    className="rounded-full bg-[#0d3f83] px-5 py-2 text-sm font-semibold text-white hover:bg-[#0a3168]"
                  >
                    Create Package
                  </Link>
                </div>
                {guideProfile.packages.length === 0 ? (
                  <p className="mt-4 text-slate-600">No packages created yet.</p>
                ) : (
                  <div className="mt-4 space-y-3">
                    {guideProfile.packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                      >
                        <div>
                          <p className="font-semibold text-slate-900">{pkg.title}</p>
                          <p className="mt-1 text-sm text-slate-600">
                            {pkg.status} - ${Number(pkg.totalPrice).toFixed(2)} - {pkg.meetingCity}
                          </p>
                        </div>
                        <Link href="/packages" className="text-sm font-semibold text-[#0d3f83]">
                          View
                        </Link>
                      </div>
                    ))}
                  </div>
                )}

                <h3 className="mt-8 text-lg font-display font-bold text-slate-900">Recent Itineraries</h3>
                {itineraryItems.length === 0 ? (
                  <p className="mt-3 text-slate-600">No itinerary entries yet.</p>
                ) : (
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    {itineraryItems.map((item) => (
                      <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <p className="text-sm font-semibold text-slate-900">{item.packageTitle}</p>
                        <p className="mt-1 text-xs text-slate-600">
                          Day {item.dayNumber} - {item.city}
                        </p>
                        <p className="mt-1 text-sm text-slate-700">{item.title}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-4">
                <h2 className="text-xl font-display font-bold text-slate-900">What You Offer</h2>
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Specialties</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(specialties.length ? specialties : ["Not set"]).map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Languages</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(languages.length ? languages : ["Not set"]).map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs text-blue-800"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="mt-6 text-lg font-display font-bold text-slate-900">Operations</h3>
                <div className="mt-4 space-y-3">
                  <ToolLink
                    href="/guide/packages"
                    title="Package Builder"
                    subtitle="Build itinerary, pricing, and city plan"
                  />
                  <ToolLink
                    href="/guide/settings"
                    title="Guide Settings"
                    subtitle="Profile details, rates, and preferences"
                  />
                </div>
                <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <p className="text-sm text-slate-700">
                    Paid bookings: <strong>{paidBookingCount}</strong>
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    Revenue:{" "}
                    <strong>${Number(paidBookingRevenue._sum.amountTotal || 0).toFixed(2)}</strong>
                  </p>
                </div>
              </section>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-12">
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-4">
                <h2 className="text-xl font-display font-bold text-slate-900">Package Locations</h2>
                {packageLocations.length === 0 ? (
                  <p className="mt-4 text-slate-600">No locations added yet.</p>
                ) : (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {packageLocations.map((location) => (
                      <span
                        key={location}
                        className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800"
                      >
                        {location}
                      </span>
                    ))}
                  </div>
                )}
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-4">
                <h2 className="text-xl font-display font-bold text-slate-900">Activities</h2>
                {guideProfile.activities.length === 0 ? (
                  <p className="mt-4 text-slate-600">No activities added yet.</p>
                ) : (
                  <div className="mt-4 space-y-3">
                    {guideProfile.activities.map((activity) => (
                      <div key={activity.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <p className="text-sm font-semibold text-slate-900">{activity.title}</p>
                        <p className="mt-1 text-xs text-slate-600">
                          {activity.category || "General"}
                          {activity.durationHours ? ` - ${activity.durationHours}h` : ""}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-4">
                <h2 className="text-xl font-display font-bold text-slate-900">Latest Reviews</h2>
                {guideProfile.ratings.length === 0 ? (
                  <p className="mt-4 text-slate-600">No recent reviews.</p>
                ) : (
                  <div className="mt-4 space-y-3">
                    {guideProfile.ratings.map((rating) => (
                      <div key={rating.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-sm text-slate-700">
                          {rating.reviewer.fullName} rated {rating.rating}/5
                        </p>
                        {rating.comment ? <p className="mt-1 text-sm text-slate-600">{rating.comment}</p> : null}
                        <p className="mt-2 text-xs text-slate-500">
                          {new Date(rating.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <h3 className="mt-6 text-lg font-display font-bold text-slate-900">Profile Snapshot</h3>
                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  <p>Base location: {guideProfile.location || "Not set"}</p>
                  <p>Experience: {guideProfile.yearsOfExperience} years</p>
                  <p>Phone: {guideProfile.phone || "Not set"}</p>
                  <p>Experience entries: {guideProfile.experiences.length}</p>
                </div>
                <Link
                  href="/guide/settings"
                  className="mt-4 inline-block rounded-full bg-[#0d3f83] px-5 py-2 text-sm font-semibold text-white hover:bg-[#0a3168]"
                >
                  Edit Profile
                </Link>
              </section>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

function getStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is string => typeof item === "string");
}

function MetricCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-3xl font-display font-bold text-[#0d376f]">{value}</p>
    </div>
  );
}

function ToolLink({ href, title, subtitle }: { href: string; title: string; subtitle: string }) {
  return (
    <Link href={href} className="block rounded-xl border border-slate-200 p-3 hover:bg-slate-50">
      <p className="font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-xs text-slate-600">{subtitle}</p>
    </Link>
  );
}

function ChecklistItem({ label, done }: { label: string; done: boolean }) {
  return (
    <div
      className={`rounded-xl border p-3 text-sm ${
        done ? "border-green-200 bg-green-50 text-green-800" : "border-slate-200 bg-slate-50 text-slate-700"
      }`}
    >
      {done ? "Done" : "Pending"}: {label}
    </div>
  );
}

function OnboardingPill({ done, label }: { done: boolean; label: string }) {
  return (
    <div
      className={`rounded-full border px-4 py-2 text-sm font-semibold ${
        done ? "border-green-200 bg-green-50 text-green-700" : "border-slate-200 bg-slate-50 text-slate-600"
      }`}
    >
      {done ? "Complete" : "Pending"} - {label}
    </div>
  );
}
