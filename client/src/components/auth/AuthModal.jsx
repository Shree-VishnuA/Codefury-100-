import React, { useState, useEffect } from "react";
import { ShieldCheck, Lock, User, Mail, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

export function AuthModal({ isOpen, onClose, onSignIn, defaultName = "", defaultEmail = "" }) {
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(defaultName);
      setEmail(defaultEmail);
      setError("");
    }
  }, [isOpen, defaultName, defaultEmail]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    const userName = name.trim() || email.split("@")[0] || "User";
    onSignIn({
      name: userName,
      email: email.trim(),
    });
  };

  const handleDemoSignIn = () => {
    onSignIn({
      name: "Alex Morgan",
      email: "alex.morgan@example.com",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogClose onClick={onClose} />
      <DialogHeader className="text-center items-center">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-2">
          <Lock className="w-7 h-7" />
        </div>
        <DialogTitle className="text-xl text-center">
          Sign In to GenForge Resume Pro
        </DialogTitle>
        <DialogDescription className="text-center mt-1 text-xs">
          Sign in to save your ATS resumes, sync across devices, and optimize with Gemini AI.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 my-2 text-left">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <Input
                type="text"
                placeholder="e.g. Sarah Jenkins"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-9 text-xs py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <Input
                type="email"
                required
                placeholder="e.g. sarah.jenkins@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                className="pl-9 text-xs py-2"
              />
            </div>
            {error && <p className="text-[11px] text-red-500 mt-1 font-medium">{error}</p>}
          </div>

          <Button
            type="submit"
            className="w-full py-2.5 text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white cursor-pointer shadow-md mt-2 flex items-center justify-center gap-1.5"
          >
            <span>Sign In / Create Account</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </form>

        <div className="relative my-3 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700" />
          </div>
          <span className="relative px-2 text-[11px] bg-white dark:bg-gray-900 text-gray-400 font-medium">
            OR
          </span>
        </div>

        <Button
          type="button"
          onClick={() => {
            if (email && email.includes("@")) {
              handleSubmit({ preventDefault: () => {} });
            } else {
              handleDemoSignIn();
            }
          }}
          variant="outline"
          className="w-full py-2 text-xs font-bold cursor-pointer shadow-xs flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </Button>

        <div className="pt-1 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
          <button
            type="button"
            onClick={handleDemoSignIn}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer"
          >
            Use Demo Account (Alex Morgan)
          </button>
          <button
            type="button"
            onClick={onClose}
            className="hover:underline text-gray-500 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </Dialog>
  );
}

