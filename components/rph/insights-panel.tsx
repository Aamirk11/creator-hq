"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, X, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCreatorData } from "@/lib/hooks/use-creator-data";
import { calculatePlatformAvgRPH } from "@/lib/utils/calculations";
import { toast } from "sonner";

export function InsightsPanel() {
  const { contentPieces } = useCreatorData();
  const [dismissed, setDismissed] = useState(false);

  const tiktokAvg = calculatePlatformAvgRPH(contentPieces, "tiktok");
  const youtubeAvg = calculatePlatformAvgRPH(contentPieces, "youtube");
  const ratio = youtubeAvg > 0 ? (tiktokAvg / youtubeAvg).toFixed(1) : "0";

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      {/* Sparkle animation keyframes */}
      <style jsx>{`
        @keyframes insight-sparkle {
          0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
          25% { opacity: 0.6; transform: scale(0.85) rotate(-8deg); }
          50% { opacity: 1; transform: scale(1.15) rotate(4deg); }
          75% { opacity: 0.7; transform: scale(0.9) rotate(-4deg); }
        }
      `}</style>

      <Card className="relative overflow-hidden border-l-4 border-l-[#7C3AED] bg-[#7C3AED]/[0.03] p-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C3AED]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="relative flex items-start gap-4">
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#7C3AED]/10">
            <Sparkles
              className="w-5 h-5 text-[#7C3AED]"
              style={{ animation: "insight-sparkle 2.5s ease-in-out infinite" }}
            />
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

            {/* Action buttons */}
            <div className="flex items-center gap-2 mt-4">
              <Button
                size="sm"
                className="text-xs bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white gap-1.5"
                onClick={() => {
                  toast.success("Strategy shift applied! We'll track your progress.");
                }}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Apply Suggestion
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-[#64748B] hover:text-[#0F172A] gap-1.5"
                onClick={() => {
                  setDismissed(true);
                  toast.info("Insight dismissed.");
                }}
              >
                <X className="w-3.5 h-3.5" />
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
