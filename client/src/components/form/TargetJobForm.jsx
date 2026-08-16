import React from "react";
import { Target, Building2, FileCode } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function TargetJobForm({ data, onChange, errors = {} }) {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>
          <Target className="w-4 h-4 text-[var(--redline)]" />
          Target Job & Industry
        </CardTitle>
        <CardDescription>
          Legible uses your target role and job description to tailor achievements and run ATS keyword matching.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-2 font-mono">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="mb-1 block font-mono text-xs font-semibold">
              Target Job Title / Role <span className="text-[var(--redline)]">*</span>
            </Label>
            <div className="relative">
              <Target className="w-4 h-4 text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40 absolute left-3 top-2.5 z-10" />
              <Input
                type="text"
                value={data.targetRole}
                onChange={(e) => handleChange("targetRole", e.target.value)}
                placeholder="e.g. Senior Machine Learning Engineer"
                className={`pl-9 ${errors.targetRole ? "border-[var(--redline)]" : ""}`}
              />
            </div>
            {errors.targetRole && (
              <p className="text-xs text-[var(--redline)] mt-1">{errors.targetRole}</p>
            )}
          </div>

          <div>
            <Label className="mb-1 block font-mono text-xs font-semibold">Industry / Field</Label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40 absolute left-3 top-2.5 z-10" />
              <Input
                type="text"
                value={data.industry}
                onChange={(e) => handleChange("industry", e.target.value)}
                placeholder="e.g. AI & Cloud Software"
                className="pl-9"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <Label className="block font-mono text-xs font-semibold">
              Target Job Description (Optional but Recommended)
            </Label>
            <span className="text-[10px] text-[var(--redline)] font-mono">
              Used for ATS Keyword Match
            </span>
          </div>
          <div className="relative font-sans">
            <FileCode className="w-4 h-4 text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40 absolute left-3 top-3 z-10" />
            <textarea
              rows={5}
              value={data.jobDescription}
              onChange={(e) => handleChange("jobDescription", e.target.value)}
              placeholder="Paste the target job post text here. Gemini will extract essential keywords, compare them with your experience, and recommend missing skills."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white dark:bg-[#161B22] border border-[var(--ink)]/20 dark:border-[var(--ink-dark)]/20 rounded-none focus:border-[var(--redline)] focus:outline-none transition-colors text-[var(--ink)] dark:text-[var(--ink-dark)]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
