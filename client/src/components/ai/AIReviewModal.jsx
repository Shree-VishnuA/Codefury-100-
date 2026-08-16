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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <DialogTitle>Review & Customize AI Optimizations</DialogTitle>
            <DialogDescription>
              You can edit the summary, remove/add skill tags, or adjust bullets before accepting.
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <div className="space-y-6 my-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
              <Edit2 className="w-3.5 h-3.5 text-blue-500" /> Generated Professional Summary
            </h4>
            <span className="text-[11px] text-gray-400">Click to edit</span>
          </div>
          <textarea
            rows={3}
            value={editableResult.summary || ""}
            onChange={(e) => handleSummaryChange(e.target.value)}
            className="w-full p-3.5 text-xs sm:text-sm bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white leading-relaxed"
          />
        </div>

        <div className="space-y-3 border-t border-gray-100 dark:border-gray-800 pt-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Suggested Skill Tags ({editableResult.suggestedSkills.length})
            </h4>
            <span className="text-[11px] text-gray-400">Click X to delete unwanted tags</span>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {editableResult.suggestedSkills.map((sk) => (
              <Badge key={sk} variant="accent" className="gap-1 px-3 py-1 text-xs">
                <span>{sk}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(sk)}
                  className="hover:text-red-600 dark:hover:text-red-400 p-0.5 rounded-full cursor-pointer"
                  title={`Remove ${sk}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </Badge>
            ))}

            <div className="inline-flex items-center gap-1">
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
                variant="accent"
                className="cursor-pointer rounded-full"
                title="Add Tag"
              >
                <Plus className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {editableResult.experience && editableResult.experience.length > 0 && (
          <div className="space-y-3 border-t border-gray-100 dark:border-gray-800 pt-4">
            <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Optimized Work Experience Bullets
            </h4>
            <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
              {editableResult.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 space-y-2.5"
                >
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">
                    {exp.company} — {exp.role}
                  </span>
                  <div className="space-y-2">
                    {exp.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 w-full">
                        <span className="text-gray-400 text-xs font-bold shrink-0">•</span>
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
                          className="text-gray-400 hover:text-red-500 cursor-pointer shrink-0"
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

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-gray-800 mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onRegenerate}
          className="w-full sm:w-auto cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Regenerate AI
        </Button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="w-full sm:w-auto cursor-pointer"
          >
            Dismiss
          </Button>
          <Button
            type="button"
            onClick={() => onAccept(editableResult)}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            Accept AI Optimizations
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
