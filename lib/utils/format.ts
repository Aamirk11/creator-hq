export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyDetailed(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toLocaleString();
}

export function formatPercentage(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

export function getRphColor(rph: number): string {
  if (rph >= 500) return "text-emerald-500";
  if (rph >= 100) return "text-amber-500";
  if (rph >= 50) return "text-foreground";
  return "text-rose-500";
}

export function getRphBgColor(rph: number): string {
  if (rph >= 500) return "bg-emerald-500/10 text-emerald-600";
  if (rph >= 100) return "bg-amber-500/10 text-amber-600";
  if (rph >= 50) return "bg-secondary text-foreground";
  return "bg-rose-500/10 text-rose-600";
}

export function getPlatformColor(platform: string): string {
  const colors: Record<string, string> = {
    youtube: "#FF0000",
    tiktok: "#00F2EA",
    instagram: "#E4405F",
    patreon: "#FF424D",
    shopify: "#96BF48",
    blog: "#3B82F6",
  };
  return colors[platform] || "#64748B";
}

export function getPlatformLabel(platform: string): string {
  const labels: Record<string, string> = {
    youtube: "YouTube",
    tiktok: "TikTok",
    instagram: "Instagram",
    patreon: "Patreon",
    shopify: "Shopify",
    blog: "Blog",
  };
  return labels[platform] || platform;
}
