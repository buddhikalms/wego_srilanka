import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import AdminGuideReviewPanel from "@/components/AdminGuideReviewPanel";
import SignOutButton from "@/components/SignOutButton";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  const [userCount, guideCount, packageCount, paidBookingStats, reviewStats] =
    await Promise.all([
      prisma.user.count(),
      prisma.guideProfile.count(),
      prisma.tourPackage.count(),
      prisma.booking.aggregate({
        where: { status: "PAID" },
        _count: { id: true },
        _sum: { amountTotal: true },
      }),
      prisma.guideProfile.groupBy({
        by: ["adminReviewStatus"],
        _count: { id: true },
      }),
    ]);

  const totalRevenue = Number(paidBookingStats._sum.amountTotal || 0).toFixed(2);
  const reviewMap = reviewStats.reduce<Record<string, number>>((acc, row) => {
    acc[row.adminReviewStatus] = row._count.id;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#f3f6fc] px-4 py-8">
      <div className="mx-auto flex max-w-7xl gap-6">
        <aside className="hidden w-72 shrink-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Admin Console
          </p>
          <h1 className="mt-2 text-2xl font-display font-bold text-[#0f376f]">Tourism Platform</h1>

          <nav className="mt-8 space-y-2">
            <SidebarLink href="/admin/dashboard" label="Overview" active />
            <SidebarLink href="#guide-reviews" label="Guide Reviews" />
            <SidebarLink href="/packages" label="Packages" />
            <SidebarLink href="/guide/dashboard" label="Guide Workspace" />
          </nav>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Review Queue</p>
            <p className="mt-2 text-sm text-slate-700">
              Under review: <strong>{reviewMap.UNDER_REVIEW || 0}</strong>
            </p>
            <p className="mt-1 text-sm text-slate-700">
              Rejected: <strong>{reviewMap.REJECTED || 0}</strong>
            </p>
          </div>
        </aside>

        <main className="flex-1 space-y-6">
          <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Platform Management
                </p>
                <h2 className="mt-2 text-3xl font-display font-bold text-[#0f376f]">Admin Dashboard</h2>
                <p className="mt-2 text-slate-600">
                  Review guide onboarding, monitor bookings, and manage operations.
                </p>
              </div>
              <SignOutButton />
            </div>
          </header>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard title="Total Users" value={String(userCount)} subtitle="Registered accounts" />
            <MetricCard title="Guide Accounts" value={String(guideCount)} subtitle="Active guide profiles" />
            <MetricCard title="Tour Packages" value={String(packageCount)} subtitle="Created packages" />
            <MetricCard title="Revenue (USD)" value={`$${totalRevenue}`} subtitle={`Paid bookings: ${paidBookingStats._count.id}`} />
          </section>

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
              <h3 className="text-lg font-display font-bold text-slate-900">Guide Approval Overview</h3>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <StatusCard label="Incomplete" value={reviewMap.PROFILE_INCOMPLETE || 0} tone="slate" />
                <StatusCard label="Under Review" value={reviewMap.UNDER_REVIEW || 0} tone="amber" />
                <StatusCard label="Approved" value={reviewMap.APPROVED || 0} tone="green" />
                <StatusCard label="Rejected" value={reviewMap.REJECTED || 0} tone="red" />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-display font-bold text-slate-900">Quick Actions</h3>
              <div className="mt-4 space-y-3">
                <Link
                  href="/packages"
                  className="block rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  View Live Packages
                </Link>
                <Link
                  href="/guide/dashboard"
                  className="block rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Open Guide Dashboard
                </Link>
              </div>
            </div>
          </section>

          <div id="guide-reviews">
            <AdminGuideReviewPanel />
          </div>
        </main>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-3xl font-display font-bold text-[#0d376f]">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{subtitle}</p>
    </article>
  );
}

function SidebarLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block rounded-xl px-4 py-3 text-sm font-semibold ${
        active ? "bg-[#0f376f] text-white" : "text-slate-700 hover:bg-slate-100"
      }`}
    >
      {label}
    </Link>
  );
}

function StatusCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "slate" | "amber" | "green" | "red";
}) {
  const toneMap: Record<string, string> = {
    slate: "border-slate-200 bg-slate-50 text-slate-800",
    amber: "border-amber-200 bg-amber-50 text-amber-800",
    green: "border-green-200 bg-green-50 text-green-800",
    red: "border-red-200 bg-red-50 text-red-800",
  };

  return (
    <div className={`rounded-xl border p-4 ${toneMap[tone]}`}>
      <p className="text-xs font-semibold uppercase tracking-wide">{label}</p>
      <p className="mt-2 text-2xl font-display font-bold">{value}</p>
    </div>
  );
}
