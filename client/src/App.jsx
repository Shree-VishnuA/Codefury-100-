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
  const [builderTab, setBuilderTab] = useState("scratch");
  const [currentStep, setCurrentStep] = useState(1);
  const [darkMode, setDarkMode] = useState(true);
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [stepErrors, setStepErrors] = useState({});

  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [atsAnalysis, setAtsAnalysis] = useState(null);

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

  useEffect(() => {
    const saved = loadSavedResumeData();
    if (saved) {
      setResumeData(saved);
      if (saved.atsAnalysis) setAtsAnalysis(saved.atsAnalysis);
    }

    try {
      const savedUser = localStorage.getItem("legible_user") || localStorage.getItem("genforge_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Failed to load saved user session:", e);
    }

    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    saveResumeData(resumeData);
  }, [resumeData]);

  useEffect(() => {
    if (user && user.email) {
      fetch(`/api/resumes?userId=${encodeURIComponent(user.email)}`, {
        headers: { "x-user-id": user.email },
      })
        .then(async (res) => {
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            return res.json();
          } else {
            const text = await res.text();
            throw new Error(`Non-JSON response: ${text.substring(0, 100)}`);
          }
        })
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
        .catch((err) => console.warn("Could not sync resume from backend (this is normal if offline or backend is restarting):", err.message));
    }
  }, [user]);

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

  const handleLogin = (customUser) => {
    const userToSet = {
      name: customUser?.name || "User",
      email: customUser?.email || "user@example.com",
      image: customUser?.image || "",
    };

    setUser(userToSet);
    try {
      localStorage.setItem("legible_user", JSON.stringify(userToSet));
    } catch (e) {
      console.error("Failed to save user session:", e);
    }
    setShowAuthModal(false);

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
      localStorage.removeItem("legible_user");
      localStorage.removeItem("genforge_user");
    } catch (e) {
      console.error("Failed to remove saved user session:", e);
    }
  };

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

      // Safe JSON parsing — Vercel can return plain-text error pages on crash
      const rawText = await response.text();
      let json;
      try {
        json = JSON.parse(rawText);
      } catch {
        throw new Error(`Server returned non-JSON response: ${rawText.slice(0, 120)}`);
      }

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
    <div className="min-h-screen bg-[var(--paper)] dark:bg-[var(--paper-dark)] text-[var(--ink)] dark:text-[var(--ink-dark)] flex flex-col font-sans transition-colors m-0 p-0">
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

      {activeView === "landing" ? (
        <LandingPage
          onLaunchBuilder={() => handleNavigateView("builder")}
          onLoadSampleAndLaunch={() => {
            handleNavigateView("builder", () => handleLoadSample());
          }}
        />
      ) : (
        <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-8">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--redline)]">Workspace</span>
              <h1 className="mt-2 font-mono font-bold text-2xl sm:text-3xl tracking-tight text-[var(--ink)] dark:text-[var(--ink-dark)]">
                {builderTab === "scratch" ? "Build a resume that gets read." : "Improve your existing resume."}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--ink)]/60 dark:text-[var(--ink-dark)]/60">
                {builderTab === "scratch"
                  ? "Shape your story, tune your keywords, and watch the ATS score respond in real time."
                  : "Upload your current resume and let AI rewrite, polish, and ATS-optimize it."}
              </p>
            </div>

            <div
              className="flex items-center border shrink-0"
              style={{ borderColor: "rgba(21,28,36,0.15)" }}
            >
              <button
                type="button"
                onClick={() => setBuilderTab("scratch")}
                className={`flex items-center gap-2 px-4 py-2.5 font-mono text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  builderTab === "scratch"
                    ? "bg-[var(--ink)] dark:bg-[var(--ink-dark)] text-[var(--paper)] dark:text-[var(--paper-dark)]"
                    : "text-[var(--ink)]/50 dark:text-[var(--ink-dark)]/50 hover:text-[var(--ink)] dark:hover:text-[var(--ink-dark)] hover:bg-[var(--ink)]/[0.04]"
                }`}
              >
                <Layers className="w-3.5 h-3.5 shrink-0" />
                Build from Scratch
              </button>
             
            </div>
          </div>

          {builderTab === "improve" ? (
            <ResumeImprover user={user} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className="inline-flex items-center gap-2 px-4 py-2 font-mono text-xs font-semibold border border-[var(--ink)]/20 dark:border-[var(--ink-dark)]/20 hover:border-[var(--ink)] dark:hover:border-[var(--ink-dark)] text-[var(--ink)] dark:text-[var(--ink-dark)] transition-colors disabled:opacity-40 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Previous
                  </button>
                  <div className="flex items-center gap-3">
                    {currentStep === 6 ? (
                      <button
                        type="button"
                        onClick={handleTriggerAI}
                        disabled={isGeneratingAI}
                        className="inline-flex items-center gap-2 px-4 py-2 font-mono text-xs font-bold bg-[var(--ink)] dark:bg-[var(--ink-dark)] text-[var(--paper)] dark:text-[var(--paper-dark)] hover:bg-[var(--redline)] dark:hover:bg-[var(--redline)] dark:hover:text-[var(--paper)] transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Optimize with AI
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-2 px-4 py-2 font-mono text-xs font-bold bg-[var(--ink)] dark:bg-[var(--ink-dark)] text-[var(--paper)] dark:text-[var(--paper-dark)] hover:bg-[var(--redline)] dark:hover:bg-[var(--redline)] dark:hover:text-[var(--paper)] transition-colors cursor-pointer"
                      >
                        Next Step <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t" style={{ borderColor: "rgba(21,28,36,0.1)" }}>
                  <ATSPanel
                    analysis={atsAnalysis}
                    onTriggerAI={handleTriggerAI}
                    isGeneratingAI={isGeneratingAI}
                  />
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-20">
                <div
                  className="flex items-center justify-between bg-[var(--paper)] dark:bg-[var(--paper-dark)] p-3 border"
                  style={{ borderColor: "rgba(21,28,36,0.12)" }}
                >
                  <div className="flex items-center gap-2">
                    <Eye className="w-3.5 h-3.5 text-[var(--redline)]" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ink)] dark:text-[var(--ink-dark)]">Live Preview</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[var(--ink)]/50 dark:text-[var(--ink-dark)]/50">
                      {completionStatus.percentage}%
                    </span>
                    <div className="w-16 bg-[var(--ink)]/10 dark:bg-[var(--ink-dark)]/10 h-0.5">
                      <div className="bg-[var(--redline)] h-full transition-all" style={{ width: `${completionStatus.percentage}%` }} />
                    </div>
                  </div>
                </div>
                <div
                  className="max-h-[750px] overflow-y-auto border shadow-xl"
                  style={{ borderColor: "rgba(21,28,36,0.12)" }}
                >
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

      <AILoadingModal isOpen={isGeneratingAI} />

      <AIReviewModal
        isOpen={showAIModal}
        aiResult={aiResult}
        onAccept={handleAcceptAIOptimizations}
        onRegenerate={handleTriggerAI}
        onClose={() => setShowAIModal(false)}
      />

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
