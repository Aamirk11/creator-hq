"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    quote:
      "CreatorHQ showed me my TikToks earn 10x more per hour than YouTube. I shifted my strategy and doubled my income.",
    name: "Alex Rivera",
    role: "230K lifestyle creator",
    initials: "AR",
    color: "bg-[#7C3AED]",
  },
  {
    quote:
      "The tax center alone saved me $4,200 last year. I had no idea I was missing so many deductions.",
    name: "Jordan Blake",
    role: "89K fitness creator",
    initials: "JB",
    color: "bg-[#EC4899]",
  },
  {
    quote:
      "I finally know my actual hourly rate. Turns out my 'hobby' content earns more than my day job ever did.",
    name: "Sam Chen",
    role: "45K tech creator",
    initials: "SC",
    color: "bg-[#10B981]",
  },
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

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#FAFAFA] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
            Loved by Creators
          </h2>
          <p className="mt-4 text-lg text-[#64748B]">
            Hear from creators who took control of their business.
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
      </div>
    </section>
  );
}
