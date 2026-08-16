import React, { useState } from "react";
import { FolderCheck, Award, Trophy, Plus, Trash2, Link as LinkIcon, Code, Calendar as CalendarIcon, X } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function AdditionalForm({
  projects,
  certifications,
  achievements,
  onUpdateProjects,
  onUpdateCertifications,
  onUpdateAchievements,
}) {
  const [activeTab, setActiveTab] = useState("projects");

  const addProject = () => {
    onUpdateProjects([
      ...projects,
      {
        id: `proj-${Date.now()}`,
        name: "",
        description: "",
        bullets: [""],
        technologies: [],
        techString: "",
        githubLink: "",
        liveLink: "",
      },
    ]);
  };

  const removeProject = (id) => {
    onUpdateProjects(projects.filter((p) => p.id !== id));
  };

  const updateProjectField = (id, field, value) => {
    onUpdateProjects(
      projects.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const addProjectBullet = (projId) => {
    onUpdateProjects(
      projects.map((p) => {
        if (p.id !== projId) return p;
        const bullets = p.bullets && p.bullets.length > 0 ? p.bullets : (p.description ? [p.description] : [""]);
        return { ...p, bullets: [...bullets, ""] };
      })
    );
  };

  const updateProjectBullet = (projId, bIndex, text) => {
    onUpdateProjects(
      projects.map((p) => {
        if (p.id !== projId) return p;
        const current = p.bullets && p.bullets.length > 0 ? p.bullets : (p.description ? [p.description] : [""]);
        const bullets = [...current];
        bullets[bIndex] = text;
        return { ...p, bullets, description: bullets[0] || "" };
      })
    );
  };

  const removeProjectBullet = (projId, bIndex) => {
    onUpdateProjects(
      projects.map((p) => {
        if (p.id !== projId) return p;
        const current = p.bullets && p.bullets.length > 0 ? p.bullets : (p.description ? [p.description] : [""]);
        const bullets = current.filter((_, idx) => idx !== bIndex);
        const finalBullets = bullets.length ? bullets : [""];
        return { ...p, bullets: finalBullets, description: finalBullets[0] || "" };
      })
    );
  };

  const [techInputs, setTechInputs] = useState({});

  const addTechTag = (projId) => {
    const value = techInputs[projId] || "";
    const trimmed = value.trim();
    if (!trimmed) return;
    
    const proj = projects.find(p => p.id === projId);
    if (proj && !(proj.technologies || []).includes(trimmed)) {
      updateProjectField(projId, "technologies", [...(proj.technologies || []), trimmed]);
    }
    setTechInputs({ ...techInputs, [projId]: "" });
  };

  const removeTechTag = (projId, tagToRemove) => {
    const proj = projects.find(p => p.id === projId);
    if (proj) {
      updateProjectField(projId, "technologies", (proj.technologies || []).filter(t => t !== tagToRemove));
    }
  };

  const handleTechKeyDown = (e, projId) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTechTag(projId);
    }
  };

  const addCertification = () => {
    onUpdateCertifications([
      ...certifications,
      {
        id: `cert-${Date.now()}`,
        name: "",
        issuer: "",
        date: "",
        url: "",
      },
    ]);
  };

  const removeCertification = (id) => {
    onUpdateCertifications(certifications.filter((c) => c.id !== id));
  };

  const updateCertField = (id, field, value) => {
    onUpdateCertifications(
      certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const addAchievement = () => {
    onUpdateAchievements([
      ...achievements,
      {
        id: `ach-${Date.now()}`,
        title: "",
      },
    ]);
  };

  const removeAchievement = (id) => {
    onUpdateAchievements(achievements.filter((a) => a.id !== id));
  };

  const updateAchField = (id, field, value) => {
    onUpdateAchievements(
      achievements.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>
          <FolderCheck className="w-4 h-4 text-[var(--redline)]" />
          Projects, Certifications & Honors
        </CardTitle>
        <CardDescription>
          Optional sections to highlight portfolio projects, professional credentials, and major achievements.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-2 font-mono">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="projects" className="flex items-center gap-1.5 cursor-pointer">
              <FolderCheck className="w-3.5 h-3.5" /> Projects ({projects.length})
            </TabsTrigger>
            <TabsTrigger value="certifications" className="flex items-center gap-1.5 cursor-pointer">
              <Award className="w-3.5 h-3.5" /> Certifications ({certifications.length})
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-1.5 cursor-pointer">
              <Trophy className="w-3.5 h-3.5" /> Achievements ({achievements.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-4 pt-2">
            <div className="flex justify-end">
              <Button onClick={addProject} size="sm">
                <Plus className="w-3.5 h-3.5" /> Add Project
              </Button>
            </div>

            {projects.length === 0 ? (
              <p className="font-mono text-xs text-[var(--ink)]/40 text-center py-6">No projects added yet.</p>
            ) : (
              projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="p-4 border border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 bg-[var(--paper)] dark:bg-[#161B22] space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[var(--redline)] uppercase tracking-wider">Project #{idx + 1}</span>
                    <Button
                      variant="ghost"
                      size="iconSm"
                      onClick={() => removeProject(proj.id)}
                      className="text-[var(--redline)] hover:bg-[var(--redline)] hover:text-white"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 gap-3 font-sans">
                    <div>
                      <Label className="mb-1 block font-mono text-xs font-semibold">Project Name</Label>
                      <Input
                        type="text"
                        value={proj.name}
                        onChange={(e) => updateProjectField(proj.id, "name", e.target.value)}
                        placeholder="e.g. GenForge Resume Generator"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label className="mb-1 block font-mono text-xs font-semibold">GitHub Link</Label>
                        <div className="relative">
                          <LinkIcon className="w-4 h-4 text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40 absolute left-3 top-2.5 z-10" />
                          <Input
                            type="text"
                            value={proj.githubLink || proj.gitHub || (proj.link && proj.link.toLowerCase().includes("github") ? proj.link : "")}
                            onChange={(e) => updateProjectField(proj.id, "githubLink", e.target.value)}
                            placeholder="https://github.com/user/project"
                            className="pl-9"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="mb-1 block font-mono text-xs font-semibold">Live Link</Label>
                        <div className="relative">
                          <LinkIcon className="w-4 h-4 text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40 absolute left-3 top-2.5 z-10" />
                          <Input
                            type="text"
                            value={proj.liveLink || proj.url || proj.website || (proj.link && !proj.link.toLowerCase().includes("github") ? proj.link : "")}
                            onChange={(e) => updateProjectField(proj.id, "liveLink", e.target.value)}
                            placeholder="https://project.com"
                            className="pl-9"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-1 block font-mono text-xs font-semibold">Technologies Used (Press Enter or comma to add)</Label>
                    <div className="flex gap-2 font-sans">
                      <div className="relative flex-1">
                        <Code className="w-4 h-4 text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40 absolute left-3 top-2.5 z-10" />
                        <Input
                          type="text"
                          value={techInputs[proj.id] || ""}
                          onChange={(e) => setTechInputs({ ...techInputs, [proj.id]: e.target.value })}
                          onKeyDown={(e) => handleTechKeyDown(e, proj.id)}
                          placeholder="e.g. Next.js, JavaScript, Tailwind CSS"
                          className="pl-9"
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={() => addTechTag(proj.id)}
                        size="sm"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-2 font-mono">
                      {(proj.technologies || []).map((tech) => (
                        <div key={tech} className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-[var(--ink)]/20 dark:border-[var(--ink-dark)]/20 bg-[var(--ink)]/5 dark:bg-[var(--ink-dark)]/5 font-mono text-xs text-[var(--ink)] dark:text-[var(--ink-dark)]">
                          {tech}
                          <button
                            type="button"
                            onClick={() => removeTechTag(proj.id, tech)}
                            className="text-[var(--redline)] hover:opacity-80"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5 font-mono">
                      <Label className="font-mono text-xs font-semibold">Key Highlights / Bullet Points</Label>
                      <button
                        type="button"
                        onClick={() => addProjectBullet(proj.id)}
                        className="font-mono text-xs text-[var(--redline)] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Bullet
                      </button>
                    </div>

                    <div className="space-y-2 font-sans">
                      {(proj.bullets && proj.bullets.length > 0
                        ? proj.bullets
                        : [proj.description || ""]
                      ).map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2">
                          <span className="text-[var(--redline)] text-xs font-bold font-mono">•</span>
                          <Input
                            type="text"
                            value={bullet}
                            onChange={(e) => updateProjectBullet(proj.id, bIdx, e.target.value)}
                            placeholder="e.g. Architected responsive frontend processing 10k+ daily queries..."
                            className="flex-1 text-xs sm:text-sm"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="iconSm"
                            onClick={() => removeProjectBullet(proj.id, bIdx)}
                            className="text-[var(--ink)]/40 hover:text-[var(--redline)]"
                          >
                            <X className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="certifications" className="space-y-4 pt-2">
            <div className="flex justify-end">
              <Button onClick={addCertification} size="sm">
                <Plus className="w-3.5 h-3.5" /> Add Certification
              </Button>
            </div>

            {certifications.length === 0 ? (
              <p className="font-mono text-xs text-[var(--ink)]/40 text-center py-6">No certifications added yet.</p>
            ) : (
              certifications.map((cert, idx) => (
                <div
                  key={cert.id}
                  className="p-4 border border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 bg-[var(--paper)] dark:bg-[#161B22] space-y-3 font-mono"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[var(--redline)] uppercase tracking-wider">Certification #{idx + 1}</span>
                    <Button
                      variant="ghost"
                      size="iconSm"
                      onClick={() => removeCertification(cert.id)}
                      className="text-[var(--redline)] hover:bg-[var(--redline)] hover:text-white"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
                    <div>
                      <Label className="mb-1 block font-mono text-xs font-semibold">Certification Name</Label>
                      <Input
                        type="text"
                        value={cert.name}
                        onChange={(e) => updateCertField(cert.id, "name", e.target.value)}
                        placeholder="e.g. AWS Certified Solutions Architect"
                      />
                    </div>

                    <div>
                      <Label className="mb-1 block font-mono text-xs font-semibold">Issuing Organization</Label>
                      <Input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => updateCertField(cert.id, "issuer", e.target.value)}
                        placeholder="e.g. Amazon Web Services"
                      />
                    </div>

                    <div>
                      <Label className="mb-1 flex items-center gap-1 font-mono text-xs font-semibold">
                        <CalendarIcon className="w-3.5 h-3.5 text-[var(--redline)]" /> Issue Date
                      </Label>
                      <DatePicker
                        value={cert.date || ""}
                        onChange={(val) => updateCertField(cert.id, "date", val)}
                        placeholder="Pick issue date"
                        mode="month"
                      />
                    </div>

                    <div>
                      <Label className="mb-1 block font-mono text-xs font-semibold">Credential URL</Label>
                      <Input
                        type="text"
                        value={cert.url || ""}
                        onChange={(e) => updateCertField(cert.id, "url", e.target.value)}
                        placeholder="https://credential-link.com"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4 pt-2">
            <div className="flex justify-end">
              <Button onClick={addAchievement} size="sm">
                <Plus className="w-3.5 h-3.5" /> Add Achievement
              </Button>
            </div>

            {achievements.length === 0 ? (
              <p className="font-mono text-xs text-[var(--ink)]/40 text-center py-6">No achievements added yet.</p>
            ) : (
              achievements.map((ach, idx) => (
                <div
                  key={ach.id}
                  className="p-4 border border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 bg-[var(--paper)] dark:bg-[#161B22] space-y-3 font-mono"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[var(--redline)] uppercase tracking-wider">Achievement #{idx + 1}</span>
                    <Button
                      variant="ghost"
                      size="iconSm"
                      onClick={() => removeAchievement(ach.id)}
                      className="text-[var(--redline)] hover:bg-[var(--redline)] hover:text-white"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>

                  <div className="font-sans">
                    <Label className="mb-1 block font-mono text-xs font-semibold">Achievement Title</Label>
                    <Input
                      type="text"
                      value={ach.title}
                      onChange={(e) => updateAchField(ach.id, "title", e.target.value)}
                      placeholder="e.g. 1st Place - National AI Hackathon"
                    />
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
