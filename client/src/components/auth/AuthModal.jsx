import React, { useState, useEffect, useRef } from "react";
import { Lock, User, Mail, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

const GOOGLE_CLIENT_ID = "81774566095-e3grg9guvd5f0frjjo5em3bqgido2pp9.apps.googleusercontent.com";

export function AuthModal({ isOpen, onClose, onSignIn, defaultName = "", defaultEmail = "" }) {
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const googleBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setName(defaultName);
      setEmail(defaultEmail);
      setError("");
    }
  }, [isOpen, defaultName, defaultEmail]);

  useEffect(() => {
    if (!isOpen || !googleBtnRef.current) return;

    const tryInit = () => {
      if (!window.google?.accounts?.id) return false;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredential,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      window.google.accounts.id.renderButton(googleBtnRef.current, {
        type: "standard",
        shape: "square",
        theme: "outline",
        size: "large",
        text: "continue_with",
        logo_alignment: "left",
        width: googleBtnRef.current.offsetWidth || 400,
      });
      return true;
    };

    if (!tryInit()) {
      const interval = setInterval(() => {
        if (tryInit()) clearInterval(interval);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleGoogleCredential = async (response) => {
    setGoogleLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/google/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Google sign-in failed");
      onSignIn(json.user);
    } catch (err) {
      setError(err.message || "Google sign-in failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (ev) => {
    if (ev?.preventDefault) ev.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    onSignIn({ name: name.trim() || email.split("@")[0] || "User", email: email.trim() });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogClose onClick={onClose} />
      <DialogHeader className="text-center items-center">
        <div className="w-12 h-12 mx-auto bg-[var(--ink)] dark:bg-[var(--ink-dark)] text-[var(--paper)] dark:text-[var(--paper-dark)] flex items-center justify-center mb-2">
          <Lock className="w-6 h-6 text-[var(--redline)]" />
        </div>
        <DialogTitle className="text-base font-bold text-center font-mono">
          Sign In to GenForge
        </DialogTitle>
        <DialogDescription className="text-center mt-1 text-xs font-mono">
          Sign in to save your ATS resumes, sync across devices, and optimize with Gemini AI.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 my-2 text-left font-mono">
        <div className="w-full flex flex-col items-center gap-2">
          {googleLoading ? (
            <div className="flex items-center gap-2 py-3 text-xs text-[var(--ink)]/50 dark:text-[var(--ink-dark)]/50">
              <Loader2 className="w-4 h-4 animate-spin" />
              Signing in with Google…
            </div>
          ) : (
            <div
              ref={googleBtnRef}
              className="w-full flex justify-center"
              style={{ minHeight: 44 }}
            />
          )}
        </div>

        <div className="relative my-1 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--ink)]/10 dark:border-[var(--ink-dark)]/10" />
          </div>
          <span className="relative px-3 text-[10px] uppercase tracking-wider bg-[var(--paper)] dark:bg-[#161B22] text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40 font-mono">
            OR sign in with email
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 font-sans">
          <div>
            <label className="block text-xs font-semibold text-[var(--ink)] dark:text-[var(--ink-dark)] mb-1 font-mono">
              Full Name <span className="text-[var(--ink)]/40 font-normal">(optional)</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-2.5 text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40" />
              <Input
                type="text"
                placeholder="e.g. John Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-9 text-xs py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--ink)] dark:text-[var(--ink-dark)] mb-1 font-mono">
              Email Address <span className="text-[var(--redline)]">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-2.5 text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40" />
              <Input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                className="pl-9 text-xs py-2"
              />
            </div>
            {error && <p className="text-[11px] text-[var(--redline)] mt-1 font-mono">{error}</p>}
          </div>

          <Button
            type="submit"
            className="w-full py-2.5 text-xs font-bold"
          >
            <span>Sign In / Create Account</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </form>

        <div className="pt-1 flex items-center justify-center font-mono">
          <button
            type="button"
            onClick={onClose}
            className="text-[11px] hover:underline text-[var(--ink)]/40 dark:text-[var(--ink-dark)]/40 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </Dialog>
  );
}
