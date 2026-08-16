import React from "react";
import {
  PenTool,
  Compass,
  FileEdit,
  FileUp,
  Sun,
  Moon,
  LogIn,
  LogOut,
  FileCheck,
  RotateCcw,
  Sparkles,
} from "lucide-react";

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
      label: "Overview",
      icon: Compass,
      description: "AI features and ATS scoring",
    },
    {
      id: "scratch",
      label: "Build from Scratch",
      icon: FileEdit,
      description: "Step-by-step interactive builder",
    },
    {
      id: "improve",
      label: "Improve Existing",
      icon: FileUp,
      badge: "AI",
      description: "Upload PDF and auto-extract details",
    },
  ];

  return (
    <aside
      className="w-full lg:w-64 bg-[var(--paper)] dark:bg-[var(--paper-dark)] border-b lg:border-b-0 lg:border-r flex flex-col shrink-0 lg:sticky lg:top-0 lg:h-screen z-40 transition-colors"
      style={{ borderColor: "rgba(21,28,36,0.1)" }}
    >
      <div
        className="p-4 sm:p-5 border-b flex items-center justify-between"
        style={{ borderColor: "rgba(21,28,36,0.1)" }}
      >
        <button
          type="button"
          onClick={() => setActiveTab("landing")}
          className="flex items-baseline gap-2 text-left focus:outline-none cursor-pointer"
        >
          <span className="font-mono text-base font-bold tracking-tight text-[var(--ink)] dark:text-[var(--ink-dark)]">
            GenForge
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--redline)]">
            / ops
          </span>
        </button>

        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="lg:hidden w-8 h-8 flex items-center justify-center border border-[var(--ink)]/20 dark:border-[var(--ink-dark)]/20 text-[var(--ink)]/50 dark:text-[var(--ink-dark)]/50 hover:text-[var(--ink)] dark:hover:text-[var(--ink-dark)] transition-colors"
        >
          {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <div className="px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40">
          Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-start gap-3 p-3 text-left transition-all cursor-pointer group relative border-l-2 ${
                isActive
                  ? "border-l-[var(--redline)] bg-[var(--ink)]/[0.04] dark:bg-[var(--ink-dark)]/[0.04]"
                  : "border-l-transparent hover:bg-[var(--ink)]/[0.03] dark:hover:bg-[var(--ink-dark)]/[0.03]"
              }`}
            >
              <Icon
                className={`w-4 h-4 mt-0.5 shrink-0 ${
                  isActive
                    ? "text-[var(--redline)]"
                    : "text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40 group-hover:text-[var(--ink)] dark:group-hover:text-[var(--ink-dark)]"
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs font-semibold truncate ${
                      isActive
                        ? "text-[var(--ink)] dark:text-[var(--ink-dark)]"
                        : "text-[var(--ink)]/70 dark:text-[var(--ink-dark)]/70"
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 bg-[var(--redline)] text-[var(--paper)]">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="font-mono text-[10px] truncate mt-0.5 text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}

        <div
          className="pt-4 mt-4 border-t space-y-2 px-1"
          style={{ borderColor: "rgba(21,28,36,0.1)" }}
        >
          <div className="px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40">
            Quick Actions
          </div>

          <button
            type="button"
            onClick={onTriggerAI}
            disabled={isGeneratingAI}
            className="w-full flex items-center justify-start gap-2 px-3 py-2.5 font-mono text-xs font-bold bg-[var(--ink)] dark:bg-[var(--ink-dark)] text-[var(--paper)] dark:text-[var(--paper-dark)] hover:bg-[var(--redline)] dark:hover:bg-[var(--redline)] dark:hover:text-[var(--paper)] transition-colors disabled:opacity-50"
          >
            <Sparkles className={`w-3.5 h-3.5 shrink-0 ${isGeneratingAI ? "animate-spin" : ""}`} />
            <span>{isGeneratingAI ? "Optimizing..." : "Optimize with AI"}</span>
          </button>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <button
              type="button"
              onClick={onLoadSample}
              className="flex items-center justify-center gap-1.5 px-2 py-2 font-mono text-[11px] font-semibold border border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 hover:border-[var(--ink)] dark:hover:border-[var(--ink-dark)] text-[var(--ink)]/70 dark:text-[var(--ink-dark)]/70 hover:text-[var(--ink)] dark:hover:text-[var(--ink-dark)] transition-colors"
              title="Load sample data"
            >
              <FileCheck className="w-3 h-3 shrink-0" />
              <span className="truncate">Sample</span>
            </button>

            <button
              type="button"
              onClick={onClearData}
              className="flex items-center justify-center gap-1.5 px-2 py-2 font-mono text-[11px] font-semibold border border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 hover:border-[var(--redline)] text-[var(--ink)]/50 dark:text-[var(--ink-dark)]/50 hover:text-[var(--redline)] transition-colors"
              title="Reset data"
            >
              <RotateCcw className="w-3 h-3 shrink-0" />
              <span className="truncate">Clear</span>
            </button>
          </div>
        </div>
      </div>

      <div
        className="p-3 border-t space-y-2"
        style={{ borderColor: "rgba(21,28,36,0.1)" }}
      >
        <div className="flex items-center justify-between px-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40">
            Theme
          </span>
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="w-8 h-8 flex items-center justify-center border border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 hover:border-[var(--ink)] dark:hover:border-[var(--ink-dark)] text-[var(--ink)]/50 dark:text-[var(--ink-dark)]/50 hover:text-[var(--ink)] dark:hover:text-[var(--ink-dark)] transition-colors"
            title={darkMode ? "Light mode" : "Dark mode"}
          >
            {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>

        {user ? (
          <div
            className="p-2.5 border flex items-center justify-between"
            style={{ borderColor: "rgba(21,28,36,0.1)" }}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 flex items-center justify-center bg-[var(--ink)] dark:bg-[var(--ink-dark)] text-[var(--paper)] dark:text-[var(--paper-dark)] font-mono font-bold text-xs shrink-0">
                {firstLetter}
              </div>
              <div className="min-w-0">
                <p className="font-mono font-bold text-xs text-[var(--ink)] dark:text-[var(--ink-dark)] truncate">{user.name}</p>
                <p className="font-mono text-[10px] text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40 truncate">{user.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="w-7 h-7 flex items-center justify-center text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40 hover:text-[var(--redline)] transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onLogin}
            className="w-full flex items-center justify-center gap-2 py-2 font-mono text-xs font-semibold border border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 hover:border-[var(--ink)] dark:hover:border-[var(--ink-dark)] text-[var(--ink)] dark:text-[var(--ink-dark)] transition-colors"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </aside>
  );
}
