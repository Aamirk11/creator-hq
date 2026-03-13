"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, TrendingDown, Clock, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

export function RphShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="rph-showcase"
      className="relative overflow-hidden bg-[#FAFAFA] py-20 sm:py-28"
    >
      {/* Background accent */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-gradient-to-tl from-[#7C3AED]/5 via-[#EC4899]/5 to-transparent blur-3xl" />

      <div
        ref={ref}
        className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        {/* Section heading */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
        >
          <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
            The Insight That Changes Everything
          </h2>
          <p className="mt-4 text-lg text-[#64748B]">
            Not all content is created equal. Revenue Per Hour reveals the truth.
          </p>
        </motion.div>

        {/* Comparison cards */}
        <motion.div
          className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* TikTok — winner */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="relative overflow-hidden rounded-2xl border-2 border-[#10B981]/40 bg-white p-6 shadow-lg shadow-[#10B981]/10 ring-1 ring-[#10B981]/20"
          >
            {/* Glow */}
            <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-[#10B981]/5 via-transparent to-[#10B981]/5" />

            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-[#10B981]/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[#10B981]">
                  TikTok
                </span>
                <TrendingUp className="size-4 text-[#10B981]" />
              </div>
              <p className="mt-3 text-sm font-medium text-[#64748B]">
                45-second skincare tip
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold tracking-tight text-[#10B981]">
                  $1,129
                </span>
                <span className="text-lg font-semibold text-[#10B981]/70">
                  /hr
                </span>
              </div>
              <div className="mt-4 flex items-center gap-4 text-xs text-[#64748B]">
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" />
                  0.8 hrs invested
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="size-3.5" />
                  $903 earned
                </span>
              </div>
            </div>
          </motion.div>

          {/* YouTube — comparison */}
          <motion.div
            variants={fadeUp}
            custom={2}
            className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-6"
          >
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-[#64748B]/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  YouTube
                </span>
                <TrendingDown className="size-4 text-[#64748B]" />
              </div>
              <p className="mt-3 text-sm font-medium text-[#64748B]">
                22-minute deep dive
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold tracking-tight text-[#64748B]">
                  $14
                </span>
                <span className="text-lg font-semibold text-[#64748B]/50">
                  /hr
                </span>
              </div>
              <div className="mt-4 flex items-center gap-4 text-xs text-[#64748B]">
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" />
                  18 hrs invested
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="size-3.5" />
                  $252 earned
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Punchline */}
        <motion.p
          className="mx-auto mt-10 max-w-xl text-center text-lg font-semibold text-[#0F172A]"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={3}
        >
          Same creator. Same month.{" "}
          <span className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent">
            80x difference
          </span>{" "}
          in hourly earnings.
        </motion.p>
      </div>
    </section>
  );
}
