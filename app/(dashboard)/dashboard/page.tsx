"use client";

import { useCreatorData } from "@/lib/hooks/use-creator-data";
import { PageHeader } from "@/components/layout/page-header";
import { PageTransition } from "@/components/layout/page-transition";
import {
  StatCard,
  RevenueChart,
  PlatformCard,
  RevenueBySource,
  RecentActivity,
} from "@/components/dashboard";

export default function DashboardPage() {
  const { creator, dashboardStats } = useCreatorData();

  return (
    <PageTransition>
    <div className="space-y-6">
      <PageHeader title="Dashboard" description={`Welcome back, ${creator.name.split(" ")[0]}`} />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            prefix={stat.prefix}
            suffix={stat.suffix}
          />
        ))}
      </div>

      {/* Revenue Chart */}
      <div>
        <h2 className="text-sm font-semibold text-[#64748B] uppercase tracking-wider mb-3">Revenue Trends</h2>
        <RevenueChart />
      </div>

      {/* Revenue by Source + Recent Activity */}
      <h2 className="text-sm font-semibold text-[#64748B] uppercase tracking-wider mb-3">Breakdown</h2>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3">
          <RevenueBySource />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>

      {/* Platform Cards */}
      <h2 className="text-sm font-semibold text-[#64748B] uppercase tracking-wider mb-3">Connected Platforms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {creator.platforms
          .filter((p) => p.connected)
          .map((platform) => (
            <PlatformCard
              key={platform.platform}
              platform={platform.platform}
              iconColor={platform.iconColor}
              username={platform.username}
              followers={platform.followers}
              monthlyRevenue={platform.monthlyRevenue}
            />
          ))}
      </div>
    </div>
    </PageTransition>
  );
}
