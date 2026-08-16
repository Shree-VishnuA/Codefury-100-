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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700 text-center space-y-6">
        <div className="relative mx-auto w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
          <Sparkles className="w-8 h-8 animate-pulse" />
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">
            Gemini AI Optimization
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Refining bullet points, building summary & checking ATS keywords...
          </p>
        </div>

        <div className="space-y-3 text-left bg-gray-50 dark:bg-gray-900/60 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
          {PHASES.map((phase, idx) => {
            const Icon = phase.icon;
            const isCompleted = idx < currentPhase;
            const isCurrent = idx === currentPhase;

            return (
              <div key={idx} className="flex items-center gap-3">
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                ) : isCurrent ? (
                  <div className="w-5 h-5 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin shrink-0" />
                ) : (
                  <Icon className="w-5 h-5 text-gray-300 dark:text-gray-600 shrink-0" />
                )}
                <span
                  className={`text-xs font-semibold ${
                    isCurrent
                      ? "text-indigo-600 dark:text-indigo-400"
                      : isCompleted
                      ? "text-gray-700 dark:text-gray-300"
                      : "text-gray-400 dark:text-gray-600"
                  }`}
                >
                  {phase.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-full transition-all duration-500 ease-out"
            style={{ width: `${((currentPhase + 1) / PHASES.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
