"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/format";
import type { Expense, ExpenseCategory } from "@/lib/types";

const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  software: "#7C3AED",
  equipment: "#3B82F6",
  "home-office": "#F59E0B",
  contractors: "#10B981",
  education: "#EC4899",
  travel: "#00F2EA",
  misc: "#64748B",
};

const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  software: "Software",
  equipment: "Equipment",
  "home-office": "Home Office",
  contractors: "Contractors",
  education: "Education",
  travel: "Travel",
  misc: "Misc",
};

interface ExpenseChartProps {
  expenses: Expense[];
}

export function ExpenseChart({ expenses }: ExpenseChartProps) {
  // Aggregate expenses by category
  const categoryTotals = expenses.reduce<Record<string, number>>((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const data = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: CATEGORY_LABELS[category as ExpenseCategory] || category,
    value: amount,
    category: category as ExpenseCategory,
  }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.category}
                    fill={CATEGORY_COLORS[entry.category]}
                    strokeWidth={0}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #E2E8F0",
                  fontSize: "13px",
                }}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
