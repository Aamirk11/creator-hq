"use client";

import { useState } from "react";
import { useCreatorData } from "@/lib/hooks/use-creator-data";
import { PageHeader } from "@/components/layout/page-header";
import { PageTransition } from "@/components/layout/page-transition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/format";

interface PlatformSetting {
  name: string;
  key: string;
  connected: boolean;
  username?: string;
  lastSync?: string;
  totalRevenue?: number;
  iconColor: string;
}

const DEFAULT_PLATFORMS: PlatformSetting[] = [
  { name: "YouTube", key: "youtube", connected: false, iconColor: "#FF0000" },
  { name: "TikTok", key: "tiktok", connected: false, iconColor: "#00F2EA" },
  { name: "Instagram", key: "instagram", connected: false, iconColor: "#E4405F" },
  { name: "Patreon", key: "patreon", connected: false, iconColor: "#FF424D" },
  { name: "Shopify", key: "shopify", connected: false, iconColor: "#96BF48" },
  { name: "Gumroad", key: "gumroad", connected: false, iconColor: "#FF90E8" },
  { name: "Amazon Associates", key: "amazon", connected: false, iconColor: "#FF9900" },
  { name: "Teachable", key: "teachable", connected: false, iconColor: "#4B5563" },
];

export default function SettingsPage() {
  const { creator } = useCreatorData();

  // Build platform settings from creator data + defaults
  const initialPlatforms: PlatformSetting[] = DEFAULT_PLATFORMS.map((dp) => {
    const match = creator.platforms.find((p) => p.platform === dp.key);
    if (match) {
      return {
        ...dp,
        connected: match.connected,
        username: match.username,
        lastSync: match.lastSync,
        totalRevenue: match.totalRevenue,
      };
    }
    return dp;
  });

  const [platforms, setPlatforms] = useState<PlatformSetting[]>(initialPlatforms);

  function toggleConnection(key: string) {
    setPlatforms((prev) =>
      prev.map((p) =>
        p.key === key ? { ...p, connected: !p.connected } : p
      )
    );
  }

  const initials = creator.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <PageTransition>
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account and platform connections"
      />

      {/* Platform connections */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Platform Connections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {platforms.map((platform) => (
            <Card key={platform.key}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Color dot */}
                  <div
                    className="h-10 w-10 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ backgroundColor: platform.iconColor }}
                  >
                    {platform.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{platform.name}</p>
                      <span
                        className={cn(
                          "inline-block h-2 w-2 rounded-full",
                          platform.connected ? "bg-emerald-500" : "bg-gray-300"
                        )}
                      />
                    </div>
                    {platform.connected && platform.username && (
                      <p className="text-xs text-muted-foreground truncate">
                        {platform.username}
                      </p>
                    )}
                    {platform.connected && platform.lastSync && (
                      <p className="text-xs text-muted-foreground">
                        Synced{" "}
                        {new Date(platform.lastSync).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    )}
                    {platform.connected && platform.totalRevenue != null && (
                      <p className="text-xs font-medium text-emerald-600">
                        {formatCurrency(platform.totalRevenue)} total revenue
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  variant={platform.connected ? "outline" : "default"}
                  size="sm"
                  className={cn(
                    !platform.connected &&
                      "bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
                  )}
                  onClick={() => toggleConnection(platform.key)}
                >
                  {platform.connected ? "Disconnect" : "Connect"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Profile section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Profile</h2>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            {/* Avatar initials */}
            <div className="h-16 w-16 rounded-full bg-[#7C3AED] flex items-center justify-center text-white text-xl font-bold shrink-0">
              {initials}
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold">{creator.name}</p>
              <p className="text-sm text-muted-foreground">{creator.email}</p>
              <Badge
                variant="outline"
                className="bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/20 font-medium"
              >
                {creator.niche}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </PageTransition>
  );
}
