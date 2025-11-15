'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PixelLoader } from "@/components/ui/pixel/pixel-loader";
import { PixelCard, PixelCardContent, PixelCardDescription, PixelCardHeader, PixelCardTitle } from "@/components/ui/pixel/pixel-card";
import { PixelButton } from "@/components/ui/pixel/pixel-button";
import { PixelAlert, PixelAlertDescription, PixelAlertTitle } from "@/components/ui/pixel/pixel-alert";
import { PixelBadge } from "@/components/ui/pixel/pixel-badge";
import { Upload, CheckCircle, FileText } from "lucide-react";

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
    "Finalizing your website..."
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
      setProgress(prev => {
        if (prev < 95) return prev + 1;
        return prev;
      });
    }, 50);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/parse-resume', {
        method: 'POST',
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
        setError(`${result.error}${result.details ? ': ' + result.details : ''}`);
        setLoading(false);
        setProgress(0);
      }
    } catch (err) {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      setError('Failed to upload or parse PDF: ' + (err instanceof Error ? err.message : 'Unknown error'));
      setLoading(false);
      setProgress(0);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pixel-light-bg dark:bg-[#000000] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-6">
          <PixelLoader variant="cassette" size="lg" progress={progress} text={loadingText} />
          <div className="text-center">
            <p className="text-lg font-bold font-pixel">{progress}% Complete</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pixel-light-bg dark:bg-[#000000] flex items-center justify-center px-4 py-20">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center space-y-6">
          <PixelBadge variant="warning" className="text-lg px-6 py-2">
            NEW FEATURE
          </PixelBadge>
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wider font-pixel dark:text-pixel-dark-secondary">
            Resume to Portfolio
          </h1>
          <p className="text-xl md:text-2xl dark:text-white">
            Transform your resume into a stunning portfolio website instantly
          </p>
        </div>

        <PixelCard>
          <PixelCardHeader>
            <PixelCardTitle className="flex items-center gap-3">
              <FileText className="h-6 w-6" />
              Upload Your Resume
            </PixelCardTitle>
            <PixelCardDescription>
              Upload a PDF resume and we'll create a beautiful pixel-perfect portfolio website for you
            </PixelCardDescription>
          </PixelCardHeader>
          <PixelCardContent className="space-y-6">
            <label
              htmlFor="resume-upload"
              className="block w-full p-12 border-4 border-dashed border-black dark:border-pixel-dark-primary text-center cursor-pointer transition-none duration-0 hover:bg-pixel-dark-secondary/10 dark:hover:bg-pixel-dark-primary/10"
            >
              <div className="space-y-4">
                <Upload className="h-12 w-12 mx-auto" />
                <div className="text-lg font-bold uppercase font-pixel">
                  Click to upload
                </div>
                <div className="text-sm">PDF files only</div>
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
                <PixelAlertTitle>Error</PixelAlertTitle>
                <PixelAlertDescription>{error}</PixelAlertDescription>
              </PixelAlert>
            )}
          </PixelCardContent>
        </PixelCard>

        <PixelCard>
          <PixelCardHeader>
            <PixelCardTitle>What We'll Extract</PixelCardTitle>
          </PixelCardHeader>
          <PixelCardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Contact Information",
                "Skills & Technologies",
                "Work Experience",
                "Projects",
                "Education",
                "Social Links"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#50c878]" />
                  <span className="font-bold">{item}</span>
                </div>
              ))}
            </div>
          </PixelCardContent>
        </PixelCard>

        <div className="text-center">
          <PixelBadge variant="default" className="text-sm">
            🔒 Your resume data is processed securely and never stored permanently
          </PixelBadge>
        </div>
      </div>
    </div>
  );
};

export default Page;
