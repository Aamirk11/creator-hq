import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const statusStyles: Record<string, string> = {
  completed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  negotiating: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  pitched: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  prospect: "bg-muted text-muted-foreground border-border",
  active: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  inactive: "bg-muted text-muted-foreground border-border",
  connected: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  disconnected: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  paid: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  due: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  overdue: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  pro: "bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/20",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "capitalize font-medium",
        statusStyles[status] || statusStyles.inactive,
        className
      )}
    >
      {status}
    </Badge>
  );
}
