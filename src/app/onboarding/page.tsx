"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Sparkles, ChevronRight, Check } from "lucide-react";

const steps = [
  {
    title: "Welcome to PromptForge AI",
    description: "You've joined the elite prompt engineering platform. Let's set up your workspace.",
    icon: Sparkles,
  },
  {
    title: "Choose Your Focus",
    description: "Tell us what you'll be creating - code, content, images, or business prompts.",
    options: ["Coding", "Content Writing", "Image Generation", "Business", "All of the above"],
  },
  {
    title: "You're All Set!",
    description: "Start creating elite prompts that produce exceptional AI outputs.",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFocus, setSelectedFocus] = useState("");

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">PromptForge</span>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentStep
                  ? "bg-primary-500 w-8"
                  : i < currentStep
                  ? "bg-accent-emerald"
                  : "bg-dark-700"
              }`}
            />
          ))}
        </div>

        <div className="glass-card rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">{steps[currentStep].title}</h2>
          <p className="text-slate-400 mb-8">{steps[currentStep].description}</p>

          {"options" in steps[currentStep] && (
            <div className="space-y-3 mb-8">
              {(steps[currentStep] as any).options.map((option: string) => (
                <button
                  key={option}
                  onClick={() => setSelectedFocus(option)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                    selectedFocus === option
                      ? "bg-primary-500/10 border-primary-500/30 text-primary-400"
                      : "bg-dark-800/50 border-glass-border text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <span className="font-medium">{option}</span>
                  {selectedFocus === option && <Check className="w-5 h-5" />}
                </button>
              ))}
            </div>
          )}

          {user && (
            <div className="p-4 rounded-xl bg-dark-800/50 border border-glass-border mb-8">
              <p className="text-sm text-slate-400">
                Signed in as <span className="text-white font-medium">{user.email}</span>
              </p>
            </div>
          )}

          <button
            onClick={handleNext}
            className="w-full flex items-center justify-center gap-2 btn-primary"
          >
            {currentStep === steps.length - 1 ? (
              "Go to Dashboard"
            ) : (
              <>
                Next Step
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
