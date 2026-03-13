"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Clock, Handshake, Receipt, Menu, CreditCard, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOBILE_NAV_ITEMS } from "@/lib/utils/constants";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";

const iconMap = {
  LayoutDashboard,
  Clock,
  Handshake,
  Receipt,
  Menu,
} as const;

export function MobileNav() {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);

  const isMoreActive =
    pathname.startsWith("/dashboard/expenses") ||
    pathname.startsWith("/dashboard/settings");

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E2E8F0]">
      <div className="flex items-center justify-around h-16">
        {MOBILE_NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];

          if (item.isMenu) {
            return (
              <Sheet key="more-menu" open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <button
                    className={cn(
                      "flex flex-col items-center justify-center gap-1 flex-1 py-2 text-xs font-medium transition-colors duration-200",
                      isMoreActive ? "text-[#7C3AED]" : "text-[#64748B]"
                    )}
                  >
                    {Icon && (
                      <Icon
                        className={cn(
                          "w-5 h-5",
                          isMoreActive ? "text-[#7C3AED]" : "text-[#64748B]"
                        )}
                      />
                    )}
                    <span>{item.label}</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-2xl">
                  <SheetHeader>
                    <SheetTitle className="text-left text-[#0F172A]">More</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-1 py-4">
                    <Link
                      href="/dashboard/expenses"
                      onClick={() => setSheetOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                        pathname.startsWith("/dashboard/expenses")
                          ? "bg-[#7C3AED]/10 text-[#7C3AED]"
                          : "text-[#0F172A] hover:bg-[#F1F5F9]"
                      )}
                    >
                      <CreditCard className="w-5 h-5" />
                      Expenses
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setSheetOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                        pathname.startsWith("/dashboard/settings")
                          ? "bg-[#7C3AED]/10 text-[#7C3AED]"
                          : "text-[#0F172A] hover:bg-[#F1F5F9]"
                      )}
                    >
                      <Settings className="w-5 h-5" />
                      Settings
                    </Link>
                    <div className="my-2 border-t border-[#E2E8F0]" />
                    <button
                      onClick={() => {
                        setSheetOpen(false);
                        toast("Signed out successfully");
                      }}
                      className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-[#EF4444] hover:bg-[#FEF2F2] transition-colors w-full text-left"
                    >
                      <LogOut className="w-5 h-5" />
                      Log Out
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            );
          }

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
