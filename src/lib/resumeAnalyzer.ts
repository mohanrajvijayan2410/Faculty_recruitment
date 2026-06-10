import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.js?url';

GlobalWorkerOptions.workerSrc = pdfjsWorker;

export async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;
  let text = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item: any) => item.str).join(' ') + '\n';
  }

  return text;
}

export interface ResumeAnalysis {
  extractedText: string;
  detectedSkills: string[];
  missingSkills: string[];
  score: number;
  categories: { name: string; found: string[]; missing: string[] }[];
}

const skillCategories: Record<string, string[]> = {
  "Programming Languages": ["python", "java", "c++", "c#", "javascript", "typescript", "r", "matlab", "go", "rust", "php", "ruby", "swift", "kotlin"],
  "Web Technologies": ["html", "css", "react", "angular", "vue", "node.js", "django", "flask", "spring", "bootstrap", "tailwind"],
  "Data Science & AI": ["machine learning", "deep learning", "neural networks", "nlp", "computer vision", "tensorflow", "pytorch", "keras", "scikit-learn", "data mining"],
  "Database": ["sql", "mysql", "postgresql", "mongodb", "oracle", "redis", "firebase", "database design", "normalization"],
  "Research": ["research", "publication", "journal", "conference", "thesis", "dissertation", "peer review", "methodology"],
  "Teaching": ["teaching", "curriculum", "pedagogy", "lecture", "syllabus", "mentoring", "supervision", "academic", "faculty", "professor", "instructor"],
  "Tools & Platforms": ["git", "docker", "kubernetes", "aws", "azure", "gcp", "linux", "jira", "agile", "scrum"],
};

export function analyzeResume(text: string, requiredSkills: string[]): ResumeAnalysis {
  const lowerText = text.toLowerCase();
  const allDetected: string[] = [];
  const categories: { name: string; found: string[]; missing: string[] }[] = [];

  for (const [category, skills] of Object.entries(skillCategories)) {
    const found = skills.filter(s => lowerText.includes(s));
    const missing = skills.filter(s => !lowerText.includes(s));
    if (found.length > 0 || category === "Teaching" || category === "Research") {
      categories.push({ name: category, found, missing: missing.slice(0, 3) });
    }
    allDetected.push(...found);
  }

  const reqFound = requiredSkills.filter(s => lowerText.includes(s.toLowerCase()));
  const reqMissing = requiredSkills.filter(s => !lowerText.includes(s.toLowerCase()));

  // Score: 40% skill match, 30% required skills, 20% teaching/research, 10% completeness
  const skillMatchRatio = allDetected.length / 15; // expect ~15 skills
  const reqRatio = reqFound.length / Math.max(requiredSkills.length, 1);
  const hasTeaching = lowerText.includes("teaching") || lowerText.includes("professor") || lowerText.includes("faculty") ? 1 : 0;
  const hasResearch = lowerText.includes("research") || lowerText.includes("publication") ? 1 : 0;
  const completeness = Math.min(text.length / 2000, 1);

  const score = Math.round(
    Math.min(skillMatchRatio, 1) * 40 +
    reqRatio * 30 +
    ((hasTeaching + hasResearch) / 2) * 20 +
    completeness * 10
  );

  return {
    extractedText: text,
    detectedSkills: [...new Set(allDetected)],
    missingSkills: reqMissing,
    score: Math.min(score, 100),
    categories,
  };
}
