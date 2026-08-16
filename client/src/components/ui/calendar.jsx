import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const SHORT_MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function Calendar({
  value,
  onChange,
  mode = "date", // 'date' or 'month'
  className,
}) {
  const initialDate = React.useMemo(() => {
    if (!value) return new Date();
    if (typeof value === "string") {
      const parts = value.split("-");
      if (parts.length >= 2) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parts[2] ? parseInt(parts[2], 10) : 1;
        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
          return new Date(year, month, day);
        }
      }
    }
    const d = new Date(value);
    return isNaN(d.getTime()) ? new Date() : d;
  }, [value]);

  const [currentViewDate, setCurrentViewDate] = useState(initialDate);
  const [viewMode, setViewMode] = useState(mode === "month" ? "months" : "days");

  const currentYear = currentViewDate.getFullYear();
  const currentMonth = currentViewDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handlePrevYear = () => {
    setCurrentViewDate(new Date(currentYear - 1, currentMonth, 1));
  };

  const handleNextYear = () => {
    setCurrentViewDate(new Date(currentYear + 1, currentMonth, 1));
  };

  const handleSelectDay = (dayNum, isOtherMonth = false, monthOffset = 0) => {
    const targetDate = new Date(currentYear, currentMonth + monthOffset, dayNum);
    
    if (mode === "month") {
      const monthStr = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, "0")}`;
      onChange?.(monthStr, targetDate);
    } else {
      const dateStr = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, "0")}-${String(targetDate.getDate()).padStart(2, "0")}`;
      onChange?.(dateStr, targetDate);
    }
  };

  const handleSelectMonth = (monthIdx) => {
    const updatedDate = new Date(currentYear, monthIdx, 1);
    setCurrentViewDate(updatedDate);
    
    if (mode === "month") {
      const monthStr = `${currentYear}-${String(monthIdx + 1).padStart(2, "0")}`;
      onChange?.(monthStr, updatedDate);
    } else {
      setViewMode("days");
    }
  };

  const handleSelectYear = (year) => {
    const updatedDate = new Date(year, currentMonth, 1);
    setCurrentViewDate(updatedDate);
    setViewMode("months");
  };

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfWeek = (year, month) => new Date(year, month, 1).getDay();

  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
  const daysInPrevMonth = getDaysInMonth(currentYear, currentMonth - 1);
  const firstDayOfWeek = getFirstDayOfWeek(currentYear, currentMonth);

  const prevMonthDays = [];
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    prevMonthDays.push(daysInPrevMonth - i);
  }

  const currentMonthDays = [];
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    currentMonthDays.push(i);
  }

  const totalCellsSoFar = prevMonthDays.length + currentMonthDays.length;
  const nextMonthDaysCount = (42 - totalCellsSoFar) % 7 === 0 && totalCellsSoFar >= 35 ? 42 - totalCellsSoFar : 35 - totalCellsSoFar;
  const nextMonthDays = [];
  for (let i = 1; i <= Math.max(nextMonthDaysCount, 0); i++) {
    nextMonthDays.push(i);
  }

  const isSelectedDay = (dayNum, monthOffset = 0) => {
    if (!value) return false;
    const targetMonth = currentMonth + monthOffset;
    const checkDate = new Date(currentYear, targetMonth, dayNum);
    
    if (typeof value === "string") {
      const parts = value.split("-");
      if (parts.length === 2) {
        return checkDate.getFullYear() === parseInt(parts[0], 10) && (checkDate.getMonth() + 1) === parseInt(parts[1], 10);
      } else if (parts.length === 3) {
        return (
          checkDate.getFullYear() === parseInt(parts[0], 10) &&
          (checkDate.getMonth() + 1) === parseInt(parts[1], 10) &&
          checkDate.getDate() === parseInt(parts[2], 10)
        );
      }
    }
    
    return (
      initialDate.getFullYear() === checkDate.getFullYear() &&
      initialDate.getMonth() === checkDate.getMonth() &&
      initialDate.getDate() === checkDate.getDate()
    );
  };

  const today = new Date();
  const isToday = (dayNum, monthOffset = 0) => {
    const checkDate = new Date(currentYear, currentMonth + monthOffset, dayNum);
    return (
      today.getFullYear() === checkDate.getFullYear() &&
      today.getMonth() === checkDate.getMonth() &&
      today.getDate() === checkDate.getDate()
    );
  };

  const yearsList = React.useMemo(() => {
    const end = today.getFullYear() + 10;
    const start = today.getFullYear() - 40;
    const list = [];
    for (let y = end; y >= start; y--) {
      list.push(y);
    }
    return list;
  }, []);

  return (
    <div className={cn("p-2 select-none w-[260px] sm:w-[280px]", className)}>
      <div className="flex items-center justify-between pb-3 px-1">
        <button
          type="button"
          onClick={viewMode === "years" ? handlePrevYear : handlePrevMonth}
          className="p-1 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setViewMode(viewMode === "months" ? "days" : "months")}
            className="text-sm font-bold text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1"
          >
            {MONTH_NAMES[currentMonth]}
          </button>
          <button
            type="button"
            onClick={() => setViewMode(viewMode === "years" ? "days" : "years")}
            className="text-sm font-bold text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded-md transition-colors cursor-pointer"
          >
            {currentYear}
          </button>
        </div>

        <button
          type="button"
          onClick={viewMode === "years" ? handleNextYear : handleNextMonth}
          className="p-1 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {viewMode === "days" && (
        <>
          <div className="grid grid-cols-7 mb-1 text-center">
            {WEEKDAYS.map((day) => (
              <span key={day} className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 py-1">
                {day}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {prevMonthDays.map((day) => (
              <button
                key={`prev-${day}`}
                type="button"
                onClick={() => handleSelectDay(day, true, -1)}
                className="w-8 h-8 mx-auto flex items-center justify-center text-xs text-gray-400 dark:text-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors cursor-pointer opacity-50"
              >
                {day}
              </button>
            ))}

            {currentMonthDays.map((day) => {
              const selected = isSelectedDay(day);
              const currentToday = isToday(day);
              return (
                <button
                  key={`curr-${day}`}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={cn(
                    "w-8 h-8 mx-auto flex items-center justify-center text-xs font-medium rounded-md transition-all cursor-pointer",
                    selected
                      ? "bg-blue-600 text-white font-bold shadow-xs hover:bg-blue-700"
                      : currentToday
                      ? "border border-blue-500 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-blue-950/50"
                      : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  {day}
                </button>
              );
            })}

            {nextMonthDays.map((day) => (
              <button
                key={`next-${day}`}
                type="button"
                onClick={() => handleSelectDay(day, true, 1)}
                className="w-8 h-8 mx-auto flex items-center justify-center text-xs text-gray-400 dark:text-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors cursor-pointer opacity-50"
              >
                {day}
              </button>
            ))}
          </div>
        </>
      )}

      {viewMode === "months" && (
        <div className="grid grid-cols-3 gap-2 py-2">
          {SHORT_MONTH_NAMES.map((monthName, idx) => {
            const isCurrentMonthSel = currentMonth === idx;
            return (
              <button
                key={monthName}
                type="button"
                onClick={() => handleSelectMonth(idx)}
                className={cn(
                  "py-2 px-3 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center",
                  isCurrentMonthSel
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                {monthName}
              </button>
            );
          })}
        </div>
      )}

      {viewMode === "years" && (
        <div className="max-h-[200px] overflow-y-auto grid grid-cols-3 gap-2 py-2 pr-1 custom-scrollbar">
          {yearsList.map((y) => {
            const isSelYear = currentYear === y;
            return (
              <button
                key={y}
                type="button"
                onClick={() => handleSelectYear(y)}
                className={cn(
                  "py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center",
                  isSelYear
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                {y}
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={() => {
            const now = new Date();
            setCurrentViewDate(now);
            if (mode === "month") {
              const monthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
              onChange?.(monthStr, now);
            } else {
              const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
              onChange?.(dateStr, now);
            }
          }}
          className="text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer flex items-center gap-1"
        >
          <CalendarIcon className="w-3 h-3" />
          Today
        </button>
        <button
          type="button"
          onClick={() => onChange?.("", null)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 font-medium cursor-pointer"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
