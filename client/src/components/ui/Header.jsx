import React, { useState } from "react";
import { Sparkles, Sun, Moon, RotateCcw, FileCheck, Trash2, LayoutDashboard, Compass, LogIn, LogOut } from "lucide-react";
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
    <header className="sticky top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-[#080b14]/80 backdrop-blur-xl transition-colors m-0 p-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & View Switcher */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={() => setActiveView("landing")}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
                GenForge
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 whitespace-nowrap shrink-0">
                AI Resume Pro
              </span>
            </div>
          </button>

          {/* Nav Tabs */}
          <nav className="hidden lg:flex items-center gap-1.5 ml-2 pl-4 border-l border-gray-200 dark:border-gray-800 text-xs font-semibold shrink-0">
            <button
              type="button"
              onClick={() => setActiveView("landing")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeView === "landing"
                  ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-bold"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Compass className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">Overview & How It Works</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView("builder")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeView === "builder"
                  ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-bold"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">Resume Builder Workspace</span>
            </button>
          </nav>
        </div>

        {/* Action Controls & Google OAuth */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 whitespace-nowrap">
          {activeView === "landing" ? (
            <Button
              onClick={() => setActiveView("builder")}
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer shadow-md whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">Launch Builder</span>
            </Button>
          ) : (
            <>
              {/* AI Optimize Button */}
              <Button
                onClick={onTriggerAI}
                disabled={isGeneratingAI}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Sparkles className={`w-4 h-4 shrink-0 ${isGeneratingAI ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline whitespace-nowrap">Optimize with AI</span>
                <span className="sm:hidden whitespace-nowrap">AI Optimize</span>
              </Button>

              {/* Sample Data Button */}
              <Button
                variant="outline"
                onClick={onLoadSample}
                className="cursor-pointer whitespace-nowrap shrink-0"
                title="Populate realistic sample data for instant testing"
              >
                <FileCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="hidden md:inline whitespace-nowrap">Try Sample Resume</span>
                <span className="md:hidden whitespace-nowrap">Sample</span>
              </Button>

              {/* Clear Data Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowClearConfirm(true)}
                className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 cursor-pointer shrink-0"
                title="Clear all saved resume data"
              >
                <RotateCcw className="w-4 h-4 shrink-0" />
              </Button>
            </>
          )}

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer shrink-0"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun className="w-4 h-4 shrink-0" /> : <Moon className="w-4 h-4 shrink-0" />}
          </Button>

          {/* Google OAuth Login / User Initial Badge */}
          {user ? (
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[#4285F4] hover:bg-[#3367D6] text-white font-black text-sm shadow-md transition-transform active:scale-95 border-2 border-white dark:border-gray-800 focus:outline-none cursor-pointer shrink-0"
                title={user.name || user.email}
              >
                {firstLetter}
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-11 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-3 z-50 text-xs animate-fade-in">
                  <div className="flex items-center gap-2.5 pb-2.5 border-b border-gray-100 dark:border-gray-700">
                    <div className="w-8 h-8 rounded-full bg-[#4285F4] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {firstLetter}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-gray-500 dark:text-gray-400 truncate text-[11px]">{user.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onLogout?.();
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl mt-2 font-medium transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 shrink-0" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={onLogin}
              className="cursor-pointer whitespace-nowrap shrink-0"
            >
              <LogIn className="w-4 h-4 text-blue-500 shrink-0" />
              <span className="whitespace-nowrap">Sign In</span>
            </Button>
          )}
        </div>
      </div>

      {/* Confirmation Modal for Clearing Data */}
      <Dialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
        <DialogClose onClick={() => setShowClearConfirm(false)} />
        <DialogHeader>
          <div className="flex items-center gap-3 text-red-600 dark:text-red-400 mb-1">
            <Trash2 className="w-6 h-6" />
            <DialogTitle>Clear Form Data?</DialogTitle>
          </div>
          <DialogDescription>
            This action will erase all entered personal information, experience, and custom edits.
            This cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => setShowClearConfirm(false)}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onClearData();
              setShowClearConfirm(false);
            }}
            className="cursor-pointer"
          >
            Clear Data
          </Button>
        </div>
      </Dialog>
    </header>
  );
}
