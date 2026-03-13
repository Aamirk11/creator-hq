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

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: ChartPayload }>;
}) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-white border border-border rounded-lg shadow-lg p-3 text-sm max-w-[280px]">
      <p className="font-semibold text-[#0F172A] mb-1 truncate">{data.fullTitle}</p>
      <div className="space-y-0.5 text-[#64748B]">
        <p>
          <span className="font-medium text-[#0F172A]">{formatCurrency(data.rph)}/hr</span>
        </p>
        <p>
          {formatCurrency(data.revenue)} revenue in {data.hours}h
        </p>
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
                  fill={getPlatformColor(entry.platform)}
                  fillOpacity={0.85}
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
