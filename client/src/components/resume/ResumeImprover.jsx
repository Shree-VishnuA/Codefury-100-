import React, { useState, useRef } from "react";
import {
  Upload, FileText, Sparkles, CheckCircle2, AlertCircle,
  Loader2, ArrowRight, Download, X, RefreshCw, Lightbulb,
  Target, TrendingUp, ClipboardList
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PDFExportButton } from "@/components/preview/PDFExportButton";
import { LivePreview } from "@/components/preview/LivePreview";
import { initialResumeData } from "@/lib/resume-schema";

const TIPS = [
  {
    icon: <Target className="w-4 h-4 text-[var(--redline)]" />,
    title: "ATS Keyword Boost",
    desc: "AI extracts the best keywords from your existing resume and amplifies them.",
  },
  {
    icon: <TrendingUp className="w-4 h-4 text-[var(--pass)]" />,
    title: "Impact Rewrites",
    desc: "Bullet points are rewritten with measurable achievements and action verbs.",
  },
  {
    icon: <Lightbulb className="w-4 h-4 text-[var(--highlight)]" />,
    title: "Smart Summary",
    desc: "Your professional summary is regenerated to be crisp and role-specific.",
  },
  {
    icon: <ClipboardList className="w-4 h-4 text-[var(--redline)]" />,
    title: "Full Report",
    desc: "Receive a detailed improvement report alongside your upgraded resume.",
  },
];

function ImprovementReport({ result }) {
  const sections = [
    { label: "Summary", content: result?.summary },
    { label: "Suggested Skills", content: result?.suggestedSkills?.join(", ") },
    { label: "Key Improvements", content: result?.improvements?.join("\n") },
  ].filter((s) => s.content);

  return (
    <div className="space-y-4">
      {sections.map(({ label, content }) => (
        <div key={label} className="border border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 bg-white dark:bg-[#161B22] p-4">
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--redline)] mb-2">{label}</p>
          <p className="font-sans text-sm text-[var(--ink)] dark:text-[var(--ink-dark)] whitespace-pre-wrap leading-relaxed">{content}</p>
        </div>
      ))}
    </div>
  );
}

