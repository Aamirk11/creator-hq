"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  formatCurrency,
  formatNumber,
  getRphColor,
  getPlatformColor,
  getPlatformLabel,
} from "@/lib/utils/format";
import type { ContentPiece } from "@/lib/types";

type SortField = "revenuePerHour" | "revenue" | "views" | "hoursSpent" | "publishedAt" | "title";
type SortDirection = "asc" | "desc";

interface ContentTableProps {
  pieces: ContentPiece[];
  sortField?: SortField;
  sortDirection?: SortDirection;
}

export function ContentTable({
  pieces,
  sortField: externalSort,
  sortDirection: externalDir,
}: ContentTableProps) {
  const [internalSortField, setInternalSortField] = useState<SortField>("revenuePerHour");
  const [internalSortDir, setInternalSortDir] = useState<SortDirection>("desc");

  const sortField = externalSort ?? internalSortField;
  const sortDir = externalDir ?? internalSortDir;

  const sorted = useMemo(() => {
    return [...pieces].sort((a, b) => {
      let cmp = 0;
      if (sortField === "title") {
        cmp = a.title.localeCompare(b.title);
      } else if (sortField === "publishedAt") {
        cmp = new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      } else {
        cmp = (a[sortField] as number) - (b[sortField] as number);
      }
      return sortDir === "desc" ? -cmp : cmp;
    });
  }, [pieces, sortField, sortDir]);

  function toggleSort(field: SortField) {
    if (externalSort) return;
    if (internalSortField === field) {
      setInternalSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setInternalSortField(field);
      setInternalSortDir("desc");
    }
  }

  function SortIcon({ field }: { field: SortField }) {
    if (sortField !== field) return <ArrowUpDown className="w-3.5 h-3.5 ml-1 text-muted-foreground/40" />;
    return sortDir === "desc" ? (
      <ArrowDown className="w-3.5 h-3.5 ml-1 text-[#7C3AED]" />
    ) : (
      <ArrowUp className="w-3.5 h-3.5 ml-1 text-[#7C3AED]" />
    );
  }

  const columns: { label: string; field: SortField; align?: string }[] = [
    { label: "Title", field: "title" },
    { label: "Platform", field: "title" },
    { label: "Hours", field: "hoursSpent", align: "text-right" },
    { label: "Revenue", field: "revenue", align: "text-right" },
    { label: "$/Hour", field: "revenuePerHour", align: "text-right" },
    { label: "Views", field: "views", align: "text-right" },
    { label: "Published", field: "publishedAt", align: "text-right" },
  ];

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead
                className="cursor-pointer select-none whitespace-nowrap"
                onClick={() => toggleSort("title")}
              >
                <span className="flex items-center">
                  Title <SortIcon field="title" />
                </span>
              </TableHead>
              <TableHead className="whitespace-nowrap">Platform</TableHead>
              <TableHead
                className="cursor-pointer select-none text-right whitespace-nowrap"
                onClick={() => toggleSort("hoursSpent")}
              >
                <span className="flex items-center justify-end">
                  Hours <SortIcon field="hoursSpent" />
                </span>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none text-right whitespace-nowrap"
                onClick={() => toggleSort("revenue")}
              >
                <span className="flex items-center justify-end">
                  Revenue <SortIcon field="revenue" />
                </span>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none text-right whitespace-nowrap"
                onClick={() => toggleSort("revenuePerHour")}
              >
                <span className="flex items-center justify-end">
                  $/Hour <SortIcon field="revenuePerHour" />
                </span>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none text-right whitespace-nowrap"
                onClick={() => toggleSort("views")}
              >
                <span className="flex items-center justify-end">
                  Views <SortIcon field="views" />
                </span>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none text-right whitespace-nowrap"
                onClick={() => toggleSort("publishedAt")}
              >
                <span className="flex items-center justify-end">
                  Published <SortIcon field="publishedAt" />
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((piece) => (
              <TableRow key={piece.id} className="group">
                <TableCell className="font-medium max-w-[280px]">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: getPlatformColor(piece.platform) }}
                    />
                    <span className="truncate">{piece.title}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="text-xs font-medium"
                    style={{
                      backgroundColor: `${getPlatformColor(piece.platform)}15`,
                      color: getPlatformColor(piece.platform),
                    }}
                  >
                    {getPlatformLabel(piece.platform)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums text-muted-foreground">
                  {piece.hoursSpent}h
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatCurrency(piece.revenue)}
                </TableCell>
                <TableCell className={cn("text-right tabular-nums font-bold", getRphColor(piece.revenuePerHour))}>
                  {formatCurrency(piece.revenuePerHour)}
                </TableCell>
                <TableCell className="text-right tabular-nums text-muted-foreground">
                  {formatNumber(piece.views)}
                </TableCell>
                <TableCell className="text-right tabular-nums text-muted-foreground text-sm">
                  {new Date(piece.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
