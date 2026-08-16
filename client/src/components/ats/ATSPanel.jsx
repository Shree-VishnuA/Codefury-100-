import React from "react";
import { Gauge, CheckCircle, AlertTriangle, Lightbulb, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ATSPanel({ analysis, onTriggerAI, isGeneratingAI }) {
  if (!analysis) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>
              <Gauge className="w-4 h-4 text-[var(--redline)]" />
              ATS Readiness Analysis
            </CardTitle>
            <Badge variant="secondary">Not Scored Yet</Badge>
          </div>
          <CardDescription>
            Run Gemini AI Optimization to evaluate keyword alignment against your target role and calculate your ATS compatibility score.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={onTriggerAI}
            disabled={isGeneratingAI}
            className="w-full"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isGeneratingAI ? "Analyzing..." : "Calculate ATS Match & Optimize"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "text-[var(--pass)] border-[var(--pass)] bg-[var(--pass)]/10";
    if (score >= 60) return "text-[var(--highlight)] border-[var(--highlight)] bg-[var(--highlight)]/10";
    return "text-[var(--redline)] border-[var(--redline)] bg-[var(--redline)]/10";
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>
              <Gauge className="w-4 h-4 text-[var(--redline)]" />
              ATS Compatibility
            </CardTitle>
            <CardDescription>
              Keyword match based on target role & experience
            </CardDescription>
          </div>

          <div className={`flex flex-col items-center justify-center px-4 py-1.5 border font-mono ${getScoreColor(analysis.score)}`}>
            <span className="text-xl font-extrabold">{analysis.score}</span>
            <span className="text-[9px] font-semibold uppercase tracking-wider">/ 100 ATS</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 pt-4 font-mono">
        <div>
          <h4 className="text-xs font-bold text-[var(--ink)] dark:text-[var(--ink-dark)] flex items-center gap-1.5 mb-2 font-mono">
            <CheckCircle className="w-3.5 h-3.5 text-[var(--pass)]" />
            Matched Keywords ({analysis.matchedKeywords.length})
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {analysis.matchedKeywords.map((kw) => (
              <Badge key={kw} variant="success">
                ✓ {kw}
              </Badge>
            ))}
            {analysis.matchedKeywords.length === 0 && (
              <span className="text-xs text-[var(--ink)]/40 italic">No direct matches identified yet.</span>
            )}
          </div>
        </div>

        {analysis.missingKeywords.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-[var(--ink)] dark:text-[var(--ink-dark)] flex items-center gap-1.5 mb-2 font-mono">
              <AlertTriangle className="w-3.5 h-3.5 text-[var(--redline)]" />
              Potentially Missing Skills ({analysis.missingKeywords.length})
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {analysis.missingKeywords.map((kw) => (
                <Badge key={kw} variant="destructive">
                  ⚠ {kw}
                </Badge>
              ))}
            </div>
            <p className="text-[10px] text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40 mt-1 font-mono">
              * Only add skills you have actual experience with.
            </p>
          </div>
        )}

        {analysis.suggestions.length > 0 && (
          <div className="bg-[var(--ink)]/5 dark:bg-[var(--ink-dark)]/5 p-3 border border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 font-mono">
            <h4 className="text-xs font-bold text-[var(--ink)] dark:text-[var(--ink-dark)] flex items-center gap-1.5 mb-2">
              <Lightbulb className="w-3.5 h-3.5 text-[var(--highlight)]" />
              Optimization Tips
            </h4>
            <ul className="space-y-1.5 font-sans">
              {analysis.suggestions.map((sug, idx) => (
                <li key={idx} className="text-xs text-[var(--ink)]/70 dark:text-[var(--ink-dark)]/70 flex items-start gap-1.5">
                  <span className="text-[var(--redline)] font-mono font-bold">•</span>
                  <span>{sug}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
