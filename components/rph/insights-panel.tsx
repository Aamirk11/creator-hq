"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCreatorData } from "@/lib/hooks/use-creator-data";
import { calculatePlatformAvgRPH } from "@/lib/utils/calculations";

export function InsightsPanel() {
  const { contentPieces } = useCreatorData();

  const tiktokAvg = calculatePlatformAvgRPH(contentPieces, "tiktok");
  const youtubeAvg = calculatePlatformAvgRPH(contentPieces, "youtube");
  const ratio = youtubeAvg > 0 ? (tiktokAvg / youtubeAvg).toFixed(1) : "0";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card className="relative overflow-hidden border-l-4 border-l-[#7C3AED] bg-[#7C3AED]/[0.03] p-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C3AED]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="relative flex items-start gap-4">
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#7C3AED]/10">
            <Sparkles className="w-5 h-5 text-[#7C3AED]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-[#0F172A]">AI Insight</h3>
              <Badge className="bg-[#7C3AED]/10 text-[#7C3AED] hover:bg-[#7C3AED]/15 border-0 text-xs font-semibold">
                Pro
              </Badge>
            </div>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Your short-form content earns{" "}
              <span className="font-semibold text-[#0F172A]">{ratio}x more per hour</span>{" "}
              than long-form. Consider shifting 2 YouTube deep-dives to 8
              TikToks — free up ~80 hours and earn ~$6,700 more.
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
