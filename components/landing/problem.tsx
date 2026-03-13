"use client";

import { motion } from "framer-motion";
import { FileSpreadsheet, Clock, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";

const PAIN_POINTS = [
  {
    icon: FileSpreadsheet,
    title: "Spreadsheet Hell",
    description:
      "You're tracking revenue in Google Sheets, expenses in another tab, and tax estimates on a Post-it note. Every month you wonder: am I actually making money?",
  },
  {
    icon: Clock,
    title: "The $14/Hour Video",
    description:
      "You spent 22 hours on that 'masterpiece' YouTube video. It made $310. That's $14/hour — less than minimum wage. But you had no way to know that before you started.",
  },
  {
    icon: Receipt,
    title: "Tax Season Panic",
    description:
      "April rolls around and you're scrambling. How much did you earn? What can you deduct? Where are those receipts? You're a creator, not an accountant.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Problem() {
  return (
    <section className="relative bg-[#0F172A] py-16 sm:py-20">
      {/* Subtle top gradient blend */}
      <div className="pointer-events-none absolute inset-x-0 -top-1 h-24 bg-gradient-to-b from-[#FAFAFA] to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Sound Familiar?
          </h2>
        </motion.div>

        {/* Pain point cards */}
        <motion.div
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          {PAIN_POINTS.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className={cn(
                "group relative rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 backdrop-blur-sm",
                "transition-colors hover:border-[#7C3AED]/40 hover:bg-white/[0.08]"
              )}
            >
              {/* Icon */}
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#7C3AED]/10 text-[#7C3AED] ring-1 ring-[#7C3AED]/20">
                <Icon className="h-5 w-5" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white">{title}</h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing line */}
        <motion.p
          className="mt-10 text-center text-lg font-semibold text-white sm:text-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
        >
          CreatorHQ fixes all of this.{" "}
          <span className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent">
            In one dashboard.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
