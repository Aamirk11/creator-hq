"use client";

import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useCreatorData } from "@/lib/hooks/use-creator-data";
import { formatCurrency, getPlatformColor, getPlatformLabel } from "@/lib/utils/format";

export function RecentActivity() {
  const { contentPieces } = useCreatorData();

  const recentPieces = [...contentPieces]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {recentPieces.map((piece, index) => (
            <div
              key={piece.id}
              className={cn(
                "flex items-center gap-3 py-3",
                index < recentPieces.length - 1 && "border-b"
              )}
            >
              <div
                className="h-2.5 w-2.5 rounded-full shrink-0"
                style={{ backgroundColor: getPlatformColor(piece.platform) }}
                title={getPlatformLabel(piece.platform)}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{piece.title}</p>
                <p className="text-xs text-muted-foreground">
                  {getPlatformLabel(piece.platform)} &middot;{" "}
                  {new Date(piece.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <span className="text-sm font-semibold shrink-0">
                {formatCurrency(piece.revenue)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
