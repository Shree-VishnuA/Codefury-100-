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
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
        <div>
          <CardTitle>
            <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Education History
          </CardTitle>
          <CardDescription>
            Add academic degrees, university details, and graduation years.
          </CardDescription>
        </div>
        <Button
          onClick={addEducation}
          size="sm"
          variant="accent"
          className="cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      </CardHeader>

      <CardContent className="space-y-6 pt-4">
        {data.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
            <GraduationCap className="w-10 h-10 text-gray-400 mx-auto mb-2 opacity-60" />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              No education entries added yet.
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 mb-4">
              Click below to add your degree details.
            </p>
            <Button
              onClick={addEducation}
              variant="outline"
              size="sm"
              className="cursor-pointer text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
            >
              + Add Education Entry
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {data.map((edu, index) => (
              <div
                key={edu.id}
                className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Education #{index + 1}
                  </span>
                  <Button
                    variant="ghost"
                    size="iconSm"
                    onClick={() => removeEducation(edu.id)}
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                    title="Remove Education"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-1 block">
                      Institution / University <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <School className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 z-10" />
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
                    <Label className="mb-1 block">
                      Degree <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <GraduationCap className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 z-10" />
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
                    <Label className="mb-1 block">Field of Study / Major</Label>
                    <div className="relative">
                      <BookOpen className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 z-10" />
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
                    <Label className="mb-1 block">GPA / CGPA (Optional)</Label>
                    <div className="relative">
                      <Award className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 z-10" />
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
                    <Label className="mb-1 flex items-center gap-1">
                      <CalendarIcon className="w-3 h-3 text-indigo-500" /> Start Date
                    </Label>
                    <DatePicker
                      value={edu.startDate || ""}
                      onChange={(val) => updateEducationField(edu.id, "startDate", val)}
                      placeholder="Pick start date"
                      mode="month"
                    />
                  </div>

                  <div>
                    <Label className="mb-1 flex items-center gap-1">
                      <CalendarIcon className="w-3 h-3 text-indigo-500" /> End / Expected Date
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
