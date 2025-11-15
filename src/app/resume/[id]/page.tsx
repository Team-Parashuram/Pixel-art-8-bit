'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ResumeData } from '@/lib/resume-parser';
import GradientText from '@/components/GradientText';
import BlurText from '@/components/BlurText';
import SpotlightCard from '@/components/SpotlightCard';
import ShinyText from '@/components/ShinyText';
import StarBorder from '@/components/StarBorder';

export default function PortfolioPage() {
  const params = useParams();
  const [data, setData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/parse-resume?id=${params.id}`)
        .then(res => res.json())
        .then(result => {
          if (result.success) {
            setData(result.data);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Portfolio not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-black to-black" />
        
        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8">
          <BlurText
            text={data.name}
            className="text-6xl md:text-8xl font-bold"
            delay={50}
          />
          
          <GradientText className="text-2xl md:text-4xl font-semibold">
            Full Stack Developer
          </GradientText>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {data.summary || "Passionate developer building amazing web experiences"}
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center pt-4">
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Contact Me
              </a>
            )}
            {data.github && (
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-gray-700 hover:border-gray-500 rounded-lg transition-colors"
              >
                GitHub
              </a>
            )}
            {data.linkedin && (
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-gray-700 hover:border-gray-500 rounded-lg transition-colors"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {data.skills.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              <ShinyText text="Skills & Technologies" />
            </h2>
            
            <div className="flex flex-wrap gap-3 justify-center">
              {data.skills.map((skill, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-sm font-medium backdrop-blur-sm hover:scale-105 transition-transform"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {data.experience.length > 0 && (
        <section className="py-20 px-4 bg-gradient-to-b from-black via-gray-950 to-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <GradientText>Work Experience</GradientText>
            </h2>

            <div className="space-y-8">
              {data.experience.map((exp, index) => (
                <SpotlightCard key={index} className="p-8">
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <h3 className="text-2xl font-bold text-blue-400">
                        {exp.position}
                      </h3>
                      <span className="text-gray-400">{exp.duration}</span>
                    </div>
                    
                    <h4 className="text-xl font-semibold text-gray-300">
                      {exp.company}
                    </h4>
                    
                    {exp.location && (
                      <p className="text-gray-500">{exp.location}</p>
                    )}

                    {exp.description && exp.description.length > 0 && (
                      <ul className="list-disc list-inside space-y-2 text-gray-400">
                        {exp.description.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {data.projects.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <ShinyText text="Featured Projects" />
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {data.projects.map((project, index) => (
                <SpotlightCard key={index} className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl">
                  <h3 className="text-2xl font-bold mb-4 text-blue-400">
                    {project.name}
                  </h3>
                  
                  <p className="text-gray-400 mb-4">
                    {project.description}
                  </p>

                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-md text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      View Project →
                    </a>
                  )}
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {data.education.length > 0 && (
        <section className="py-20 px-4 bg-gradient-to-b from-black via-gray-950 to-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              <GradientText>Education</GradientText>
            </h2>

            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <StarBorder key={index} className="p-8">
                  <div className="space-y-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <h3 className="text-2xl font-bold text-blue-400">
                        {edu.institution}
                      </h3>
                      <span className="text-gray-400">{edu.duration}</span>
                    </div>
                    
                    <p className="text-xl text-gray-300">{edu.degree}</p>
                    
                    {edu.field && (
                      <p className="text-gray-400">{edu.field}</p>
                    )}
                    
                    {edu.gpa && (
                      <p className="text-gray-500">GPA: {edu.gpa}</p>
                    )}
                  </div>
                </StarBorder>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-500">
          <p>© {new Date().getFullYear()} {data.name}. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Built with ❤️ using Resume to Portfolio Generator
          </p>
        </div>
      </footer>
    </div>
  );
}
