import { forwardRef, type AnchorHTMLAttributes } from "react";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import { cn } from "../../utils/cn";

export interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  showIcon?: boolean;
}

export const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  ({ className, children, showIcon = true, ...props }, ref) => {
    return (
      <a
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-1 text-accent hover:text-accent-hover relative group transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
          className
        )}
        {...props}
      >
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent/50 transition-all duration-300 group-hover:w-full" />
        {showIcon && <ExternalLinkIcon className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />}
      </a>
    );
  }
);

ExternalLink.displayName = "ExternalLink";
