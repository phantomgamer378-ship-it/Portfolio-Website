import { forwardRef, type HTMLAttributes } from "react";
import { FileTerminal } from "lucide-react";
import { cn } from "../../utils/cn";

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, title = "No Data Found", description = "The requested resource is currently unavailable.", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center p-12 text-center border border-dashed border-border rounded-sm",
          className
        )}
        {...props}
      >
        <FileTerminal className="w-10 h-10 text-muted mb-4 opacity-50" />
        <h3 className="font-sans font-medium text-foreground text-lg mb-2">{title}</h3>
        <p className="text-muted text-sm max-w-sm text-balance">{description}</p>
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";
