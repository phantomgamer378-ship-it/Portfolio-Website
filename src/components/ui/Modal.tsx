import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export const Modal = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { isOpen: boolean; onClose: () => void }>(
  ({ className, isOpen, onClose, children, ...props }, ref) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          className={cn("bg-card border border-border p-6 rounded-sm w-full max-w-lg shadow-2xl relative", className)}
          {...props}
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent rounded-sm"
            aria-label="Close modal"
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";
