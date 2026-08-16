import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  CheckCircle2,
  XCircle,
  FileCheck,
  ArrowRight,
  ShieldCheck,
  Gauge,
  Cpu,
  MousePointerClick,
} from "lucide-react";

export function LandingPage({ onLaunchBuilder, onLoadSampleAndLaunch }) {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);

  const demoRoles = [
    {
      role: "Senior Machine Learning Engineer",
      score: 94,
      matched: ["Python", "PyTorch", "LLM APIs", "Docker", "REST APIs"],
      missing: ["CUDA Optimization", "Kubernetes"],
    },
    {
      role: "Full-Stack Web Developer",
      score: 91,
      matched: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
      missing: ["GraphQL", "CI/CD"],
    },
    {
      role: "Technical Product Manager",
      score: 87,
      matched: ["Agile/Scrum", "Product Roadmap", "User Research", "SQL"],
      missing: ["A/B Testing", "Mixpanel"],
    },
  ];

  const activeRole = demoRoles[activeRoleIndex];

  return (
    <div className="w-full bg-slate-100 dark:bg-[#080b14] text-slate-900 dark:text-slate-100 overflow-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-400/10 via-purple-400/10 to-indigo-400/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-indigo-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

        <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs font-semibold backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>GenForge AI Resume & ATS Optimization Engine</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight"
          >
            Turn your experience into a{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-500 bg-clip-text text-transparent">
              resume that gets you hired.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            75%+ of resumes are discarded by Applicant Tracking Systems before a human reads them.
            GenForge uses Google Gemini AI to optimize phrasing, eliminate errors, and calculate keyword match scores—with zero fake metrics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              type="button"
              onClick={onLaunchBuilder}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              Build my resume
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              type="button"
              onClick={onLoadSampleAndLaunch}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-white/[0.05] hover:bg-slate-50 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm transition-all duration-200 cursor-pointer"
            >
              <FileCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Try Sample Resume Demo
            </button>
          </motion.div>
        </div>

        {/* Live Interactive ATS Engine Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto bg-white dark:bg-white/[0.03] backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-2xl shadow-slate-200/50 dark:shadow-black/40 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider font-mono">
                <Gauge className="w-4 h-4" /> Live Interactive ATS Engine Simulation
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">
                Real-Time Keyword Match & Scoring Preview
              </h3>
            </div>

            <div className="flex bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl gap-1 border border-slate-200 dark:border-white/5">
              {demoRoles.map((r, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveRoleIndex(idx)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeRoleIndex === idx
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  {r.role.split(" ")[0]} Role
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-500/20 text-center">
              <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border-4 border-emerald-500 shadow-lg mb-3">
                <span className="text-3xl font-black text-slate-900 dark:text-white font-mono">
                  {activeRole.score}
                </span>
              </div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono">
                / 100 ATS Match Score
              </span>
            </div>

            <div className="md:col-span-8 space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2 uppercase tracking-wider">
                  Verified Matched Keywords
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeRole.matched.map((m, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> {m}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2 uppercase tracking-wider">
                  Missing Skill Recommendations
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeRole.missing.map((m, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-semibold rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1"
                    >
                      ⚠ {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Why Traditional Resume Tools Fail You */}
      <section className="py-16 bg-white dark:bg-slate-950/60 border-y border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Why Traditional Resume Tools Fail You
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              See how GenForge solves the flaws of legacy tools and generic LLMs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ y: -4 }}
              className="p-8 rounded-3xl bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 space-y-6"
            >
              <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
                <XCircle className="w-8 h-8" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Traditional Resume Builders</h3>
              </div>
              <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>75%+ ATS Rejection</strong>: Multi-column tables and fancy icons confuse corporate scanner software.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>AI Hallucination</strong>: Generic LLMs invent fake numbers like "Improved performance by 83%" when you never stated so.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>PDF Export Paywalls</strong>: Building your resume is free, but downloading your PDF requires a $20 subscription.</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-blue-50/60 via-indigo-50/60 to-purple-50/60 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-indigo-500/30 space-y-6 shadow-lg"
            >
              <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">GenForge AI Platform</h3>
              </div>
              <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Fact-Preserving Gemini AI</strong>: Enhances active verbs and phrasing while strictly preserving your exact facts.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Real-Time ATS Keyword Match</strong>: Instant score out of 100 with matched and missing keyword analysis.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Free Client-Side PDF Export</strong>: High-resolution single-column PDF export powered by React-PDF. Zero paywalls.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 font-mono">
            Simple 4-Step Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            How GenForge Transforms Your Resume
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Input Details",
              desc: "Fill in contact info, target job title, and raw experience bullet points.",
              icon: MousePointerClick,
            },
            {
              step: "02",
              title: "Gemini AI Engine",
              desc: "Server-side Gemini AI optimizes phrasing with active verbs and zero hallucinated metrics.",
              icon: Cpu,
            },
            {
              step: "03",
              title: "Review ATS Match",
              desc: "Inspect ATS score out of 100, keyword matches, and missing skill suggestions.",
              icon: ShieldCheck,
            },
            {
              step: "04",
              title: "Download PDF",
              desc: "Export print-ready ATS compliant single-column PDF instantly on client.",
              icon: Zap,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none space-y-4 relative"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-500/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-slate-300 dark:text-slate-600 font-mono">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Call to Action CTA Card */}
      <section className="py-20 max-w-5xl mx-auto px-4 text-center">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Ready to Build Your Executive Resume?
          </h2>
          <p className="text-sm opacity-90 max-w-xl mx-auto">
            Try GenForge now. 100% free, autosaved locally, and ready for instant PDF download.
          </p>
          <button
            type="button"
            onClick={onLaunchBuilder}
            className="px-8 py-4 text-sm font-bold text-blue-950 bg-white hover:bg-slate-100 rounded-2xl shadow-lg transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-blue-600" /> Start Building Now
          </button>
        </div>
      </section>
    </div>
  );
}
