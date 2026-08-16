import React from "react";
import { User, Briefcase, GraduationCap, Wrench, FolderCheck, CheckCircle2, Target } from "lucide-react";

const STEPS = [
  { id: 1, label: "Personal", icon: User },
  { id: 2, label: "Target Job", icon: Target },
  { id: 3, label: "Experience", icon: Briefcase },
  { id: 4, label: "Education", icon: GraduationCap },
  { id: 5, label: "Skills", icon: Wrench },
  { id: 6, label: "Projects", icon: FolderCheck },
];

export function StepNavigation({ currentStep, setCurrentStep }) {
  const progressPercent = Math.round(((currentStep - 1) / (STEPS.length - 1)) * 100);

  return (
    <div
      className="w-full bg-[var(--paper)] dark:bg-[var(--paper-dark)] p-4 border mb-6"
      style={{ borderColor: "rgba(21,28,36,0.12)" }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink)]/50 dark:text-[var(--ink-dark)]/50">
          Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].label}
        </span>
        <span className="font-mono text-[10px] font-bold text-[var(--redline)]">
          {progressPercent}%
        </span>
      </div>
      <div className="w-full bg-[var(--ink)]/10 dark:bg-[var(--ink-dark)]/10 h-0.5 mb-4">
        <div
          className="bg-[var(--redline)] h-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1">
        {STEPS.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isDone = currentStep > step.id;

          return (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={`flex flex-col items-center justify-center p-2 text-[10px] font-mono font-medium transition-all duration-200 cursor-pointer border-b-2 ${
                isActive
                  ? "border-b-[var(--redline)] text-[var(--ink)] dark:text-[var(--ink-dark)] bg-[var(--ink)]/[0.03] dark:bg-[var(--ink-dark)]/[0.03]"
                  : isDone
                  ? "border-b-[var(--pass)] text-[var(--ink)]/60 dark:text-[var(--ink-dark)]/60 hover:bg-[var(--ink)]/[0.03]"
                  : "border-b-transparent text-[var(--ink)]/30 dark:text-[var(--ink-dark)]/30 hover:text-[var(--ink)]/60 dark:hover:text-[var(--ink-dark)]/60"
              }`}
            >
              <div className="flex items-center gap-1 mb-1">
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--pass)]" />
                ) : (
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[var(--redline)]" : ""}`} />
                )}
              </div>
              <span className="truncate w-full text-center">{step.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
