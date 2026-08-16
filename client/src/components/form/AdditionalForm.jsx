import React, { useState } from "react";
import { FolderCheck, Award, Trophy, Plus, Trash2, Link as LinkIcon, Code, Calendar as CalendarIcon } from "lucide-react";
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
        technologies: [],
        link: "",
        achievements: [""],
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
        description: "",
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
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle>
          <FolderCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Projects, Certifications & Honors
        </CardTitle>
        <CardDescription>
          Optional sections to highlight portfolio projects, professional credentials, and major achievements.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-2">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="projects" className="flex items-center gap-1.5 cursor-pointer">
              <FolderCheck className="w-4 h-4" /> Projects ({projects.length})
            </TabsTrigger>
            <TabsTrigger value="certifications" className="flex items-center gap-1.5 cursor-pointer">
              <Award className="w-4 h-4" /> Certifications ({certifications.length})
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-1.5 cursor-pointer">
              <Trophy className="w-4 h-4" /> Achievements ({achievements.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={addProject} size="sm" className="cursor-pointer">
                <Plus className="w-4 h-4" /> Add Project
              </Button>
            </div>

            {projects.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-6">No projects added yet.</p>
            ) : (
              projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500">Project #{idx + 1}</span>
                    <Button
                      variant="ghost"
                      size="iconSm"
                      onClick={() => removeProject(proj.id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label className="mb-1 block">Project Name</Label>
                      <Input
                        type="text"
                        value={proj.name}
                        onChange={(e) => updateProjectField(proj.id, "name", e.target.value)}
                        placeholder="e.g. GenForge Resume Generator"
                      />
                    </div>

                    <div>
                      <Label className="mb-1 block">Project / Repository Link</Label>
                      <div className="relative">
                        <LinkIcon className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 z-10" />
                        <Input
                          type="text"
                          value={proj.link || ""}
                          onChange={(e) => updateProjectField(proj.id, "link", e.target.value)}
                          placeholder="https://github.com/user/project"
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="mb-1 block">Technologies Used (comma separated)</Label>
                    <div className="relative">
                      <Code className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 z-10" />
                      <Input
                        type="text"
                        value={proj.technologies.join(", ")}
                        onChange={(e) =>
                          updateProjectField(
                            proj.id,
                            "technologies",
                            e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                          )
                        }
                        placeholder="Next.js, JavaScript, Gemini API"
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="mb-1 block">Description</Label>
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => updateProjectField(proj.id, "description", e.target.value)}
                      placeholder="Brief summary of the project architecture and impact..."
                      className="w-full px-3 py-1.5 text-sm border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="certifications" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={addCertification} size="sm" className="cursor-pointer">
                <Plus className="w-4 h-4" /> Add Certification
              </Button>
            </div>

            {certifications.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-6">No certifications added yet.</p>
            ) : (
              certifications.map((cert, idx) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500">Certification #{idx + 1}</span>
                    <Button
                      variant="ghost"
                      size="iconSm"
                      onClick={() => removeCertification(cert.id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label className="mb-1 block">Certification Name</Label>
                      <Input
                        type="text"
                        value={cert.name}
                        onChange={(e) => updateCertField(cert.id, "name", e.target.value)}
                        placeholder="e.g. AWS Certified Solutions Architect"
                      />
                    </div>

                    <div>
                      <Label className="mb-1 block">Issuing Organization</Label>
                      <Input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => updateCertField(cert.id, "issuer", e.target.value)}
                        placeholder="e.g. Amazon Web Services"
                      />
                    </div>

                    <div>
                      <Label className="mb-1 flex items-center gap-1">
                        <CalendarIcon className="w-3.5 h-3.5 text-blue-500" /> Issue Date
                      </Label>
                      <DatePicker
                        value={cert.date || ""}
                        onChange={(val) => updateCertField(cert.id, "date", val)}
                        placeholder="Pick issue date"
                        mode="month"
                      />
                    </div>

                    <div>
                      <Label className="mb-1 block">Credential URL</Label>
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

          <TabsContent value="achievements" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={addAchievement} size="sm" className="cursor-pointer">
                <Plus className="w-4 h-4" /> Add Achievement
              </Button>
            </div>

            {achievements.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-6">No achievements added yet.</p>
            ) : (
              achievements.map((ach, idx) => (
                <div
                  key={ach.id}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500">Achievement #{idx + 1}</span>
                    <Button
                      variant="ghost"
                      size="iconSm"
                      onClick={() => removeAchievement(ach.id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div>
                    <Label className="mb-1 block">Achievement Title</Label>
                    <Input
                      type="text"
                      value={ach.title}
                      onChange={(e) => updateAchField(ach.id, "title", e.target.value)}
                      placeholder="e.g. 1st Place - National AI Hackathon"
                    />
                  </div>

                  <div>
                    <Label className="mb-1 block">Description</Label>
                    <textarea
                      rows={2}
                      value={ach.description}
                      onChange={(e) => updateAchField(ach.id, "description", e.target.value)}
                      placeholder="Awarded for creating an innovative LLM developer tool..."
                      className="w-full px-3 py-1.5 text-sm border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
