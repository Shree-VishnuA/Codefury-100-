import React from "react";
import { User, Briefcase, GraduationCap, Wrench, FolderCheck, CheckCircle2, Target } from "lucide-react";

const STEPS = [
  { id: 1, label: "Personal Info", icon: User },
  { id: 2, label: "Target Job", icon: Target },
  { id: 3, label: "Experience", icon: Briefcase },
  { id: 4, label: "Education", icon: GraduationCap },
  { id: 5, label: "Skills", icon: Wrench },
  { id: 6, label: "Projects & Extras", icon: FolderCheck },
];

export function StepNavigation({ currentStep, setCurrentStep }) {
  const progressPercent = Math.round(((currentStep - 1) / (STEPS.length - 1)) * 100);

  return (
    <div className="w-full rounded-2xl bg-white/[0.04] p-4 border border-white/10 shadow-2xl shadow-black/10 mb-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].label}
        </span>
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
          {progressPercent}% Complete
        </span>
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden mb-5">
        <div
          className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {STEPS.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isDone = currentStep > step.id;

          return (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={`flex flex-col items-center justify-center p-2.5 rounded-lg text-xs font-medium transition-all duration-200 relative cursor-pointer ${
                isActive
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow-sm"
                  : isDone
                  ? "bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                ) : (
                  <Icon className={`w-4 h-4 ${isActive ? "text-blue-600 dark:text-blue-400" : ""}`} />
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
