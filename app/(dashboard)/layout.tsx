"use client";

import { CreatorDataContext } from "@/lib/hooks/use-creator-data";
import {
  creator,
  monthlyRevenue,
  revenueBySource,
  dashboardStats,
  contentPieces,
  brandDeals,
  expenses,
  subscriptions,
  taxSummary,
  quarterlyPayments,
  deductions,
} from "@/lib/mock-data";
import { Sidebar, Topbar, MobileNav } from "@/components/layout";

const creatorData = {
  creator,
  monthlyRevenue,
  revenueBySource,
  dashboardStats,
  contentPieces,
  brandDeals,
  expenses,
  subscriptions,
  taxSummary,
  quarterlyPayments,
  deductions,
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CreatorDataContext.Provider value={creatorData}>
      <div className="flex h-screen bg-[#FAFAFA]">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-6 pb-24 md:pb-6">
            {children}
          </main>
        </div>
        <MobileNav />
      </div>
    </CreatorDataContext.Provider>
  );
}
