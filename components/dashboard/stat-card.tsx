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
        "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
      )}
    >
      <CardContent className="pt-1">
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <div className="text-2xl font-bold tracking-tight text-[#0F172A]">
          <AnimatedCounter
            value={value}
            prefix={prefix}
            suffix={suffix}
          />
        </div>
        <div
          className={cn(
            "flex items-center gap-1 mt-2 text-sm font-medium",
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
