"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Clock,
  LayoutDashboard,
  Handshake,
  Receipt,
  CreditCard,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: Clock,
    title: "Revenue Per Hour",
    description:
      "See exactly which content earns the most per hour invested. Stop guessing and start optimizing.",
    highlighted: true,
  },
  {
    icon: LayoutDashboard,
    title: "Multi-Platform Dashboard",
    description:
      "YouTube, TikTok, Instagram, Patreon — all in one view. No more tab-switching.",
  },
  {
    icon: Handshake,
    title: "Brand Deal Finder",
    description:
      "Find brands that match your niche and know your worth. Never undersell yourself again.",
  },
  {
    icon: Receipt,
    title: "Tax Center",
    description:
      "Quarterly estimates, deductions, and CPA-ready reports. Tax season without the panic.",
  },
  {
    icon: CreditCard,
    title: "Expense Tracking",
    description:
      "Track every business expense and never miss a deduction. Keep more of what you earn.",
  },
  {
    icon: Sparkles,
    title: "AI Insights",
    description:
      "Get actionable recommendations to maximize your earnings. Your data, made useful.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
} as const;

export function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
            Everything You Need to Run Your Creator Business
          </h2>
          <p className="mt-4 text-lg text-[#64748B]">
            One platform to track, optimize, and grow your creator income.
          </p>
        </div>

        {/* Feature grid */}
        <motion.div
          ref={ref}
          className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                className={cn(
                  "group relative flex flex-col rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                  feature.highlighted
                    ? "border-[#7C3AED]/40 shadow-md shadow-[#7C3AED]/10 ring-1 ring-[#7C3AED]/20"
                    : "border-[#E2E8F0] hover:border-[#7C3AED]/30"
                )}
              >
                {/* Glow effect for highlighted card */}
                {feature.highlighted && (
                  <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-[#7C3AED]/5 via-transparent to-[#EC4899]/5" />
                )}

                <div
                  className={cn(
                    "relative flex size-11 items-center justify-center rounded-xl",
                    feature.highlighted
                      ? "bg-[#7C3AED]/10 text-[#7C3AED]"
                      : "bg-[#FAFAFA] text-[#64748B] group-hover:bg-[#7C3AED]/10 group-hover:text-[#7C3AED]"
                  )}
                >
                  <Icon className="size-5" />
                </div>
                <h3 className="relative mt-4 text-base font-semibold text-[#0F172A]">
                  {feature.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-[#64748B]">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
