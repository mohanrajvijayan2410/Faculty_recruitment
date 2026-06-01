import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { MCQQuestion, PsychometricQuestion, Subject } from '@/data/questions';

const dataUrl = (fileName: string) => `${import.meta.env.BASE_URL}data/${fileName}`;

const TECHNICAL_QUESTIONS_URL = dataUrl('technical_questions.xlsx');
const PSYCHOMETRIC_QUESTIONS_URL = dataUrl('psychometric_questions.csv');

const departmentSheetMap: Record<string, string> = {
  'computer science': 'cse',
  'information technology': 'it',
  'electronics & communication': 'ece',
  'electronics and communication': 'ece',
  'electrical & electronics engineering': 'eee',
  'electrical and electronics engineering': 'eee',
  'electrical and electronics': 'eee',
  'mechanical engineering': 'mech',
  'civil engineering': 'civil',
  chemistry: 'chemistry',
  mathematics: 'maths',
  physics: 'physics',
  'artificial intelligence & data science': 'aids',
  'artificial intelligence and data science': 'aids',
  'artificial intelligence & ml': 'aids',
  'artificial intelligence and ml': 'aids',
};

const subjectIconPool = ['CS', 'DS', 'DB', 'NW', 'OS', 'AI', 'SE', 'WB', 'IT', 'QA'];

type RawTechnicalRow = {
  subject?: string;
  question?: string;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  correct_option?: number | string;
};

type RawPsychometricRow = {
  department?: string;
  subject?: string;
  category?: string;
  question?: string;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  answer_index?: number | string;
  correct_option?: number | string;
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const slugify = (value: string) =>
  normalize(value).replace(/\s+/g, '-') || 'general';

const toZeroBasedIndex = (value: number | string | undefined) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 0;
  return Math.max(0, Math.min(3, parsed - 1));
};

const departmentToSheetName = (department: string, sheetNames: string[]) => {
  const normalizedDepartment = normalize(department);
  const mapped = departmentSheetMap[normalizedDepartment];
  if (mapped && sheetNames.some(sheet => normalize(sheet) === normalize(mapped))) return mapped;

  const directMatch = sheetNames.find(sheet => normalize(sheet) === normalizedDepartment);
  if (directMatch) return directMatch;

  const compactDepartment = normalizedDepartment.replace(/\s/g, '');
  return sheetNames.find(sheet => compactDepartment.includes(normalize(sheet).replace(/\s/g, ''))) || sheetNames[0];
};

export async function loadTechnicalSubjects(department: string): Promise<Subject[]> {
  const response = await fetch(`${TECHNICAL_QUESTIONS_URL}?v=${Date.now()}`, { cache: 'no-store' });
  if (!response.ok) throw new Error('Unable to load technical questions');

  const workbook = XLSX.read(await response.arrayBuffer(), { type: 'array' });
  const sheetName = departmentToSheetName(department, workbook.SheetNames);
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) return [];

  const rows = XLSX.utils.sheet_to_json<RawTechnicalRow>(sheet, { defval: '' });
  const grouped = new Map<string, MCQQuestion[]>();

  rows.forEach(row => {
    const subject = String(row.subject || '').trim();
    const question = String(row.question || '').trim();
    if (!subject || !question) return;

    const questions = grouped.get(subject) || [];
    questions.push({
      id: questions.length + 1,
      question,
      options: [row.option1, row.option2, row.option3, row.option4].map(option => String(option || '').trim()),
      correct: toZeroBasedIndex(row.correct_option),
    });
    grouped.set(subject, questions);
  });

  return Array.from(grouped.entries()).map(([name, questions], index) => ({
    id: slugify(name),
    name,
    icon: subjectIconPool[index % subjectIconPool.length],
    questions,
  }));
}

export async function loadPsychometricQuestions(department: string, selectedSubjectIds: string[]): Promise<PsychometricQuestion[]> {
  const response = await fetch(`${PSYCHOMETRIC_QUESTIONS_URL}?v=${Date.now()}`, { cache: 'no-store' });
  if (!response.ok) throw new Error('Unable to load psychometric questions');

  const csv = await response.text();
  const parsed = Papa.parse<RawPsychometricRow>(csv, {
    header: true,
    skipEmptyLines: true,
    transformHeader: header => normalize(header).replace(/\s+/g, '_'),
  });

  const normalizedDepartment = normalize(department);
  const selectedSubjectSlugs = new Set(selectedSubjectIds.map(slugify));
  const hasDepartmentColumn = parsed.data.some(row => String(row.department || '').trim());
  const hasSubjectColumn = parsed.data.some(row => String(row.subject || '').trim());

  return parsed.data
    .filter(row => {
      const rowDepartment = normalize(String(row.department || ''));
      const rowSubject = slugify(String(row.subject || ''));
      const departmentMatches = !hasDepartmentColumn || rowDepartment === normalizedDepartment;
      const subjectMatches = !hasSubjectColumn || selectedSubjectSlugs.size === 0 || selectedSubjectSlugs.has(rowSubject);
      return departmentMatches && subjectMatches;
    })
    .map((row, index) => ({
      id: index + 1,
      question: String(row.question || '').trim(),
      category: String(row.category || row.subject || 'Psychometric').trim(),
      options: [row.option1, row.option2, row.option3, row.option4].map(option => String(option || '').trim()),
      correct: toZeroBasedIndex(row.answer_index || row.correct_option),
    }))
    .filter(question => question.question && question.options.every(Boolean));
}
