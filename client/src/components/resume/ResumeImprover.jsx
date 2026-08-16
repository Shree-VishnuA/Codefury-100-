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

// ── Tip cards shown before upload ─────────────────────────────────────────
const TIPS = [
  {
    icon: <Target className="w-5 h-5 text-indigo-400" />,
    title: "ATS Keyword Boost",
    desc: "AI extracts the best keywords from your existing resume and amplifies them.",
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
    title: "Impact Rewrites",
    desc: "Bullet points are rewritten with measurable achievements and action verbs.",
  },
  {
    icon: <Lightbulb className="w-5 h-5 text-amber-400" />,
    title: "Smart Summary",
    desc: "Your professional summary is regenerated to be crisp and role-specific.",
  },
  {
    icon: <ClipboardList className="w-5 h-5 text-blue-400" />,
    title: "Full Report",
    desc: "Receive a detailed improvement report alongside your upgraded resume.",
  },
];

// ── Improvement result panel ───────────────────────────────────────────────
function ImprovementReport({ result }) {
  const sections = [
    { label: "Summary", content: result?.summary },
    { label: "Suggested Skills", content: result?.suggestedSkills?.join(", ") },
    { label: "Key Improvements", content: result?.improvements?.join("\n") },
  ].filter((s) => s.content);

  return (
    <div className="space-y-4">
      {sections.map(({ label, content }) => (
        <div key={label} className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">{label}</p>
          <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{content}</p>
        </div>
      ))}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
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
    // Read text content for .txt files
    if (dropped.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => setResumeText(e.target.result);
      reader.readAsText(dropped);
    } else {
      // For PDF/Word we send the file; backend will extract text
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
      // Build multipart form data so the backend can receive the file
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
      // Merge AI result into a displayable resume data object
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

  // ── Upload / Input screen ─────────────────────────────────────────────
  if (!result) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page header */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-purple-500 dark:text-purple-400">AI Enhancement</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Improve Your Existing Resume
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Upload your current resume and let Gemini AI rewrite, polish, and ATS-optimize it in seconds.
          </p>
        </div>

        {/* Tips row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TIPS.map(({ icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center">
                {icon}
              </div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">{title}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload zone */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Upload className="w-4 h-4 text-blue-500" />
                Upload Resume
              </CardTitle>
              <CardDescription>PDF, Word, or plain text — max 5 MB</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 cursor-pointer transition-colors
                  ${file
                    ? "border-emerald-400 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10"
                    : "border-slate-300 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-500 bg-slate-50 dark:bg-white/[0.02]"
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
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    <div className="text-center">
                      <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">{file.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleReset(); }}
                      className="absolute top-3 right-3 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <FileText className="w-7 h-7 text-blue-500" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Drop your resume here
                      </p>
                      <p className="text-xs text-slate-400 mt-1">or click to browse files</p>
                    </div>
                  </>
                )}
              </div>

              {error && (
                <div className="mt-3 flex items-center gap-2 text-red-600 dark:text-red-400 text-xs font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Context inputs */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="w-4 h-4 text-purple-500" />
                Target Context <span className="text-slate-400 font-normal text-sm">(optional)</span>
              </CardTitle>
              <CardDescription>Help AI tailor the optimization to your goal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target Role / Job Title
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Paste Job Description
                </label>
                <textarea
                  rows={6}
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  placeholder="Paste the job posting here for maximum ATS keyword matching..."
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors resize-none leading-relaxed"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Button
            onClick={handleImprove}
            disabled={isProcessing || (!file && !resumeText.trim())}
            className="px-10 py-3 text-sm font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 cursor-pointer shadow-xl shadow-purple-500/25 disabled:opacity-50"
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

  // ── Results screen ────────────────────────────────────────────────────
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-400">AI Enhanced</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Your Improved Resume
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Review the AI-enhanced version below, then download as PDF.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="outline" onClick={handleReset} className="cursor-pointer gap-2">
            <RefreshCw className="w-4 h-4" /> Start Over
          </Button>
          {improvedData && <PDFExportButton data={improvedData} />}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: AI report */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-purple-500" />
              </div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Improvement Report</h2>
            </div>
            <ImprovementReport result={result} />
          </div>
        </div>

        {/* Right: live preview */}
        {improvedData && (
          <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-20">
            <div className="flex items-center gap-2 bg-white dark:bg-white/[0.04] p-3 rounded-2xl border border-slate-200 dark:border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                AI-Improved Resume Preview
              </span>
            </div>
            <div className="max-h-[750px] overflow-y-auto rounded-2xl shadow-2xl shadow-black/20 border border-slate-200 dark:border-white/10">
              <LivePreview data={improvedData} />
            </div>
            <PDFExportButton data={improvedData} />
          </div>
        )}
      </div>
    </div>
  );
}
