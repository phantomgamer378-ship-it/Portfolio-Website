import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "w-full max-w-[var(--container-max-width)] mx-auto px-4 md:px-8 lg:px-12",
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";
