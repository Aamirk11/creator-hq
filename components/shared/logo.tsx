"use client";

import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 32, className }: LogoProps) {
  const iconSize = Math.round(size * 0.55);

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#EC4899]",
        className
      )}
      style={{ width: size, height: size }}
    >
      <Zap
        className="text-white fill-white"
        style={{ width: iconSize, height: iconSize }}
      />
    </div>
  );
}
