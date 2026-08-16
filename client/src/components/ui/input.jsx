import React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-none border border-[var(--ink)]/20 dark:border-[var(--ink-dark)]/20 bg-white dark:bg-[#161B22] px-3 py-1 text-xs sm:text-sm font-sans text-[var(--ink)] dark:text-[var(--ink-dark)] transition-colors placeholder:text-[var(--ink)]/40 dark:placeholder:text-[var(--ink-dark)]/40 focus-visible:outline-none focus-visible:border-[var(--redline)] dark:focus-visible:border-[var(--redline)] focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";
