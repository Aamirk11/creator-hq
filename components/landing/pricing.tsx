"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRICING_TIERS } from "@/lib/utils/constants";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-[#64748B]">
            Start free. Upgrade when you are ready to go pro.
          </p>
        </div>

        {/* Pricing cards */}
        <motion.div
          ref={ref}
          className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {PRICING_TIERS.map((tier) => (
            <motion.div
              key={tier.name}
              variants={cardVariants}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-white p-6 transition-shadow duration-300",
                tier.popular
                  ? "border-[#7C3AED] shadow-xl shadow-[#7C3AED]/10 ring-1 ring-[#7C3AED]/30 lg:-translate-y-2"
                  : "border-[#E2E8F0] hover:shadow-lg"
              )}
            >
              {/* Popular badge */}
              {tier.popular && (
                <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#7C3AED] px-3 py-0.5 text-xs font-semibold text-white">
                  Most Popular
                </Badge>
              )}

              {/* Tier name & description */}
              <h3 className="text-lg font-semibold text-[#0F172A]">
                {tier.name}
              </h3>
              <p className="mt-1 text-sm text-[#64748B]">{tier.description}</p>

              {/* Price */}
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-[#0F172A]">
                  ${tier.price}
                </span>
                {tier.price > 0 && (
                  <span className="text-sm font-medium text-[#64748B]">
                    /mo
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        tier.popular ? "text-[#7C3AED]" : "text-[#10B981]"
                      )}
                    />
                    <span className="text-sm text-[#0F172A]">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA button */}
              <Button
                asChild
                variant={tier.popular ? "default" : "outline"}
                className={cn(
                  "mt-8 h-11 w-full rounded-full text-sm font-semibold",
                  tier.popular &&
                    "bg-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/25 hover:bg-[#6D28D9]"
                )}
              >
                <a href="#waitlist">{tier.cta}</a>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
