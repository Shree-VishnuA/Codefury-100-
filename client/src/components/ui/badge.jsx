import React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  default: "bg-[var(--ink)]/10 text-[var(--ink)] dark:bg-[var(--ink-dark)]/10 dark:text-[var(--ink-dark)] border-[var(--ink)]/20 dark:border-[var(--ink-dark)]/20",
  secondary: "bg-[var(--ink)]/5 text-[var(--ink)]/70 dark:bg-[var(--ink-dark)]/5 dark:text-[var(--ink-dark)]/70 border-transparent",
  destructive: "bg-[var(--redline)]/15 text-[var(--redline)] dark:bg-[var(--redline)]/25 dark:text-red-300 border-[var(--redline)]/30",
  outline: "text-[var(--ink)] dark:text-[var(--ink-dark)] border-[var(--ink)]/30 dark:border-[var(--ink-dark)]/30",
  success: "bg-[var(--pass)]/15 text-[var(--pass)] dark:bg-[var(--pass)]/25 dark:text-emerald-300 border-[var(--pass)]/30",
  accent: "bg-[var(--highlight)]/20 text-[var(--ink)] dark:text-[var(--highlight)] border-[var(--highlight)]/40",
};

export function Badge({ className, variant = "default", ...props }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-none border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider font-semibold transition-colors focus:outline-none",
        badgeVariants[variant] || badgeVariants.default,
        className
      )}
      {...props}
    />
  );
}
