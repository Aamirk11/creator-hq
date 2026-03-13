export type PlatformType = "youtube" | "tiktok" | "instagram" | "patreon" | "shopify" | "blog";

export interface PlatformConnection {
  platform: PlatformType;
  connected: boolean;
  username: string;
  followers: number;
  lastSync: string;
  totalRevenue: number;
  monthlyRevenue: number;
  iconColor: string;
}
