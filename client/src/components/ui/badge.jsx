import React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  default: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-transparent",
  secondary: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-transparent",
  destructive: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border-transparent",
  outline: "text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700",
  success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-transparent",
  accent: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 border-transparent",
};

export function Badge({ className, variant = "default", ...props }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        badgeVariants[variant] || badgeVariants.default,
        className
      )}
      {...props}
    />
  );
}
