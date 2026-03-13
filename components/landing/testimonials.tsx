"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Users, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    quote:
      "I was spending 30+ hours a week on YouTube and barely clearing $15/hour. CreatorHQ showed me my Reels were earning $180/hour. I shifted my strategy and my income jumped 40% in two months.",
    name: "Alex Rivera",
    role: "230K lifestyle creator",
    initials: "AR",
    color: "bg-[#7C3AED]",
  },
  {
    quote:
      "The tax center found $4,200 in deductions I completely missed last year. My home office, my ring light, even my phone bill — all deductible. Paid for itself 10x over.",
    name: "Jordan Blake",
    role: "89K fitness creator",
    initials: "JB",
    color: "bg-[#10B981]",
  },
  {
    quote:
      "I used to say yes to every brand deal. CreatorHQ's rate calculator showed me I was charging 60% below market. My next three deals averaged $3,400 instead of $1,500.",
    name: "Sam Chen",
    role: "45K tech creator",
    initials: "SC",
    color: "bg-[#F59E0B]",
  },
];

const TRUST_METRICS = [
  { icon: Users, label: "2,400+ creators", description: "on the platform" },
  {
    icon: DollarSign,
    label: "$12M+ tracked",
    description: "in creator revenue",
  },
  { icon: Star, label: "4.9\u2605 average rating", description: "from users" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const metricVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, margin: "-40px" });

  return (
    <section className="bg-[#FAFAFA] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
            Creators Are Already Seeing Results
          </h2>
          <p className="mt-4 text-lg text-[#64748B]">
            Real creators. Real numbers. Real growth.
          </p>
        </div>

        {/* Testimonial cards */}
        <motion.div
          ref={ref}
          className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-shadow duration-300 hover:shadow-md"
            >
              {/* Star rating */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-[#F59E0B] text-[#F59E0B]"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-[#0F172A]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="mt-5 flex items-center gap-3">
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full text-xs font-bold text-white",
                    t.color
                  )}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">
                    {t.name}
                  </p>
                  <p className="text-xs text-[#64748B]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust metrics bar */}
        <motion.div
          ref={metricsRef}
          className="mx-auto mt-14 flex max-w-3xl flex-col items-center justify-center gap-8 rounded-2xl border border-[#E2E8F0] bg-white px-8 py-6 sm:flex-row sm:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={metricsInView ? "visible" : "hidden"}
        >
          {TRUST_METRICS.map((metric, idx) => (
            <motion.div
              key={metric.label}
              variants={metricVariants}
              className={cn(
                "flex items-center gap-3 text-center sm:text-left",
                idx < TRUST_METRICS.length - 1 &&
                  "sm:border-r sm:border-[#E2E8F0] sm:pr-12"
              )}
            >
              <metric.icon className="size-5 shrink-0 text-[#7C3AED]" />
              <div>
                <p className="text-lg font-bold text-[#0F172A]">
                  {metric.label}
                </p>
                <p className="text-xs text-[#64748B]">{metric.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
