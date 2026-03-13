"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Clock,
  Handshake,
  Receipt,
  CreditCard,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/utils/constants";
import { Logo } from "@/components/shared";

const iconMap = {
  LayoutDashboard,
  Clock,
  Handshake,
  Receipt,
  CreditCard,
} as const;

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col bg-white border-r border-[#E2E8F0] h-screen sticky top-0 transition-all duration-300 ease-in-out",
        collapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 h-16 border-b border-[#E2E8F0]">
        <Logo size={32} className="shrink-0" />
        <span
          className={cn(
            "font-bold text-[#0F172A] text-lg transition-all duration-300 overflow-hidden whitespace-nowrap",
            collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          )}
        >
          CreatorHQ
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 p-3 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-[#7C3AED]/10 text-[#7C3AED]"
                  : "text-[#64748B] hover:bg-[#FAFAFA] hover:text-[#0F172A]"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#7C3AED] rounded-r-full" />
              )}
              {Icon && (
                <Icon
                  className={cn(
                    "w-5 h-5 shrink-0",
                    isActive ? "text-[#7C3AED]" : "text-[#64748B]"
                  )}
                />
              )}
              <span
                className={cn(
                  "transition-all duration-300 overflow-hidden whitespace-nowrap",
                  collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t border-[#E2E8F0] flex flex-col gap-1">
        <Link
          href="/dashboard/settings"
          className={cn(
            "relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
            pathname === "/dashboard/settings"
              ? "bg-[#7C3AED]/10 text-[#7C3AED]"
              : "text-[#64748B] hover:bg-[#FAFAFA] hover:text-[#0F172A]"
          )}
        >
          {pathname === "/dashboard/settings" && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#7C3AED] rounded-r-full" />
          )}
          <Settings
            className={cn(
              "w-5 h-5 shrink-0",
              pathname === "/dashboard/settings"
                ? "text-[#7C3AED]"
                : "text-[#64748B]"
            )}
          />
          <span
            className={cn(
              "transition-all duration-300 overflow-hidden whitespace-nowrap",
              collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            )}
          >
            Settings
          </span>
        </Link>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#64748B] hover:bg-[#FAFAFA] hover:text-[#0F172A] transition-colors duration-200 w-full"
        >
          <ChevronLeft
            className={cn(
              "w-5 h-5 shrink-0 transition-transform duration-300",
              collapsed && "rotate-180"
            )}
          />
          <span
            className={cn(
              "transition-all duration-300 overflow-hidden whitespace-nowrap",
              collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            )}
          >
            Collapse
          </span>
        </button>
      </div>
    </aside>
  );
}
