import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export const Tooltip = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { content: string }>(
  ({ className, children, content, ...props }, ref) => {
    return (
      <div className={cn("group relative inline-flex", className)} ref={ref} {...props}>
        {children}
        <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 z-50">
          {content}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
        </div>
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";
