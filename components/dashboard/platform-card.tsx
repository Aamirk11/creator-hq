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
        "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
      )}
    >
      <CardContent className="pt-1">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="h-3 w-3 rounded-full shrink-0"
            style={{ backgroundColor: iconColor }}
          />
          <span className="font-semibold text-sm capitalize">{platform}</span>
        </div>
        <p className="text-xs text-muted-foreground mb-3 truncate">@{username}</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold">{formatNumber(followers)}</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">{formatCurrency(monthlyRevenue)}</p>
            <p className="text-xs text-muted-foreground">Monthly</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
