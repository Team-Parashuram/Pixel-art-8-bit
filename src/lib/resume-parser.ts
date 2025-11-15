export interface ResumeData {
  id: string;
  name: string;
  email: string;
  phone: string;
  location?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  summary?: string;
  skills: string[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  location?: string;
  description: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  duration: string;
  location?: string;
  gpa?: string;
}

export function parseResume(text: string): Omit<ResumeData, 'id'> {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  
  // Extract basic contact info
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
  const githubMatch = text.match(/github\.com\/[\w-]+/i);
  
  // Extract name (usually first non-empty line)
  const name = lines[0] || 'Professional';
  
  // Extract skills
  const skills = extractSkills(text);
  
  // Extract experience
  const experience = extractExperience(text);
  
  // Extract projects
  const projects = extractProjects(text);
  
  // Extract education
  const education = extractEducation(text);
  
  return {
    name,
    email: emailMatch?.[0] || '',
    phone: phoneMatch?.[0] || '',
    linkedin: linkedinMatch?.[0] ? `https://${linkedinMatch[0]}` : undefined,
    github: githubMatch?.[0] ? `https://${githubMatch[0]}` : undefined,
    skills,
    experience,
    projects,
    education,
  };
}

function extractSkills(text: string): string[] {
  const skillsSection = extractSection(text, ['skills', 'technical skills', 'technologies']);
  if (!skillsSection) return [];
  
  // Common tech skills to look for
  const commonSkills = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'Go', 'Rust', 'PHP',
    'React', 'Vue', 'Angular', 'Next.js', 'Node.js', 'Express', 'Django', 'Flask', 'Spring',
    'HTML', 'CSS', 'Tailwind', 'Bootstrap', 'SASS', 'SCSS',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'Supabase',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Git', 'GitHub', 'GitLab',
    'REST', 'GraphQL', 'API', 'Microservices', 'CI/CD',
    'TensorFlow', 'PyTorch', 'Machine Learning', 'AI', 'Data Science',
  ];
  
  const skills: string[] = [];
  const lowerText = skillsSection.toLowerCase();
  
  for (const skill of commonSkills) {
    if (lowerText.includes(skill.toLowerCase())) {
      skills.push(skill);
    }
  }
  
  // Also split by common separators
  const separated = skillsSection.split(/[,;|•\n]/).map(s => s.trim()).filter(s => s && s.length > 1 && s.length < 30);
  skills.push(...separated);
  
  // Remove duplicates (case-insensitive)
  return [...new Set(skills)].slice(0, 20);
}

function extractExperience(text: string): Experience[] {
  const experienceSection = extractSection(text, ['experience', 'work experience', 'employment']);
  if (!experienceSection) return [];
  
  const experiences: Experience[] = [];
  const lines = experienceSection.split('\n').filter(line => line.trim());
  
  let currentExp: Partial<Experience> | null = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check if this line looks like a position/company (usually has dates)
    const datePattern = /\d{4}|present|current|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/i;
    
    if (datePattern.test(line) && line.length < 100) {
      // Save previous experience
      if (currentExp?.company && currentExp?.position) {
        experiences.push(currentExp as Experience);
      }
      
      // Start new experience
      const parts = line.split(/[-–—|]/);
      currentExp = {
        company: parts[0]?.trim() || 'Company',
        position: parts[1]?.trim() || parts[0]?.trim() || 'Position',
        duration: extractDuration(line) || 'Present',
        description: []
      };
    } else if (currentExp && (line.startsWith('•') || line.startsWith('-') || line.startsWith('*'))) {
      if (!currentExp.description) currentExp.description = [];
      currentExp.description.push(line.replace(/^[•\-*]\s*/, ''));
    }
  }
  
  // Add last experience
  if (currentExp?.company && currentExp?.position) {
    experiences.push(currentExp as Experience);
  }
  
  return experiences.slice(0, 5);
}

function extractProjects(text: string): Project[] {
  const projectsSection = extractSection(text, ['projects', 'personal projects', 'portfolio']);
  if (!projectsSection) return [];
  
  const projects: Project[] = [];
  const lines = projectsSection.split('\n').filter(line => line.trim());
  
  let currentProject: Partial<Project> | null = null;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Project name is usually bold or at the start of a line
    if (trimmed && !trimmed.startsWith('•') && !trimmed.startsWith('-') && trimmed.length < 100) {
      // Save previous project
      if (currentProject?.name) {
        projects.push({
          name: currentProject.name,
          description: currentProject.description || '',
          technologies: currentProject.technologies || []
        });
      }
      
      // Start new project
      currentProject = {
        name: trimmed.split(/[-–—|]/)[0].trim(),
        description: '',
        technologies: []
      };
    } else if (currentProject && (trimmed.startsWith('•') || trimmed.startsWith('-'))) {
      const desc = trimmed.replace(/^[•\-*]\s*/, '');
      currentProject.description = currentProject.description 
        ? currentProject.description + ' ' + desc 
        : desc;
      
      // Extract technologies from description
      const techMatch = desc.match(/(?:technologies|tech stack|built with|using)[:\s]+(.*)/i);
      if (techMatch) {
        currentProject.technologies = techMatch[1].split(/[,;|]/).map(t => t.trim()).filter(t => t);
      }
    }
  }
  
  // Add last project
  if (currentProject?.name) {
    projects.push({
      name: currentProject.name,
      description: currentProject.description || '',
      technologies: currentProject.technologies || []
    });
  }
  
  return projects.slice(0, 6);
}

function extractEducation(text: string): Education[] {
  const educationSection = extractSection(text, ['education', 'academic', 'qualification']);
  if (!educationSection) return [];
  
  const education: Education[] = [];
  const lines = educationSection.split('\n').filter(line => line.trim());
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Look for degree patterns
    if (line.match(/bachelor|master|phd|b\.?s\.?|m\.?s\.?|b\.?tech|m\.?tech|diploma/i)) {
      const duration = extractDuration(line) || 'Graduated';
      const gpaMatch = line.match(/gpa[:\s]+(\d+\.?\d*)/i);
      
      education.push({
        institution: lines[i - 1]?.trim() || line.split(/[-–—|]/)[0].trim(),
        degree: line,
        duration,
        gpa: gpaMatch?.[1]
      });
    }
  }
  
  return education.slice(0, 3);
}

function extractSection(text: string, headers: string[]): string | null {
  const lines = text.split('\n');
  let sectionStart = -1;
  let sectionEnd = lines.length;
  
  // Find section start
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase().trim();
    if (headers.some(header => line.includes(header))) {
      sectionStart = i + 1;
      break;
    }
  }
  
  if (sectionStart === -1) return null;
  
  // Find section end (next major section)
  const commonHeaders = ['experience', 'education', 'skills', 'projects', 'certifications', 'awards'];
  for (let i = sectionStart; i < lines.length; i++) {
    const line = lines[i].toLowerCase().trim();
    if (commonHeaders.some(header => line === header || line.startsWith(header + ':'))) {
      sectionEnd = i;
      break;
    }
  }
  
  return lines.slice(sectionStart, sectionEnd).join('\n');
}

function extractDuration(text: string): string | null {
  const match = text.match(/(\w+\s+\d{4})\s*[-–—]\s*(\w+\s+\d{4}|present|current)/i);
  if (match) {
    return `${match[1]} - ${match[2]}`;
  }
  
  const yearMatch = text.match(/\d{4}\s*[-–—]\s*(\d{4}|present|current)/i);
  if (yearMatch) {
    return yearMatch[0];
  }
  
  return null;
}
