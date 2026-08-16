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
    <div className={cn("inline-flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800/80 p-1 text-gray-500 dark:text-gray-400 w-full sm:w-auto", className)}>
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
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold ring-offset-background transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer flex-1 sm:flex-none",
        isActive
          ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xs"
          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
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
