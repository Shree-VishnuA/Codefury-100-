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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
        <div>
          <CardTitle>
            <Briefcase className="w-4 h-4 text-[var(--redline)]" />
            Work Experience <span className="font-mono text-xs font-normal text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40">(Optional)</span>
          </CardTitle>
          <CardDescription>
            Add your professional career history (Optional for students/freshers). Provide bullet points of responsibilities or achievements.
          </CardDescription>
        </div>
        <Button
          onClick={addExperience}
          size="sm"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Experience
        </Button>
      </CardHeader>

      <CardContent className="space-y-6 pt-4 font-mono">
        {data.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 bg-[var(--paper)] dark:bg-[#161B22]">
            <Briefcase className="w-8 h-8 text-[var(--ink)]/30 dark:text-[var(--ink-dark)]/30 mx-auto mb-2" />
            <p className="font-mono text-xs font-semibold text-[var(--ink)]/60 dark:text-[var(--ink-dark)]/60">
              No work experience added (Optional).
            </p>
            <p className="font-mono text-[11px] text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40 mt-1 mb-4">
              Click below to add a job entry or proceed to Education & Skills.
            </p>
            <Button
              onClick={addExperience}
              variant="outline"
              size="sm"
            >
              + Add Work Experience
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {data.map((exp, index) => (
              <div
                key={exp.id}
                className="p-4 border border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 bg-[var(--paper)] dark:bg-[#161B22] space-y-4 font-mono"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[var(--redline)] uppercase tracking-wider">
                    Experience #{index + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="iconSm"
                      onClick={() => moveExperience(index, "up")}
                      disabled={index === 0}
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="iconSm"
                      onClick={() => moveExperience(index, "down")}
                      disabled={index === data.length - 1}
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="iconSm"
                      onClick={() => removeExperience(exp.id)}
                      className="text-[var(--redline)] hover:bg-[var(--redline)] hover:text-white"
                      title="Remove Entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-1 block font-mono text-xs font-semibold">Company Name</Label>
                    <div className="relative font-sans">
                      <Building className="w-4 h-4 text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40 absolute left-3 top-2.5 z-10" />
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
                    <Label className="mb-1 block font-mono text-xs font-semibold">Job Title / Position</Label>
                    <div className="relative font-sans">
                      <Briefcase className="w-4 h-4 text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40 absolute left-3 top-2.5 z-10" />
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
                    <Label className="mb-1 block font-mono text-xs font-semibold">Location</Label>
                    <div className="relative font-sans">
                      <MapPin className="w-4 h-4 text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40 absolute left-3 top-2.5 z-10" />
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
                      <Label className="mb-1 flex items-center gap-1 font-mono text-xs font-semibold">
                        <CalendarIcon className="w-3 h-3 text-[var(--redline)]" /> Start Date
                      </Label>
                      <DatePicker
                        value={exp.startDate || ""}
                        onChange={(val) => updateExperienceField(exp.id, "startDate", val)}
                        placeholder="Pick start date"
                        mode="month"
                      />
                    </div>

                    <div>
                      <Label className="mb-1 flex items-center gap-1 font-mono text-xs font-semibold">
                        <CalendarIcon className="w-3 h-3 text-[var(--redline)]" /> End Date
                      </Label>
                      {exp.isCurrent ? (
                        <Input
                          type="text"
                          disabled
                          value="Present"
                          className="bg-[var(--ink)]/10 dark:bg-[var(--ink-dark)]/10 text-[var(--ink)] dark:text-[var(--ink-dark)] font-mono font-bold"
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
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label
                    htmlFor={`current-${exp.id}`}
                    className="font-mono text-xs font-medium text-[var(--ink)] dark:text-[var(--ink-dark)] cursor-pointer"
                  >
                    I currently work here
                  </label>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <Label className="block font-mono text-xs font-semibold">
                      Responsibilities & Achievements (Bullet Points)
                    </Label>
                    <button
                      type="button"
                      onClick={() => addBullet(exp.id)}
                      className="font-mono text-xs text-[var(--redline)] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <ListPlus className="w-3.5 h-3.5" />
                      + Add Bullet
                    </button>
                  </div>

                  <div className="space-y-2 font-sans">
                    {exp.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2">
                        <span className="text-[var(--redline)] text-xs font-bold font-mono">•</span>
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
                            className="text-[var(--ink)]/40 hover:text-[var(--redline)] cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
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
