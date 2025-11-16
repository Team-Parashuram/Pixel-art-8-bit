"use client";

import { useEffect, useState } from "react";
import Hyperspeed from "./Hyperspeed";
import Orb from "./Orb";

interface ResumeLoaderProps {
  onComplete?: () => void;
}

const loadingSteps = [
  "Analyzing resume structure...",
  "Extracting contact information...",
  "Identifying skills and technologies...",
  "Processing work experience...",
  "Discovering projects...",
  "Parsing education details...",
  "Generating portfolio design...",
  "Finalizing your website...",
];

export function ResumeLoader({ onComplete }: ResumeLoaderProps) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 600);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(progressInterval);
        clearInterval(stepInterval);
        setTimeout(() => onComplete?.(), 500);
        return 100;
      });
    }, 50);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <Hyperspeed />
      </div>

      {/* Orb Effect */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <Orb />
      </div>

      {/* Loading Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4">
        {/* Progress Circle */}
        <div className="relative flex items-center justify-center">
          <svg className="w-32 h-32 -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-gray-800"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
              className="text-blue-500 transition-all duration-300"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">{progress}%</span>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Creating Your Portfolio
          </h2>
          <p className="text-lg text-gray-300 animate-pulse min-h-7">
            {loadingSteps[step]}
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex gap-2">
          {loadingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index <= step ? "bg-blue-500 scale-100" : "bg-gray-700 scale-75"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
