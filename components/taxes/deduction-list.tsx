"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils";
import type { Deduction } from "@/lib/types";

interface DeductionListProps {
  deductions: Deduction[];
}

export function DeductionList({ deductions }: DeductionListProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deductions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {deductions.map((deduction) => {
          const isExpanded = expandedCategories.has(deduction.category);

          return (
            <div key={deduction.category}>
              <button
                type="button"
                onClick={() => toggleCategory(deduction.category)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted/50"
                )}
              >
                <div className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="text-sm font-medium text-[#0F172A]">
                    {deduction.category}
                  </span>
                </div>
                <span className="text-sm font-semibold text-[#0F172A]">
                  {formatCurrency(deduction.amount)}
                </span>
              </button>

              {isExpanded && (
                <div className="ml-9 mb-2 space-y-1">
                  {deduction.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between rounded-md px-3 py-1.5 text-sm"
                    >
                      <span className="text-muted-foreground">{item.name}</span>
                      <span className="text-muted-foreground font-medium">
                        {formatCurrency(item.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Total */}
        <div className="border-t pt-3 mt-3 flex items-center justify-between px-3">
          <span className="text-sm font-bold text-[#0F172A]">
            Total Deductions
          </span>
          <span className="text-base font-bold text-[#7C3AED]">
            {formatCurrency(totalDeductions)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
