import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface TechnicalLabelProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  value: React.ReactNode;
}

export const TechnicalLabel = forwardRef<HTMLSpanElement, TechnicalLabelProps>(
  ({ className, label, value, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("inline-flex items-baseline gap-2 font-mono text-sm", className)}
        {...props}
      >
        <span className="text-muted/70 select-none uppercase tracking-wider text-xs">{label}:</span>
        <span className="text-foreground">{value}</span>
      </span>
    );
  }
);

TechnicalLabel.displayName = "TechnicalLabel";
