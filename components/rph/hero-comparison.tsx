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
      {/* Inline keyframes for TikTok card animations */}
      <style jsx>{`
        @keyframes hero-glow-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @keyframes hero-shine-sweep {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        @keyframes badge-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.06); }
        }
        @keyframes badge-pulse-mobile {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
      `}</style>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* TikTok Card — Winner */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="relative overflow-hidden border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 p-5 shadow-lg shadow-emerald-500/5">
            {/* Pulsing glow behind the card */}
            <div
              className="absolute inset-0 rounded-xl bg-emerald-500/20 blur-2xl pointer-events-none -z-10"
              style={{ animation: "hero-glow-pulse 3s ease-in-out infinite" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            {/* Shine sweep */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
            >
              <div
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                style={{ animation: "hero-shine-sweep 4s ease-in-out infinite" }}
              />
            </div>
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

        {/* YouTube Card — Muted / desaturated */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          <Card className="relative overflow-hidden border-border/40 bg-gradient-to-br from-muted/40 to-muted/60 p-5 shadow-sm opacity-75 saturate-[0.6]">
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF0000]/60" />
                <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
                  YouTube
                </span>
              </div>
              <p className={cn("text-5xl md:text-6xl font-black tracking-tight text-muted-foreground/80")}>
                {formatCurrency(youtubeAvg)}
                <span className="text-xl md:text-2xl font-semibold text-muted-foreground/60">/hr</span>
              </p>
              <p className="text-xs text-muted-foreground/60 mt-2">
                Average across {youtubeCount} pieces
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Center Badge — subtle pulse */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block"
        style={{ animation: "badge-pulse 2.5s ease-in-out infinite" }}
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
          style={{ animation: "badge-pulse-mobile 2.5s ease-in-out infinite" }}
        >
          {ratio}x more efficient
        </Badge>
      </motion.div>
    </div>
  );
}
