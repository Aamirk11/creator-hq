export interface TaxSummary {
  ytdIncome: number;
  estimatedTax: number;
  effectiveRate: number;
  setAsideMonthly: number;
}

export interface QuarterlyPayment {
  quarter: string; // "Q2 2025"
  amount: number;
  dueDate: string;
  paid: boolean;
  paidDate?: string;
}

export interface Deduction {
  category: string;
  amount: number;
  items: { name: string; amount: number }[];
}
