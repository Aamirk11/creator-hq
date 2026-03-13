"use client";

import { motion } from "framer-motion";
import { Link, Clock, TrendingUp } from "lucide-react";
import { GradientText } from "@/components/shared";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    number: 1,
    title: "Connect Your Platforms",
    icon: Link,
    description:
      "Link YouTube, TikTok, Instagram, and Patreon in one click. We pull your revenue data automatically.",
    note: "Takes 30 seconds",
  },
  {
    number: 2,
    title: "Log Your Time",
    icon: Clock,
    description:
      "Tell us how long each piece of content took. Ideation, filming, editing \u2014 break it down or give us a total.",
    note: "2 minutes per piece",
  },
  {
    number: 3,
    title: "See Your Real Rate",
    icon: TrendingUp,
    description:
      "Instantly see your revenue per hour for every piece of content. Discover which content actually makes money.",
    note: "Instant insights",
  },
];

const sectionFade = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const stepReveal = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAFA] py-20 sm:py-28">
      {/* Background accent */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-gradient-to-br from-[#7C3AED]/5 via-[#EC4899]/3 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionFade}
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
            Up and Running in{" "}
            <GradientText className="text-3xl font-extrabold sm:text-4xl">
              3 Minutes
            </GradientText>
          </h2>
          <p className="mt-4 text-lg text-[#64748B]">
            No spreadsheets. No manual entry. No learning curve.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="relative mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {/* Dashed connector line (desktop only) */}
          <div className="pointer-events-none absolute top-[2.75rem] left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] hidden md:block">
            <div className="h-[2px] w-full border-t-2 border-dashed border-[#7C3AED]/25" />
          </div>

          {STEPS.map(({ number, title, icon: Icon, description, note }) => (
            <motion.div
              key={number}
              variants={stepReveal}
              className="relative flex flex-col items-center text-center"
            >
              {/* Number circle */}
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] text-xl font-bold text-white shadow-lg shadow-[#7C3AED]/20">
                {number}
              </div>

              {/* Icon */}
              <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#7C3AED]/10">
                <Icon className="h-6 w-6 text-[#7C3AED]" />
              </div>

              {/* Title */}
              <h3 className="mt-4 text-lg font-bold text-[#0F172A]">
                {title}
              </h3>

              {/* Description */}
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#64748B]">
                {description}
              </p>

              {/* Time note */}
              <span className="mt-3 inline-flex items-center rounded-full bg-[#10B981]/10 px-3 py-1 text-xs font-semibold text-[#10B981]">
                {note}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
