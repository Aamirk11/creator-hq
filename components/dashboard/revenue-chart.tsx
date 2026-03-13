"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useCreatorData } from "@/lib/hooks/use-creator-data";
import { formatCurrency } from "@/lib/utils/format";

const AREA_CONFIG = [
  { dataKey: "youtube", color: "#FF0000", label: "YouTube" },
  { dataKey: "tiktok", color: "#00F2EA", label: "TikTok" },
  { dataKey: "sponsorships", color: "#7C3AED", label: "Sponsorships" },
  { dataKey: "patreon", color: "#FF424D", label: "Patreon" },
  { dataKey: "instagram", color: "#E4405F", label: "Instagram" },
  { dataKey: "affiliates", color: "#10B981", label: "Affiliates" },
];

interface TooltipPayloadItem {
  dataKey: string;
  value: number;
  color: string;
  name: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const total = payload.reduce((sum, entry) => sum + (entry.value || 0), 0);

  return (
    <div className="rounded-lg border bg-card p-3 shadow-md">
      <p className="text-sm font-medium mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}</span>
          </div>
          <span className="font-medium">{formatCurrency(entry.value)}</span>
        </div>
      ))}
      <div className="mt-2 border-t pt-2 flex justify-between text-sm font-semibold">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );
}

export function RevenueChart() {
  const { monthlyRevenue } = useCreatorData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Last 12 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyRevenue} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <defs>
                {AREA_CONFIG.map(({ dataKey, color }) => (
                  <linearGradient key={dataKey} id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={color} stopOpacity={0.05} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" strokeOpacity={0.4} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                className="text-muted-foreground"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
              />
              {AREA_CONFIG.map(({ dataKey, color, label }) => (
                <Area
                  key={dataKey}
                  type="monotone"
                  dataKey={dataKey}
                  name={label}
                  stackId="1"
                  stroke={color}
                  strokeWidth={2}
                  fill={`url(#gradient-${dataKey})`}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
