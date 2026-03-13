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
import { GradientText } from "@/components/shared";

const FEATURES = [
  {
    icon: Clock,
    title: "Revenue Per Hour",
    label: "Know Your Real Rate",
    description:
      "See exactly how much you earn per hour on every piece of content. Stop wasting time on content that doesn't pay.",
    highlighted: true,
  },
  {
    icon: LayoutDashboard,
    title: "Smart Dashboard",
    label: "All Platforms, One View",
    description:
      "YouTube, TikTok, Instagram, Patreon — stop tab-switching. See your entire business at a glance.",
  },
  {
    icon: Handshake,
    title: "Brand Deal Finder",
    label: "Know Your Worth",
    description:
      "Stop underselling yourself. See what brands pay creators like you, and pitch with confidence.",
  },
  {
    icon: Receipt,
    title: "Tax Autopilot",
    label: "Never Panic at Tax Time",
    description:
      "Quarterly estimates calculated automatically. Deductions tracked. CPA-ready reports in one click.",
  },
  {
    icon: CreditCard,
    title: "Expense Tracking",
    label: "Every Dollar, Accounted For",
    description:
      "Snap receipts. Track subscriptions. Know your real profit — not just your gross revenue.",
  },
  {
    icon: Sparkles,
    title: "AI Insights",
    label: "Your Business Strategist",
    description:
      "Get actionable recommendations: what to make more of, what to cut, and where the money really is.",
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
            One Dashboard.{" "}
            <GradientText>Zero Guesswork.</GradientText>
          </h2>
          <p className="mt-4 text-lg text-[#64748B]">
            Every tool you need to run your creator business like a CEO.
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

                <p
                  className={cn(
                    "relative mt-4 text-xs font-bold uppercase tracking-wider",
                    feature.highlighted
                      ? "text-[#7C3AED]"
                      : "text-[#64748B]"
                  )}
                >
                  {feature.label}
                </p>

                <h3 className="relative mt-1.5 text-base font-semibold text-[#0F172A]">
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
