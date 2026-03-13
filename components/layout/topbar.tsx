"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Settings, HelpCircle, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCreatorData } from "@/lib/hooks/use-creator-data";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

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
  const { creator } = useCreatorData();
  const pageTitle = breadcrumbMap[pathname] || "Dashboard";

  const initials = creator.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-6 shrink-0">
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-[#0F172A]">{pageTitle}</h2>
      </div>

      {/* Right: Notifications + Avatar Dropdown */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button
          onClick={() => toast.info("Notifications coming soon!")}
          className="relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#F1F5F9] transition-colors"
        >
          <Bell className="w-5 h-5 text-[#64748B]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full" />
        </button>

        {/* Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "flex items-center justify-center w-9 h-9 rounded-full bg-[#7C3AED] text-white text-sm font-semibold select-none cursor-pointer hover:ring-2 hover:ring-[#7C3AED]/30 transition-all"
              )}
            >
              {initials}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold text-[#0F172A]">{creator.name}</p>
                <p className="text-xs text-[#64748B]">{creator.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex items-center gap-2 cursor-pointer">
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => toast.info("Help & Support coming soon!")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              Help & Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => toast("Signed out successfully")}
              className="flex items-center gap-2 cursor-pointer text-[#EF4444] focus:text-[#EF4444]"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
