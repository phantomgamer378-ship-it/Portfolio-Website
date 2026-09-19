import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { motion, type HTMLMotionProps } from "framer-motion";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

type MotionCardProps = Omit<CardProps, "transition"> & HTMLMotionProps<"div">;

export const Card = forwardRef<HTMLDivElement, MotionCardProps>(
  ({ className, interactive, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={interactive ? { y: -4 } : {}}
        className={cn(
          "bg-card border border-border rounded-sm p-6 overflow-hidden relative group",
          interactive && "cursor-pointer hover:border-accent/80 transition-colors duration-300",
          className
        )}
        {...props}
      >
        {interactive && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-accent/5 to-transparent transition-opacity duration-500 pointer-events-none" />
        )}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    );
  }
);

Card.displayName = "Card";
