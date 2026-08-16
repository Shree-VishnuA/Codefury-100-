import React from "react";
import { GraduationCap, Plus, Trash2, School, BookOpen, Award, Calendar as CalendarIcon } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EducationForm({ data, onChange, errors = {} }) {
  const addEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      gpa: "",
    };
    onChange([...data, newEdu]);
  };

  const removeEducation = (id) => {
    onChange(data.filter((item) => item.id !== id));
  };

  const updateEducationField = (id, field, value) => {
    onChange(
      data.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
        <div>
          <CardTitle>
            <GraduationCap className="w-4 h-4 text-[var(--redline)]" />
            Education History
          </CardTitle>
          <CardDescription>
            Add academic degrees, university details, and graduation years.
          </CardDescription>
        </div>
        <Button
          onClick={addEducation}
          size="sm"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Education
        </Button>
      </CardHeader>

      <CardContent className="space-y-6 pt-4 font-mono">
        {data.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 bg-[var(--paper)] dark:bg-[#161B22]">
            <GraduationCap className="w-8 h-8 text-[var(--ink)]/30 dark:text-[var(--ink-dark)]/30 mx-auto mb-2" />
            <p className="font-mono text-xs font-semibold text-[var(--ink)]/60 dark:text-[var(--ink-dark)]/60">
              No education entries added yet.
            </p>
            <p className="font-mono text-[11px] text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40 mt-1 mb-4">
              Click below to add your degree details.
            </p>
            <Button
              onClick={addEducation}
              variant="outline"
              size="sm"
            >
              + Add Education Entry
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {data.map((edu, index) => (
              <div
                key={edu.id}
                className="p-4 border border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 bg-[var(--paper)] dark:bg-[#161B22] space-y-4 font-mono"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[var(--redline)] uppercase tracking-wider">
                    Education #{index + 1}
                  </span>
                  <Button
                    variant="ghost"
                    size="iconSm"
                    onClick={() => removeEducation(edu.id)}
                    className="text-[var(--redline)] hover:bg-[var(--redline)] hover:text-white"
                    title="Remove Education"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                  <div>
                    <Label className="mb-1 block font-mono text-xs font-semibold">
                      Institution / University <span className="text-[var(--redline)]">*</span>
                    </Label>
                    <div className="relative">
                      <School className="w-4 h-4 text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40 absolute left-3 top-2.5 z-10" />
                      <Input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducationField(edu.id, "institution", e.target.value)}
                        placeholder="e.g. Stanford University"
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="mb-1 block font-mono text-xs font-semibold">
                      Degree <span className="text-[var(--redline)]">*</span>
                    </Label>
                    <div className="relative">
                      <GraduationCap className="w-4 h-4 text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40 absolute left-3 top-2.5 z-10" />
                      <Input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducationField(edu.id, "degree", e.target.value)}
                        placeholder="e.g. Bachelor of Science"
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="mb-1 block font-mono text-xs font-semibold">Field of Study / Major</Label>
                    <div className="relative">
                      <BookOpen className="w-4 h-4 text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40 absolute left-3 top-2.5 z-10" />
                      <Input
                        type="text"
                        value={edu.fieldOfStudy}
                        onChange={(e) => updateEducationField(edu.id, "fieldOfStudy", e.target.value)}
                        placeholder="e.g. Computer Science"
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="mb-1 block font-mono text-xs font-semibold">GPA / CGPA (Optional)</Label>
                    <div className="relative">
                      <Award className="w-4 h-4 text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40 absolute left-3 top-2.5 z-10" />
                      <Input
                        type="text"
                        value={edu.gpa || ""}
                        onChange={(e) => updateEducationField(edu.id, "gpa", e.target.value)}
                        placeholder="e.g. 3.8 / 4.0"
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="mb-1 flex items-center gap-1 font-mono text-xs font-semibold">
                      <CalendarIcon className="w-3 h-3 text-[var(--redline)]" /> Start Date
                    </Label>
                    <DatePicker
                      value={edu.startDate || ""}
                      onChange={(val) => updateEducationField(edu.id, "startDate", val)}
                      placeholder="Pick start date"
                      mode="month"
                    />
                  </div>

                  <div>
                    <Label className="mb-1 flex items-center gap-1 font-mono text-xs font-semibold">
                      <CalendarIcon className="w-3 h-3 text-[var(--redline)]" /> End / Expected Date
                    </Label>
                    <DatePicker
                      value={edu.endDate || ""}
                      onChange={(val) => updateEducationField(edu.id, "endDate", val)}
                      placeholder="Pick end date"
                      mode="month"
                      allowPresent={true}
                      onSelectPresent={() => updateEducationField(edu.id, "endDate", "Present")}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
