'use client'

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ResumeData } from '@/lib/resume-parser';
import { PixelCard, PixelCardContent, PixelCardHeader, PixelCardTitle } from '@/components/ui/pixel/pixel-card';
import { PixelButton } from '@/components/ui/pixel/pixel-button';
import { PixelBadge } from '@/components/ui/pixel/pixel-badge';
import { PixelHero, PixelHeroContent, PixelHeroTitle, PixelHeroDescription } from '@/components/ui/pixel/pixel-hero';
import { PixelLoader } from '@/components/ui/pixel/pixel-loader';
import { Mail, Github, Linkedin, Phone, MapPin, ExternalLink, Briefcase, GraduationCap, Code, FolderGit2, Download, ArrowLeft, Upload } from 'lucide-react';

export default function PortfolioPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSkillsPage, setCurrentSkillsPage] = useState(1);
  const projectsPerPage = 2;
  const skillsPerPage = 12;

  useEffect(() => {
    if (params.id) {
      fetch(`/api/parse-resume?id=${params.id}`)
        .then(res => res.json())
        .then(result => {
          if (result.success) {
            console.log('📊 Parsed Resume Data:', result.data);
            setData(result.data);
          } else {
            router.push('/resume');
          }
          setLoading(false);
        })
        .catch(() => {
          router.push('/resume');
          setLoading(false);
        });
    }
  }, [params.id, router]);

  const generateTSXCode = () => {
    if (!data) return '';
    
    return `'use client'

export default function Portfolio() {
  const data = ${JSON.stringify(data, null, 2)};

  return (
    <div className="min-h-screen bg-pixel-light-bg dark:bg-[#000000]">
      {/* Your portfolio content here */}
      <h1>${data.name}</h1>
    </div>
  );
}`;
  };

  const handleDownload = () => {
    const tsxCode = generateTSXCode();
    const blob = new Blob([tsxCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data?.name?.replace(/\s+/g, '-').toLowerCase() || 'portfolio'}-portfolio.tsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pixel-light-bg dark:bg-[#000000]">
        <div className="flex flex-col items-center gap-6">
          <PixelLoader variant="crt" size="lg" text="Loading Portfolio..." />
          <div className="text-center">
            <p className="text-lg font-bold font-pixel dark:text-pixel-dark-secondary">
              Fetching your resume data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const hasAnySection = data.skills?.length > 0 || 
                        data.experience?.length > 0 || 
                        data.projects?.length > 0 || 
                        data.education?.length > 0;

  const toggleProjectExpand = (index: number) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedProjects(newExpanded);
  };

  // Pagination logic for projects
  const totalProjects = data?.projects?.length || 0;
  const totalPages = Math.ceil(totalProjects / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = data?.projects?.slice(indexOfFirstProject, indexOfLastProject) || [];

  // Pagination logic for skills
  const totalSkills = data?.skills?.length || 0;
  const totalSkillsPages = Math.ceil(totalSkills / skillsPerPage);
  const indexOfLastSkill = currentSkillsPage * skillsPerPage;
  const indexOfFirstSkill = indexOfLastSkill - skillsPerPage;
  const currentSkills = data?.skills?.slice(indexOfFirstSkill, indexOfLastSkill) || [];

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to projects section
    document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSkillsPageChange = (pageNumber: number) => {
    setCurrentSkillsPage(pageNumber);
    // Scroll to skills section
    document.getElementById('skills-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-pixel-light-bg dark:bg-[#000000]">
      {/* Navigation Bar */}
      <nav className="border-b-4 border-black dark:border-pixel-dark-primary bg-white/90 dark:bg-black/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/resume">
            <PixelButton variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Upload
            </PixelButton>
          </a>
          <div className="flex gap-2">
            <a href="/resume">
              <PixelButton variant="secondary" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                New Resume
              </PixelButton>
            </a>
            <PixelButton onClick={handleDownload} size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download Code
            </PixelButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <PixelHero variant="dark" size="md">
        <PixelHeroContent>
          <PixelHeroTitle className="mb-4 text-3xl md:text-5xl">
            {data.name}
          </PixelHeroTitle>
          
          {data.title && (
            <PixelHeroDescription className="text-xl md:text-2xl mb-6">
              {data.title}
            </PixelHeroDescription>
          )}

          {data.summary && (
            <p className="text-base md:text-lg mb-6 max-w-3xl mx-auto">
              {data.summary}
            </p>
          )}

          <div className="flex flex-wrap gap-3 justify-center items-center">
            {data.email && (
              <a href={`mailto:${data.email}`}>
                <PixelButton size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </PixelButton>
              </a>
            )}
            {data.github && (
              <a href={data.github} target="_blank" rel="noopener noreferrer">
                <PixelButton size="sm" variant="secondary">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </PixelButton>
              </a>
            )}
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
                <PixelButton size="sm" variant="secondary">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </PixelButton>
              </a>
            )}
            {data.phone && (
              <a href={`tel:${data.phone}`}>
                <PixelButton size="sm" variant="secondary">
                  <Phone className="mr-2 h-4 w-4" />
                  {data.phone}
                </PixelButton>
              </a>
            )}
          </div>
        </PixelHeroContent>
      </PixelHero>

      {/* Show message if no sections were extracted */}
      {!hasAnySection && (
        <section className="py-20 px-4">
          <div className="max-w-2xl mx-auto">
            <PixelCard>
              <PixelCardHeader>
                <PixelCardTitle>Unable to Extract Information</PixelCardTitle>
              </PixelCardHeader>
              <PixelCardContent className="space-y-4">
                <p>
                  The resume parser could not identify standard sections. 
                  Try uploading a resume with clear section headers like Experience, Skills, Projects, and Education.
                </p>
                <a href="/resume">
                  <PixelButton>Try Another Resume</PixelButton>
                </a>
              </PixelCardContent>
            </PixelCard>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && (
        <section id="skills-section" className="py-12 px-4 container mx-auto bg-gradient-to-b from-transparent via-black/5 dark:via-white/5 to-transparent">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider font-pixel text-center mb-8 dark:text-pixel-dark-secondary">
              <Code className="inline h-6 w-6 mr-2" />
              Skills & Technologies ({totalSkills})
            </h2>
            
            <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
              {currentSkills.map((skill, index) => (
                <PixelBadge key={indexOfFirstSkill + index} variant="warning" className="text-sm px-3 py-1">
                  {skill}
                </PixelBadge>
              ))}
            </div>

            {/* Skills Pagination */}
            {totalSkillsPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <PixelButton
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSkillsPageChange(currentSkillsPage - 1)}
                  disabled={currentSkillsPage === 1}
                >
                  Previous
                </PixelButton>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalSkillsPages }, (_, i) => i + 1).map((pageNum) => (
                    <PixelButton
                      key={pageNum}
                      variant={currentSkillsPage === pageNum ? "default" : "ghost"}
                      size="sm"
                      onClick={() => handleSkillsPageChange(pageNum)}
                    >
                      {pageNum}
                    </PixelButton>
                  ))}
                </div>

                <PixelButton
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSkillsPageChange(currentSkillsPage + 1)}
                  disabled={currentSkillsPage === totalSkillsPages}
                >
                  Next
                </PixelButton>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Experience Section */}
      {data.experience && data.experience.length > 0 && (
        <section className="py-12 px-4 bg-black/5 dark:bg-white/5">
          <div className="max-w-6xl mx-auto container">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider font-pixel text-center mb-8 dark:text-pixel-dark-secondary">
              <Briefcase className="inline h-6 w-6 mr-2" />
              Work Experience
            </h2>

            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <PixelCard key={index}>
                  <PixelCardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                      <div>
                        <PixelCardTitle className="text-xl mb-1">
                          {exp.position}
                        </PixelCardTitle>
                        <h4 className="text-lg font-bold">
                          {exp.company}
                        </h4>
                      </div>
                      <div className="text-right">
                        <PixelBadge variant="default">{exp.duration}</PixelBadge>
                        {exp.location && (
                          <div className="text-sm mt-2 flex items-center gap-1 justify-end">
                            <MapPin className="h-4 w-4" />
                            {exp.location}
                          </div>
                        )}
                      </div>
                    </div>
                  </PixelCardHeader>

                  {exp.description && exp.description.length > 0 && (
                    <PixelCardContent>
                      <ul className="list-disc list-inside space-y-2">
                        {exp.description.map((item, i) => (
                          <li key={i} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </PixelCardContent>
                  )}
                </PixelCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <section id="projects-section" className="py-12 px-4">
          <div className="max-w-6xl mx-auto container">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider font-pixel text-center mb-8 dark:text-pixel-dark-secondary">
              <FolderGit2 className="inline h-6 w-6 mr-2" />
              Featured Projects ({totalProjects})
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {currentProjects.map((project, idx) => {
                const globalIndex = indexOfFirstProject + idx;
                const isExpanded = expandedProjects.has(globalIndex);
                
                return (
                  <PixelCard key={globalIndex} className="transition-all duration-0">
                    <PixelCardHeader>
                      <div className="flex justify-between items-start">
                        <PixelCardTitle className="text-lg">
                          {project.name}
                        </PixelCardTitle>
                        <PixelButton
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleProjectExpand(globalIndex)}
                          className="ml-2"
                        >
                          {isExpanded ? '−' : '+'}
                        </PixelButton>
                      </div>
                    </PixelCardHeader>
                    
                    <PixelCardContent className="space-y-3">
                      {/* Always show technologies */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, isExpanded ? undefined : 3).map((tech, i) => (
                            <PixelBadge key={i} variant="success" className="text-xs">
                              {tech}
                            </PixelBadge>
                          ))}
                          {!isExpanded && project.technologies.length > 3 && (
                            <PixelBadge variant="default" className="text-xs">
                              +{project.technologies.length - 3}
                            </PixelBadge>
                          )}
                        </div>
                      )}

                      {/* Show description only when expanded */}
                      {isExpanded && (
                        <>
                          {project.description && (
                            <p className="leading-relaxed text-sm">
                              {project.description}
                            </p>
                          )}

                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <PixelButton variant="ghost" size="sm">
                                View Project <ExternalLink className="ml-2 h-3 w-3" />
                              </PixelButton>
                            </a>
                          )}
                        </>
                      )}
                      
                      {/* Show truncated description when collapsed */}
                      {!isExpanded && project.description && (
                        <p className="leading-relaxed text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {project.description}
                        </p>
                      )}
                    </PixelCardContent>
                  </PixelCard>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <PixelButton
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </PixelButton>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <PixelButton
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "ghost"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </PixelButton>
                  ))}
                </div>

                <PixelButton
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </PixelButton>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <section className="py-12 px-4 bg-black/5 dark:bg-white/5">
          <div className="max-w-6xl mx-auto container">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider font-pixel text-center mb-8 dark:text-pixel-dark-secondary">
              <GraduationCap className="inline h-6 w-6 mr-2" />
              Education
            </h2>

            <div className="space-y-6 max-w-4xl mx-auto">
              {data.education.map((edu, index) => (
                <PixelCard key={index}>
                  <PixelCardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                      <div>
                        <PixelCardTitle className="text-xl">
                          {edu.institution}
                        </PixelCardTitle>
                        <p className="text-lg mt-2">{edu.degree}</p>
                        {edu.field && (
                          <p className="mt-1">{edu.field}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <PixelBadge variant="default">{edu.duration}</PixelBadge>
                        {edu.gpa && (
                          <div className="text-sm mt-2">GPA: {edu.gpa}</div>
                        )}
                      </div>
                    </div>
                  </PixelCardHeader>
                  
                  {edu.location && (
                    <PixelCardContent>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {edu.location}
                      </div>
                    </PixelCardContent>
                  )}
                </PixelCard>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
