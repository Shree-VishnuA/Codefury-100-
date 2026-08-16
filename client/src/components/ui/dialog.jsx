import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Dialog({ open, onOpenChange, children, className }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        onOpenChange?.(false);
      }
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  if (!open) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        onClick={() => onOpenChange?.(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in-0 cursor-pointer z-[100]"
      />
      <div className={cn("relative z-[101] w-full max-w-md rounded-none border border-[var(--ink)]/20 dark:border-[var(--ink-dark)]/20 bg-[var(--paper)] dark:bg-[#161B22] text-[var(--ink)] dark:text-[var(--ink-dark)] p-6 shadow-2xl animate-in zoom-in-95 fade-in-0 duration-150 font-sans", className)}>
        {children}
      </div>
    </div>,
    document.body
  );
}

export function DialogHeader({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-1.5 text-left mb-4 font-mono", className)} {...props} />;
}

export function DialogTitle({ className, ...props }) {
  return <h2 className={cn("font-mono text-base font-bold leading-tight tracking-tight text-[var(--ink)] dark:text-[var(--ink-dark)]", className)} {...props} />;
}

export function DialogDescription({ className, ...props }) {
  return <p className={cn("font-mono text-xs text-[var(--ink)]/60 dark:text-[var(--ink-dark)]/60 mt-1 leading-relaxed", className)} {...props} />;
}

export function DialogClose({ onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "absolute right-4 top-4 rounded-none p-1 text-[var(--ink)]/40 hover:text-[var(--redline)] dark:text-[var(--ink-dark)]/40 dark:hover:text-[var(--redline)] transition-colors cursor-pointer z-[102]",
        className
      )}
    >
      <X className="w-4 h-4" />
      <span className="sr-only">Close</span>
    </button>
  );
}
