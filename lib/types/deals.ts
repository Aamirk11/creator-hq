export type DealStatus = "prospect" | "pitched" | "negotiating" | "completed";

export interface BrandDeal {
  id: string;
  brandName: string;
  brandInitials: string;
  industry: string;
  value: number;
  status: DealStatus;
  matchPercentage: number;
  matchReasons: string[];
  suggestedRate: { min: number; max: number };
  deliverables: string[];
  contactName: string;
  contactEmail: string;
  lastActivity: string;
  daysSinceActivity: number;
  notes: string;
}

export interface PitchTemplate {
  subject: string;
  body: string;
  brandName: string;
}
