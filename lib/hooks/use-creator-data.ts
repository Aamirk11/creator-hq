"use client";

import { createContext, useContext } from "react";
import {
  Creator,
  MonthlyRevenue,
  RevenueBySource,
  RevenueStat,
  ContentPiece,
  BrandDeal,
  Expense,
  Subscription,
  TaxSummary,
  QuarterlyPayment,
  Deduction,
} from "@/lib/types";

export interface CreatorData {
  creator: Creator;
  monthlyRevenue: MonthlyRevenue[];
  revenueBySource: RevenueBySource[];
  dashboardStats: RevenueStat[];
  contentPieces: ContentPiece[];
  brandDeals: BrandDeal[];
  expenses: Expense[];
  subscriptions: Subscription[];
  taxSummary: TaxSummary;
  quarterlyPayments: QuarterlyPayment[];
  deductions: Deduction[];
}

export const CreatorDataContext = createContext<CreatorData | null>(null);

export function useCreatorData(): CreatorData {
  const context = useContext(CreatorDataContext);
  if (!context) {
    throw new Error("useCreatorData must be used within a CreatorDataProvider");
  }
  return context;
}
