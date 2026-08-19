import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "sage" | "terracotta" | "forest";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium",
        variant === "default" && "bg-muted text-muted-foreground",
        variant === "outline" && "border border-border text-charcoal",
        variant === "sage" && "bg-sage-100 text-sage-700",
        variant === "terracotta" && "bg-terracotta-50 text-terracotta-600",
        variant === "forest" && "bg-forest-100 text-forest-600",
        className
      )}
      {...props}
    />
  );
}
