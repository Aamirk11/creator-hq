import { PlatformType } from "./platform";

export interface TimeBreakdown {
  ideation: number;
  scripting: number;
  filming: number;
  editing: number;
  thumbnail: number;
  publishing: number;
}

export interface ContentPiece {
  id: string;
  title: string;
  platform: PlatformType;
  publishedAt: string;
  views: number;
  likes: number;
  comments: number;
  revenue: number;
  hoursSpent: number;
  revenuePerHour: number;
  timeBreakdown: TimeBreakdown;
  thumbnail?: string;
  url?: string;
}
