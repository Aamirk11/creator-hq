"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedCounter, GradientText } from "@/components/shared";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

const PLATFORM_REVENUE = [
  { platform: "YouTube", amount: 3200, delay: 0 },
  { platform: "TikTok", amount: 1880, delay: 0.2 },
  { platform: "Patreon", amount: 1200, delay: 0.4 },
];

const AVATAR_COLORS = [
  "bg-[#7C3AED]",
  "bg-[#EC4899]",
  "bg-[#F59E0B]",
  "bg-[#10B981]",
  "bg-[#3B82F6]",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-8, 8, -8],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAFA] pt-28 pb-16 sm:pt-36 sm:pb-20">
      {/* Subtle gradient orb background */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-gradient-to-br from-[#7C3AED]/10 via-[#EC4899]/5 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Pre-headline badge */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/20 bg-[#7C3AED]/5 px-4 py-1.5 text-sm font-medium text-[#7C3AED]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7C3AED] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7C3AED]" />
            </span>
            For creators tired of guessing where the money goes
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="text-4xl font-extrabold tracking-tight text-[#0F172A] sm:text-5xl lg:text-6xl"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
          >
            Stop Guessing. Start Earning.
            <br />
            Know Your{" "}
            <GradientText className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
              Real Hourly Rate.
            </GradientText>
          </motion.h1>

          {/* Gut-punch subheadline */}
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#64748B] sm:text-xl"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
          >
            You spend 20 hours on a YouTube video that earns $280. Your
            45-second TikTok earns $1,129. But you&apos;d never know that
            without CreatorHQ.
          </motion.p>

          {/* Animated platform revenue counters — live dashboard feel */}
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-6"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
          >
            {PLATFORM_REVENUE.map(({ platform, amount, delay }) => (
              <div
                key={platform}
                className="group relative flex flex-col items-center rounded-xl border border-[#E2E8F0] bg-white px-5 py-3 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[#10B981] ring-2 ring-white" />
                <AnimatedCounter
                  value={amount}
                  prefix="$"
                  duration={2 + delay}
                  className="text-2xl font-bold text-[#0F172A]"
                />
                <span className="mt-0.5 text-xs font-medium text-[#64748B]">
                  {platform}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={4}
          >
            <Button
              asChild
              size="lg"
              className="h-14 rounded-full bg-[#7C3AED] px-10 text-base font-semibold text-white shadow-lg shadow-[#7C3AED]/25 hover:bg-[#6D28D9] hover:shadow-xl hover:shadow-[#7C3AED]/30 transition-all"
            >
              <a href="#waitlist">Get Early Access — Free</a>
            </Button>
            <button
              onClick={() =>
                document
                  .getElementById("rph-showcase")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-sm font-semibold text-[#7C3AED] hover:text-[#6D28D9] transition-colors"
            >
              See the dashboard &rarr;
            </button>
          </motion.div>

          {/* Trust bar with avatar stack */}
          <motion.div
            className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-3"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={5}
          >
            {/* Avatar stack */}
            <div className="flex -space-x-2">
              {AVATAR_COLORS.map((color, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-7 w-7 rounded-full ring-2 ring-[#FAFAFA]",
                    color
                  )}
                />
              ))}
            </div>
            <p className="text-sm font-medium text-[#64748B]">
              Trusted by{" "}
              <span className="text-[#0F172A]">2,400+ creators</span> tracking{" "}
              <span className="text-[#0F172A]">$12M+ in revenue</span>
            </p>
          </motion.div>
        </div>

        {/* Floating mock dashboard card */}
        <motion.div
          className="pointer-events-none absolute right-0 top-24 hidden lg:block"
          initial="initial"
          animate="animate"
          variants={floatAnimation}
        >
          <div className="w-52 rounded-2xl border border-[#E2E8F0] bg-white/80 p-4 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#64748B]">
                Avg. RPH
              </span>
              <TrendingUp className="h-3.5 w-3.5 text-[#10B981]" />
            </div>
            <p className="mt-1 text-2xl font-bold text-[#0F172A]">$841/hr</p>
            {/* Mini sparkline via CSS */}
            <div className="mt-2 flex items-end gap-0.5 h-8">
              {[35, 50, 40, 65, 55, 80, 70, 90, 85, 95].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-[#7C3AED] to-[#EC4899]"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <p className="mt-1.5 text-[10px] font-medium text-[#10B981]">
              +23% vs last month
            </p>
          </div>
        </motion.div>

        {/* Secondary floating card — left side */}
        <motion.div
          className="pointer-events-none absolute left-0 top-48 hidden lg:block"
          initial="initial"
          animate="animate"
          variants={{
            initial: { y: 0 },
            animate: {
              y: [6, -6, 6],
              transition: {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut" as const,
              },
            },
          }}
        >
          <div className="w-44 rounded-2xl border border-[#E2E8F0] bg-white/80 p-3 shadow-xl backdrop-blur-sm">
            <span className="text-xs font-medium text-[#64748B]">
              Top Content
            </span>
            <p className="mt-1 text-sm font-semibold text-[#0F172A] truncate">
              45s TikTok Haul
            </p>
            <p className="text-lg font-bold text-[#10B981]">$1,129</p>
            <p className="text-[10px] text-[#64748B]">0.75 hrs invested</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
