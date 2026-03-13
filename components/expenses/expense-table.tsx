"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Expense, ExpenseCategory } from "@/lib/types";

const categories: { label: string; value: ExpenseCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Software", value: "software" },
  { label: "Equipment", value: "equipment" },
  { label: "Home Office", value: "home-office" },
  { label: "Contractors", value: "contractors" },
  { label: "Education", value: "education" },
  { label: "Travel", value: "travel" },
  { label: "Misc", value: "misc" },
];

const categoryColors: Record<ExpenseCategory, string> = {
  software: "bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/20",
  equipment: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "home-office": "bg-amber-500/10 text-amber-600 border-amber-500/20",
  contractors: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  education: "bg-pink-500/10 text-pink-600 border-pink-500/20",
  travel: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  misc: "bg-muted text-muted-foreground border-border",
};

interface ExpenseTableProps {
  expenses: Expense[];
}

export function ExpenseTable({ expenses }: ExpenseTableProps) {
  const [activeCategory, setActiveCategory] = useState<ExpenseCategory | "all">("all");

  const filtered =
    activeCategory === "all"
      ? expenses
      : expenses.filter((e) => e.category === activeCategory);

  return (
    <div className="space-y-4">
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
              activeCategory === cat.value
                ? "bg-[#7C3AED] text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-center">Deductible</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.name}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(expense.amount)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "capitalize font-medium",
                      categoryColors[expense.category]
                    )}
                  >
                    {expense.category.replace("-", " ")}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(expense.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-center">
                  {expense.deductible ? (
                    <Check className="inline-block h-4 w-4 text-emerald-500" />
                  ) : (
                    <X className="inline-block h-4 w-4 text-muted-foreground" />
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  No expenses found in this category.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
