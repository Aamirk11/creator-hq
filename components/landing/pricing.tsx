"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PRO_FEATURES = [
  "Unlimited platforms",
  "Revenue Per Hour tracking",
  "Brand deal finder",
  "Tax center & deductions",
  "Expense tracking",
  "Priority support",
];

const TIERS = [
  {
    name: "Free",
    price: 0,
    annualPrice: 0,
    tagline: "Perfect for getting started",
    description: "Forever free — no credit card required.",
    features: [
      { label: "2 platform connections", included: true },
      { label: "Basic revenue dashboard", included: true },
      { label: "Monthly reports", included: true },
      { label: "Community support", included: true },
      { label: "Revenue Per Hour tracking", included: false },
      { label: "Brand deal finder", included: false },
      { label: "Tax center & deductions", included: false },
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: 29,
    annualPrice: 23,
    tagline: "For serious creators who want to grow",
    description: "Less than one brand deal covers a full year.",
    features: [
      { label: "Unlimited platforms", included: true },
      { label: "Revenue Per Hour tracking", included: true },
      { label: "Brand deal finder", included: true },
      { label: "Tax center & deductions", included: true },
      { label: "Expense tracking", included: true },
      { label: "Priority support", included: true },
      { label: "Custom reports & exports", included: false },
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Business",
    price: 49,
    annualPrice: 39,
    tagline: "For teams & agencies",
    description: "Everything you need to scale.",
    features: [
      { label: "Everything in Pro", included: true },
      { label: "Team collaboration", included: true },
      { label: "Custom reports & exports", included: true },
      { label: "API access", included: true },
      { label: "Dedicated account manager", included: true },
      { label: "White-label options", included: true },
      { label: "SLA guarantee", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

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
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
            Start Free. Upgrade When You&apos;re Ready.
          </h2>
          <p className="mt-4 text-lg text-[#64748B]">
            No credit card required. No contracts. Cancel anytime.
          </p>

          {/* Annual toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                !annual ? "text-[#0F172A]" : "text-[#64748B]"
              )}
            >
              Monthly
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={annual}
              onClick={() => setAnnual(!annual)}
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200",
                annual ? "bg-[#7C3AED]" : "bg-[#CBD5E1]"
              )}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block size-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200",
                  annual ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                annual ? "text-[#0F172A]" : "text-[#64748B]"
              )}
            >
              Annual
            </span>
            {annual && (
              <Badge className="bg-[#10B981]/10 text-[#10B981] text-xs font-semibold border-0">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing cards */}
        <motion.div
          ref={ref}
          className="mx-auto mt-14 grid max-w-5xl grid-cols-1 items-center gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {TIERS.map((tier) => {
            const displayPrice = annual ? tier.annualPrice : tier.price;

            return (
              <motion.div
                key={tier.name}
                variants={cardVariants}
                className={cn(
                  "relative flex flex-col rounded-2xl border bg-white p-6 transition-shadow duration-300",
                  tier.popular
                    ? "border-[#7C3AED] shadow-xl shadow-[#7C3AED]/10 ring-1 ring-[#7C3AED]/30 lg:scale-105 lg:z-10"
                    : "border-[#E2E8F0] hover:shadow-lg"
                )}
              >
                {/* Popular badge */}
                {tier.popular && (
                  <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#7C3AED] px-3 py-0.5 text-xs font-semibold text-white">
                    Most Popular
                  </Badge>
                )}

                {/* Purple gradient top border for Pro */}
                {tier.popular && (
                  <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899]" />
                )}

                {/* Tier name & description */}
                <h3 className="text-lg font-semibold text-[#0F172A]">
                  {tier.name}
                </h3>
                <p className="mt-1 text-sm text-[#64748B]">{tier.tagline}</p>

                {/* Price */}
                <div className="mt-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold tracking-tight text-[#0F172A]">
                      ${displayPrice}
                    </span>
                    {displayPrice > 0 && (
                      <span className="text-sm font-medium text-[#64748B]">
                        /mo
                      </span>
                    )}
                  </div>
                  {displayPrice === 0 && (
                    <p className="mt-1 text-sm font-medium text-[#10B981]">
                      Forever free
                    </p>
                  )}
                  {tier.popular && (
                    <p className="mt-1.5 text-xs text-[#64748B]">
                      {tier.description}
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature.label}
                      className="flex items-start gap-2.5"
                    >
                      {feature.included ? (
                        <Check className="mt-0.5 size-4 shrink-0 text-[#10B981]" />
                      ) : (
                        <X className="mt-0.5 size-4 shrink-0 text-[#CBD5E1]" />
                      )}
                      <span
                        className={cn(
                          "text-sm",
                          feature.included
                            ? "text-[#0F172A]"
                            : "text-[#94A3B8]"
                        )}
                      >
                        {feature.label}
                      </span>
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
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
