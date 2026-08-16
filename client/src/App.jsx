import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Eye,
  CheckCircle2,
  FileCheck,
  Building2,
  Layers,
} from "lucide-react";

import { Header } from "@/components/ui/Header";
import { StepNavigation } from "@/components/form/StepNavigation";
import { PersonalForm } from "@/components/form/PersonalForm";
import { TargetJobForm } from "@/components/form/TargetJobForm";
import { ExperienceForm } from "@/components/form/ExperienceForm";
import { EducationForm } from "@/components/form/EducationForm";
import { SkillsForm } from "@/components/form/SkillsForm";
import { AdditionalForm } from "@/components/form/AdditionalForm";

import { LivePreview } from "@/components/preview/LivePreview";
import { PDFExportButton } from "@/components/preview/PDFExportButton";
import { ATSPanel } from "@/components/ats/ATSPanel";
import { AIReviewModal } from "@/components/ai/AIReviewModal";
import { AILoadingModal } from "@/components/ai/AILoadingModal";
import { AuthModal } from "@/components/auth/AuthModal";
import { LandingPage } from "@/components/landing/LandingPage";
import { ResumeImprover } from "@/components/resume/ResumeImprover";

import { initialResumeData } from "@/lib/resume-schema";
import { sampleResumeData } from "@/lib/sample-data";
import { loadSavedResumeData, saveResumeData, clearSavedResumeData } from "@/lib/storage";
import { validateStep, getResumeCompletionStatus } from "@/lib/validation";
import { Button } from "@/components/ui/button";

