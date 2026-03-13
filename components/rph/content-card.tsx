"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";
import {
  formatCurrency,
  formatNumber,
  getRphColor,
  getPlatformColor,
  getPlatformLabel,
} from "@/lib/utils/format";
import type { ContentPiece } from "@/lib/types";

interface ContentCardProps {
  piece: ContentPiece;
  maxRph: number;
  avgRph?: number;
}

export function ContentCard({ piece, maxRph, avgRph = 0 }: ContentCardProps) {
  const barWidth = maxRph > 0 ? (piece.revenuePerHour / maxRph) * 100 : 0;
  const isHighValue = piece.revenuePerHour > 500;
  const isAboveAverage = avgRph > 0 && piece.revenuePerHour > avgRph;

  return (
    <>
      {isHighValue && (
        <style jsx>{`
          @keyframes rph-color-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}</style>
      )}
      <Card className="p-5 transition-all duration-200 group hover:scale-[1.02] hover:shadow-lg">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0 flex-1">
            <h4 className="font-medium text-sm text-[#0F172A] truncate group-hover:text-[#7C3AED] transition-colors">
              {piece.title}
            </h4>
            <Badge
              variant="secondary"
              className="text-[10px] font-medium mt-1.5"
              style={{
                backgroundColor: `${getPlatformColor(piece.platform)}15`,
                color: getPlatformColor(piece.platform),
              }}
            >
              {getPlatformLabel(piece.platform)}
            </Badge>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="flex items-center justify-end gap-1">
              <p
                className={cn("text-2xl font-bold tabular-nums", getRphColor(piece.revenuePerHour))}
                style={isHighValue ? { animation: "rph-color-pulse 2.5s ease-in-out infinite" } : undefined}
              >
                {formatCurrency(piece.revenuePerHour)}
              </p>
              {isAboveAverage && (
                <TrendingUp className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              )}
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">per hour</p>
          </div>
        </div>

        {/* RPH Bar */}
        <div className="w-full h-1.5 bg-muted rounded-full mb-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${barWidth}%`,
              backgroundColor: getPlatformColor(piece.platform),
              opacity: 0.7,
            }}
          />
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Hours</p>
            <p className="text-sm font-semibold tabular-nums">{piece.hoursSpent}h</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Revenue</p>
            <p className="text-sm font-semibold tabular-nums">{formatCurrency(piece.revenue)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Views</p>
            <p className="text-sm font-semibold tabular-nums">{formatNumber(piece.views)}</p>
          </div>
        </div>

        {(piece.likes > 0 || piece.comments > 0) && (
          <div className="flex items-center gap-3 mt-2 pt-2 border-t text-xs text-muted-foreground">
            {piece.likes > 0 && <span>{formatNumber(piece.likes)} likes</span>}
            {piece.comments > 0 && <span>{formatNumber(piece.comments)} comments</span>}
          </div>
        )}
      </Card>
    </>
  );
}
