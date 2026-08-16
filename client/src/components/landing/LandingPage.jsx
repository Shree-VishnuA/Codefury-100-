import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenTool,
  ScanLine,
  Highlighter,
  CheckCircle2,
  XCircle,
  ClipboardCheck,
  ArrowRight,
  Moon,
  Sun,
} from "lucide-react";


const TOKENS = {
  paper: "#EEF0E9",
  paperDark: "#12151A",
  ink: "#151C24",
  inkDark: "#ECE9DF",
  redline: "#B3402B",
  highlight: "#F0BE33",
  pass: "#2F6F52",
};

export function LandingPage({ onLaunchBuilder, onLoadSampleAndLaunch }) {
  const [dark, setDark] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);

  const demoRoles = [
    {
      role: "ML Engineer",
      score: 94,
      matched: ["Python", "PyTorch", "LLM APIs", "Docker", "REST APIs"],
      missing: ["CUDA Optimization", "Kubernetes"],
    },
    {
      role: "Full-Stack Dev",
      score: 91,
      matched: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
      missing: ["GraphQL", "CI/CD"],
    },
    {
      role: "Product Manager",
      score: 87,
      matched: ["Agile/Scrum", "Roadmapping", "User Research", "SQL"],
      missing: ["A/B Testing", "Mixpanel"],
    },
  ];
  const activeRole = demoRoles[activeRoleIndex];

  const intake = [
    {
      field: "Contact + role",
      detail: "Name, target title, and the raw facts — dates, companies, numbers.",
    },
    {
      field: "Gemini pass",
      detail: "Rewrites phrasing with active verbs. Never invents a metric you didn't give it.",
    },
    {
      field: "Scanner pass",
      detail: "Same keyword logic a corporate ATS runs, shown to you before a recruiter sees it.",
    },
    {
      field: "Export",
      detail: "Single-column, client-side PDF. No account wall to download your own document.",
    },
  ];

  return (
    <div
      className={dark ? "dark" : ""}
      style={{ "--paper": TOKENS.paper, "--paper-dark": TOKENS.paperDark, "--ink": TOKENS.ink, "--ink-dark": TOKENS.inkDark, "--redline": TOKENS.redline, "--highlight": TOKENS.highlight, "--pass": TOKENS.pass }}
    >
      <div className="min-h-screen bg-[var(--paper)] dark:bg-[var(--paper-dark)] text-[var(--ink)] dark:text-[var(--ink-dark)] font-sans transition-colors duration-300">

        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--redline)] mb-5">
              <span className="w-1.5 h-1.5 bg-[var(--redline)]" />
              File 001 — Intake
            </div>
            <h1 className="font-mono font-bold text-[2.5rem] sm:text-[3.25rem] leading-[1.05] tracking-tight mb-6">
              Most resumes
              <br />
              never meet a human.
            </h1>
            <p className="text-base sm:text-lg text-[var(--ink)]/70 dark:text-[var(--ink-dark)]/70 leading-relaxed max-w-md mb-9">
              They meet a parser first. Legible rewrites your bullet points with
              Gemini, then runs the same keyword pass an ATS would — so you see
              what survives before a recruiter ever does.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onLaunchBuilder}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold bg-[var(--ink)] text-[var(--paper)] dark:bg-[var(--ink-dark)] dark:text-[var(--paper-dark)] hover:bg-[var(--redline)] dark:hover:bg-[var(--redline)] dark:hover:text-[var(--paper)] transition-colors"
              >
                <PenTool className="w-4 h-4" />
                Start my resume
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                type="button"
                onClick={onLoadSampleAndLaunch}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold border border-[var(--ink)]/25 dark:border-[var(--ink-dark)]/25 hover:border-[var(--ink)] dark:hover:border-[var(--ink-dark)] transition-colors"
              >
                Load a sample
              </button>
            </div>
          </div>

          {/* Signature element: scanned document mock */}
          <div className="relative">
            <div
              className="relative bg-white dark:bg-[#1B2029] border border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 p-7 pt-6"
              style={{ boxShadow: "7px 7px 0 var(--ink)", transform: "rotate(0.4deg)" }}
            >
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-[var(--ink)]/10 dark:border-[var(--ink-dark)]/10">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--redline)]" />
                  <span className="w-2 h-2 rounded-full bg-[var(--highlight)]" />
                  <span className="w-2 h-2 rounded-full bg-[var(--pass)]" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40">
                  resume.pdf
                </span>
              </div>

              {/* fake resume lines */}
              <div className="space-y-2.5 mb-2">
                <div className="h-3 w-2/5 bg-[var(--ink)]/70 dark:bg-[var(--ink-dark)]/70" />
                <div className="h-2 w-1/4 bg-[var(--ink)]/25 dark:bg-[var(--ink-dark)]/25 mb-3" />
                {[90, 75, 95, 60, 85, 70].map((w, i) => (
                  <div
                    key={i}
                    className="h-2 bg-[var(--ink)]/15 dark:bg-[var(--ink-dark)]/15"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>

              {/* scan bar */}
              {!scanned && (
                <motion.div
                  className="absolute left-0 right-0 h-8 bg-gradient-to-b from-[var(--highlight)]/0 via-[var(--highlight)]/25 to-[var(--highlight)]/0"
                  initial={{ top: "20%" }}
                  animate={{ top: ["20%", "85%", "20%"] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              {/* annotations */}
              <div className="mt-5 space-y-2">
                <AnimatePresence mode="wait">
                  {!scanned ? (
                    <motion.div
                      key="flag"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 font-mono text-[11px] text-[var(--redline)]"
                    >
                      <XCircle className="w-3.5 h-3.5 shrink-0" />
                      TWO-COLUMN LAYOUT — 0% PARSEABLE
                    </motion.div>
                  ) : (
                    <motion.div
                      key="pass"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 font-mono text-[11px] text-[var(--pass)]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      SINGLE COLUMN — 100% PARSEABLE
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                type="button"
                onClick={() => setScanned((s) => !s)}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 py-2.5 font-mono text-xs uppercase tracking-wider border border-[var(--ink)]/20 dark:border-[var(--ink-dark)]/20 hover:bg-[var(--ink)] hover:text-[var(--paper)] dark:hover:bg-[var(--ink-dark)] dark:hover:text-[var(--paper-dark)] transition-colors"
              >
                <ScanLine className="w-3.5 h-3.5" />
                {scanned ? "Reset scan" : "Run ATS scan"}
              </button>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40 mt-3 block text-center">
              Live simulation — not your actual data
            </span>
          </div>
        </section>

        {/* Redline comparison */}
        <section className="border-y border-[var(--ink)]/10 dark:border-[var(--ink-dark)]/10 bg-white dark:bg-[#161B22] py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-12">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--redline)]">
                Exhibit A — Same bullet, two drafts
              </span>
              <h2 className="font-mono font-bold text-2xl sm:text-3xl mt-2">
                Gemini edits phrasing. It doesn't invent facts.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15">
              <div className="p-8 border-b md:border-b-0 md:border-r border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40">
                  What you typed
                </span>
                <p className="mt-4 text-[15px] leading-relaxed font-mono">
                  <span className="line-through decoration-[var(--redline)] decoration-2 text-[var(--ink)]/50 dark:text-[var(--ink-dark)]/50">
                    worked on the backend for the payments team and helped fix bugs
                  </span>
                </p>
              </div>
              <div className="p-8 bg-[var(--highlight)]/10">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--pass)]">
                  What Legible writes
                </span>
                <p className="mt-4 text-[15px] leading-relaxed font-mono">
                  Rebuilt the payments backend's error-handling layer, cutting
                  failed-transaction tickets{" "}
                  <mark className="bg-[var(--highlight)]/60 px-0.5">
                    [insert your metric here]
                  </mark>
                  .
                </p>
                <p className="mt-3 text-xs text-[var(--ink)]/50 dark:text-[var(--ink-dark)]/50 italic">
                  Note: the bracket is real — it asks you for the number instead of guessing one.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Intake form */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <div className="mb-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--redline)]">
              Form GF-01
            </span>
            <h2 className="font-mono font-bold text-2xl sm:text-3xl mt-2">
              The intake, in order
            </h2>
          </div>

          <div className="border border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 divide-y divide-[var(--ink)]/15 dark:divide-[var(--ink-dark)]/15">
            {intake.map((item, idx) => (
              <div key={idx} className="flex items-start gap-5 p-6">
                <div className="w-5 h-5 mt-0.5 border border-[var(--ink)]/40 dark:border-[var(--ink-dark)]/40 flex items-center justify-center shrink-0">
                  <ClipboardCheck className="w-3.5 h-3.5 text-[var(--pass)]" />
                </div>
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-mono font-semibold text-sm">{item.field}</h3>
                  </div>
                  <p className="text-sm text-[var(--ink)]/65 dark:text-[var(--ink-dark)]/65 mt-1 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ATS report readout */}
        <section className="border-y border-[var(--ink)]/10 dark:border-[var(--ink-dark)]/10 bg-white dark:bg-[#161B22] py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--redline)]">
                  Report GF-02
                </span>
                <h2 className="font-mono font-bold text-2xl sm:text-3xl mt-2">
                  Keyword readout
                </h2>
              </div>
              <div className="flex border border-[var(--ink)]/20 dark:border-[var(--ink-dark)]/20">
                {demoRoles.map((r, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveRoleIndex(idx)}
                    className={`px-3.5 py-2 font-mono text-xs transition-colors ${
                      activeRoleIndex === idx
                        ? "bg-[var(--ink)] text-[var(--paper)] dark:bg-[var(--ink-dark)] dark:text-[var(--paper-dark)]"
                        : "hover:bg-[var(--ink)]/5 dark:hover:bg-[var(--ink-dark)]/5"
                    }`}
                  >
                    {r.role}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 p-8 font-mono text-sm">
              <div className="flex items-baseline justify-between border-b border-dashed border-[var(--ink)]/25 dark:border-[var(--ink-dark)]/25 pb-3 mb-4">
                <span className="uppercase tracking-wider text-xs text-[var(--ink)]/50 dark:text-[var(--ink-dark)]/50">
                  Match score
                </span>
                <span className="text-2xl font-bold">{activeRole.score}/100</span>
              </div>

              <div className="space-y-1.5 mb-5">
                {activeRole.matched.map((m, i) => (
                  <div key={i} className="flex items-center justify-between text-[var(--pass)]">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {m}
                    </span>
                    <span className="text-xs">MATCHED</span>
                  </div>
                ))}
              </div>
              <div className="space-y-1.5">
                {activeRole.missing.map((m, i) => (
                  <div key={i} className="flex items-center justify-between text-[var(--redline)]">
                    <span className="flex items-center gap-2">
                      <Highlighter className="w-3.5 h-3.5" /> {m}
                    </span>
                    <span className="text-xs">SUGGESTED</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex flex-col items-center gap-4">
            <div
              className="w-28 h-28 rounded-full border-2 border-[var(--redline)] flex items-center justify-center rotate-[-8deg]"
              style={{ borderStyle: "double" }}
            >
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--redline)] text-center leading-tight">
                Ready
                <br />
                to send
              </span>
            </div>
            <h2 className="font-mono font-bold text-2xl sm:text-3xl max-w-md mt-2">
              Free. No download paywall. No invented metrics.
            </h2>
            <button
              type="button"
              onClick={onLaunchBuilder}
              className="mt-4 inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold bg-[var(--ink)] text-[var(--paper)] dark:bg-[var(--ink-dark)] dark:text-[var(--paper-dark)] hover:bg-[var(--redline)] dark:hover:bg-[var(--redline)] dark:hover:text-[var(--paper)] transition-colors"
            >
              <PenTool className="w-4 h-4" />
              Start building
            </button>
          </div>
        </section>

        <footer className="border-t border-[var(--ink)]/10 dark:border-[var(--ink-dark)]/10 py-8 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40">
            Legible - built for CodeFury 9.0
          </span>
        </footer>
      </div>
    </div>
  );
}