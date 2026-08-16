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
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle>
          <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Target Job & Industry
        </CardTitle>
        <CardDescription>
          GenForge uses your target role and job description to tailor achievements and run ATS keyword matching.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="mb-1 block">
              Target Job Title / Role <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Target className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 z-10" />
              <Input
                type="text"
                value={data.targetRole}
                onChange={(e) => handleChange("targetRole", e.target.value)}
                placeholder="e.g. Senior Machine Learning Engineer"
                className={`pl-9 ${errors.targetRole ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
            </div>
            {errors.targetRole && (
              <p className="text-xs text-red-500 mt-1">{errors.targetRole}</p>
            )}
          </div>

          <div>
            <Label className="mb-1 block">Industry / Field</Label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 z-10" />
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
            <Label className="block">
              Target Job Description (Optional but Recommended)
            </Label>
            <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
              Used for ATS Keyword Match
            </span>
          </div>
          <div className="relative">
            <FileCode className="w-4 h-4 text-gray-400 absolute left-3 top-3 z-10" />
            <textarea
              rows={5}
              value={data.jobDescription}
              onChange={(e) => handleChange("jobDescription", e.target.value)}
              placeholder="Paste the target job post text here. Gemini will extract essential keywords, compare them with your experience, and recommend missing skills."
              className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors dark:text-white"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
