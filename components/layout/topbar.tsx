"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/revenue-per-hour": "Revenue / Hour",
  "/dashboard/deals": "Brand Deals",
  "/dashboard/taxes": "Taxes",
  "/dashboard/expenses": "Expenses",
  "/dashboard/settings": "Settings",
};

export function Topbar() {
  const pathname = usePathname();
  const pageTitle = breadcrumbMap[pathname] || "Dashboard";

  return (
    <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-6 shrink-0">
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-[#0F172A]">{pageTitle}</h2>
      </div>

      {/* Right: Avatar */}
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex items-center justify-center w-9 h-9 rounded-full bg-[#7C3AED] text-white text-sm font-semibold select-none"
          )}
        >
          MT
        </div>
      </div>
    </header>
  );
}
