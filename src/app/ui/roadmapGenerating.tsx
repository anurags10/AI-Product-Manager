"use client";

import { motion } from "motion/react";
import { Sparkles, Cpu, Layers, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

const steps = [
  { icon: Cpu, text: "Analyzing Product Requirements..." },
  { icon: Layers, text: "Structuring engineering phases..." },
  { icon: Sparkles, text: "Generating 3-month execution plan..." },
  { icon: CheckCircle2, text: "Finalizing roadmap details..." },
];

export default function RoadmapGenerating() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-12 p-8 md:p-12 border border-zinc-200 dark:border-zinc-800 rounded-3xl bg-white dark:bg-zinc-950 shadow-xl shadow-indigo-500/5 relative overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Dynamic Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[80px] -z-10"
      />

      {/* Pulsing Orb */}
      <div className="relative mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-full border-t-2 border-l-2 border-indigo-500 absolute inset-0"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-full border-b-2 border-r-2 border-purple-500 absolute inset-0 opacity-70"
        />
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <Sparkles className="text-white w-8 h-8 animate-pulse" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
        AI is drafting your roadmap
      </h3>
      <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mb-10">
        This usually takes around 10-15 seconds as we build out a comprehensive
        3-month timeline.
      </p>

      {/* Steps Checklist */}
      <div className="flex flex-col gap-4 text-left w-full max-w-sm">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = index === currentStep;
          const isPast = index < currentStep;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: isActive || isPast ? 1 : 0.4,
                x: isActive || isPast ? 0 : -10,
              }}
              className="flex items-center gap-4"
            >
              <div
                className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center transition-colors ${isPast ? "bg-emerald-500 text-white" : isActive ? "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"}`}
              >
                {isPast ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <StepIcon
                    size={16}
                    className={isActive ? "animate-pulse" : ""}
                  />
                )}
              </div>
              <span
                className={`text-sm font-medium ${isPast ? "text-zinc-900 dark:text-zinc-100" : isActive ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-500 dark:text-zinc-500"}`}
              >
                {step.text}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
