"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

const ctaPulseVariants = {
  idle: {
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  prominent: {
    scale: 1.05,
    transition: {
      duration: 0.6,
      ease: "easeInOut" as const,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setPastHero(y > 500);

      // Calculate scroll progress as percentage
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(y / docHeight, 1) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-md"
          : "bg-transparent border-b border-transparent"
      )}
    >
      {/* Scroll progress indicator */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#7C3AED] to-[#EC4899]"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5">
          <Zap className="size-5 text-[#7C3AED]" />
          <GradientText className="text-xl font-bold tracking-tight">
            CreatorHQ
          </GradientText>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                scrolled
                  ? "text-[#64748B] hover:text-[#0F172A]"
                  : "text-[#0F172A]/70 hover:text-[#0F172A]"
              )}
            >
              {link.label}
            </a>
          ))}

          <AnimatePresence mode="wait">
            <motion.div
              key={pastHero ? "prominent" : "idle"}
              variants={ctaPulseVariants}
              initial="idle"
              animate={pastHero ? "prominent" : "idle"}
            >
              <Button
                asChild
                className={cn(
                  "rounded-full bg-[#7C3AED] px-5 text-white hover:bg-[#6D28D9] transition-all duration-300",
                  pastHero && "px-6 font-semibold shadow-lg shadow-[#7C3AED]/25"
                )}
              >
                <a href="#waitlist">Join Waitlist</a>
              </Button>
            </motion.div>
          </AnimatePresence>
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
                  <span className="flex items-center gap-1.5">
                    <Zap className="size-4 text-[#7C3AED]" />
                    <GradientText className="text-lg font-bold">
                      CreatorHQ
                    </GradientText>
                  </span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 px-4 pt-6">
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
                <hr className="border-[#E2E8F0]" />
                <Button
                  asChild
                  className="mt-2 w-full rounded-full bg-[#7C3AED] text-white hover:bg-[#6D28D9] font-semibold"
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
