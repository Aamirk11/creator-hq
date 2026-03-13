"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedCounter, GradientText } from "@/components/shared";

const PLATFORM_REVENUE = [
  { platform: "YouTube", amount: 3200, delay: 0 },
  { platform: "TikTok", amount: 1880, delay: 0.2 },
  { platform: "Patreon", amount: 1200, delay: 0.4 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAFA] pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Subtle gradient orb background */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-gradient-to-br from-[#7C3AED]/10 via-[#EC4899]/5 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Main heading */}
          <motion.h1
            className="text-4xl font-extrabold tracking-tight text-[#0F172A] sm:text-5xl lg:text-6xl"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
          >
            Your Entire Creator Business.
            <br />
            <GradientText className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
              One Dashboard.
            </GradientText>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#64748B] sm:text-xl"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
          >
            Track revenue per hour, manage brand deals, and run your creator
            business like a CEO. The only dashboard that shows you which content
            actually makes money.
          </motion.p>

          {/* Animated platform revenue counters */}
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
          >
            {PLATFORM_REVENUE.map(({ platform, amount, delay }) => (
              <div
                key={platform}
                className="flex flex-col items-center rounded-xl border border-[#E2E8F0] bg-white px-5 py-3 shadow-sm"
              >
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
            custom={3}
          >
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-[#7C3AED] px-8 text-base font-semibold text-white shadow-lg shadow-[#7C3AED]/25 hover:bg-[#6D28D9]"
            >
              <a href="#waitlist">Join the Waitlist</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-full px-8 text-base font-semibold"
            >
              <a href="#rph-showcase">See How It Works</a>
            </Button>
          </motion.div>

          {/* Trust line */}
          <motion.p
            className="mt-12 text-sm font-medium text-[#64748B]"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={4}
          >
            Already helping{" "}
            <span className="text-[#0F172A]">2,400+ creators</span> track{" "}
            <span className="text-[#0F172A]">$12M+ in revenue</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
