import { forwardRef } from "react";
import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router-dom";
import { cn } from "../../utils/cn";

export interface LinkProps extends RouterLinkProps {
  variant?: "default" | "nav" | "subtle";
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    
    const variants = {
      default: "text-accent hover:text-accent-hover underline underline-offset-4 decoration-accent/30 hover:decoration-accent transition-colors",
      nav: "text-sm font-mono tracking-wide text-muted hover:text-foreground transition-colors",
      subtle: "text-muted hover:text-foreground transition-colors",
    };

    return (
      <RouterLink
        ref={ref}
        className={cn(
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </RouterLink>
    );
  }
);

Link.displayName = "Link";
