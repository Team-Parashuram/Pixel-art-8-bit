'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ResumeLoader } from "@/components/ResumeLoader";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/parse-resume', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        // Wait for loading animation to complete
        setTimeout(() => {
          router.push(`/resume/${result.id}`);
        }, 5000); // 5 seconds for the loading animation
      } else {
        setError(`${result.error}${result.details ? ': ' + result.details : ''}`);
        setLoading(false);
      }
    } catch (err) {
      setError('Failed to upload or parse PDF: ' + (err instanceof Error ? err.message : 'Unknown error'));
      setLoading(false);
    }
  };

  if (loading) {
    return <ResumeLoader />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Resume to Portfolio
          </h1>
          <p className="text-xl text-gray-400">
            Transform your resume into a stunning portfolio website instantly
          </p>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Upload Your Resume</h2>
            <p className="text-gray-400">
              Upload a PDF resume and we'll create a beautiful portfolio website for you
            </p>
          </div>

          <div className="space-y-4">
            <label
              htmlFor="resume-upload"
              className="block w-full p-12 border-2 border-dashed border-gray-700 hover:border-blue-500 rounded-xl text-center cursor-pointer transition-colors group"
            >
              <div className="space-y-3">
                <div className="text-4xl">📄</div>
                <div className="text-lg font-medium group-hover:text-blue-400 transition-colors">
                  Click to upload or drag and drop
                </div>
                <div className="text-sm text-gray-500">PDF files only</div>
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
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
                {error}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-800">
            <h3 className="font-semibold mb-3">What we'll extract:</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-blue-400">✓</span> Contact Information
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">✓</span> Skills & Technologies
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">✓</span> Work Experience
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">✓</span> Projects
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">✓</span> Education
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">✓</span> Social Links
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Your resume data is processed securely and never stored permanently.</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
