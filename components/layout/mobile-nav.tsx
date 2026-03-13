"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Clock, Handshake, Receipt, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOBILE_NAV_ITEMS } from "@/lib/utils/constants";

const iconMap = {
  LayoutDashboard,
  Clock,
  Handshake,
  Receipt,
  Menu,
} as const;

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E2E8F0]">
      <div className="flex items-center justify-around h-16">
        {MOBILE_NAV_ITEMS.map((item) => {
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
                "flex flex-col items-center justify-center gap-1 flex-1 py-2 text-xs font-medium transition-colors duration-200",
                isActive ? "text-[#7C3AED]" : "text-[#64748B]"
              )}
            >
              {Icon && (
                <Icon
                  className={cn(
                    "w-5 h-5",
                    isActive ? "text-[#7C3AED]" : "text-[#64748B]"
                  )}
                />
              )}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
