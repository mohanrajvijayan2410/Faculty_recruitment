import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ResumeAnalysis } from '@/lib/resumeAnalyzer';

export interface CandidateData {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  resumeFile?: File;
  resumeAnalysis?: ResumeAnalysis;
  resumeScore: number;
  technicalScore: number;
  technicalSubjects: string[];
  technicalAnswers: Record<string, number[]>;
  psychometricScore: number;
  psychometricAnswers: number[];
  finalScore: number;
  recommended: boolean;
  completedSteps: number;
  timestamp: string;
}

interface RecruitmentContextType {
  currentCandidate: CandidateData | null;
  candidates: CandidateData[];
  setCurrentCandidate: (c: CandidateData | null) => void;
  updateCandidate: (updates: Partial<CandidateData>) => void;
  addCandidate: (c: CandidateData) => void;
  clearHistory: () => void;
}

const STORAGE_KEY = 'candidate_history';
const LEGACY_KEYS = ['recruitment_candidates'];

const RecruitmentContext = createContext<RecruitmentContextType | undefined>(undefined);

export function RecruitmentProvider({ children }: { children: ReactNode }) {
  const [currentCandidate, setCurrentCandidate] = useState<CandidateData | null>(null);
  const [candidates, setCandidates] = useState<CandidateData[]>(() => {
    if (typeof window === 'undefined') return [];

    LEGACY_KEYS.forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
  });

  const updateCandidate = (updates: Partial<CandidateData>) => {
    if (!currentCandidate) return;
    const updated = { ...currentCandidate, ...updates };
    setCurrentCandidate(updated);
  };

  const addCandidate = (c: CandidateData) => {
    const candidateToSave = {
      ...c,
      timestamp: c.timestamp || new Date().toISOString(),
    };
    const updated = [...candidates.filter(x => x.id !== candidateToSave.id), candidateToSave];
    setCandidates(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const clearHistory = () => {
    setCandidates([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <RecruitmentContext.Provider value={{ currentCandidate, candidates, setCurrentCandidate, updateCandidate, addCandidate, clearHistory }}>
      {children}
    </RecruitmentContext.Provider>
  );
}

export function useRecruitment() {
  const ctx = useContext(RecruitmentContext);
  if (!ctx) throw new Error('useRecruitment must be used within RecruitmentProvider');
  return ctx;
}
