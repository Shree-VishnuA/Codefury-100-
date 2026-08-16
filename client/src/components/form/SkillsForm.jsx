import React, { useState } from "react";
import { Wrench, Code, Terminal, Monitor, Server, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export function SkillsForm({ data, onChange, errors = {} }) {
  const [inputs, setInputs] = useState({
    languages: "",
    dsa: "",
    frontend: "",
    backend: "",
    tools: "",
  });

  const addTag = (category) => {
    const value = inputs[category];
    const trimmed = value.trim();
    if (!trimmed) return;
    const currentData = data[category] || [];
    if (!currentData.includes(trimmed)) {
      onChange({
        ...data,
        [category]: [...currentData, trimmed],
      });
    }
    setInputs({ ...inputs, [category]: "" });
  };

  const removeTag = (category, tagToRemove) => {
    const currentData = data[category] || [];
    onChange({
      ...data,
      [category]: currentData.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleKeyDown = (e, category) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(category);
    }
  };

  const renderSkillSection = (key, label, Icon, placeholder) => {
    const categoryData = data[key] || [];
    return (
      <div className="space-y-2 font-mono">
        <Label className="flex items-center gap-1.5 font-mono text-xs font-semibold">
          <Icon className="w-3.5 h-3.5 text-[var(--redline)]" />
          {label}
        </Label>
        <div className="flex gap-2 font-sans">
          <Input
            type="text"
            value={inputs[key] || ""}
            onChange={(e) => setInputs({ ...inputs, [key]: e.target.value })}
            onKeyDown={(e) => handleKeyDown(e, key)}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={() => addTag(key)}
            size="sm"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1 font-mono">
          {categoryData.map((skill) => (
            <Badge key={skill} variant="default" className="gap-1.5 py-1 px-2.5">
              {skill}
              <button
                type="button"
                onClick={() => removeTag(key, skill)}
                className="hover:text-[var(--redline)] cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {categoryData.length === 0 && (
            <span className="text-[11px] text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40 italic">No {label.toLowerCase()} added yet.</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>
          <Wrench className="w-4 h-4 text-[var(--redline)]" />
          Skills & Technologies
        </CardTitle>
        <CardDescription>
          Type a skill and press Enter or comma to add it as a tag badge.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-2">
        {renderSkillSection("languages", "Languages", Code, "e.g. JavaScript, C++, Python, Java")}
        {renderSkillSection("dsa", "Data Structures & Algorithms", Terminal, "e.g. Arrays, Strings, Trees")}
        {renderSkillSection("frontend", "Frontend", Monitor, "e.g. React.js, Tailwind CSS, Framer Motion")}
        {renderSkillSection("backend", "Backend", Server, "e.g. Node.js, REST APIs, MongoDB")}
        {renderSkillSection("tools", "Tools", Wrench, "e.g. Git/GitHub, Postman")}
      </CardContent>
    </Card>
  );
}
