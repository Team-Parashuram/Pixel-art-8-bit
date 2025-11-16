"use client";

import { CheckCircle, FileText, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  PixelAlert,
  PixelAlertDescription,
  PixelAlertTitle,
} from "@/components/ui/pixel/pixel-alert";
import { PixelBadge } from "@/components/ui/pixel/pixel-badge";
import { PixelButton } from "@/components/ui/pixel/pixel-button";
import {
  PixelCard,
  PixelCardContent,
  PixelCardDescription,
  PixelCardHeader,
  PixelCardTitle,
} from "@/components/ui/pixel/pixel-card";
import { PixelLoader } from "@/components/ui/pixel/pixel-loader";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingText, setLoadingText] = useState("Analyzing resume...");
  const [progress, setProgress] = useState(0);
  const router = useRouter();

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

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError("");
    setProgress(0);

    // Simulate loading animation
    let currentStep = 0;
    const stepInterval = setInterval(() => {
      if (currentStep < loadingSteps.length - 1) {
        currentStep++;
        setLoadingText(loadingSteps[currentStep]);
      }
    }, 600);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 95) return prev + 1;
        return prev;
      });
    }, 50);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setProgress(100);
        clearInterval(stepInterval);
        clearInterval(progressInterval);
        setLoadingText("Complete! Redirecting...");

        // Wait a moment before redirecting
        setTimeout(() => {
          router.push(`/resume/${result.id}`);
        }, 1000);
      } else {
        clearInterval(stepInterval);
        clearInterval(progressInterval);
        setError(
          `${result.error}${result.details ? ": " + result.details : ""}`,
        );
        setLoading(false);
        setProgress(0);
      }
    } catch (err) {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      setError(
        "Failed to upload or parse PDF: " +
          (err instanceof Error ? err.message : "Unknown error"),
      );
      setLoading(false);
      setProgress(0);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pixel-light-bg dark:bg-[#000000] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-8 max-w-md w-full">
          <PixelLoader
            variant="cassette"
            size="lg"
            progress={progress}
            text={loadingText}
          />
          <div className="text-center space-y-3 w-full">
            <p className="text-2xl md:text-3xl font-bold font-pixel dark:text-pixel-dark-secondary">
              {progress}% Complete
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 border-2 border-black dark:border-pixel-dark-primary">
              <div
                className="h-full bg-pixel-warning dark:bg-pixel-dark-primary transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-pixel">
              {loadingText}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pixel-light-bg dark:bg-[#000000] flex items-center justify-center px-4 py-12 md:py-20">
      <div className="max-w-4xl w-full space-y-10">
        {/* Hero Section */}
        <div className="text-center space-y-5">
          <div className="flex justify-center mb-4">
            <PixelBadge
              variant="warning"
              className="text-sm md:text-base px-6 py-2 font-pixel"
            >
              ✨ NEW FEATURE
            </PixelBadge>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider font-pixel dark:text-pixel-dark-secondary leading-tight">
            Resume to Portfolio
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl dark:text-gray-300 text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Transform your resume into a stunning pixel-perfect portfolio
            website in seconds
          </p>
        </div>

        {/* Upload Card */}
        <PixelCard className="overflow-hidden">
          <PixelCardHeader className="space-y-3">
            <PixelCardTitle className="flex items-center gap-3 text-xl md:text-2xl">
              <FileText className="h-6 w-6 md:h-7 md:w-7" />
              Upload Your Resume
            </PixelCardTitle>
            <PixelCardDescription className="text-base">
              Upload a PDF resume and we'll instantly create a beautiful,
              responsive portfolio website
            </PixelCardDescription>
          </PixelCardHeader>
          <PixelCardContent className="space-y-5">
            <label
              htmlFor="resume-upload"
              className="block w-full p-16 md:p-20 border-4 border-dashed border-black dark:border-pixel-dark-primary text-center cursor-pointer transition-all duration-200 hover:bg-pixel-warning/10 dark:hover:bg-pixel-dark-primary/20 hover:border-pixel-warning dark:hover:border-pixel-dark-secondary group"
            >
              <div className="space-y-5">
                <Upload className="h-14 w-14 md:h-16 md:w-16 mx-auto text-gray-600 dark:text-gray-400 group-hover:text-pixel-warning dark:group-hover:text-pixel-dark-secondary transition-colors" />
                <div>
                  <div className="text-xl md:text-2xl font-bold uppercase font-pixel mb-2 group-hover:text-pixel-warning dark:group-hover:text-pixel-dark-secondary transition-colors">
                    Click to Upload
                  </div>
                  <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                    PDF files only • Max 10MB
                  </div>
                </div>
              </div>
              <input
                id="resume-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFile}
                className="hidden"
              />
            </label>

            {error && (
              <PixelAlert variant="error">
                <PixelAlertTitle className="font-pixel">
                  Upload Failed
                </PixelAlertTitle>
                <PixelAlertDescription className="text-sm">
                  {error}
                </PixelAlertDescription>
              </PixelAlert>
            )}
          </PixelCardContent>
        </PixelCard>

        {/* Features Card */}
        <PixelCard>
          <PixelCardHeader>
            <PixelCardTitle className="text-xl md:text-2xl text-center md:text-left">
              📋 What We'll Extract
            </PixelCardTitle>
          </PixelCardHeader>
          <PixelCardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {[
                "Contact Information",
                "Skills & Technologies",
                "Work Experience",
                "Projects & Links",
                "Education Details",
                "Social Profiles",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-pixel-light-bg dark:bg-pixel-dark-bg/50 transition-all hover:bg-pixel-warning/10 dark:hover:bg-pixel-dark-primary/10"
                >
                  <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-[#50c878] shrink-0" />
                  <span className="font-bold text-sm md:text-base">{item}</span>
                </div>
              ))}
            </div>
          </PixelCardContent>
        </PixelCard>

        {/* Security Badge */}
        <div className="text-center pt-2">
          <PixelBadge
            variant="default"
            className="text-xs md:text-sm px-5 py-2.5 inline-flex items-center gap-2"
          >
            <span className="text-base">🔒</span>
            <span>
              Your resume data is processed securely and never stored
              permanently
            </span>
          </PixelBadge>
        </div>
      </div>
    </div>
  );
};

export default Page;
