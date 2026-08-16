import React, { useState, useRef, useEffect, createContext, useContext } from "react";
import { cn } from "@/lib/utils";

const PopoverContext = createContext(null);

export function Popover({ children, open: controlledOpen, onOpenChange: setControlledOpen }) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setIsOpen = (value) => {
    if (!isControlled) setUncontrolledOpen(value);
    if (setControlledOpen) setControlledOpen(value);
  };

  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen, containerRef }}>
      <div ref={containerRef} className="relative inline-block text-left w-full">
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({ children, asChild, className, ...props }) {
  const { isOpen, setIsOpen } = useContext(PopoverContext);

  const handleClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (e) => {
        if (children.props.onClick) children.props.onClick(e);
        handleClick(e);
      },
      "aria-expanded": isOpen,
      className: cn("cursor-pointer", children.props.className, className),
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-expanded={isOpen}
      className={cn("cursor-pointer focus:outline-none", className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function PopoverContent({ children, className, align = "start", sideOffset = 4, ...props }) {
  const { isOpen } = useContext(PopoverContext);

  if (!isOpen) return null;

  const alignStyles = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  }[align] || "left-0";

  return (
    <div
      style={{ marginTop: `${sideOffset}px` }}
      className={cn(
        "absolute z-50 min-w-[280px] rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 text-gray-950 dark:text-gray-50 shadow-xl outline-none transition-all duration-150 animate-in fade-in-0 zoom-in-95",
        alignStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
