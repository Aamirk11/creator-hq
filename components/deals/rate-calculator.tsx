"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils/format";
import { Calculator } from "lucide-react";

const platformCPM: Record<string, number> = {
  youtube: 0.025,
  tiktok: 0.015,
  instagram: 0.02,
  blog: 0.03,
};

const platformLabels: Record<string, string> = {
  youtube: "YouTube",
  tiktok: "TikTok",
  instagram: "Instagram",
  blog: "Blog",
};

const NICHE_PREMIUM = 1.3; // skincare

function calculateRate(
  followers: number,
  engagementRate: number,
  platform: string
): number {
  const cpm = platformCPM[platform] || 0.02;
  const engagementMultiplier = 1 + (engagementRate - 2) * 0.15;
  return Math.round(followers * cpm * NICHE_PREMIUM * Math.max(engagementMultiplier, 0.5));
}

export function RateCalculator() {
  const [followers, setFollowers] = useState<number>(89000);
  const [engagementRate, setEngagementRate] = useState<number>(4.2);
  const [platform, setPlatform] = useState<string>("youtube");

  const suggestedRate = calculateRate(followers, engagementRate, platform);

  return (
    <Card className="border-[#7C3AED]/20">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/10 flex items-center justify-center">
            <Calculator className="w-4 h-4 text-[#7C3AED]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#0F172A]">
              Rate Calculator
            </h3>
            <p className="text-[11px] text-[#64748B]">
              Estimate your brand deal rate
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Followers */}
          <div>
            <label className="text-xs font-medium text-[#64748B] mb-1 block">
              Followers
            </label>
            <Input
              type="number"
              value={followers}
              onChange={(e) => setFollowers(Number(e.target.value) || 0)}
              className="text-sm"
              min={0}
            />
          </div>

          {/* Engagement Rate */}
          <div>
            <label className="text-xs font-medium text-[#64748B] mb-1 block">
              Engagement Rate (%)
            </label>
            <Input
              type="number"
              value={engagementRate}
              onChange={(e) => setEngagementRate(Number(e.target.value) || 0)}
              className="text-sm"
              min={0}
              max={100}
              step={0.1}
            />
          </div>

          {/* Platform */}
          <div>
            <label className="text-xs font-medium text-[#64748B] mb-1 block">
              Platform
            </label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(platformLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Result */}
        <div className="mt-5 p-4 rounded-lg bg-gradient-to-r from-[#7C3AED]/5 to-[#EC4899]/5 border border-[#7C3AED]/15 text-center">
          <p className="text-[11px] text-[#64748B] mb-1">Suggested Rate</p>
          <p className="text-3xl font-bold text-[#7C3AED]">
            {formatCurrency(suggestedRate)}
          </p>
          <p className="text-[10px] text-[#64748B] mt-1">
            per sponsored post on {platformLabels[platform]}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
