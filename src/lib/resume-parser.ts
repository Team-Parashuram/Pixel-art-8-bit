// lib/resume-parser.ts

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";

export interface ResumeData {
  id: string;
  name: string;
  title?: string;
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

// Main async parser - uses AI for projects only
export async function parseResumeAsync(text: string): Promise<Omit<ResumeData, 'id'>> {
  const cleanedText = text.replace(/\n{3,}/g, '\n\n').trim();
  const lines = cleanedText.split('\n').map(line => line.trim()).filter(line => line);
  
  // Extract contact info
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\d{10}/);
  const linkedinMatch = text.match(/(?:linkedin\.com\/in\/|linkedin:)\s*([\w-]+)/i);
  const githubMatch = text.match(/(?:github\.com\/|github:)\s*([\w-]+)/i);
  const portfolioMatch = text.match(/(https?:\/\/(?:www\.)?(?!linkedin|github)[\w-]+\.[\w]+(?:\/[\w.-]*)*)/);
  
  let name = '';
  let title = '';
  
  const sectionHeaders = [
    'education', 'experience', 'projects', 'skills', 'technical skills',
    'work experience', 'summary', 'objective', 'certifications', 'awards'
  ];
  
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i];
    const lowerLine = line.toLowerCase();
    
    if (sectionHeaders.some(header => lowerLine === header || lowerLine.startsWith(header + ':'))) {
      continue;
    }
    
    if (line.includes('@') || 
        (phoneMatch && line.includes(phoneMatch[0])) ||
        /linkedin|github|leetcode/.test(lowerLine)) {
      
      if (!name && line.length > 10) {
        const parts = line.split(/[|\/]|(?=\d{10})|(?=\+?\d)/);
        const potentialName = parts[0]?.trim();
        if (potentialName && 
            potentialName.length > 3 && 
            potentialName.length < 50 &&
            !potentialName.includes('@') &&
            !/^\d/.test(potentialName)) {
          name = potentialName;
        }
      }
      
      if (!title && /engineer|developer|designer|manager|analyst|scientist|architect/i.test(line)) {
        const titleMatch = line.match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s*\([A-Z]+\)|[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/);
        if (titleMatch && /engineer|developer|designer/i.test(titleMatch[0])) {
          title = titleMatch[0].split(/www\.|http|linkedin|github/i)[0].trim();
        }
      }
      continue;
    }
    
    if (line.length < 3 || line.length > 100) continue;
    if (/^\d{4}/.test(line) || /\d{4}\s*[-–—]\s*\d{4}/.test(line)) continue;
    
    if (!name) {
      name = line;
    } else if (!title && i <= 3) {
      if (!line.includes('|') && !line.includes('–') && !line.includes('—')) {
        title = line;
        break;
      }
    }
  }
  
  const summary = extractSummary(text);
  const skills = extractSkills(text);
  const experience = extractExperience(text);
  const education = extractEducation(text);
  
  // Use AI for projects only
  let projects: Project[] = [];
  const projectsSection = extractSection(text, ['projects', 'personal projects']);
  
  if (projectsSection) {
    try {
      console.log('[Parser] Attempting AI parsing for projects...');
      projects = await parseProjectsWithAI(projectsSection);
      console.log('[Parser] AI successfully parsed', projects.length, 'projects');
    } catch (error) {
      console.log('[Parser] AI parsing failed, using manual fallback:', error);
      projects = extractProjectsManual(projectsSection);
    }
  }
  
  return {
    name: name || 'Professional',
    title: title || undefined,
    email: emailMatch?.[0] || '',
    phone: phoneMatch?.[0] || '',
    linkedin: linkedinMatch ? `https://linkedin.com/in/${linkedinMatch[1]}` : undefined,
    github: githubMatch ? `https://github.com/${githubMatch[1]}` : undefined,
    portfolio: portfolioMatch?.[0],
    summary,
    skills,
    experience,
    projects,
    education,
  };
}

