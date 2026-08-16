import React, { useEffect, useState } from "react";
import { Sparkles, BrainCircuit, ShieldCheck, CheckCircle2 } from "lucide-react";

const PHASES = [
  { label: "Analyzing your experience...", icon: BrainCircuit },
  { label: "Optimizing resume phrasing...", icon: Sparkles },
  { label: "Checking ATS compatibility...", icon: ShieldCheck },
];

export function AILoadingModal({ isOpen }) {
  const [currentPhase, setCurrentPhase] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentPhase(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentPhase((prev) => (prev < PHASES.length - 1 ? prev + 1 : prev));
    }, 1200);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-mono">
      <div className="bg-[var(--paper)] dark:bg-[#161B22] p-6 sm:p-8 max-w-md w-full border border-[var(--ink)]/20 dark:border-[var(--ink-dark)]/20 text-center space-y-6">
        <div className="mx-auto w-12 h-12 flex items-center justify-center bg-[var(--ink)] dark:bg-[var(--ink-dark)] text-[var(--paper)] dark:text-[var(--paper-dark)]">
          <Sparkles className="w-6 h-6 text-[var(--redline)] animate-pulse" />
        </div>

        <div>
          <h3 className="font-mono text-base font-bold text-[var(--ink)] dark:text-[var(--ink-dark)]">
            Gemini AI Optimization
          </h3>
          <p className="font-mono text-xs text-[var(--ink)]/50 dark:text-[var(--ink-dark)]/50 mt-1">
            Refining bullet points, building summary & checking ATS keywords...
          </p>
        </div>

        <div className="space-y-3 text-left bg-white dark:bg-black/20 p-4 border border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 font-mono">
          {PHASES.map((phase, idx) => {
            const Icon = phase.icon;
            const isCompleted = idx < currentPhase;
            const isCurrent = idx === currentPhase;

            return (
              <div key={idx} className="flex items-center gap-3">
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-[var(--pass)] shrink-0" />
                ) : isCurrent ? (
                  <div className="w-4 h-4 border-2 border-[var(--redline)] border-t-transparent animate-spin shrink-0" />
                ) : (
                  <Icon className="w-4 h-4 text-[var(--ink)]/30 dark:text-[var(--ink-dark)]/30 shrink-0" />
                )}
                <span
                  className={`text-xs font-semibold ${
                    isCurrent
                      ? "text-[var(--redline)]"
                      : isCompleted
                      ? "text-[var(--ink)] dark:text-[var(--ink-dark)]"
                      : "text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40"
                  }`}
                >
                  {phase.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="w-full bg-[var(--ink)]/10 dark:bg-[var(--ink-dark)]/10 h-1">
          <div
            className="bg-[var(--redline)] h-full transition-all duration-500 ease-out"
            style={{ width: `${((currentPhase + 1) / PHASES.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
