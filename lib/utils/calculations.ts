import { ContentPiece, MonthlyRevenue } from "@/lib/types";

export function calculateRPH(revenue: number, hours: number): number {
  if (hours === 0) return 0;
  return Math.round(revenue / hours);
}

export function calculatePlatformAvgRPH(
  content: ContentPiece[],
  platform: string
): number {
  const pieces = content.filter((c) => c.platform === platform);
  if (pieces.length === 0) return 0;
  const totalRevenue = pieces.reduce((sum, c) => sum + c.revenue, 0);
  const totalHours = pieces.reduce((sum, c) => sum + c.hoursSpent, 0);
  return calculateRPH(totalRevenue, totalHours);
}

export function calculateTotalRevenue(months: MonthlyRevenue[]): number {
  return months.reduce((sum, m) => sum + m.total, 0);
}

export function calculateMoMGrowth(months: MonthlyRevenue[]): number {
  if (months.length < 2) return 0;
  const current = months[months.length - 1].total;
  const previous = months[months.length - 2].total;
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

export function calculateEfficiencyRatio(
  content: ContentPiece[]
): { platform: string; avgRph: number; totalHours: number; totalRevenue: number }[] {
  const platforms = [...new Set(content.map((c) => c.platform))];
  return platforms.map((platform) => {
    const pieces = content.filter((c) => c.platform === platform);
    const totalRevenue = pieces.reduce((sum, c) => sum + c.revenue, 0);
    const totalHours = pieces.reduce((sum, c) => sum + c.hoursSpent, 0);
    return {
      platform,
      avgRph: calculateRPH(totalRevenue, totalHours),
      totalHours,
      totalRevenue,
    };
  });
}

export function estimateQuarterlyTax(
  ytdIncome: number,
  effectiveRate: number
): number {
  return Math.round((ytdIncome * effectiveRate) / 4);
}

export function calculateSuggestedRate(
  followers: number,
  engagementRate: number,
  platformCPM: number,
  nichePremium: number
): number {
  return Math.round(followers * platformCPM * nichePremium * engagementRate);
}
