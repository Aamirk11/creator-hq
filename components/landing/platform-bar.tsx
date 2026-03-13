"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PLATFORMS = [
  { name: "YouTube", color: "#FF0000" },
  { name: "TikTok", color: "#06B6D4" },
  { name: "Instagram", color: "#E1306C" },
  { name: "Patreon", color: "#FF424D" },
  { name: "Shopify", color: "#96BF48" },
  { name: "Twitch", color: "#9146FF" },
];

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemFade = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function PlatformBar() {
  return (
    <section className="relative border-y border-[#E2E8F0] bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.p
          className="mb-6 text-center text-sm font-medium text-[#64748B]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          Connects with all your platforms
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {PLATFORMS.map(({ name, color }) => (
            <motion.div
              key={name}
              variants={itemFade}
              className="group flex items-center gap-2.5 transition-opacity duration-200 opacity-60 hover:opacity-100"
            >
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm transition-transform duration-200 group-hover:scale-110"
                )}
                style={{ backgroundColor: color }}
              >
                {name.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-[#0F172A]">
                {name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
