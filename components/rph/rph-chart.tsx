"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card } from "@/components/ui/card";
import { getPlatformColor, formatCurrency } from "@/lib/utils/format";
import type { ContentPiece } from "@/lib/types";

interface RphChartProps {
  pieces: ContentPiece[];
}

function truncateTitle(title: string, maxLen: number = 28): string {
  return title.length > maxLen ? title.slice(0, maxLen) + "..." : title;
}

interface ChartPayload {
  title: string;
  fullTitle: string;
  rph: number;
  platform: string;
  revenue: number;
  hours: number;
}

/* Unique gradient IDs per platform to avoid collisions */
const PLATFORM_GRADIENT_MAP: Record<string, { id: string; lightColor: string }> = {
  youtube: { id: "grad-youtube", lightColor: "#FF6B6B" },
  tiktok: { id: "grad-tiktok", lightColor: "#5CFACA" },
  instagram: { id: "grad-instagram", lightColor: "#F0A0F0" },
  blog: { id: "grad-blog", lightColor: "#93C5FD" },
};

function getGradientId(platform: string): string {
  return PLATFORM_GRADIENT_MAP[platform]?.id ?? "grad-default";
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: ChartPayload }>;
}) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  const platformColor = getPlatformColor(data.platform);
  return (
    <div className="bg-white border border-border rounded-xl shadow-xl p-4 text-sm max-w-[300px]">
      <p className="font-semibold text-[#0F172A] mb-2 leading-snug">{data.fullTitle}</p>
      <div className="space-y-1.5 text-[#64748B]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: platformColor }} />
          <span className="capitalize text-xs font-medium">{data.platform}</span>
        </div>
        <p className="text-base font-bold text-[#0F172A]">{formatCurrency(data.rph)}/hr</p>
        <div className="flex items-center justify-between text-xs pt-1 border-t border-border/50">
          <span>Revenue: <span className="font-medium text-[#0F172A]">{formatCurrency(data.revenue)}</span></span>
          <span>Hours: <span className="font-medium text-[#0F172A]">{data.hours}h</span></span>
        </div>
      </div>
    </div>
  );
}

export function RphChart({ pieces }: RphChartProps) {
  const data = useMemo(() => {
    return [...pieces]
      .sort((a, b) => a.revenuePerHour - b.revenuePerHour)
      .map((piece) => ({
        title: truncateTitle(piece.title),
        fullTitle: piece.title,
        rph: piece.revenuePerHour,
        platform: piece.platform,
        revenue: piece.revenue,
        hours: piece.hoursSpent,
      }));
  }, [pieces]);

  const chartHeight = Math.max(600, pieces.length * 34);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-[#0F172A] mb-6">
        Revenue Per Hour by Content
      </h3>
      <div style={{ height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 0, right: 30, left: 10, bottom: 0 }}
          >
            {/* Gradient definitions */}
            <defs>
              {Object.entries(PLATFORM_GRADIENT_MAP).map(([platform, { id, lightColor }]) => (
                <linearGradient key={id} id={id} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={lightColor} stopOpacity={0.7} />
                  <stop offset="100%" stopColor={getPlatformColor(platform)} stopOpacity={0.95} />
                </linearGradient>
              ))}
              <linearGradient id="grad-default" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#94A3B8" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#64748B" stopOpacity={0.9} />
              </linearGradient>
            </defs>

            <XAxis
              type="number"
              tickFormatter={(v: number) => `$${v}`}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748B" }}
            />
            <YAxis
              type="category"
              dataKey="title"
              width={200}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748B" }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
            <Bar dataKey="rph" radius={[0, 4, 4, 0]} barSize={22}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#${getGradientId(entry.platform)})`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-5 mt-4 pt-4 border-t">
        {[
          { platform: "youtube", label: "YouTube" },
          { platform: "tiktok", label: "TikTok" },
          { platform: "instagram", label: "Instagram" },
          { platform: "blog", label: "Blog" },
        ].map(({ platform, label }) => (
          <div key={platform} className="flex items-center gap-1.5 text-xs text-[#64748B]">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: getPlatformColor(platform) }}
            />
            {label}
          </div>
        ))}
      </div>
    </Card>
  );
}
