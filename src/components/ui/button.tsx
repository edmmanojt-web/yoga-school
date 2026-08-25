import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-forest text-ivory shadow-[0_2px_12px_rgba(107,74,42,0.25)] hover:bg-forest/85 hover:shadow-[0_4px_20px_rgba(107,74,42,0.35)] active:scale-[0.97]",
        secondary:
          "bg-beige text-charcoal border border-border hover:bg-beige/80 active:scale-[0.97]",
        outline:
          "border border-forest/60 text-forest hover:bg-forest hover:text-ivory hover:border-forest active:scale-[0.97]",
        ghost:
          "text-charcoal/75 hover:text-charcoal hover:bg-muted active:scale-[0.97]",
        accent:
          "bg-terracotta text-ivory shadow-[0_2px_12px_rgba(200,145,58,0.28)] hover:bg-terracotta/85 hover:shadow-[0_4px_20px_rgba(200,145,58,0.38)] active:scale-[0.97]",
        link:
          "text-forest underline-offset-4 hover:underline p-0 h-auto",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 shadow-sm active:scale-[0.97]",
      },
      size: {
        sm: "h-9 px-4 text-xs tracking-wide",
        md: "h-11 px-6 text-sm",
        lg: "h-[52px] px-8 text-base",
        xl: "h-14 px-10 text-base tracking-wide",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <span
            className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
