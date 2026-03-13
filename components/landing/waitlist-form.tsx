"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState("");
  const [revenue, setRevenue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden bg-white py-20 sm:py-28"
    >
      {/* Gradient accent */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-gradient-to-b from-[#7C3AED]/5 via-[#EC4899]/3 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
            Ready to Take Control of Your Creator Business?
          </h2>
          <p className="mt-4 text-lg text-[#64748B]">
            Join the waitlist and be the first to get access.
          </p>
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
              You&apos;re on the list!
            </h3>
            <p className="mt-2 text-sm text-[#64748B]">
              We&apos;ll send you early access as soon as it&apos;s ready. Keep
              creating.
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 flex max-w-md flex-col gap-4"
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
              className="mt-2 h-12 w-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-base font-semibold text-white shadow-lg shadow-[#7C3AED]/25 transition-all hover:shadow-xl hover:shadow-[#7C3AED]/30 hover:brightness-110"
            >
              Join the Waitlist
              <ArrowRight className="ml-2 size-4" />
            </Button>

            <p className="text-center text-xs text-[#64748B]">
              No spam. Unsubscribe anytime.
            </p>
          </motion.form>
        )}
      </div>
    </section>
  );
}
