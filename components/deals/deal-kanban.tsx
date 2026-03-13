"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/format";
import { BrandDeal, DealStatus } from "@/lib/types";
import { Clock, FileText } from "lucide-react";
import { toast } from "sonner";

const columns: { status: DealStatus; label: string; color: string }[] = [
  { status: "prospect", label: "Prospect", color: "bg-muted" },
  { status: "pitched", label: "Pitched", color: "bg-blue-500" },
  { status: "negotiating", label: "Negotiating", color: "bg-amber-500" },
  { status: "completed", label: "Completed", color: "bg-emerald-500" },
];

const statusInitialColors: Record<string, string> = {
  prospect: "bg-muted text-muted-foreground",
  pitched: "bg-blue-500/20 text-blue-700",
  negotiating: "bg-amber-500/20 text-amber-700",
  completed: "bg-emerald-500/20 text-emerald-700",
};

interface DealKanbanProps {
  deals: BrandDeal[];
}

function KanbanCard({ deal }: { deal: BrandDeal }) {
  return (
    <Card
      className="p-3 hover:shadow-sm transition-shadow cursor-pointer"
      onClick={() => toast.info("Drag & drop coming soon! Click 'Draft Pitch' on the card to take action.")}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
            statusInitialColors[deal.status]
          )}
        >
          {deal.brandInitials}
        </div>
        <div className="min-w-0">
          <p className="font-medium text-sm text-[#0F172A] truncate">
            {deal.brandName}
          </p>
          <p className="text-[11px] text-[#64748B]">{deal.industry}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-bold text-[#0F172A]">
          {formatCurrency(deal.value)}
        </span>
      </div>

      <div className="flex items-center justify-between text-[#64748B]">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span className="text-[11px]">
            {deal.daysSinceActivity}d ago
          </span>
        </div>
        <div className="flex items-center gap-1">
          <FileText className="w-3 h-3" />
          <span className="text-[11px]">
            {deal.deliverables.length} deliverable
            {deal.deliverables.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </Card>
  );
}

export function DealKanban({ deals }: DealKanbanProps) {
  const grouped = columns.map((col) => ({
    ...col,
    deals: deals.filter((d) => d.status === col.status),
  }));

  return (
    <ScrollArea className="w-full">
      <div className="flex gap-4 pb-4 min-w-[900px]">
        {grouped.map((col) => (
          <div key={col.status} className="flex-1 min-w-[220px]">
            {/* Column header */}
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className={cn("w-2 h-2 rounded-full", col.color)} />
              <h3 className="text-sm font-semibold text-[#0F172A]">
                {col.label}
              </h3>
              <Badge
                variant="secondary"
                className="text-[10px] h-5 px-1.5 font-medium"
              >
                {col.deals.length}
              </Badge>
            </div>

            {/* Column cards */}
            <div className="space-y-2.5 bg-muted/30 rounded-lg p-2 min-h-[200px]">
              {col.deals.length === 0 ? (
                <p className="text-xs text-[#64748B] text-center py-8">
                  No deals
                </p>
              ) : (
                col.deals.map((deal) => (
                  <KanbanCard key={deal.id} deal={deal} />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
