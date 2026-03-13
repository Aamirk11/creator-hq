"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const BENEFIT_PILLS = [
  "\u2713 Free forever plan",
  "\u2713 No credit card",
  "\u2713 Cancel anytime",
];

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState("");
  const [revenue, setRevenue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    localStorage.setItem(
      "waitlist",
      JSON.stringify({ email, platform, revenue, timestamp: new Date().toISOString() })
    );
    toast.success("You're on the waitlist! Check your email for next steps.");
    setSubmitted(true);
  };

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden py-16 sm:py-20"
    >
      <style jsx>{`
        @keyframes waitlist-border-spin {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .waitlist-gradient-border {
          position: relative;
        }
        .waitlist-gradient-border::before {
          content: '';
          position: absolute;
          inset: -1.5px;
          border-radius: 1rem;
          padding: 1.5px;
          background: linear-gradient(
            270deg,
            rgba(124,58,237,0.4),
            rgba(236,72,153,0.3),
            rgba(59,130,246,0.2),
            rgba(236,72,153,0.3),
            rgba(124,58,237,0.4)
          );
          background-size: 300% 300%;
          animation: waitlist-border-spin 6s ease infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        @keyframes btn-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .btn-shimmer-hover:hover {
          background-image: linear-gradient(
            110deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0) 40%,
            rgba(255,255,255,0.25) 50%,
            rgba(255,255,255,0) 60%,
            rgba(255,255,255,0) 100%
          );
          background-size: 200% 100%;
          animation: btn-shimmer 2s ease-in-out infinite;
        }
      `}</style>

      {/* Purple gradient background tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7C3AED]/[0.04] via-[#7C3AED]/[0.06] to-[#EC4899]/[0.03]" />

      {/* Gradient accent blob */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-gradient-to-b from-[#7C3AED]/8 via-[#EC4899]/5 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
            Join 2,400+ Creators Already on the Waitlist
          </h2>
          <p className="mt-4 text-lg text-[#64748B]">
            Get early access + lifetime Pro pricing when we launch.
          </p>

          {/* Benefit pills */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {BENEFIT_PILLS.map((pill) => (
              <span
                key={pill}
                className="rounded-full bg-[#7C3AED]/8 px-3.5 py-1.5 text-xs font-medium text-[#7C3AED]"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {submitted ? (
          <motion.div
            className="mx-auto mt-10 flex max-w-md flex-col items-center rounded-2xl border border-[#10B981]/30 bg-[#10B981]/5 p-8 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <CheckCircle2 className="size-12 text-[#10B981]" />
            <h3 className="mt-4 text-xl font-bold text-[#0F172A]">
              You&apos;re in! 🎉
            </h3>
            <p className="mt-2 text-sm text-[#64748B]">
              Check your email for next steps.
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="waitlist-gradient-border mx-auto mt-10 flex max-w-md flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Email */}
            <div>
              <label
                htmlFor="waitlist-email"
                className="mb-1.5 block text-sm font-medium text-[#0F172A]"
              >
                Email address <span className="text-[#F43F5E]">*</span>
              </label>
              <Input
                id="waitlist-email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
              />
            </div>

            {/* Primary Platform */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
                Primary Platform
              </label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger className="h-11 w-full">
                  <SelectValue placeholder="Select your main platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Monthly Revenue Range */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#0F172A]">
                Monthly Revenue Range
              </label>
              <Select value={revenue} onValueChange={setRevenue}>
                <SelectTrigger className="h-11 w-full">
                  <SelectValue placeholder="Select your revenue range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-1k">Under $1K</SelectItem>
                  <SelectItem value="1k-5k">$1K - $5K</SelectItem>
                  <SelectItem value="5k-20k">$5K - $20K</SelectItem>
                  <SelectItem value="20k-plus">$20K+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="btn-shimmer-hover mt-2 h-12 w-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-base font-semibold text-white shadow-lg shadow-[#7C3AED]/25 transition-all hover:shadow-xl hover:shadow-[#7C3AED]/30 hover:brightness-110"
            >
              Get Early Access
              <ArrowRight className="ml-2 size-4" />
            </Button>

            <p className="text-center text-xs text-[#64748B]">
              We&apos;ll never spam you. Unsubscribe anytime.
            </p>
          </motion.form>
        )}
      </div>
    </section>
  );
}
