import React from "react";
import { Briefcase, Plus, Trash2, ArrowUp, ArrowDown, Building, MapPin, ListPlus, X, Calendar as CalendarIcon } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ExperienceForm({ data, onChange, errors = {} }) {
  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      bullets: [""],
    };
    onChange([...data, newExp]);
  };

  const removeExperience = (id) => {
    onChange(data.filter((item) => item.id !== id));
  };

  const moveExperience = (index, direction) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= data.length) return;
    const items = [...data];
    const temp = items[index];
    items[index] = items[targetIndex];
    items[targetIndex] = temp;
    onChange(items);
  };

  const updateExperienceField = (id, field, value) => {
    onChange(
      data.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const addBullet = (expId) => {
    onChange(
      data.map((item) =>
        item.id === expId ? { ...item, bullets: [...item.bullets, ""] } : item
      )
    );
  };

  const updateBullet = (expId, bIndex, text) => {
    onChange(
      data.map((item) => {
        if (item.id !== expId) return item;
        const newBullets = [...item.bullets];
        newBullets[bIndex] = text;
        return { ...item, bullets: newBullets };
      })
    );
  };

  const removeBullet = (expId, bIndex) => {
    onChange(
      data.map((item) => {
        if (item.id !== expId) return item;
        const newBullets = item.bullets.filter((_, idx) => idx !== bIndex);
        return { ...item, bullets: newBullets.length ? newBullets : [""] };
      })
    );
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
        <div>
          <CardTitle>
            <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Work Experience <span className="text-xs font-normal text-gray-400 dark:text-gray-500">(Optional)</span>
          </CardTitle>
          <CardDescription>
            Add your professional career history (Optional for students/freshers). Provide bullet points of responsibilities or achievements.
          </CardDescription>
        </div>
        <Button
          onClick={addExperience}
          size="sm"
          className="cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
      </CardHeader>

      <CardContent className="space-y-6 pt-4">
        {data.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
            <Briefcase className="w-10 h-10 text-gray-400 mx-auto mb-2 opacity-60" />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              No work experience added (Optional).
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 mb-4">
              Click below to add a job entry or proceed to Education & Skills.
            </p>
            <Button
              onClick={addExperience}
              variant="outline"
              size="sm"
              className="cursor-pointer text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/40"
            >
              + Add Work Experience
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {data.map((exp, index) => (
              <div
                key={exp.id}
                className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 space-y-4 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Experience #{index + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="iconSm"
                      onClick={() => moveExperience(index, "up")}
                      disabled={index === 0}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="iconSm"
                      onClick={() => moveExperience(index, "down")}
                      disabled={index === data.length - 1}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="iconSm"
                      onClick={() => removeExperience(exp.id)}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer ml-1"
                      title="Remove Entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-1 block">Company Name</Label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 z-10" />
                      <Input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperienceField(exp.id, "company", e.target.value)}
                        placeholder="e.g. Acme Corp"
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="mb-1 block">Job Title / Position</Label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 z-10" />
                      <Input
                        type="text"
                        value={exp.position}
                        onChange={(e) => updateExperienceField(exp.id, "position", e.target.value)}
                        placeholder="e.g. Senior Software Engineer"
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="mb-1 block">Location</Label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 z-10" />
                      <Input
                        type="text"
                        value={exp.location}
                        onChange={(e) => updateExperienceField(exp.id, "location", e.target.value)}
                        placeholder="e.g. New York, NY (Remote)"
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="mb-1 flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3 text-blue-500" /> Start Date
                      </Label>
                      <DatePicker
                        value={exp.startDate || ""}
                        onChange={(val) => updateExperienceField(exp.id, "startDate", val)}
                        placeholder="Pick start date"
                        mode="month"
                      />
                    </div>

                    <div>
                      <Label className="mb-1 flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3 text-blue-500" /> End Date
                      </Label>
                      {exp.isCurrent ? (
                        <Input
                          type="text"
                          disabled
                          value="Present"
                          className="bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 font-semibold"
                        />
                      ) : (
                        <DatePicker
                          value={exp.endDate || ""}
                          onChange={(val) => updateExperienceField(exp.id, "endDate", val)}
                          placeholder="Pick end date"
                          mode="month"
                          allowPresent={true}
                          onSelectPresent={() => {
                            updateExperienceField(exp.id, "isCurrent", true);
                            updateExperienceField(exp.id, "endDate", "Present");
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id={`current-${exp.id}`}
                    checked={exp.isCurrent}
                    onChange={(e) => {
                      updateExperienceField(exp.id, "isCurrent", e.target.checked);
                      if (e.target.checked) {
                        updateExperienceField(exp.id, "endDate", "Present");
                      }
                    }}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300 dark:border-gray-700 cursor-pointer"
                  />
                  <label
                    htmlFor={`current-${exp.id}`}
                    className="text-xs font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    I currently work here
                  </label>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <Label className="block">
                      Responsibilities & Achievements (Bullet Points)
                    </Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addBullet(exp.id)}
                      className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer h-auto p-0 hover:bg-transparent"
                    >
                      <ListPlus className="w-3.5 h-3.5" />
                      + Add Bullet
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {exp.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2">
                        <span className="text-gray-400 text-xs font-bold">•</span>
                        <Input
                          type="text"
                          value={bullet}
                          onChange={(e) => updateBullet(exp.id, bIdx, e.target.value)}
                          placeholder="e.g. Developed scalable backend microservices reducing server response latency."
                          className="flex-1"
                        />
                        {exp.bullets.length > 1 && (
                          <Button
                            variant="ghost"
                            size="iconSm"
                            onClick={() => removeBullet(exp.id, bIdx)}
                            className="text-gray-400 hover:text-red-500 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
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
