import { Card, CardContent } from "@/components/ui/card";
import { formatNumber, formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils";

interface PlatformCardProps {
  platform: string;
  iconColor: string;
  username: string;
  followers: number;
  monthlyRevenue: number;
}

export function PlatformCard({
  platform,
  iconColor,
  username,
  followers,
  monthlyRevenue,
}: PlatformCardProps) {
  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
      )}
    >
      <CardContent className="pt-1">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative shrink-0">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: iconColor }}
            />
            <div
              className="absolute inset-0 h-3 w-3 rounded-full animate-pulse opacity-30"
              style={{ backgroundColor: iconColor, boxShadow: `0 0 6px 2px ${iconColor}40` }}
            />
          </div>
          <span className="font-semibold text-sm capitalize">{platform}</span>
        </div>
        <p className="text-xs text-muted-foreground mb-3 truncate">@{username}</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold">{formatNumber(followers)}</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-extrabold">{formatCurrency(monthlyRevenue)}</p>
            <p className="text-xs text-muted-foreground">Monthly</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
