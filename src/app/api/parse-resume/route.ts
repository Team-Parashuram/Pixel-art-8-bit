export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  dates: string;
  gpa?: string;
  location?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  github?: string;
  link?: string;
  dates?: string;
}

export interface Experience {
  company: string;
  position: string;
  dates: string;
  location?: string;
  responsibilities: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  projects: Project[];
  skills: string[];
  achievements: string[];
  experience: Experience[];
}

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not set in environment variables');
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

const resumeSchema = {
  type: 'OBJECT',
  properties: {
    personalInfo: {
      type: 'OBJECT',
      properties: {
        name: { type: 'STRING' },
        email: { type: 'STRING' },
        phone: { type: 'STRING' },
        location: { type: 'STRING' },
        linkedin: { type: 'STRING' },
        github: { type: 'STRING' },
        website: { type: 'STRING' },
      },
      required: ['name'],
    },
    education: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          institution: { type: 'STRING' },
          degree: { type: 'STRING' },
          field: { type: 'STRING' },
          dates: { type: 'STRING' },
          gpa: { type: 'STRING' },
          location: { type: 'STRING' },
        },
      },
    },
    projects: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          name: { type: 'STRING' },
          description: { type: 'STRING' },
          technologies: { 
            type: 'ARRAY',
            items: { type: 'STRING' },
          },
          github: { type: 'STRING' },
          link: { type: 'STRING' },
          dates: { type: 'STRING' },
        },
      },
    },
    skills: {
      type: 'ARRAY',
      items: { type: 'STRING' },
    },
    achievements: {
      type: 'ARRAY',
      items: { type: 'STRING' },
    },
    experience: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          company: { type: 'STRING' },
          position: { type: 'STRING' },
          dates: { type: 'STRING' },
          location: { type: 'STRING' },
          responsibilities: {
            type: 'ARRAY',
            items: { type: 'STRING' },
          },
        },
      },
    },
  },
  required: ['personalInfo'],
};

export async function parseResumeAsync(resumeText: string): Promise<ResumeData> {
  try {
    console.log('[Parser] Starting AI parsing, text length:', resumeText.length);
    
    const prompt = `Extract structured information from this resume. Parse all sections carefully.
If a section is not found, return an empty array or appropriate default value.

PERSONAL INFO: name, email, phone, location, social links (linkedin, github, website)
EDUCATION: institution, degree, field of study, dates, GPA, location
PROJECTS: name, description, technologies array, github/link URLs, dates
SKILLS: technical skills, programming languages, frameworks, tools as array of strings
ACHIEVEMENTS: certifications, awards, competitions, honors as array of strings
EXPERIENCE: company, position, dates, location, responsibilities as array of strings

Resume text:
${resumeText}`;

    const requestBody = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        response_mime_type: 'application/json',
        response_schema: resumeSchema,
      },
    };

    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Parser] API error response:', errorText);
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[Parser] API response received');

    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      console.error('[Parser] Invalid response structure:', JSON.stringify(data, null, 2));
      throw new Error('Invalid response structure from Gemini API');
    }

    const text = data.candidates[0].content.parts[0].text;
    console.log('[Parser] Response text length:', text.length);

    const parsedData = JSON.parse(text);
    
    console.log('[Parser] Successfully parsed resume');
    console.log('[Parser] Found:', {
      projects: parsedData.projects?.length || 0,
      skills: parsedData.skills?.length || 0,
      education: parsedData.education?.length || 0,
      experience: parsedData.experience?.length || 0,
    });
    
    return parsedData as ResumeData;
  } catch (error) {
    console.error('[Parser] Error details:', error);
    if (error instanceof Error) {
      console.error('[Parser] Error message:', error.message);
      console.error('[Parser] Error stack:', error.stack);
    }
    throw new Error(`Failed to parse resume: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}