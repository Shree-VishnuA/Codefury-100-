import React from "react";
import {
  Sparkles,
  Compass,
  FileEdit,
  FileUp,
  Sun,
  Moon,
  LogIn,
  LogOut,
  ShieldCheck,
  FileCheck,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Sidebar({
  activeTab,
  setActiveTab,
  user,
  onLogin,
  onLogout,
  darkMode,
  setDarkMode,
  onLoadSample,
  onClearData,
  onTriggerAI,
  isGeneratingAI,
}) {
  const firstLetter = (user?.name || user?.email || "U").trim().charAt(0).toUpperCase();

  const navItems = [
    {
      id: "landing",
      label: "Overview & How It Works",
      icon: Compass,
      description: "Learn about AI features & ATS scoring",
    },
    {
      id: "scratch",
      label: "Build Resume from Scratch",
      icon: FileEdit,
      description: "Step-by-step interactive builder",
    },
    {
      id: "improve",
      label: "Improve Current Resume",
      icon: FileUp,
      badge: "AI Powered",
      description: "Upload PDF & auto-extract details",
    },
  ];

  return (
    <aside className="w-full lg:w-72 bg-white dark:bg-gray-900 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 flex flex-col shrink-0 lg:sticky lg:top-0 lg:h-screen z-40 transition-colors">
      {/* Brand Header */}
      <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setActiveTab("landing")}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                GenForge
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
              AI Resume & ATS Optimizer
            </p>
          </div>
        </button>

        {/* Mobile Theme Toggle */}
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="lg:hidden text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white p-2 rounded-lg"
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      {/* Primary Navigation Menu */}
      <div className="flex-1 p-3 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
          Navigation Tabs
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all cursor-pointer group relative ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60"
              }`}
            >
              <Icon
                className={`w-5 h-5 mt-0.5 shrink-0 ${
                  isActive ? "text-white" : "text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold truncate">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <p
                  className={`text-[10px] truncate mt-0.5 ${
                    isActive ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}

        {/* Global Quick Action Section */}
        <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
          <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
            Quick Actions
          </div>

          <Button
            onClick={onTriggerAI}
            disabled={isGeneratingAI}
            className="w-full justify-start py-2.5 h-auto text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white cursor-pointer shadow-sm"
          >
            <Sparkles className={`w-4 h-4 mr-2 shrink-0 ${isGeneratingAI ? "animate-spin" : ""}`} />
            <span>{isGeneratingAI ? "Optimizing..." : "Optimize with AI"}</span>
          </Button>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={onLoadSample}
              className="text-[11px] font-semibold cursor-pointer py-1.5 h-auto justify-start"
              title="Populate sample resume data"
            >
              <FileCheck className="w-3.5 h-3.5 mr-1 text-blue-500 shrink-0" />
              <span className="truncate">Sample</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onClearData}
              className="text-[11px] font-semibold text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 cursor-pointer py-1.5 h-auto justify-start"
              title="Reset data"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1 shrink-0" />
              <span className="truncate">Clear</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer / User Profile & Theme Toggle */}
      <div className="p-3 border-t border-gray-100 dark:border-gray-800 space-y-2">
        <div className="flex items-center justify-between px-2">
          <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
            Appearance
          </span>
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {user ? (
          <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#4285F4] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                {firstLetter}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-xs text-gray-900 dark:text-white truncate">{user.name}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={onLogin}
            className="w-full py-2 text-xs font-bold cursor-pointer justify-center"
          >
            <LogIn className="w-4 h-4 mr-1.5 text-blue-500" />
            <span>Sign In</span>
          </Button>
        )}
      </div>
    </aside>
  );
}
