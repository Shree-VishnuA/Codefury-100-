import React, { useState } from "react";
import { PenTool, FileCheck, RotateCcw, Compass, LayoutDashboard, LogIn, LogOut, Sun, Moon, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

export function Header({
  user,
  onLogin,
  onLogout,
  darkMode,
  setDarkMode,
  onLoadSample,
  onClearData,
  onTriggerAI,
  isGeneratingAI,
  activeView,
  setActiveView,
}) {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const firstLetter = (user?.name || user?.email || "U").trim().charAt(0).toUpperCase();

  return (
    <header
      className="sticky top-0 left-0 right-0 z-50 w-full border-b bg-[var(--paper)]/95 dark:bg-[var(--paper-dark)]/95 backdrop-blur-sm transition-colors m-0 p-0"
      style={{ borderColor: "rgba(21,28,36,0.1)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={() => setActiveView("landing")}
            className="flex items-baseline gap-2.5 text-left focus:outline-none cursor-pointer shrink-0"
          >
            <span className="font-mono text-base font-bold tracking-tight text-[var(--ink)] dark:text-[var(--ink-dark)]">
              GenForge
            </span>
            <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--redline)]">
              / resume ops
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-0 ml-2 pl-4 border-l text-xs font-mono shrink-0" style={{ borderColor: "rgba(21,28,36,0.1)" }}>
            <button
              type="button"
              onClick={() => setActiveView("landing")}
              className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 border-b-2 ${
                activeView === "landing"
                  ? "border-[var(--redline)] text-[var(--redline)]"
                  : "border-transparent text-[var(--ink)]/50 dark:text-[var(--ink-dark)]/50 hover:text-[var(--ink)] dark:hover:text-[var(--ink-dark)]"
              }`}
            >
              <Compass className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Overview</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView("builder")}
              className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 border-b-2 ${
                activeView === "builder"
                  ? "border-[var(--redline)] text-[var(--redline)]"
                  : "border-transparent text-[var(--ink)]/50 dark:text-[var(--ink-dark)]/50 hover:text-[var(--ink)] dark:hover:text-[var(--ink-dark)]"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Builder</span>
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 whitespace-nowrap">
          {activeView === "landing" ? (
            <button
              type="button"
              onClick={() => setActiveView("builder")}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold font-mono bg-[var(--ink)] text-[var(--paper)] dark:bg-[var(--ink-dark)] dark:text-[var(--paper-dark)] hover:bg-[var(--redline)] dark:hover:bg-[var(--redline)] dark:hover:text-[var(--paper)] transition-colors whitespace-nowrap shrink-0"
            >
              <PenTool className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Start Building</span>
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={onTriggerAI}
                disabled={isGeneratingAI}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold font-mono bg-[var(--ink)] text-[var(--paper)] dark:bg-[var(--ink-dark)] dark:text-[var(--paper-dark)] hover:bg-[var(--redline)] dark:hover:bg-[var(--redline)] dark:hover:text-[var(--paper)] transition-colors whitespace-nowrap shrink-0 disabled:opacity-50"
              >
                <Sparkles className={`w-3.5 h-3.5 shrink-0 ${isGeneratingAI ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline whitespace-nowrap">{isGeneratingAI ? "Optimizing..." : "Optimize with AI"}</span>
                <span className="sm:hidden whitespace-nowrap">AI</span>
              </button>

              <button
                type="button"
                onClick={onLoadSample}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-semibold border border-[var(--ink)]/20 dark:border-[var(--ink-dark)]/20 hover:border-[var(--ink)] dark:hover:border-[var(--ink-dark)] text-[var(--ink)] dark:text-[var(--ink-dark)] transition-colors whitespace-nowrap shrink-0"
                title="Populate sample data"
              >
                <FileCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden md:inline whitespace-nowrap">Sample</span>
              </button>

              <button
                type="button"
                onClick={() => setShowClearConfirm(true)}
                className="w-8 h-8 flex items-center justify-center border border-[var(--ink)]/20 dark:border-[var(--ink-dark)]/20 hover:border-[var(--redline)] text-[var(--ink)]/50 dark:text-[var(--ink-dark)]/50 hover:text-[var(--redline)] transition-colors cursor-pointer shrink-0"
                title="Clear all data"
              >
                <RotateCcw className="w-3.5 h-3.5 shrink-0" />
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="w-8 h-8 flex items-center justify-center border border-[var(--ink)]/20 dark:border-[var(--ink-dark)]/20 hover:border-[var(--ink)] dark:hover:border-[var(--ink-dark)] text-[var(--ink)]/50 dark:text-[var(--ink-dark)]/50 hover:text-[var(--ink)] dark:hover:text-[var(--ink-dark)] transition-colors cursor-pointer shrink-0"
            title={darkMode ? "Light mode" : "Dark mode"}
          >
            {darkMode ? <Sun className="w-3.5 h-3.5 shrink-0" /> : <Moon className="w-3.5 h-3.5 shrink-0" />}
          </button>

          {user ? (
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center justify-center w-8 h-8 border border-[var(--ink)]/20 dark:border-[var(--ink-dark)]/20 hover:border-[var(--ink)] dark:hover:border-[var(--ink-dark)] bg-[var(--ink)] dark:bg-[var(--ink-dark)] text-[var(--paper)] dark:text-[var(--paper-dark)] font-mono font-bold text-xs transition-colors focus:outline-none cursor-pointer shrink-0"
                title={user.name || user.email}
              >
                {firstLetter}
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-10 w-48 bg-[var(--paper)] dark:bg-[var(--paper-dark)] border border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 shadow-xl p-3 z-50">
                  <div className="pb-2.5 border-b border-[var(--ink)]/10 dark:border-[var(--ink-dark)]/10 mb-2">
                    <p className="font-mono font-bold text-xs text-[var(--ink)] dark:text-[var(--ink-dark)] truncate">{user.name}</p>
                    <p className="font-mono text-[10px] text-[var(--ink)]/50 dark:text-[var(--ink-dark)]/50 truncate">{user.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onLogout?.();
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-2 py-1.5 text-left font-mono text-xs text-[var(--redline)] hover:bg-[var(--redline)] hover:text-[var(--paper)] transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 shrink-0" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={onLogin}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-semibold border border-[var(--ink)]/20 dark:border-[var(--ink-dark)]/20 hover:border-[var(--ink)] dark:hover:border-[var(--ink-dark)] text-[var(--ink)] dark:text-[var(--ink-dark)] transition-colors whitespace-nowrap shrink-0"
            >
              <LogIn className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Sign In</span>
            </button>
          )}
        </div>
      </div>

      <Dialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
        <DialogClose onClick={() => setShowClearConfirm(false)} />
        <DialogHeader>
          <div className="flex items-center gap-3 text-[var(--redline)] mb-1">
            <Trash2 className="w-5 h-5" />
            <DialogTitle>Clear Form Data?</DialogTitle>
          </div>
          <DialogDescription>
            This will erase all entered data and cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => setShowClearConfirm(false)}
            className="px-4 py-2 text-xs font-mono font-semibold border border-[var(--ink)]/20 dark:border-[var(--ink-dark)]/20 hover:border-[var(--ink)] dark:hover:border-[var(--ink-dark)] text-[var(--ink)] dark:text-[var(--ink-dark)] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onClearData();
              setShowClearConfirm(false);
            }}
            className="px-4 py-2 text-xs font-mono font-semibold bg-[var(--redline)] text-[var(--paper)] hover:opacity-90 transition-opacity"
          >
            Clear Data
          </button>
        </div>
      </Dialog>
    </header>
  );
}
