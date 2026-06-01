import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, CheckSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useRecruitment } from '@/context/RecruitmentContext';
import { Subject } from '@/data/questions';
import { loadTechnicalSubjects } from '@/lib/questionLoader';
import { toast } from 'sonner';

type Phase = 'select' | 'test' | 'done';

export default function TechnicalTestPage() {
  const navigate = useNavigate();
  const { currentCandidate, updateCandidate } = useRecruitment();
  const [phase, setPhase] = useState<Phase>('select');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [questionError, setQuestionError] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [currentSubjectIdx, setCurrentSubjectIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const activeSubjects = selectedSubjects
    .map(id => subjects.find(s => s.id === id))
    .filter(Boolean) as Subject[];
  const currentSubject = activeSubjects[currentSubjectIdx];
  const currentQuestion = currentSubject?.questions[currentQuestionIdx];
  const minSubjectsRequired = Math.min(5, subjects.length);
  const currentQuestionCount = currentSubject?.questions.length || 0;
  const completedQuestionCount =
    activeSubjects.slice(0, currentSubjectIdx).reduce((sum, subject) => sum + subject.questions.length, 0) +
    currentQuestionIdx +
    1;
  const totalQuestionCount = activeSubjects.reduce((sum, subject) => sum + subject.questions.length, 0) || 1;

  const finishTest = useCallback(() => {
    let total = 0;
    let correct = 0;

    for (const subId of selectedSubjects) {
      const sub = subjects.find(s => s.id === subId);
      if (!sub) continue;

      const subAnswers = answers[subId] || [];
      sub.questions.forEach((question, qi) => {
        total++;
        if (subAnswers[qi] === question.correct) correct++;
      });
    }

    const score = total ? Math.round((correct / total) * 100) : 0;
    updateCandidate({ technicalScore: score, technicalSubjects: selectedSubjects, technicalAnswers: answers, completedSteps: 3 });
    setPhase('done');
    toast.success(`Technical test completed! Score: ${score}/100`);
  }, [answers, selectedSubjects, subjects, updateCandidate]);

  const moveToNextSubject = useCallback(() => {
    if (currentSubjectIdx < activeSubjects.length - 1) {
      setCurrentSubjectIdx(i => i + 1);
      setCurrentQuestionIdx(0);
      setSelectedOption(null);
      setTimeLeft(600);
    } else {
      finishTest();
    }
  }, [activeSubjects.length, currentSubjectIdx, finishTest]);

  const handleTimeUp = useCallback(() => {
    toast.warning('Time is up for this subject!');
    moveToNextSubject();
  }, [moveToNextSubject]);

  useEffect(() => {
    if (phase !== 'test') return;
    if (timeLeft <= 0) {
      handleTimeUp();
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [phase, timeLeft, handleTimeUp]);

  useEffect(() => {
    if (!currentCandidate?.department) return;

    let active = true;
    setLoadingQuestions(true);
    setQuestionError('');

    loadTechnicalSubjects(currentCandidate.department)
      .then(loadedSubjects => {
        if (!active) return;
        setSubjects(loadedSubjects);
        setSelectedSubjects([]);
        setCurrentSubjectIdx(0);
        setCurrentQuestionIdx(0);
      })
      .catch(() => {
        if (!active) return;
        setQuestionError('Unable to load technical questions. Please check public/data/technical_questions.xlsx.');
      })
      .finally(() => {
        if (active) setLoadingQuestions(false);
      });

    return () => {
      active = false;
    };
  }, [currentCandidate?.department]);

  if (!currentCandidate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Please complete your application first</h2>
          <Button onClick={() => navigate('/apply')} className="bg-primary text-primary-foreground">Go to Application</Button>
        </div>
      </div>
    );
  }

  const toggleSubject = (id: string) => {
    setSelectedSubjects(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const startTest = () => {
    if (selectedSubjects.length < minSubjectsRequired) {
      toast.error(`Please select at least ${minSubjectsRequired} subjects`);
      return;
    }

    const initial: Record<string, number[]> = {};
    selectedSubjects.forEach(subjectId => {
      const subject = subjects.find(s => s.id === subjectId);
      initial[subjectId] = Array(subject?.questions.length || 0).fill(-1);
    });
    setAnswers(initial);
    setPhase('test');
    setTimeLeft(600);
  };

  const selectAnswer = (optionIdx: number) => {
    setSelectedOption(optionIdx);
    setAnswers(prev => {
      const subjectAnswers = [...(prev[currentSubject.id] || [])];
      subjectAnswers[currentQuestionIdx] = optionIdx;
      return { ...prev, [currentSubject.id]: subjectAnswers };
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIdx < currentQuestionCount - 1) {
      setCurrentQuestionIdx(i => i + 1);
      setSelectedOption(answers[currentSubject.id]?.[currentQuestionIdx + 1] ?? null);
    } else {
      moveToNextSubject();
    }
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  if (phase === 'select') {
    return (
      <div className="min-h-screen bg-background">
        <section className="gradient-navy py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl font-bold text-primary-foreground mb-3">Technical Assessment</h1>
            <p className="text-primary-foreground/70">Questions are loaded from the Excel file for {currentCandidate.department}</p>
          </div>
        </section>
        <section className="py-16">
          <div className="container mx-auto max-w-4xl px-4">
            {loadingQuestions && (
              <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground shadow-sm">
                Loading questions from Excel...
              </div>
            )}

            {!loadingQuestions && questionError && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center text-destructive shadow-sm">
                {questionError}
              </div>
            )}

            {!loadingQuestions && !questionError && subjects.length === 0 && (
              <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground shadow-sm">
                No questions found for {currentCandidate.department}.
              </div>
            )}

            {!loadingQuestions && !questionError && subjects.length > 0 && (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Selected: <span className="font-semibold text-foreground">{selectedSubjects.length}/{subjects.length}</span> (min {minSubjectsRequired})
                  </p>
                  <p className="text-sm text-muted-foreground">Spreadsheet MCQs per subject - 10 minutes per subject</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {subjects.map(s => (
                    <motion.button
                      key={s.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleSubject(s.id)}
                      className={`rounded-xl border-2 p-6 text-left transition-all ${
                        selectedSubjects.includes(s.id)
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-border bg-card hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{s.icon}</span>
                        <div>
                          <h3 className="font-display text-lg font-semibold text-card-foreground">{s.name}</h3>
                          <p className="text-sm text-muted-foreground">{s.questions.length} Questions</p>
                        </div>
                        {selectedSubjects.includes(s.id) && <CheckSquare className="ml-auto h-5 w-5 text-primary" />}
                      </div>
                    </motion.button>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Button onClick={startTest} size="lg" className="bg-primary text-primary-foreground hover:bg-navy-light px-8">
                    Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    );
  }

  if (phase === 'done') {
    return (
      <div className="min-h-screen bg-background">
        <section className="gradient-navy py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl font-bold text-primary-foreground mb-3">Assessment Complete!</h1>
          </div>
        </section>
        <section className="py-16">
          <div className="container mx-auto max-w-lg px-4 text-center">
            <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-primary">
                <span className="font-display text-3xl font-bold text-primary">{currentCandidate.technicalScore}</span>
              </div>
              <h2 className="font-display text-xl font-bold text-card-foreground mb-2">Technical Score</h2>
              <p className="text-muted-foreground mb-6">You completed {selectedSubjects.length} subjects</p>
              <Button onClick={() => navigate('/psychometric-test')} size="lg" className="bg-primary text-primary-foreground hover:bg-navy-light px-8">
                Proceed to Psychometric Test <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-navy py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-primary-foreground">{currentSubject.icon} {currentSubject.name}</span>
            <span className="text-xs text-primary-foreground/70">Subject {currentSubjectIdx + 1}/{activeSubjects.length}</span>
          </div>
          <div className={`flex items-center gap-2 rounded-full px-4 py-1 ${timeLeft < 60 ? 'bg-destructive/80' : 'bg-primary/30'}`}>
            <Clock className="h-4 w-4 text-primary-foreground" />
            <span className="font-mono text-sm font-bold text-primary-foreground">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Question {currentQuestionIdx + 1} of {currentQuestionCount}</span>
            <span className="text-sm text-muted-foreground">{Math.round((completedQuestionCount / totalQuestionCount) * 100)}% complete</span>
          </div>
          <Progress value={(completedQuestionCount / totalQuestionCount) * 100} className="h-2" />
        </div>

        <motion.div key={`${currentSubject.id}-${currentQuestionIdx}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <h2 className="font-display text-xl font-semibold text-card-foreground mb-6">
            {currentQuestion.question}
          </h2>
          <div className="space-y-3">
            {currentQuestion.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => selectAnswer(i)}
                className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                  selectedOption === i
                    ? 'border-primary bg-primary/5 text-foreground'
                    : 'border-border bg-background hover:border-primary/30 text-foreground'
                }`}
              >
                <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-current text-xs font-bold">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <Button onClick={nextQuestion} className="bg-primary text-primary-foreground hover:bg-navy-light px-8">
              {currentQuestionIdx === currentQuestionCount - 1 ? (currentSubjectIdx === activeSubjects.length - 1 ? 'Finish Test' : 'Next Subject') : 'Next Question'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: currentQuestionCount }, (_, i) => (
            <div
              key={i}
              className={`h-3 w-3 rounded-full ${
                i === currentQuestionIdx
                  ? 'bg-primary'
                  : answers[currentSubject.id]?.[i] >= 0
                    ? 'bg-success'
                    : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