export function ResumeImprover({ user }) {
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [improvedData, setImprovedData] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  const handleFileDrop = (ev) => {
    ev.preventDefault();
    const dropped = ev.dataTransfer?.files?.[0] || ev.target?.files?.[0];
    if (!dropped) return;
    const allowed = ["application/pdf", "text/plain", "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(dropped.type) && !dropped.name.endsWith(".txt")) {
      setError("Please upload a PDF, Word (.docx), or plain-text (.txt) file.");
      return;
    }
    setFile(dropped);
    setError("");
    if (dropped.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => setResumeText(e.target.result);
      reader.readAsText(dropped);
    } else {
      setResumeText("");
    }
  };

  const handleImprove = async () => {
    if (!file && !resumeText.trim()) {
      setError("Please upload your resume file first.");
      return;
    }
    setIsProcessing(true);
    setError("");
    setResult(null);
    setImprovedData(null);

    try {
      const formData = new FormData();
      if (file) formData.append("resume", file);
      formData.append("resumeText", resumeText);
      formData.append("targetRole", targetRole);
      formData.append("jobDescription", jobDesc);

      const response = await fetch("/api/improve-resume", {
        method: "POST",
        headers: user?.email ? { "x-user-id": user.email } : {},
        body: formData,
      });

      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.error || "Failed to improve resume");
      }

      setResult(json.data);
      const merged = {
        ...initialResumeData,
        personal: {
          ...initialResumeData.personal,
          fullName: json.data.name || "",
          email: json.data.email || "",
          phone: json.data.phone || "",
          location: json.data.location || "",
          summary: json.data.summary || "",
        },
        skills: {
          languages: [],
          dsa: [],
          frontend: [],
          backend: [],
          tools: json.data.suggestedSkills || [],
        },
        experience: (json.data.experience || []).map((exp, i) => ({
          id: `exp-${i}`,
          company: exp.company || "",
          position: exp.position || "",
          location: exp.location || "",
          startDate: exp.startDate || "",
          endDate: exp.endDate || "Present",
          isCurrent: exp.isCurrent || false,
          bullets: exp.bullets || [],
        })),
        education: (json.data.education || []).map((edu, i) => ({
          id: `edu-${i}`,
          institution: edu.institution || "",
          degree: edu.degree || "",
          fieldOfStudy: edu.fieldOfStudy || "",
          startDate: edu.startDate || "",
          endDate: edu.endDate || "",
          gpa: edu.gpa || "",
        })),
        targetJob: {
          targetRole: targetRole,
          industry: "",
          jobDescription: jobDesc,
        },
      };
      setImprovedData(merged);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResumeText("");
    setTargetRole("");
    setJobDesc("");
    setResult(null);
    setImprovedData(null);
    setError("");
  };

  if (!result) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TIPS.map(({ icon, title, desc }) => (
            <div key={title} className="border border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 bg-white dark:bg-[#161B22] p-4 space-y-2">
              <div className="w-8 h-8 bg-[var(--ink)]/5 dark:bg-[var(--ink-dark)]/5 flex items-center justify-center">
                {icon}
              </div>
              <p className="font-mono text-xs font-bold text-[var(--ink)] dark:text-[var(--ink-dark)]">{title}</p>
              <p className="font-mono text-[11px] text-[var(--ink)]/60 dark:text-[var(--ink-dark)]/60 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Upload className="w-4 h-4 text-[var(--redline)]" />
                Upload Resume
              </CardTitle>
              <CardDescription>PDF, Word, or plain text - max 5 MB</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center gap-3 border-2 border-dashed p-10 cursor-pointer transition-colors
                  ${file
                    ? "border-[var(--pass)] bg-[var(--pass)]/5"
                    : "border-[var(--ink)]/20 dark:border-[var(--ink-dark)]/20 hover:border-[var(--redline)] bg-[var(--paper)] dark:bg-[#161B22]"
                  }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileDrop}
                  className="hidden"
                />
                {file ? (
                  <>
                    <CheckCircle2 className="w-10 h-10 text-[var(--pass)]" />
                    <div className="text-center font-mono">
                      <p className="text-sm font-bold text-[var(--pass)]">{file.name}</p>
                      <p className="text-xs text-[var(--ink)]/50 dark:text-[var(--ink-dark)]/50 mt-0.5">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleReset(); }}
                      className="absolute top-3 right-3 p-1 text-[var(--redline)] hover:opacity-80 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-[var(--ink)]/5 dark:bg-[var(--ink-dark)]/5 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-[var(--redline)]" />
                    </div>
                    <div className="text-center font-mono">
                      <p className="text-xs font-bold text-[var(--ink)] dark:text-[var(--ink-dark)]">
                        Drop your resume here
                      </p>
                      <p className="text-[11px] text-[var(--ink)]/50 dark:text-[var(--ink-dark)]/50 mt-1">or click to browse files</p>
                    </div>
                  </>
                )}
              </div>

              {error && (
                <div className="mt-3 flex items-center gap-2 text-[var(--redline)] font-mono text-xs font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="w-4 h-4 text-[var(--redline)]" />
                Target Context <span className="font-normal text-xs text-[var(--ink)]/50 dark:text-[var(--ink-dark)]/50">(optional)</span>
              </CardTitle>
              <CardDescription>Help AI tailor the optimization to your goal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block font-mono text-xs font-semibold text-[var(--ink)] dark:text-[var(--ink-dark)] mb-1">
                  Target Role / Job Title
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-[var(--ink)]/20 dark:border-[var(--ink-dark)]/20 bg-white dark:bg-[#161B22] text-[var(--ink)] dark:text-[var(--ink-dark)] font-sans focus:border-[var(--redline)] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block font-mono text-xs font-semibold text-[var(--ink)] dark:text-[var(--ink-dark)] mb-1">
                  Paste Job Description
                </label>
                <textarea
                  rows={6}
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  placeholder="Paste the job posting here for maximum ATS keyword matching..."
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-[var(--ink)]/20 dark:border-[var(--ink-dark)]/20 bg-white dark:bg-[#161B22] text-[var(--ink)] dark:text-[var(--ink-dark)] font-sans focus:border-[var(--redline)] focus:outline-none transition-colors resize-none leading-relaxed"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleImprove}
            disabled={isProcessing || (!file && !resumeText.trim())}
            className="px-8 py-3 font-mono text-xs font-bold uppercase tracking-wider bg-[var(--ink)] text-[var(--paper)] dark:bg-[var(--ink-dark)] dark:text-[var(--paper-dark)] hover:bg-[var(--redline)] dark:hover:bg-[var(--redline)] dark:hover:text-white transition-colors disabled:opacity-50"
          >
            {isProcessing ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing & Improving…</>
            ) : (
              <><Sparkles className="w-4 h-4" /> Improve with AI <ArrowRight className="w-4 h-4" /></>
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--pass)]">AI Enhanced</span>
          <h1 className="mt-1 font-mono font-bold text-2xl sm:text-3xl tracking-tight text-[var(--ink)] dark:text-[var(--ink-dark)]">
            Your Improved Resume
          </h1>
          <p className="mt-1 text-sm text-[var(--ink)]/60 dark:text-[var(--ink-dark)]/60">
            Review the AI-enhanced version below, then download as PDF.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="outline" onClick={handleReset} className="gap-2">
            <RefreshCw className="w-3.5 h-3.5" /> Start Over
          </Button>
          {improvedData && <PDFExportButton data={improvedData} />}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-4">
          <div className="border border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 bg-white dark:bg-[#161B22] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-[var(--redline)]/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[var(--redline)]" />
              </div>
              <h2 className="font-mono text-sm font-bold text-[var(--ink)] dark:text-[var(--ink-dark)]">Improvement Report</h2>
            </div>
            <ImprovementReport result={result} />
          </div>
        </div>

        {improvedData && (
          <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-20">
            <div className="flex items-center gap-2 bg-[var(--paper)] dark:bg-[var(--paper-dark)] p-3 border border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 font-mono text-xs">
              <CheckCircle2 className="w-4 h-4 text-[var(--pass)]" />
              <span className="font-bold text-[var(--ink)] dark:text-[var(--ink-dark)]">
                AI-Improved Resume Preview
              </span>
            </div>
            <div className="max-h-[750px] overflow-y-auto border border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 shadow-xl">
              <LivePreview data={improvedData} />
            </div>
            <PDFExportButton data={improvedData} />
          </div>
        )}
      </div>
    </div>
  );
}
