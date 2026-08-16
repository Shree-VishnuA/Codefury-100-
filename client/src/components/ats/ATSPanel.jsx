import React from "react";
import { Gauge, CheckCircle, AlertTriangle, Lightbulb, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ATSPanel({ analysis, onTriggerAI, isGeneratingAI }) {
  if (!analysis) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>
              <Gauge className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
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
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 cursor-pointer shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            {isGeneratingAI ? "Analyzing..." : "Calculate ATS Match & Optimize"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-600 dark:text-emerald-400 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40";
    if (score >= 60) return "text-amber-600 dark:text-amber-400 border-amber-500 bg-amber-50 dark:bg-amber-950/40";
    return "text-red-600 dark:text-red-400 border-red-500 bg-red-50 dark:bg-red-950/40";
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>
              <Gauge className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              ATS Compatibility
            </CardTitle>
            <CardDescription>
              Keyword match based on target role & experience
            </CardDescription>
          </div>

          <div className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-xl border ${getScoreColor(analysis.score)}`}>
            <span className="text-xl font-extrabold">{analysis.score}</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider">/ 100 ATS</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 pt-4">
        <div>
          <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5 mb-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            Matched Keywords ({analysis.matchedKeywords.length})
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {analysis.matchedKeywords.map((kw) => (
              <Badge key={kw} variant="success">
                ✓ {kw}
              </Badge>
            ))}
            {analysis.matchedKeywords.length === 0 && (
              <span className="text-xs text-gray-400 italic">No direct matches identified yet.</span>
            )}
          </div>
        </div>

        {analysis.missingKeywords.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Potentially Missing Skills ({analysis.missingKeywords.length})
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {analysis.missingKeywords.map((kw) => (
                <Badge key={kw} variant="destructive" className="bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800">
                  ⚠ {kw}
                </Badge>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
              * Only add skills you have actual experience with.
            </p>
          </div>
        )}

        {analysis.suggestions.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
            <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5 mb-2">
              <Lightbulb className="w-4 h-4 text-indigo-500" />
              Optimization Tips
            </h4>
            <ul className="space-y-1.5">
              {analysis.suggestions.map((sug, idx) => (
                <li key={idx} className="text-xs text-gray-600 dark:text-gray-300 flex items-start gap-1.5">
                  <span className="text-indigo-500 font-bold">•</span>
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
