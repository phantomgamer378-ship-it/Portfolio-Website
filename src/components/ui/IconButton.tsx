import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { motion, type HTMLMotionProps } from "framer-motion";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

type MotionIconButtonProps = Omit<IconButtonProps, "transition"> & HTMLMotionProps<"button">;

export const IconButton = forwardRef<HTMLButtonElement, MotionIconButtonProps>(
  ({ className, variant = "ghost", size = "md", disabled, children, ...props }, ref) => {
    
    const variants = {
      primary: "bg-accent text-white hover:bg-accent-hover active:bg-accent-hover/90",
      secondary: "bg-card text-foreground hover:bg-card-hover active:bg-card-hover/90",
      outline: "bg-transparent text-foreground border border-border hover:border-accent hover:text-accent",
      ghost: "bg-transparent text-muted hover:text-foreground hover:bg-card/50",
    };

    const sizes = {
      sm: "h-8 w-8 p-1.5",
      md: "h-10 w-10 p-2",
      lg: "h-12 w-12 p-3",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        className={cn(
          "inline-flex items-center justify-center rounded-sm transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

IconButton.displayName = "IconButton";
