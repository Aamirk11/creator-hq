"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "@/components/shared";

const barHeights = [40, 55, 35, 65, 50, 80, 60, 90, 70, 95, 75, 85];

const containerVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.08,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const barVariants = {
  hidden: { scaleY: 0 },
  visible: (i: number) => ({
    scaleY: 1,
    transition: {
      duration: 0.6,
      delay: 0.3 + i * 0.06,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const stats = [
  { label: "Revenue", value: 8247, prefix: "$", change: "+12%", positive: true },
  { label: "$/Hour", value: 312, prefix: "$", change: "+15.7%", positive: true },
  { label: "Pending", value: 2400, prefix: "$", change: null, positive: false },
  { label: "Content", value: 25, prefix: "", change: "pieces", positive: false },
];

const sidebarItems = [0, 1, 2, 3, 4];

export function DashboardPreview() {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50/60 via-white/40 to-white pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">
            See Everything at a Glance
          </h2>
          <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
            Your revenue, content performance, and business health — all in one
            place.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          className="mx-auto max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div
            className="rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden transition-transform duration-500 ease-out"
            style={{
              boxShadow: "0 20px 60px -15px rgba(124,58,237,0.3), 0 8px 24px -8px rgba(0,0,0,0.08)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "perspective(1200px) rotateX(2deg) rotateY(-1deg) scale(1.01)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";
            }}
          >
            {/* Purple gradient top border */}
            <div className="h-[3px] bg-gradient-to-r from-[#7C3AED] to-[#EC4899]" />

            {/* Browser top bar */}
            <div className="flex items-center px-4 py-2.5 bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              </div>
              <span className="flex-1 text-center text-xs font-medium text-[#64748B] tracking-wide">
                CreatorHQ Dashboard
              </span>
              <div className="w-[52px]" /> {/* Spacer to balance dots */}
            </div>

            {/* Dashboard body */}
            <div className="flex min-h-[340px] sm:min-h-[380px]">
              {/* Mini sidebar */}
              <div className="w-10 sm:w-12 bg-[#F8FAFC] border-r border-[#E2E8F0] flex flex-col items-center pt-4 gap-3">
                {sidebarItems.map((i) => (
                  <motion.div
                    key={i}
                    variants={childVariants}
                    className={cn(
                      "w-5 h-5 sm:w-6 sm:h-6 rounded-lg transition-colors",
                      i === 0
                        ? "bg-[#7C3AED] shadow-sm shadow-purple-200"
                        : "bg-[#E2E8F0]"
                    )}
                  />
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 p-3 sm:p-5 space-y-4">
                {/* Row 1: Stat cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      variants={childVariants}
                      className="rounded-xl border border-[#E2E8F0] bg-white p-2.5 sm:p-3 shadow-sm"
                    >
                      <p className="text-[10px] text-[#64748B] font-medium mb-0.5">
                        {stat.label}
                      </p>
                      <div className="flex items-baseline gap-1.5">
                        <AnimatedCounter
                          value={stat.value}
                          prefix={stat.prefix}
                          duration={1.8}
                          className="text-sm sm:text-base font-bold text-[#0F172A]"
                        />
                        {stat.change && (
                          <span
                            className={cn(
                              "text-[9px] sm:text-[10px] font-semibold",
                              stat.positive
                                ? "text-[#10B981]"
                                : "text-[#64748B]"
                            )}
                          >
                            {stat.change}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Row 2: Bar chart */}
                <motion.div
                  variants={childVariants}
                  className="rounded-xl border border-[#E2E8F0] bg-white p-3 sm:p-4 shadow-sm"
                >
                  <div className="flex items-end justify-between gap-1.5 sm:gap-2 h-24 sm:h-28 mb-2">
                    {barHeights.map((h, i) => (
                      <motion.div
                        key={i}
                        custom={i}
                        variants={barVariants}
                        className="flex-1 rounded-t-sm origin-bottom"
                        style={{
                          height: `${h}%`,
                          background: `linear-gradient(to top, #7C3AED, #EC4899)`,
                          opacity: 0.7 + (h / 95) * 0.3,
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-[#64748B] font-medium text-center">
                    Revenue — Last 12 Months
                  </p>
                </motion.div>

                {/* Row 3: RPH highlight */}
                <motion.div
                  variants={childVariants}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3"
                >
                  {/* TikTok block */}
                  <div className="flex-1 rounded-xl border border-[#E2E8F0] bg-white p-2.5 sm:p-3 shadow-sm">
                    <p className="text-[10px] text-[#64748B] font-medium mb-0.5">
                      TikTok Avg
                    </p>
                    <div className="flex items-baseline gap-1">
                      <AnimatedCounter
                        value={841}
                        prefix="$"
                        suffix="/hr"
                        duration={2}
                        className="text-sm sm:text-base font-bold text-[#10B981]"
                      />
                    </div>
                  </div>

                  {/* Multiplier badge */}
                  <div className="flex items-center justify-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-[10px] sm:text-xs font-bold tracking-wide">
                      13.4x
                    </span>
                  </div>

                  {/* YouTube block */}
                  <div className="flex-1 rounded-xl border border-[#E2E8F0] bg-white p-2.5 sm:p-3 shadow-sm">
                    <p className="text-[10px] text-[#64748B] font-medium mb-0.5">
                      YouTube Avg
                    </p>
                    <div className="flex items-baseline gap-1">
                      <AnimatedCounter
                        value={63}
                        prefix="$"
                        suffix="/hr"
                        duration={2}
                        className="text-sm sm:text-base font-bold text-[#64748B]"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Caption below mockup */}
        <motion.p
          className="text-center text-xs text-[#94A3B8] mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          This is real data from a creator on CreatorHQ.
        </motion.p>
      </div>
    </section>
  );
}
