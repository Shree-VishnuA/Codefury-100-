import React, { useState } from "react";
import { Wrench, Code, HeartHandshake, Layers, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export function SkillsForm({ data, onChange, errors = {} }) {
  const [techInput, setTechInput] = useState("");
  const [softInput, setSoftInput] = useState("");
  const [toolInput, setToolInput] = useState("");

  const addTag = (category, value, resetFn) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (!data[category].includes(trimmed)) {
      onChange({
        ...data,
        [category]: [...data[category], trimmed],
      });
    }
    resetFn("");
  };

  const removeTag = (category, tagToRemove) => {
    onChange({
      ...data,
      [category]: data[category].filter((tag) => tag !== tagToRemove),
    });
  };

  const handleKeyDown = (e, category, value, resetFn) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(category, value, resetFn);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle>
          <Wrench className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Skills & Technologies
        </CardTitle>
        <CardDescription>
          Type a skill and press Enter or comma to add it as a tag badge.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-2">
        <div className="space-y-3">
          <Label className="flex items-center gap-1.5">
            <Code className="w-4 h-4 text-blue-500" />
            Technical / Hard Skills <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "technical", techInput, setTechInput)}
              placeholder="e.g. React, JavaScript, Python (Press Enter)"
              className="flex-1"
            />
            <Button
              type="button"
              onClick={() => addTag("technical", techInput, setTechInput)}
              size="sm"
              className="cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add
            </Button>
          </div>
          {errors.technical && (
            <p className="text-xs text-red-500">{errors.technical}</p>
          )}
          <div className="flex flex-wrap gap-2 pt-1">
            {data.technical.map((skill) => (
              <Badge key={skill} variant="default" className="gap-1.5 py-1 px-3">
                {skill}
                <button
                  type="button"
                  onClick={() => removeTag("technical", skill)}
                  className="hover:text-blue-900 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </Badge>
            ))}
            {data.technical.length === 0 && (
              <span className="text-xs text-gray-400 italic">No technical skills added yet.</span>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-emerald-500" />
            Soft Skills & Competencies
          </Label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={softInput}
              onChange={(e) => setSoftInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "soft", softInput, setSoftInput)}
              placeholder="e.g. Leadership, Problem Solving, Cross-functional Collaboration"
              className="flex-1"
            />
            <Button
              type="button"
              onClick={() => addTag("soft", softInput, setSoftInput)}
              size="sm"
              variant="accent"
              className="cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {data.soft.map((skill) => (
              <Badge key={skill} variant="success" className="gap-1.5 py-1 px-3">
                {skill}
                <button
                  type="button"
                  onClick={() => removeTag("soft", skill)}
                  className="hover:text-emerald-900 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </Badge>
            ))}
            {data.soft.length === 0 && (
              <span className="text-xs text-gray-400 italic">No soft skills added yet.</span>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-purple-500" />
            Tools, Platforms & Frameworks
          </Label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={toolInput}
              onChange={(e) => setToolInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "tools", toolInput, setToolInput)}
              placeholder="e.g. Git, Docker, AWS, Postman"
              className="flex-1"
            />
            <Button
              type="button"
              onClick={() => addTag("tools", toolInput, setToolInput)}
              size="sm"
              className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {data.tools.map((skill) => (
              <Badge key={skill} variant="accent" className="gap-1.5 py-1 px-3">
                {skill}
                <button
                  type="button"
                  onClick={() => removeTag("tools", skill)}
                  className="hover:text-purple-900 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </Badge>
            ))}
            {data.tools.length === 0 && (
              <span className="text-xs text-gray-400 italic">No tools added yet.</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
