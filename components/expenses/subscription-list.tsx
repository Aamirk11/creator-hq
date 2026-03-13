"use client";

import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Subscription, ExpenseCategory } from "@/lib/types";

const categoryColors: Record<ExpenseCategory, string> = {
  software: "bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/20",
  equipment: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "home-office": "bg-amber-500/10 text-amber-600 border-amber-500/20",
  contractors: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  education: "bg-pink-500/10 text-pink-600 border-pink-500/20",
  travel: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  misc: "bg-muted text-muted-foreground border-border",
};

interface SubscriptionListProps {
  subscriptions: Subscription[];
}

export function SubscriptionList({ subscriptions }: SubscriptionListProps) {
  const activeSubscriptions = subscriptions.filter((s) => s.active);
  const totalMonthly = activeSubscriptions.reduce((sum, s) => sum + s.amount, 0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Recurring Subscriptions</CardTitle>
          <span className="text-sm font-semibold text-[#7C3AED]">
            {formatCurrency(totalMonthly)}/mo
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {activeSubscriptions.map((sub) => (
          <div
            key={sub.id}
            className="flex items-center justify-between py-2 border-b last:border-0"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium">{sub.name}</p>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={cn(
                    "capitalize font-medium text-xs",
                    categoryColors[sub.category]
                  )}
                >
                  {sub.category.replace("-", " ")}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Next:{" "}
                  {new Date(sub.nextBilling).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
            <span className="text-sm font-semibold">
              {formatCurrency(sub.amount)}/mo
            </span>
          </div>
        ))}
        {activeSubscriptions.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No active subscriptions.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
