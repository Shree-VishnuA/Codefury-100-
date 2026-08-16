import React, { useState } from "react";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  mode = "month",
  disabled = false,
  className,
  allowPresent = false,
  onSelectPresent,
}) {
  const [open, setOpen] = useState(false);

  const formatDisplayValue = (val) => {
    if (!val) return null;
    if (val === "Present") return "Present";

    const parts = val.split("-");
    if (parts.length === 2) {
      const year = parts[0];
      const monthIdx = parseInt(parts[1], 10) - 1;
      if (!isNaN(monthIdx) && MONTH_SHORT[monthIdx]) {
        return `${MONTH_SHORT[monthIdx]} ${year}`;
      }
    } else if (parts.length === 3) {
      const year = parts[0];
      const monthIdx = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      if (!isNaN(monthIdx) && MONTH_SHORT[monthIdx]) {
        return `${MONTH_SHORT[monthIdx]} ${day}, ${year}`;
      }
    }
    return val;
  };

  const displayString = formatDisplayValue(value);

  const handleSelectDate = (formattedStr) => {
    onChange?.(formattedStr);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex h-9 w-full items-center justify-between rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-xs sm:text-sm text-gray-900 dark:text-gray-100 shadow-xs transition-colors hover:bg-gray-50 dark:hover:bg-gray-750 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
            !displayString && "text-gray-400 dark:text-gray-500",
            className
          )}
        >
          <div className="flex items-center gap-2 truncate">
            <CalendarIcon className="w-4 h-4 shrink-0 text-blue-500" />
            <span className="truncate font-medium">{displayString || placeholder}</span>
          </div>
          <ChevronDown className="w-4 h-4 shrink-0 text-gray-400 opacity-70 transition-transform duration-200" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0 border border-gray-200 dark:border-gray-800 shadow-2xl rounded-xl">
        <Calendar
          value={value}
          onChange={handleSelectDate}
          mode={mode}
        />
        {allowPresent && (
          <div className="p-2 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex justify-center">
            <button
              type="button"
              onClick={() => {
                onSelectPresent ? onSelectPresent() : onChange?.("Present");
                setOpen(false);
              }}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer py-1 px-3 rounded-md hover:bg-blue-50 dark:hover:bg-blue-950/50"
            >
              Select "Present"
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
