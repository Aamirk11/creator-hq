"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number;
  change: number;
  prefix?: string;
  suffix?: string;
}

export function StatCard({ label, value, change, prefix, suffix }: StatCardProps) {
  const isPositive = change >= 0;

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-l-2 border-l-[#7C3AED]/70 hover:border-l-[#6D28D9]"
      )}
    >
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        <div className="text-xl font-bold tracking-tight text-[#0F172A]">
          <AnimatedCounter
            value={value}
            prefix={prefix}
            suffix={suffix}
          />
        </div>
        <div
          className={cn(
            "flex items-center gap-1 mt-1.5 text-xs font-semibold",
            isPositive ? "text-[#10B981]" : "text-[#F43F5E]"
          )}
        >
          {isPositive ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span>
            {isPositive ? "+" : ""}
            {change.toFixed(1)}%
          </span>
          <span className="text-muted-foreground font-normal">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
