"use client";

import { Plus } from "lucide-react";
import { useCreatorData } from "@/lib/hooks/use-creator-data";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import {
  ExpenseChart,
  ExpenseTable,
  SubscriptionList,
  AddExpenseModal,
} from "@/components/expenses";

export default function ExpensesPage() {
  const { expenses, subscriptions } = useCreatorData();

  return (
    <div className="space-y-4">
      <PageHeader
        title="Expenses"
        description="Track spending and never miss a deduction"
      >
        <AddExpenseModal>
          <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </AddExpenseModal>
      </PageHeader>

      {/* Chart + Subscriptions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ExpenseChart expenses={expenses} />
        <SubscriptionList subscriptions={subscriptions} />
      </div>

      {/* Expense Table */}
      <ExpenseTable expenses={expenses} />
    </div>
  );
}
