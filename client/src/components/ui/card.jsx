import React from "react";
import { cn } from "@/lib/utils";

export const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-none border border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 bg-white dark:bg-[#161B22] text-[var(--ink)] dark:text-[var(--ink-dark)] transition-colors",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-5 border-b border-[var(--ink)]/10 dark:border-[var(--ink-dark)]/10", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-mono text-sm sm:text-base font-bold leading-none tracking-tight text-[var(--ink)] dark:text-[var(--ink-dark)] flex items-center gap-2", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("font-mono text-[11px] text-[var(--ink)]/50 dark:text-[var(--ink-dark)]/50 mt-1", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-5 pt-4 space-y-4", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-5 pt-0 border-t border-[var(--ink)]/10 dark:border-[var(--ink-dark)]/10 mt-4", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";
