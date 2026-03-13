"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/format";
import { BrandDeal } from "@/lib/types";
import { Clock, FileText, Sparkles } from "lucide-react";

const statusColors: Record<string, string> = {
  prospect: "bg-muted text-muted-foreground",
  pitched: "bg-blue-500/20 text-blue-700",
  negotiating: "bg-amber-500/20 text-amber-700",
  completed: "bg-emerald-500/20 text-emerald-700",
};

interface DealCardProps {
  deal: BrandDeal;
  onDraftPitch: (deal: BrandDeal) => void;
}

export function DealCard({ deal, onDraftPitch }: DealCardProps) {
  return (
    <Card className="group hover:shadow-md transition-all duration-200 border-border/60">
      <CardContent className="p-5">
        {/* Header: Brand info + Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold",
                statusColors[deal.status]
              )}
            >
              {deal.brandInitials}
            </div>
            <div>
              <h3 className="font-semibold text-[#0F172A] leading-tight">
                {deal.brandName}
              </h3>
              <p className="text-xs text-[#64748B]">{deal.industry}</p>
            </div>
          </div>
          <StatusBadge status={deal.status} />
        </div>

        {/* Match percentage bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-[#64748B]">
              Match Score
            </span>
            <span className="text-xs font-bold text-emerald-600">
              {deal.matchPercentage}%
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500"
              style={{ width: `${deal.matchPercentage}%` }}
            />
          </div>
        </div>

        {/* Match reasons as pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {deal.matchReasons.slice(0, 3).map((reason) => (
            <span
              key={reason}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#7C3AED]/8 text-[#7C3AED] border border-[#7C3AED]/15"
            >
              {reason}
            </span>
          ))}
        </div>

        {/* Value */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-[#0F172A]">
            {formatCurrency(deal.value)}
          </p>
          <p className="text-[10px] text-[#64748B]">
            Range: {formatCurrency(deal.suggestedRate.min)} &ndash;{" "}
            {formatCurrency(deal.suggestedRate.max)}
          </p>
        </div>

        {/* Deliverables */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {deal.deliverables.map((d) => (
            <span
              key={d}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-secondary text-secondary-foreground"
            >
              <FileText className="w-2.5 h-2.5" />
              {d}
            </span>
          ))}
        </div>

        {/* Days since activity */}
        <div className="flex items-center gap-1 mb-4 text-[#64748B]">
          <Clock className="w-3 h-3" />
          <span className="text-[11px]">
            {deal.daysSinceActivity === 0
              ? "Active today"
              : deal.daysSinceActivity === 1
                ? "1 day ago"
                : `${deal.daysSinceActivity} days ago`}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 text-xs">
            View Details
          </Button>
          <Button
            size="sm"
            className="flex-1 text-xs bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white"
            onClick={() => onDraftPitch(deal)}
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Draft Pitch
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
