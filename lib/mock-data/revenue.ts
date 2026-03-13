import { MonthlyRevenue, RevenueBySource, RevenueStat } from "@/lib/types";

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: "2025-04", label: "Apr 2025", youtube: 2800, tiktok: 1200, instagram: 600, patreon: 1100, sponsorships: 1800, affiliates: 400, total: 7900 },
  { month: "2025-05", label: "May 2025", youtube: 2600, tiktok: 1400, instagram: 550, patreon: 1100, sponsorships: 2000, affiliates: 350, total: 8000 },
  { month: "2025-06", label: "Jun 2025", youtube: 2400, tiktok: 1100, instagram: 500, patreon: 1150, sponsorships: 1500, affiliates: 300, total: 6950 },
  { month: "2025-07", label: "Jul 2025", youtube: 2900, tiktok: 1350, instagram: 620, patreon: 1150, sponsorships: 2200, affiliates: 380, total: 8600 },
  { month: "2025-08", label: "Aug 2025", youtube: 2700, tiktok: 1500, instagram: 580, patreon: 1200, sponsorships: 1900, affiliates: 420, total: 8300 },
  { month: "2025-09", label: "Sep 2025", youtube: 2500, tiktok: 1250, instagram: 540, patreon: 1200, sponsorships: 1600, affiliates: 350, total: 7440 },
  { month: "2025-10", label: "Oct 2025", youtube: 3100, tiktok: 1600, instagram: 700, patreon: 1200, sponsorships: 2500, affiliates: 500, total: 9600 },
  { month: "2025-11", label: "Nov 2025", youtube: 3300, tiktok: 1800, instagram: 750, patreon: 1200, sponsorships: 2800, affiliates: 550, total: 10400 },
  { month: "2025-12", label: "Dec 2025", youtube: 3800, tiktok: 2100, instagram: 850, patreon: 1250, sponsorships: 2700, affiliates: 600, total: 11300 },
  { month: "2026-01", label: "Jan 2026", youtube: 2200, tiktok: 1100, instagram: 480, patreon: 1200, sponsorships: 1400, affiliates: 300, total: 6680 },
  { month: "2026-02", label: "Feb 2026", youtube: 2800, tiktok: 1500, instagram: 600, patreon: 1200, sponsorships: 1800, affiliates: 450, total: 8350 },
  { month: "2026-03", label: "Mar 2026", youtube: 3200, tiktok: 1880, instagram: 780, patreon: 1200, sponsorships: 0, affiliates: 387, total: 8247 },
];

export const revenueBySource: RevenueBySource[] = [
  { source: "YouTube AdSense", amount: 38200, percentage: 40.3, color: "#FF0000" },
  { source: "Sponsorships", amount: 22200, percentage: 23.4, color: "#7C3AED" },
  { source: "TikTok Creator Fund", amount: 17780, percentage: 18.7, color: "#00F2EA" },
  { source: "Patreon", amount: 14400, percentage: 15.2, color: "#FF424D" },
  { source: "Instagram", amount: 7030, percentage: 7.4, color: "#E4405F" },
  { source: "Affiliates", amount: 4487, percentage: 4.7, color: "#10B981" },
];

export const dashboardStats: RevenueStat[] = [
  { label: "Total Revenue", value: 8247, change: 12.0, prefix: "$" },
  { label: "Pending", value: 2400, change: 5.2, prefix: "$" },
  { label: "Content Pieces", value: 25, change: 8.3 },
  { label: "Avg $/Hour", value: 312, change: 15.7, prefix: "$" },
];
