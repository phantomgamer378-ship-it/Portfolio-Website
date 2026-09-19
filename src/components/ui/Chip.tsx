import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  ({ className, active, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center px-3 py-1 rounded-sm text-sm font-sans cursor-pointer transition-colors border",
          active 
            ? "bg-accent/10 text-accent border-accent/30" 
            : "bg-card text-muted hover:text-foreground border-border hover:border-accent/50",
          className
        )}
        {...props}
      />
    );
  }
);

Chip.displayName = "Chip";
