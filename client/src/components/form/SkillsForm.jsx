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

  const renderSkillSection = (key, label, Icon, colorClass, placeholder) => {
    const categoryData = data[key] || [];
    return (
    <div className="space-y-3">
      <Label className="flex items-center gap-1.5">
        <Icon className={`w-4 h-4 ${colorClass}`} />
        {label}
      </Label>
      <div className="flex gap-2">
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
          className="cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 pt-1">
        {categoryData.map((skill) => (
          <Badge key={skill} variant="default" className="gap-1.5 py-1 px-3">
            {skill}
            <button
              type="button"
              onClick={() => removeTag(key, skill)}
              className="hover:text-blue-900 dark:hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </Badge>
        ))}
        {categoryData.length === 0 && (
          <span className="text-xs text-gray-400 italic">No {label.toLowerCase()} added yet.</span>
        )}
      </div>
    </div>
  )};

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
        {renderSkillSection("languages", "Languages", Code, "text-blue-500", "e.g. JavaScript, C++, Python, Java")}
        {renderSkillSection("dsa", "Data Structures & Algorithms", Terminal, "text-emerald-500", "e.g. Arrays, Strings, Trees")}
        {renderSkillSection("frontend", "Frontend", Monitor, "text-purple-500", "e.g. React.js, Tailwind CSS, Framer Motion")}
        {renderSkillSection("backend", "Backend", Server, "text-orange-500", "e.g. Node.js, REST APIs, MongoDB")}
        {renderSkillSection("tools", "Tools", Wrench, "text-gray-500", "e.g. Git/GitHub, Postman")}
      </CardContent>
    </Card>
  );
}
