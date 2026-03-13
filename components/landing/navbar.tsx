"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/shared";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E2E8F0] transition-shadow duration-300",
        scrolled && "shadow-md"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          <GradientText className="text-xl font-bold">CreatorHQ</GradientText>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#64748B] transition-colors hover:text-[#0F172A]"
            >
              {link.label}
            </a>
          ))}
          <Button
            asChild
            className="rounded-full bg-[#7C3AED] px-5 text-white hover:bg-[#6D28D9]"
          >
            <a href="#waitlist">Join Waitlist</a>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle>
                  <GradientText className="text-lg font-bold">
                    CreatorHQ
                  </GradientText>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 px-4 pt-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-base font-medium text-[#0F172A] transition-colors hover:text-[#7C3AED]"
                  >
                    {link.label}
                  </a>
                ))}
                <Button
                  asChild
                  className="mt-2 w-full rounded-full bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
                >
                  <a href="#waitlist" onClick={() => setOpen(false)}>
                    Join Waitlist
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
