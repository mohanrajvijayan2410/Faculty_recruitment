import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useRecruitment } from '@/context/RecruitmentContext';
import { psychometricQuestions } from '@/data/questions';
import { toast } from 'sonner';

const likertOptions = [
  { label: 'Strongly Agree', value: 5 },
  { label: 'Agree', value: 4 },
  { label: 'Neutral', value: 3 },
  { label: 'Disagree', value: 2 },
  { label: 'Strongly Disagree', value: 1 },
];

export default function PsychometricTestPage() {
  const navigate = useNavigate();
  const { currentCandidate, updateCandidate, addCandidate } = useRecruitment();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(psychometricQuestions.length).fill(0));

  if (!currentCandidate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Please complete previous steps first</h2>
          <Button onClick={() => navigate('/apply')} className="bg-primary text-primary-foreground">Go to Application</Button>
        </div>
      </div>
    );
  }

  const question = psychometricQuestions[currentIdx];
  const progress = ((currentIdx + 1) / psychometricQuestions.length) * 100;

  const selectAnswer = (value: number) => {
    const updated = [...answers];
    updated[currentIdx] = value;
    setAnswers(updated);
  };

  const next = () => {
    if (answers[currentIdx] === 0) { toast.error('Please select an option'); return; }
    if (currentIdx < psychometricQuestions.length - 1) {
      setCurrentIdx(i => i + 1);
    } else {
      finish();
    }
  };

  const finish = () => {
    const maxScore = psychometricQuestions.length * 5;
    const totalScore = answers.reduce((a, b) => a + b, 0);
    const psychScore = Math.round((totalScore / maxScore) * 100);

    const resumeScore = currentCandidate.resumeScore;
    const techScore = currentCandidate.technicalScore;
    const finalScore = resumeScore * 0.3 + techScore * 0.5 + psychScore * 0.2;
    const recommended = finalScore >= 60;

    const finalCandidate = {
      ...currentCandidate,
      psychometricScore: psychScore,
      psychometricAnswers: answers,
      finalScore,
      recommended,
      completedSteps: 4,
    };

    updateCandidate(finalCandidate);
    addCandidate(finalCandidate);
    toast.success('All assessments completed!');
    navigate('/results');
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="gradient-navy py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl font-bold text-primary-foreground mb-2">Psychometric Evaluation</h1>
          <p className="text-primary-foreground/70 text-sm">Professor mindset assessment • {psychometricQuestions.length} questions</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Question {currentIdx + 1} of {psychometricQuestions.length}</span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{question.category}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <motion.div key={currentIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-card-foreground mb-8">
              "{question.question}"
            </h2>
            <div className="space-y-3">
              {likertOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => selectAnswer(opt.value)}
                  className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                    answers[currentIdx] === opt.value
                      ? 'border-primary bg-primary/5 text-foreground'
                      : 'border-border bg-background hover:border-primary/30 text-foreground'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={() => setCurrentIdx(i => Math.max(0, i - 1))}
                disabled={currentIdx === 0}
                className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-30"
              >
                ← Previous
              </button>
              <Button onClick={next} className="bg-primary text-primary-foreground hover:bg-navy-light px-8">
                {currentIdx === psychometricQuestions.length - 1 ? 'Submit & View Results' : 'Next'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          <div className="mt-6 flex justify-center flex-wrap gap-1.5">
            {psychometricQuestions.map((_, i) => (
              <div
                key={i}
                className={`h-2.5 w-2.5 rounded-full cursor-pointer ${
                  i === currentIdx ? 'bg-primary' : answers[i] > 0 ? 'bg-success' : 'bg-muted'
                }`}
                onClick={() => setCurrentIdx(i)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
