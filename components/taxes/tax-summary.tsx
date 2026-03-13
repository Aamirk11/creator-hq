import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils";
import type { TaxSummary as TaxSummaryType } from "@/lib/types";

interface TaxSummaryProps {
  taxSummary: TaxSummaryType;
}

export function TaxSummary({ taxSummary }: TaxSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>YTD Tax Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* YTD Income */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">YTD Income</p>
            <p className="text-3xl font-bold tracking-tight text-[#0F172A]">
              {formatCurrency(taxSummary.ytdIncome)}
            </p>
          </div>

          {/* Estimated Tax */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">Estimated Tax</p>
            <p className="text-2xl font-bold tracking-tight text-[#0F172A]">
              {formatCurrency(taxSummary.estimatedTax)}
            </p>
          </div>

          {/* Effective Rate */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">Effective Rate</p>
            <p className="text-2xl font-bold tracking-tight text-[#0F172A]">
              {taxSummary.effectiveRate}%
            </p>
          </div>
        </div>

        {/* Set aside recommendation */}
        <div
          className={cn(
            "rounded-lg border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-4 py-3"
          )}
        >
          <p className="text-sm font-medium text-[#92400E]">
            Set aside this month:{" "}
            <span className="font-bold">
              ~{formatCurrency(taxSummary.setAsideMonthly)}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
