import React, { useState, useEffect } from "react";
import { Sparkles, Check, RefreshCw, X, Plus, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export function AIReviewModal({
  isOpen,
  aiResult,
  onAccept,
  onRegenerate,
  onClose,
}) {
  const [editableResult, setEditableResult] = useState(null);
  const [newSkillInput, setNewSkillInput] = useState("");

  useEffect(() => {
    if (aiResult) {
      setEditableResult(JSON.parse(JSON.stringify(aiResult)));
    }
  }, [aiResult, isOpen]);

  if (!isOpen || !editableResult) return null;

  const handleSummaryChange = (val) => {
    setEditableResult({ ...editableResult, summary: val });
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditableResult({
      ...editableResult,
      suggestedSkills: editableResult.suggestedSkills.filter((s) => s !== skillToRemove),
    });
  };

  const handleAddSkill = () => {
    const trimmed = newSkillInput.trim();
    if (trimmed && !editableResult.suggestedSkills.includes(trimmed)) {
      setEditableResult({
        ...editableResult,
        suggestedSkills: [...editableResult.suggestedSkills, trimmed],
      });
      setNewSkillInput("");
    }
  };

  const handleUpdateBullet = (expIndex, bulletIndex, newText) => {
    const updatedExperience = [...editableResult.experience];
    if (updatedExperience[expIndex]) {
      updatedExperience[expIndex].bullets[bulletIndex] = newText;
      setEditableResult({ ...editableResult, experience: updatedExperience });
    }
  };

  const handleRemoveBullet = (expIndex, bulletIndex) => {
    const updatedExperience = [...editableResult.experience];
    if (updatedExperience[expIndex]) {
      updatedExperience[expIndex].bullets = updatedExperience[expIndex].bullets.filter(
        (_, idx) => idx !== bulletIndex
      );
      setEditableResult({ ...editableResult, experience: updatedExperience });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()} className="max-w-2xl sm:max-w-2xl">
      <DialogClose onClick={onClose} />
      <DialogHeader>
        <div className="flex items-center gap-3 font-mono">
          <div className="w-8 h-8 bg-[var(--ink)] dark:bg-[var(--ink-dark)] text-[var(--paper)] dark:text-[var(--paper-dark)] flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-[var(--redline)]" />
          </div>
          <div>
            <DialogTitle>Review & Customize AI Optimizations</DialogTitle>
            <DialogDescription>
              You can edit the summary, remove/add skill tags, or adjust bullets before accepting.
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <div className="space-y-6 my-2 font-mono">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[var(--ink)] dark:text-[var(--ink-dark)] uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Edit2 className="w-3.5 h-3.5 text-[var(--redline)]" /> Generated Professional Summary
            </h4>
            <span className="text-[10px] text-[var(--ink)]/40 font-mono">Click to edit</span>
          </div>
          <textarea
            rows={3}
            value={editableResult.summary || ""}
            onChange={(e) => handleSummaryChange(e.target.value)}
            className="w-full p-3 text-xs sm:text-sm bg-white dark:bg-[#161B22] border border-[var(--ink)]/20 dark:border-[var(--ink-dark)]/20 rounded-none focus:border-[var(--redline)] focus:outline-none text-[var(--ink)] dark:text-[var(--ink-dark)] leading-relaxed font-sans"
          />
        </div>

        <div className="space-y-3 border-t border-[var(--ink)]/10 dark:border-[var(--ink-dark)]/10 pt-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[var(--ink)] dark:text-[var(--ink-dark)] uppercase tracking-wider font-mono">
              Suggested Skill Tags ({editableResult.suggestedSkills.length})
            </h4>
            <span className="text-[10px] text-[var(--ink)]/40 font-mono">Click X to delete tags</span>
          </div>

          <div className="flex flex-wrap gap-1.5 items-center font-mono">
            {editableResult.suggestedSkills.map((sk) => (
              <Badge key={sk} variant="default" className="gap-1 px-2.5 py-1 text-xs">
                <span>{sk}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(sk)}
                  className="hover:text-[var(--redline)] cursor-pointer"
                  title={`Remove ${sk}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}

            <div className="inline-flex items-center gap-1 font-sans">
              <Input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                placeholder="Add custom tag..."
                className="h-7 text-xs w-32 px-2"
              />
              <Button
                type="button"
                size="iconSm"
                onClick={handleAddSkill}
                title="Add Tag"
              >
                <Plus className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {editableResult.experience && editableResult.experience.length > 0 && (
          <div className="space-y-3 border-t border-[var(--ink)]/10 dark:border-[var(--ink-dark)]/10 pt-4">
            <h4 className="text-xs font-bold text-[var(--ink)] dark:text-[var(--ink-dark)] uppercase tracking-wider font-mono">
              Optimized Work Experience Bullets
            </h4>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {editableResult.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-3 border border-[var(--ink)]/15 dark:border-[var(--ink-dark)]/15 bg-[var(--paper)] dark:bg-[#161B22] space-y-2"
                >
                  <span className="font-mono text-xs font-bold text-[var(--redline)] block">
                    {exp.company} - {exp.role}
                  </span>
                  <div className="space-y-2 font-sans">
                    {exp.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 w-full">
                        <span className="text-[var(--redline)] text-xs font-bold shrink-0 font-mono">•</span>
                        <Input
                          type="text"
                          value={b}
                          onChange={(e) => handleUpdateBullet(idx, bIdx, e.target.value)}
                          className="flex-1 text-xs w-full"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="iconSm"
                          onClick={() => handleRemoveBullet(idx, bIdx)}
                          className="text-[var(--ink)]/40 hover:text-[var(--redline)] shrink-0"
                          title="Delete bullet"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[var(--ink)]/10 dark:border-[var(--ink-dark)]/10 mt-4 font-mono">
        <Button
          type="button"
          variant="outline"
          onClick={onRegenerate}
          className="w-full sm:w-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Regenerate AI
        </Button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Dismiss
          </Button>
          <Button
            type="button"
            onClick={() => onAccept(editableResult)}
            className="w-full sm:w-auto"
          >
            <Check className="w-3.5 h-3.5" />
            Accept AI Optimizations
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
