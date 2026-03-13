"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useCreatorData } from "@/lib/hooks/use-creator-data";
import { formatCurrency } from "@/lib/utils/format";

interface TooltipPayloadItem {
  payload: {
    source: string;
    amount: number;
    percentage: number;
    color: string;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  return (
    <div className="rounded-lg border bg-card p-3 shadow-md">
      <p className="text-sm font-medium">{data.source}</p>
      <p className="text-sm text-muted-foreground">
        {formatCurrency(data.amount)} ({data.percentage.toFixed(1)}%)
      </p>
    </div>
  );
}

export function RevenueBySource() {
  const { revenueBySource } = useCreatorData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue by Source</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={revenueBySource}
              layout="vertical"
              margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
            >
              <XAxis
                type="number"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                className="text-muted-foreground"
              />
              <YAxis
                type="category"
                dataKey="source"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={100}
                className="text-muted-foreground"
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--muted))", opacity: 0.5 }} />
              <Bar dataKey="amount" radius={[0, 4, 4, 0]} barSize={24} label={{ position: "right", fontSize: 11, formatter: (v: unknown) => formatCurrency(Number(v)) }}>
                {revenueBySource.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