export default function App() {
  const [activeView, setActiveView] = useState("landing");
  const [builderTab, setBuilderTab] = useState("scratch"); // "scratch" | "improve"
  const [currentStep, setCurrentStep] = useState(1);
  const [darkMode, setDarkMode] = useState(true);
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [stepErrors, setStepErrors] = useState({});

  // User state
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  // AI State
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [atsAnalysis, setAtsAnalysis] = useState(null);

  // Protection: Builder workspace requires sign in
  useEffect(() => {
    if (activeView === "builder" && !user) {
      setActiveView("landing");
    }
  }, [activeView, user]);

  const handleNavigateView = (targetView, actionAfterLogin) => {
    if (targetView === "builder" && !user) {
      if (typeof actionAfterLogin === "function") {
        setPendingAction(() => actionAfterLogin);
      }
      setShowAuthModal(true);
      return;
    }
    if (typeof actionAfterLogin === "function") {
      actionAfterLogin();
    }
    setActiveView(targetView);
  };

    // Load saved data and theme on mount
  useEffect(() => {
    const saved = loadSavedResumeData();
    if (saved) {
      setResumeData(saved);
      if (saved.atsAnalysis) setAtsAnalysis(saved.atsAnalysis);
    }

    // Restore user session if available
    try {
      const savedUser = localStorage.getItem("genforge_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Failed to load saved user session:", e);
    }

    // Check dark mode preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
  }, []);

  // Update theme class on HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Auto-save to localStorage
  useEffect(() => {
    saveResumeData(resumeData);
  }, [resumeData]);

  // Sync saved resume from backend if user is logged in
  useEffect(() => {
    if (user && user.email) {
      fetch(`/api/resumes?userId=${encodeURIComponent(user.email)}`, {
        headers: { "x-user-id": user.email },
      })
        .then((res) => res.json())
        .then((resData) => {
          if (resData.success && resData.data) {
            console.log("✅ Fetched user resume from MongoDB:", resData.data);
            setResumeData((prev) => ({
              ...prev,
              ...resData.data,
            }));
            if (resData.data.atsAnalysis) {
              setAtsAnalysis(resData.data.atsAnalysis);
            }
          }
        })
        .catch((err) => console.error("Error syncing resume from backend:", err));
    }
  }, [user]);

  // Auto-save to Express MongoDB API
  const saveResumeToBackend = async (dataToSave) => {
    if (!user || !user.email) return;
    try {
      await fetch("/api/resumes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.email,
        },
        body: JSON.stringify(dataToSave),
      });
    } catch (err) {
      console.error("Failed to save resume to MongoDB backend:", err);
    }
  };

  const handleDataChange = (updated) => {
    setResumeData(updated);
    saveResumeToBackend(updated);
  };

  const handleNextStep = () => {
    const { isValid, errors } = validateStep(currentStep, resumeData);
    if (!isValid) {
      setStepErrors(errors);
      return;
    }
    setStepErrors({});
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      // Trigger celebratory confetti on reaching final step
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handlePrevStep = () => {
    setStepErrors({});
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLoadSample = () => {
    setResumeData(sampleResumeData);
    if (sampleResumeData.atsAnalysis) {
      setAtsAnalysis(sampleResumeData.atsAnalysis);
    }
    setStepErrors({});
    saveResumeToBackend(sampleResumeData);
  };

  const handleClearData = () => {
    clearSavedResumeData();
    setResumeData(initialResumeData);
    setAtsAnalysis(null);
    setStepErrors({});
  };

  // Sign-In handler (custom or demo user)
  const handleLogin = (customUser) => {
    const userToSet = {
      name: customUser?.name || "User",
      email: customUser?.email || "user@example.com",
      image: customUser?.image || "",
    };

    setUser(userToSet);
    try {
      localStorage.setItem("genforge_user", JSON.stringify(userToSet));
    } catch (e) {
      console.error("Failed to save user session:", e);
    }
    setShowAuthModal(false);

    // Sync user with backend
    fetch("/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userToSet),
    }).catch((err) => console.error("Error signing in user to backend:", err));

    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
    setActiveView("builder");
  };

  const handleLogout = () => {
    setUser(null);
    setActiveView("landing");
    try {
      localStorage.removeItem("genforge_user");
    } catch (e) {
      console.error("Failed to remove saved user session:", e);
    }
  };

  // Gemini AI Optimization Handler via Express Backend
  const handleTriggerAI = async () => {
    setIsGeneratingAI(true);
    setStepErrors({});

    try {
      const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resumeData),
      });

      const json = await response.json();

      if (!json.success || !json.data) {
        throw new Error(json.error || "Failed to generate AI optimizations");
      }

      setAiResult(json.data);
      setShowAIModal(true);
    } catch (error) {
      console.error("AI Generation Error:", error);
      alert(`AI Optimization Notice: ${error?.message || "Using smart local optimizer."}`);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleAcceptAIOptimizations = (finalResult) => {
    const dataToUse = finalResult || aiResult;
    if (!dataToUse) return;

    const updated = {
      ...resumeData,
      personal: {
        ...resumeData.personal,
        summary: dataToUse.summary || resumeData.personal.summary,
      },
      skills: {
        ...resumeData.skills,
        tools: Array.from(
          new Set([...(resumeData.skills.tools || []), ...(dataToUse.suggestedSkills || [])])
        ),
      },
    };

    if (dataToUse.experience && Array.isArray(dataToUse.experience)) {
      updated.experience = updated.experience.map((exp, idx) => {
        const aiExp = dataToUse.experience[idx];
        if (aiExp && aiExp.bullets) {
          return { ...exp, bullets: aiExp.bullets };
        }
        return exp;
      });
    }

    if (dataToUse.ats) {
      setAtsAnalysis(dataToUse.ats);
      updated.atsScore = dataToUse.ats.score || 0;
      updated.atsAnalysis = dataToUse.ats;
    }

    setResumeData(updated);
    saveResumeToBackend(updated);
    setShowAIModal(false);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
    });
  };

  const completionStatus = getResumeCompletionStatus(resumeData);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#080b14] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors m-0 p-0">
      {/* Top Sticky Header */}
      <Header
        user={user}
        onLogin={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onLoadSample={handleLoadSample}
        onClearData={handleClearData}
        onTriggerAI={handleTriggerAI}
        isGeneratingAI={isGeneratingAI}
        activeView={activeView}
        setActiveView={(v) => handleNavigateView(v)}
      />

      {/* Main View Router */}
      {activeView === "landing" ? (
        <LandingPage
          onLaunchBuilder={() => handleNavigateView("builder")}
          onLoadSampleAndLaunch={() => {
            handleNavigateView("builder", () => handleLoadSample());
          }}
        />
      ) : (
        <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-8">
          {/* ── Builder Mode Tabs ── */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">Workspace</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                {builderTab === "scratch" ? "Build a resume that gets read." : "Improve your existing resume."}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                {builderTab === "scratch"
                  ? "Shape your story, tune your keywords, and watch the ATS score respond in real time."
                  : "Upload your current resume and let AI rewrite, polish, and ATS-optimize it."}
              </p>
            </div>

            {/* Tab switcher */}
            <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 shrink-0">
              <button
                type="button"
                onClick={() => setBuilderTab("scratch")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  builderTab === "scratch"
                    ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-white/10"
                    : "text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Layers className="w-4 h-4 shrink-0" />
                Build from Scratch
              </button>
              <button
                type="button"
                onClick={() => setBuilderTab("improve")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  builderTab === "improve"
                    ? "bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-sm border border-slate-200 dark:border-white/10"
                    : "text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                Improve Existing
              </button>
            </div>
          </div>

          {/* ── Tab Content ── */}
          {builderTab === "improve" ? (
            <ResumeImprover user={user} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Multi-Step Form */}
              <div className="lg:col-span-6 space-y-6">
                <StepNavigation
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />

                {currentStep === 1 && (
                  <PersonalForm
                    data={resumeData.personal}
                    onChange={(val) => handleDataChange({ ...resumeData, personal: val })}
                    errors={stepErrors}
                  />
                )}
                {currentStep === 2 && (
                  <TargetJobForm
                    data={resumeData.targetJob}
                    onChange={(val) => handleDataChange({ ...resumeData, targetJob: val })}
                    errors={stepErrors}
                  />
                )}
                {currentStep === 3 && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(val) => handleDataChange({ ...resumeData, experience: val })}
                    errors={stepErrors}
                  />
                )}
                {currentStep === 4 && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(val) => handleDataChange({ ...resumeData, education: val })}
                    errors={stepErrors}
                  />
                )}
                {currentStep === 5 && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(val) => handleDataChange({ ...resumeData, skills: val })}
                    errors={stepErrors}
                  />
                )}
                {currentStep === 6 && (
                  <AdditionalForm
                    projects={resumeData.projects}
                    certifications={resumeData.certifications}
                    achievements={resumeData.achievements}
                    onUpdateProjects={(val) => handleDataChange({ ...resumeData, projects: val })}
                    onUpdateCertifications={(val) => handleDataChange({ ...resumeData, certifications: val })}
                    onUpdateAchievements={(val) => handleDataChange({ ...resumeData, achievements: val })}
                  />
                )}

                {/* Step Navigation Controls */}
                <div className="flex items-center justify-between pt-2">
                  <Button
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    variant="outline"
                    className="cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </Button>
                  <div className="flex items-center gap-3">
                    {currentStep === 6 ? (
                      <Button
                        onClick={handleTriggerAI}
                        disabled={isGeneratingAI}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 cursor-pointer shadow-md"
                      >
                        <Sparkles className="w-4 h-4" /> Optimize & Calculate ATS
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNextStep}
                        className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-sm"
                      >
                        Next Step <ArrowRight className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <ATSPanel
                    analysis={atsAnalysis}
                    onTriggerAI={handleTriggerAI}
                    isGeneratingAI={isGeneratingAI}
                  />
                </div>
              </div>

              {/* Right Column: Live Resume Preview */}
              <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-20">
                <div className="flex items-center justify-between bg-white dark:bg-white/[0.04] p-3 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xl shadow-black/10">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">Live PDF Canvas Preview</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                      {completionStatus.percentage}% Complete
                    </span>
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full transition-all" style={{ width: `${completionStatus.percentage}%` }} />
                    </div>
                  </div>
                </div>
                <div className="max-h-[750px] overflow-y-auto rounded-2xl shadow-2xl shadow-black/20 border border-slate-200 dark:border-white/10">
                  <LivePreview data={resumeData} />
                </div>
                <div className="pt-2">
                  <PDFExportButton data={resumeData} />
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* AI Loading Animation Modal */}
      <AILoadingModal isOpen={isGeneratingAI} />

      {/* AI Optimization Review Modal */}
      <AIReviewModal
        isOpen={showAIModal}
        aiResult={aiResult}
        onAccept={handleAcceptAIOptimizations}
        onRegenerate={handleTriggerAI}
        onClose={() => setShowAIModal(false)}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSignIn={handleLogin}
        defaultName={resumeData?.personal?.fullName || ""}
        defaultEmail={resumeData?.personal?.email || ""}
      />
    </div>
  );
}
