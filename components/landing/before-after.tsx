"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientText } from "@/components/shared";

const painPoints = [
  "Revenue scattered across 4 platform dashboards",
  "No idea which content is worth your time",
  "Guessing your tax obligations every quarter",
  "Underselling yourself on brand deals",
];

const benefits = [
  "All revenue in one beautiful dashboard",
  "Revenue per hour for every piece of content",
  "Quarterly tax estimates calculated automatically",
  "Rate calculator shows your true market value",
];

const fadeLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.2, ease: "easeOut" as const },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as const },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="before-after"
      className="relative overflow-hidden bg-gradient-to-b from-[#F5F0FF] to-white py-16 sm:py-20"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute left-0 top-0 h-[350px] w-[400px] rounded-full bg-gradient-to-br from-rose-500/5 via-transparent to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[350px] w-[400px] rounded-full bg-gradient-to-tl from-emerald-500/5 via-transparent to-transparent blur-3xl" />

      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-10 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#7C3AED]">
            The transformation
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
            Life{" "}
            <span className="text-[#64748B]">Before</span>{" "}
            vs{" "}
            <span className="text-[#64748B]">After</span>{" "}
            <GradientText>CreatorHQ</GradientText>
          </h2>
        </motion.div>

        {/* Two Column Comparison */}
        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
          {/* LEFT — Pain Column */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={cn(
              "rounded-2xl border border-rose-200/60 bg-gradient-to-br from-rose-50/80 via-white to-rose-50/40 p-6 shadow-sm sm:p-8",
              "relative overflow-hidden"
            )}
          >
            {/* Subtle background pattern */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-rose-100/40 blur-2xl" />

            <div className="relative">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
                  <X className="h-5 w-5 text-rose-500" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">
                  Without CreatorHQ
                </h3>
              </div>

              <ul className="space-y-3">
                {painPoints.map((point, i) => (
                  <motion.li
                    key={point}
                    custom={i}
                    variants={staggerItem}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-rose-100/80">
                      <X className="h-3.5 w-3.5 text-rose-500" />
                    </div>
                    <span className="text-[15px] leading-relaxed text-[#64748B]">
                      {point}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* CENTER — Arrow divider (desktop only) */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:flex">
            {/* This is positioned via the parent grid; we use a visually hidden approach */}
          </div>

          {/* RIGHT — Solution Column */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={cn(
              "rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/40 p-6 shadow-sm sm:p-8",
              "relative overflow-hidden"
            )}
          >
            {/* Subtle background pattern */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-100/40 blur-2xl" />

            <div className="relative">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                  <Check className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">
                  With CreatorHQ
                </h3>
              </div>

              <ul className="space-y-3">
                {benefits.map((point, i) => (
                  <motion.li
                    key={point}
                    custom={i + 2}
                    variants={staggerItem}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100/80">
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                    <span className="text-[15px] font-medium leading-relaxed text-[#0F172A]">
                      {point}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Bottom arrow / CTA hint */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-10 flex items-center justify-center gap-2 text-sm text-[#64748B]"
        >
          <span>Ready to make the switch?</span>
          <ArrowRight className="h-4 w-4 text-[#7C3AED]" />
        </motion.div>
      </div>
    </section>
  );
}
