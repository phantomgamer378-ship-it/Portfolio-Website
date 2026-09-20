import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router-dom";
import { cn } from "../../utils/cn";
import { motion, type HTMLMotionProps } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover active:bg-accent-hover/90 border border-transparent shadow-[0_0_24px_rgba(99,102,241,0.18)]",
  secondary: "bg-card text-foreground hover:bg-card-hover active:bg-card-hover/90 border border-border",
  outline: "bg-background/40 text-foreground border border-border hover:border-accent hover:text-accent hover:bg-accent/5",
  ghost: "bg-transparent text-muted hover:text-foreground hover:bg-card/50 border border-transparent",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-4 text-xs",
  md: "min-h-11 px-6 text-sm",
  lg: "min-h-14 px-8 text-base",
};

const buttonClassName = ({ variant = "primary", size = "md", className }: ButtonStyleProps & { className?: string }) =>
  cn(
    "inline-flex min-w-0 items-center justify-center gap-2 rounded-sm font-mono font-medium",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className
  );

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonStyleProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

// Omit transition from standard HTML props to avoid conflict with framer-motion
type MotionButtonProps = Omit<ButtonProps, "transition"> & HTMLMotionProps<"button">;

export const Button = forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        className={buttonClassName({ variant, size, className })}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export interface ButtonLinkProps extends ButtonStyleProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> {
  to?: RouterLinkProps["to"];
  href?: string;
  children?: ReactNode;
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, to, href, rel, target, ...props }, ref) => {
    const content = (
      <>
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </>
    );

    const sharedClassName = buttonClassName({
      variant,
      size,
      className: cn("hover:-translate-y-0.5 active:translate-y-0", className),
    });

    if (to) {
      return (
        <RouterLink ref={ref} to={to} className={sharedClassName} {...props}>
          {content}
        </RouterLink>
      );
    }

    return (
      <a
        ref={ref}
        href={href}
        target={target}
        rel={target === "_blank" ? rel ?? "noreferrer" : rel}
        className={sharedClassName}
        {...props}
      >
        {content}
      </a>
    );
  }
);

ButtonLink.displayName = "ButtonLink";
