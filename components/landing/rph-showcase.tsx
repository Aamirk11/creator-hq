"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Eye, Clock, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedCounter, GradientText } from "@/components/shared";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.45, duration: 0.5, ease: "easeOut" as const },
  },
};

export function RphShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="rph-showcase"
      className="relative overflow-hidden bg-gradient-to-b from-white to-[#F5F0FF] py-16 sm:py-20"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-gradient-to-tl from-[#7C3AED]/5 via-[#EC4899]/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute left-0 top-0 h-[300px] w-[400px] rounded-full bg-gradient-to-br from-[#7C3AED]/3 via-transparent to-transparent blur-3xl" />

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
            Same creator. Same month.{" "}
            <span className="font-semibold text-[#0F172A]">
              Wildly different returns on her time.
            </span>
          </p>
        </motion.div>

        {/* Comparison cards */}
        <motion.div
          className="mx-auto mt-10 grid max-w-4xl grid-cols-1 items-stretch gap-6 sm:grid-cols-[1fr_auto_1fr]"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* TikTok — winner */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="relative overflow-hidden rounded-2xl border-2 border-[#10B981]/40 bg-white p-8 shadow-xl shadow-[#10B981]/10 ring-1 ring-[#10B981]/20"
          >
            {/* Green glow */}
            <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-[#10B981]/8 via-transparent to-[#10B981]/8" />
            <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-[#10B981]/5 blur-xl" />

            <div className="relative flex h-full flex-col">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#10B981]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#10B981]">
                45-Second TikTok
              </span>

              <div className="mt-6 flex items-baseline gap-1">
                <AnimatedCounter
                  value={1129}
                  prefix="$"
                  duration={2.2}
                  className="text-6xl font-extrabold tracking-tight text-[#10B981] sm:text-7xl"
                />
                <span className="text-xl font-semibold text-[#10B981]/60">
                  /hour
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#64748B]">
                <span className="flex items-center gap-1.5">
                  <Eye className="size-4 text-[#10B981]" />
                  847K views
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-4 text-[#10B981]" />
                  0.75 hours of work
                </span>
                <span className="flex items-center gap-1.5">
                  <DollarSign className="size-4 text-[#10B981]" />
                  $847 earned
                </span>
              </div>

              <p className="mt-auto pt-6 text-sm font-semibold text-[#10B981]">
                This is why short-form is eating the internet.
              </p>
            </div>
          </motion.div>

          {/* 80x badge — center */}
          <motion.div
            variants={scaleIn}
            className="flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-1 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#EC4899] px-5 py-4 text-white shadow-lg shadow-[#7C3AED]/25">
              <span className="text-4xl font-black leading-none sm:text-5xl">
                80x
              </span>
              <span className="max-w-[5rem] text-center text-[10px] font-semibold uppercase leading-tight tracking-wider text-white/80">
                difference in earnings per hour
              </span>
            </div>
          </motion.div>

          {/* YouTube — loser */}
          <motion.div
            variants={fadeUp}
            custom={2}
            className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#FAFAFA] p-8"
          >
            <div className="relative flex h-full flex-col">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#64748B]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                22-Minute YouTube Deep Dive
              </span>

              <div className="mt-6 flex items-baseline gap-1">
                <AnimatedCounter
                  value={14}
                  prefix="$"
                  duration={1.5}
                  className="text-6xl font-extrabold tracking-tight text-[#94A3B8] sm:text-7xl"
                />
                <span className="text-xl font-semibold text-[#94A3B8]/50">
                  /hour
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#94A3B8]">
                <span className="flex items-center gap-1.5">
                  <Eye className="size-4" />
                  89K views
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-4" />
                  22 hours of work
                </span>
                <span className="flex items-center gap-1.5">
                  <DollarSign className="size-4" />
                  $310 earned
                </span>
              </div>

              <p className="mt-auto pt-6 text-sm font-medium text-[#94A3B8]">
                Not bad content. Just bad ROI on time.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-10 flex justify-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={3}
        >
          <Button
            size="lg"
            className="h-12 gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-8 text-base font-semibold text-white shadow-lg shadow-[#7C3AED]/25 transition-all hover:shadow-xl hover:shadow-[#7C3AED]/30"
          >
            See your own numbers
            <ArrowRight className="size-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
