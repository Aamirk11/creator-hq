"use client";

import { Check, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/shared";
import { formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils";
import type { QuarterlyPayment } from "@/lib/types";

interface QuarterlyTrackerProps {
  quarterlyPayments: QuarterlyPayment[];
}

function formatDueDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function QuarterlyTracker({ quarterlyPayments }: QuarterlyTrackerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quarterly Payments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {quarterlyPayments.map((payment) => (
          <div
            key={payment.quarter}
            className={cn(
              "rounded-lg border p-4",
              payment.paid
                ? "border-emerald-500/20 bg-emerald-500/5"
                : "border-[#F59E0B]/30 bg-[#F59E0B]/5"
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {payment.paid ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-[#F59E0B]" />
                )}
                <span className="font-medium text-sm text-[#0F172A]">
                  {payment.quarter}
                </span>
              </div>
              <StatusBadge status={payment.paid ? "paid" : "due"} />
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-bold text-[#0F172A]">
                {formatCurrency(payment.amount)}
              </span>
              <span className="text-xs text-muted-foreground">
                Due {formatDueDate(payment.dueDate)}
              </span>
            </div>

            <Progress
              value={payment.paid ? 100 : 0}
              className={cn(
                "h-2",
                payment.paid
                  ? "[&>[data-slot=progress-indicator]]:bg-emerald-500"
                  : "[&>[data-slot=progress-indicator]]:bg-[#F59E0B]"
              )}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
