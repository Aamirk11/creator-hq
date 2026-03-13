"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ExpenseCategory } from "@/lib/types";

const categoryOptions: { label: string; value: ExpenseCategory }[] = [
  { label: "Software", value: "software" },
  { label: "Equipment", value: "equipment" },
  { label: "Home Office", value: "home-office" },
  { label: "Contractors", value: "contractors" },
  { label: "Education", value: "education" },
  { label: "Travel", value: "travel" },
  { label: "Misc", value: "misc" },
];

interface AddExpenseModalProps {
  children: React.ReactNode;
}

export function AddExpenseModal({ children }: AddExpenseModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseCategory | "">("");
  const [date, setDate] = useState("");
  const [deductible, setDeductible] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mock save — just close the dialog
    setOpen(false);
    setName("");
    setAmount("");
    setCategory("");
    setDate("");
    setDeductible(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              placeholder="e.g. Ring Light Pro"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Amount ($)</label>
            <Input
              type="number"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select
              value={category}
              onValueChange={(val) => setCategory(val as ExpenseCategory)}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="deductible"
              checked={deductible}
              onChange={(e) => setDeductible(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-[#7C3AED] focus:ring-[#7C3AED]"
            />
            <label htmlFor="deductible" className="text-sm font-medium">
              Tax Deductible
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
              Add Expense
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
