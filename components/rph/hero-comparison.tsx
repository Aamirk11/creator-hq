"use client";

import { motion } from "framer-motion";
import { useCreatorData } from "@/lib/hooks/use-creator-data";
import { calculatePlatformAvgRPH } from "@/lib/utils/calculations";
import { formatCurrency, getRphColor } from "@/lib/utils/format";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function HeroComparison() {
  const { contentPieces } = useCreatorData();

  const tiktokAvg = calculatePlatformAvgRPH(contentPieces, "tiktok");
  const youtubeAvg = calculatePlatformAvgRPH(contentPieces, "youtube");
  const ratio = youtubeAvg > 0 ? (tiktokAvg / youtubeAvg).toFixed(1) : "0";

  const tiktokCount = contentPieces.filter((c) => c.platform === "tiktok").length;
  const youtubeCount = contentPieces.filter((c) => c.platform === "youtube").length;

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* TikTok Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="relative overflow-hidden border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 p-5 shadow-lg shadow-emerald-500/5">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00F2EA]" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  TikTok
                </span>
              </div>
              <p className={cn("text-5xl md:text-6xl font-black tracking-tight", getRphColor(tiktokAvg))}>
                {formatCurrency(tiktokAvg)}
                <span className="text-xl md:text-2xl font-semibold text-muted-foreground">/hr</span>
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Average across {tiktokCount} pieces
              </p>
            </div>
          </Card>
        </motion.div>

        {/* YouTube Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          <Card className="relative overflow-hidden border-border/50 bg-gradient-to-br from-muted/30 to-muted/50 p-5 shadow-sm">
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF0000]" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  YouTube
                </span>
              </div>
              <p className={cn("text-5xl md:text-6xl font-black tracking-tight", getRphColor(youtubeAvg))}>
                {formatCurrency(youtubeAvg)}
                <span className="text-xl md:text-2xl font-semibold text-muted-foreground">/hr</span>
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Average across {youtubeCount} pieces
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Center Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block"
      >
        <Badge
          className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white text-sm font-bold px-4 py-2 shadow-lg shadow-[#7C3AED]/25 border-0"
        >
          {ratio}x more efficient
        </Badge>
      </motion.div>

      {/* Mobile Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="flex justify-center mt-4 md:hidden"
      >
        <Badge
          className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white text-sm font-bold px-4 py-2 shadow-lg shadow-[#7C3AED]/25 border-0"
        >
          {ratio}x more efficient
        </Badge>
      </motion.div>
    </div>
  );
}
