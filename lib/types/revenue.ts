import { PlatformType } from "./platform";

export interface MonthlyRevenue {
  month: string; // "2025-04"
  label: string; // "Apr 2025"
  youtube: number;
  tiktok: number;
  instagram: number;
  patreon: number;
  sponsorships: number;
  affiliates: number;
  total: number;
}

export interface RevenueBySource {
  source: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface RevenueStat {
  label: string;
  value: number;
  change: number; // percentage
  prefix?: string;
  suffix?: string;
}
