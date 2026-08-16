import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

const TabsContext = createContext(null);

export function Tabs({ value: controlledValue, defaultValue, onValueChange, children, className }) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : uncontrolledValue;

  const setActiveValue = (val) => {
    if (!isControlled) setUncontrolledValue(val);
    onValueChange?.(val);
  };

  return (
    <TabsContext.Provider value={{ activeValue, setActiveValue }}>
      <div className={cn("w-full space-y-4", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children }) {
  return (
    <div className={cn("inline-flex items-center justify-start border border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 bg-[var(--paper)] dark:bg-[var(--paper-dark)] p-0.5 w-full sm:w-auto rounded-none font-mono text-xs", className)}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, className, children, disabled }) {
  const { activeValue, setActiveValue } = useContext(TabsContext);
  const isActive = activeValue === value;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => setActiveValue(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap px-3.5 py-1.5 font-mono text-xs font-semibold transition-colors cursor-pointer flex-1 sm:flex-none rounded-none border-b-2",
        isActive
          ? "border-b-[var(--redline)] bg-[var(--ink)] text-[var(--paper)] dark:bg-[var(--ink-dark)] dark:text-[var(--paper-dark)]"
          : "border-b-transparent text-[var(--ink)]/60 dark:text-[var(--ink-dark)]/60 hover:text-[var(--ink)] dark:hover:text-[var(--ink-dark)] hover:bg-[var(--ink)]/[0.04]",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className, children }) {
  const { activeValue } = useContext(TabsContext);
  if (activeValue !== value) return null;

  return <div className={cn("mt-2 outline-none animate-in fade-in-50", className)}>{children}</div>;
}
