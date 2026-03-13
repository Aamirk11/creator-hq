"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, LayoutList } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import {
  HeroComparison,
  InsightsPanel,
  ContentTable,
  RphChart,
  ContentCard,
  TimeLogger,
} from "@/components/rph";
import { useCreatorData } from "@/lib/hooks/use-creator-data";
import { cn } from "@/lib/utils";
import { getPlatformLabel } from "@/lib/utils/format";
import type { ContentPiece } from "@/lib/types";

type ViewMode = "table" | "grid";
type SortField = "revenuePerHour" | "revenue" | "views" | "hoursSpent" | "publishedAt";
type PlatformFilter = "all" | "youtube" | "tiktok" | "instagram" | "blog";

const PLATFORM_FILTERS: PlatformFilter[] = ["all", "youtube", "tiktok", "instagram", "blog"];
const SORT_OPTIONS: { value: SortField; label: string }[] = [
  { value: "revenuePerHour", label: "$/Hour" },
  { value: "revenue", label: "Revenue" },
  { value: "views", label: "Views" },
  { value: "hoursSpent", label: "Hours" },
  { value: "publishedAt", label: "Date" },
];

export default function RevenuePerHourPage() {
  const { contentPieces } = useCreatorData();
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>("all");
  const [sortField, setSortField] = useState<SortField>("revenuePerHour");
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  const filteredAndSorted = useMemo(() => {
    let pieces = [...contentPieces];

    if (platformFilter !== "all") {
      pieces = pieces.filter((p) => p.platform === platformFilter);
    }

    pieces.sort((a, b) => {
      if (sortField === "publishedAt") {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
      return (b[sortField] as number) - (a[sortField] as number);
    });

    return pieces;
  }, [contentPieces, platformFilter, sortField]);

  const maxRph = useMemo(() => {
    return Math.max(...contentPieces.map((p) => p.revenuePerHour), 0);
  }, [contentPieces]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Revenue Per Hour"
        description="See which content earns the most for your time"
      />

      {/* Hero Comparison */}
      <HeroComparison />

      {/* AI Insights */}
      <InsightsPanel />

      {/* Filter & Controls Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
      >
        {/* Platform Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {PLATFORM_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setPlatformFilter(filter)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                platformFilter === filter
                  ? "bg-[#7C3AED] text-white shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {filter === "all" ? "All" : getPlatformLabel(filter)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {/* Sort Dropdown */}
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as SortField)}
            className="h-8 rounded-md border border-input bg-transparent px-2.5 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {SORT_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                Sort: {label}
              </option>
            ))}
          </select>

          {/* View Toggle */}
          <div className="flex items-center border rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode("table")}
              className={cn(
                "p-1.5 transition-colors",
                viewMode === "table"
                  ? "bg-[#7C3AED] text-white"
                  : "bg-transparent text-muted-foreground hover:bg-muted"
              )}
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-1.5 transition-colors",
                viewMode === "grid"
                  ? "bg-[#7C3AED] text-white"
                  : "bg-transparent text-muted-foreground hover:bg-muted"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          {/* Time Logger */}
          <TimeLogger />
        </div>
      </motion.div>

      {/* Content View */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        {viewMode === "table" ? (
          <ContentTable
            pieces={filteredAndSorted}
            sortField={sortField}
            sortDirection="desc"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAndSorted.map((piece) => (
              <ContentCard key={piece.id} piece={piece} maxRph={maxRph} />
            ))}
          </div>
        )}
      </motion.div>

      {/* RPH Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <RphChart pieces={filteredAndSorted} />
      </motion.div>
    </div>
  );
}
