import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export const Skeleton = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("animate-pulse bg-muted/20 rounded-sm", className)}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export const LoadingState = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center justify-center p-12 text-muted", className)}
        {...props}
      >
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent mb-4" />
        <span className="font-mono text-sm tracking-widest uppercase">Loading Systems...</span>
      </div>
    );
  }
);

LoadingState.displayName = "LoadingState";
