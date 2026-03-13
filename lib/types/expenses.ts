export type ExpenseCategory =
  | "software"
  | "equipment"
  | "home-office"
  | "contractors"
  | "education"
  | "travel"
  | "misc";

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  deductible: boolean;
  recurring: boolean;
  notes?: string;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  billingCycle: "monthly" | "yearly";
  category: ExpenseCategory;
  nextBilling: string;
  active: boolean;
}
