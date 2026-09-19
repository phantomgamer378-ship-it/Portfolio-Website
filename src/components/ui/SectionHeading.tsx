import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface SectionHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3;
  subhead?: string;
}

export const SectionHeading = forwardRef<HTMLHeadingElement, SectionHeadingProps>(
  ({ className, children, level = 2, subhead, ...props }, ref) => {
    const Component = `h${level}` as const;
    
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        {subhead && (
          <span className="text-sm font-mono text-accent uppercase tracking-widest">
            {subhead}
          </span>
        )}
        <Component
          ref={ref}
          className={cn(
            "font-sans font-semibold tracking-tight text-foreground",
            level === 1 && "text-4xl md:text-5xl lg:text-6xl",
            level === 2 && "text-3xl md:text-4xl",
            level === 3 && "text-2xl md:text-3xl"
          )}
          {...props}
        >
          {children}
        </Component>
      </div>
    );
  }
);

SectionHeading.displayName = "SectionHeading";