// AI-powered project parser with structured output
async function parseProjectsWithAI(projectsSection: string): Promise<Project[]> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const responseSchema = {
    type: "object",
    properties: {
      projects: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { 
              type: "string", 
              description: "Project name extracted from title line (before pipe separator)" 
            },
            description: { 
              type: "string", 
              description: "Concise summary combining all bullet points, 2-3 sentences maximum" 
            },
            technologies: { 
              type: "array", 
              items: { type: "string" },
              description: "List of technologies extracted after pipe separator, comma-separated"
            },
            link: { 
              type: "string",
              description: "Link keyword if present: Live, GitHub, Demo, Code, Video, or Documentation. Leave empty if not present."
            }
          },
          required: ["name", "description", "technologies", "link"]
        }
      }
    },
    required: ["projects"]
  };

  const prompt = `Extract project information from this resume section.

Format:
- Project names appear before the pipe symbol (|)
- Technologies are comma-separated after the pipe
- Link keywords (Live, GitHub, Demo, etc.) appear at the end
- Bullet points describe the project details

Combine all bullet points into a single coherent 2-3 sentence description focusing on what the project does and key achievements.

Resume section:
${projectsSection}`;

  for (let attempt = 0; attempt <= 2; attempt++) {
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 2000,
            responseMimeType: "application/json",
            responseSchema: responseSchema
          }
        })
      });

      if (!response.ok) {
        if (response.status === 429 && attempt < 2) {
          const waitTime = Math.pow(2, attempt) * 1000 + Math.random() * 500;
          console.log(`[Parser] Rate limited, retrying in ${waitTime}ms...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }
        const errorText = await response.text();
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!aiResponse) {
        throw new Error('No response from Gemini AI');
      }

      const result = JSON.parse(aiResponse);
      
      if (!result.projects || !Array.isArray(result.projects)) {
        throw new Error('Invalid projects array in response');
      }
      
      return result.projects.map((p: any) => ({
        name: p.name || 'Untitled Project',
        description: p.description || '',
        technologies: Array.isArray(p.technologies) ? p.technologies : [],
        link: p.link && p.link.trim() ? p.link : undefined
      }));
      
    } catch (error) {
      if (attempt === 2) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
  
  throw new Error('All retry attempts failed');
}

// Manual fallback parser (existing logic)
function extractProjectsManual(projectsSection: string): Project[] {
  const projects: Project[] = [];
  const lines = projectsSection.split('\n').map(l => l.trim()).filter(l => l);
  
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i];
    
    if (line.length < 3 || line === '•' || line === '-') {
      i++;
      continue;
    }
    
    const hasPipe = line.includes('|');
    const notBullet = !line.startsWith('•') && !line.startsWith('-');
    
    if (hasPipe && notBullet) {
      const parts = line.split('|');
      const projectName = parts[0].trim();
      
      let technologies: string[] = [];
      let projectLink = '';
      
      if (parts.length > 1) {
        const techPart = parts[1];
        const linkMatch = techPart.match(/(Live|GitHub|Demo|Link|Code|Video|Documentation)$/i);
        if (linkMatch) {
          projectLink = linkMatch[0];
        }
        
        let techString = techPart;
        if (linkMatch) {
          techString = techPart.substring(0, techPart.lastIndexOf(linkMatch[0]));
        }
        
        technologies = techString
          .split(',')
          .map(t => t.trim())
          .filter(t => t.length > 0 && t.length < 35);
      }
      
      const descriptionParts: string[] = [];
      i++;
      
      while (i < lines.length) {
        const descLine = lines[i];
        const isNextProject = descLine.includes('|') && !descLine.startsWith('•');
        if (isNextProject) break;
        
        if (descLine === '•' || descLine === '-') {
          i++;
          if (i < lines.length && lines[i] !== '•') {
            descriptionParts.push(lines[i]);
          }
        } else if (descLine.startsWith('•')) {
          const content = descLine.substring(1).trim();
          if (content) descriptionParts.push(content);
        } else if (descriptionParts.length > 0 && descLine.length > 20 && !descLine.includes('|')) {
          descriptionParts[descriptionParts.length - 1] += ' ' + descLine;
        } else {
          break;
        }
        
        i++;
      }
      
      projects.push({
        name: projectName,
        description: descriptionParts.join(' '),
        technologies,
        link: projectLink || undefined
      });
      
      continue;
    }
    
    i++;
  }
  
  return projects.slice(0, 15);
}

// Keep all other extraction functions unchanged
function extractSkills(text: string): string[] {
  const skillsSection = extractSection(text, ['technical skills', 'skills']);
  const skills: string[] = [];
  
  if (skillsSection) {
    const lines = skillsSection.split('\n').filter(line => 
      !line.match(/^(languages|frontend|backend|devops|soft skills|ai|machine learning)[\s:]/i)
    );
    
    const cleanedSection = lines.join(' ');
    const categoryMatches = skillsSection.match(/:\s*([^\\]+?)(?=\n|$)/g);
    
    if (categoryMatches) {
      categoryMatches.forEach(match => {
        const content = match.replace(/^:\s*/, '');
        const extracted = content
          .split(/[,;]/)
          .map(s => s.trim())
          .filter(s => s.length > 1 && s.length < 40 && !s.includes('&'));
        skills.push(...extracted);
      });
    }
    
    const commonSkills = [
      'Go', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'Rust', 'PHP', 'Swift', 'Kotlin',
      'React', 'Vue', 'Angular', 'Next.js', 'Svelte', 'Node.js', 'Express', 'Django', 'Flask', 'FastAPI',
      'HTML', 'CSS', 'Tailwind', 'Bootstrap', 'Material-UI', 'Chakra UI', 'ShadCN',
      'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'Supabase', 'SQL',
      'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Git', 'GitHub', 'GitLab', 'Vercel',
      'REST API', 'GraphQL', 'JWT', 'Swagger', 'Microservices', 'CI/CD', 'GitHub Actions',
      'TensorFlow', 'PyTorch', 'Machine Learning', 'AI', 'Pandas', 'NumPy',
      'Fiber', 'Colly', 'Drogon', 'Bubble Tea', 'OpenAI', 'OpenRouter', 'Hugging Face'
    ];
    
    const lowerText = cleanedSection.toLowerCase();
    for (const skill of commonSkills) {
      if (lowerText.includes(skill.toLowerCase()) && !skills.some(s => s.toLowerCase() === skill.toLowerCase())) {
        skills.push(skill);
      }
    }
  }
  
  const uniqueSkills = Array.from(new Map(
    skills.map(s => [s.toLowerCase(), s])
  ).values()).filter(s => s.length > 0);
  
  return uniqueSkills.slice(0, 50);
}

function extractSummary(text: string): string | undefined {
  const summarySection = extractSection(text, ['summary', 'objective', 'about', 'profile']);
  if (!summarySection) return undefined;
  
  const lines = summarySection.split('\n').map(l => l.trim()).filter(l => l);
  const summary = lines.join(' ').trim();
  
  if (summary.length > 20 && summary.length < 500) {
    return summary;
  }
  
  return undefined;
}

function extractExperience(text: string): Experience[] {
  const experienceSection = extractSection(text, ['experience', 'work experience']);
  if (!experienceSection) return [];
  
  const experiences: Experience[] = [];
  const lines = experienceSection.split('\n').map(l => l.trim()).filter(l => l);
  
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i];
    
    if (line.length < 3 || line === '•' || line === '-') {
      i++;
      continue;
    }
    
    const endsWithLocation = /Remote$|India$|USA$|UK$|Karnataka$|,\s*[A-Z]{2}$/i.test(line);
    const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
    const nextIsPosition = /^(Software Engineer|API Engineer|Developer|Intern|Manager|Analyst|Fellow|Lead)/i.test(nextLine);
    
    if ((endsWithLocation || nextIsPosition) && !line.startsWith('•')) {
      let company = line;
      let location = '';
      
      if (line.includes('Remote')) {
        location = 'Remote';
        company = line.replace(/\s*[-–—]\s*.*Remote.*$/, '').trim();
      } else {
        const parts = line.split(/\s*[-–—]\s*/);
        if (parts.length > 1) {
          company = parts[0].trim();
          location = parts[parts.length - 1].trim();
        }
      }
      
      i++;
      if (i >= lines.length) break;
      
      const positionLine = lines[i];
      const durationMatch = positionLine.match(/([A-Z][a-z]{2,9}\s+\d{4})\s*[-–—]\s*([A-Z][a-z]{2,9}\s+\d{4}|Present|Current)/i);
      const duration = durationMatch ? durationMatch[0] : '';
      
      let position = positionLine;
      if (durationMatch) {
        position = positionLine.substring(0, positionLine.indexOf(durationMatch[0])).trim();
      }
      position = position.replace(/[-–—]+$/, '').trim();
      
      const description: string[] = [];
      i++;
      
      while (i < lines.length) {
        const descLine = lines[i];
        const isNextCompany = /Remote$|India$|USA$/i.test(descLine) && 
                              i + 1 < lines.length &&
                              /^(Software Engineer|API Engineer|Developer)/i.test(lines[i + 1]);
        
        if (isNextCompany) break;
        
        if (descLine === '•' || descLine === '-') {
          i++;
          if (i < lines.length && lines[i] !== '•') {
            description.push(lines[i]);
          }
        } else if (descLine.startsWith('•')) {
          const content = descLine.substring(1).trim();
          if (content) description.push(content);
        } else if (description.length > 0 && descLine.length > 20) {
          description[description.length - 1] += ' ' + descLine;
        } else {
          break;
        }
        
        i++;
      }
      
      experiences.push({
        company,
        position,
        duration,
        location: location || undefined,
        description
      });
      
      continue;
    }
    
    i++;
  }
  
  return experiences.slice(0, 10);
}

function extractEducation(text: string): Education[] {
  const educationSection = extractSection(text, ['education', 'academic background']);
  if (!educationSection) return [];
  
  const education: Education[] = [];
  const lines = educationSection.split('\n').map(l => l.trim()).filter(l => l && l.length > 3);
  
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i];
    const hasLocation = /,\s*[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?,\s*[A-Z][a-z]+$/i.test(line);
    const isLongEnough = line.length > 20;
    const notDegree = !/^B\.Tech|^M\.Tech|^Bachelor|^Master/i.test(line);
    
    if (hasLocation && isLongEnough && notDegree) {
      const locationMatch = line.match(/,\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?,\s*[A-Z][a-z]+)$/i);
      const location = locationMatch ? locationMatch[1] : '';
      const institution = line.replace(locationMatch?.[0] || '', '').trim();
      
      i++;
      if (i >= lines.length) break;
      
      const degreeLine = lines[i];
      let degree = degreeLine;
      let gpa = '';
      let duration = '';
      
      const gpaMatch = degreeLine.match(/(\d+\.\d+)\s*CGPA/i);
      if (gpaMatch) {
        gpa = gpaMatch[1];
      }
      
      const durationMatch = degreeLine.match(/([A-Z][a-z]{2,9}\s+\d{4})\s*[-–—]\s*([A-Z][a-z]{2,9}\s+\d{4})/i);
      if (durationMatch) {
        duration = durationMatch[0];
      }
      
      if (degreeLine.includes('|')) {
        const parts = degreeLine.split('|');
        degree = parts[0].trim();
      } else {
        degree = degreeLine.split(/\d+\.\d+/)[0].trim();
      }
      
      education.push({
        institution,
        degree,
        field: '',
        duration,
        location,
        gpa
      });
      
      i++;
      continue;
    }
    
    i++;
  }
  
  return education.slice(0, 5);
}

function extractSection(text: string, headers: string[]): string | null {
  const lines = text.split('\n');
  let sectionStart = -1;
  let sectionEnd = lines.length;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim().toLowerCase();
    for (const header of headers) {
      if (line === header || line === header + ':') {
        sectionStart = i + 1;
        break;
      }
    }
    if (sectionStart !== -1) break;
  }
  
  if (sectionStart === -1) return null;
  
  const allHeaders = [
    'experience', 'work experience',
    'education', 'academic background',
    'skills', 'technical skills',
    'projects', 'personal projects',
    'certifications', 'achievements', 'awards'
  ];
  
  for (let i = sectionStart; i < lines.length; i++) {
    const line = lines[i].trim().toLowerCase();
    for (const header of allHeaders) {
      if (line === header || line === header + ':') {
        sectionEnd = i;
        break;
      }
    }
    if (sectionEnd !== lines.length) break;
  }
  
  const section = lines.slice(sectionStart, sectionEnd).join('\n');
  return section.length > 0 ? section : null;
}
