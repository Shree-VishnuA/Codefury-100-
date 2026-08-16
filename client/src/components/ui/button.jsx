import React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  variant: {
    default: "bg-[var(--ink)] text-[var(--paper)] dark:bg-[var(--ink-dark)] dark:text-[var(--paper-dark)] hover:bg-[var(--redline)] dark:hover:bg-[var(--redline)] dark:hover:text-[var(--paper)] font-mono text-xs uppercase tracking-wider font-bold rounded-none",
    destructive: "bg-[var(--redline)] text-white hover:opacity-90 font-mono text-xs uppercase tracking-wider font-bold rounded-none",
    outline: "border border-[var(--ink)]/25 dark:border-[var(--ink-dark)]/25 bg-transparent text-[var(--ink)] dark:text-[var(--ink-dark)] hover:border-[var(--ink)] dark:hover:border-[var(--ink-dark)] hover:bg-[var(--ink)]/[0.04] dark:hover:bg-[var(--ink-dark)]/[0.04] font-mono text-xs font-semibold rounded-none",
    secondary: "bg-[var(--ink)]/10 text-[var(--ink)] dark:bg-[var(--ink-dark)]/10 dark:text-[var(--ink-dark)] hover:bg-[var(--ink)]/20 dark:hover:bg-[var(--ink-dark)]/20 font-mono text-xs font-semibold rounded-none",
    ghost: "text-[var(--ink)]/70 dark:text-[var(--ink-dark)]/70 hover:text-[var(--ink)] dark:hover:text-[var(--ink-dark)] hover:bg-[var(--ink)]/[0.05] font-mono text-xs font-semibold rounded-none",
    link: "text-[var(--redline)] underline-offset-4 hover:underline font-mono p-0 h-auto",
    accent: "bg-[var(--redline)] text-white hover:opacity-90 font-mono text-xs uppercase tracking-wider font-bold rounded-none",
  },
  size: {
    default: "h-9 px-4 py-2 text-xs sm:text-xs",
    sm: "h-8 px-3 text-[11px]",
    lg: "h-10 px-6 text-xs",
    icon: "h-8 w-8 p-0 flex items-center justify-center rounded-none",
    iconSm: "h-7 w-7 p-0 flex items-center justify-center rounded-none",
  },
};

export const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", disabled, children, type = "button", ...props }, ref) => {
    const variantStyles = buttonVariants.variant[variant] || buttonVariants.variant.default;
    const sizeStyles = buttonVariants.size[size] || buttonVariants.size.default;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-mono transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--redline)] disabled:pointer-events-none disabled:opacity-40 cursor-pointer rounded-none whitespace-nowrap shrink-0",
          variantStyles,
          sizeStyles,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
