import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useRecruitment } from '@/context/RecruitmentContext';
import { generateResultPDF } from '@/lib/pdfGenerator';
import { sanitizeReportText } from '@/lib/utils';

export default function ResultsPage() {
  const navigate = useNavigate();
  const { currentCandidate } = useRecruitment();

  if (!currentCandidate || currentCandidate.completedSteps < 4) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Please complete all assessments first</h2>
          <Button onClick={() => navigate('/apply')} className="bg-primary text-primary-foreground">Go to Application</Button>
        </div>
      </div>
    );
  }

  const c = currentCandidate;
  const sanitizedName = sanitizeReportText(c.name);
  const sanitizedEmail = sanitizeReportText(c.email);
  const sanitizedDepartment = sanitizeReportText(c.department);
  const recommendationText = c.recommended ? 'Recommended Faculty' : 'Not Recommended Faculty';

  const handleDownload = () => {
    generateResultPDF({
      name: sanitizedName,
      email: sanitizedEmail,
      department: sanitizedDepartment,
      resumeScore: c.resumeScore,
      technicalScore: c.technicalScore,
      psychometricScore: c.psychometricScore,
      finalScore: c.finalScore,
      recommended: c.recommended,
    });
  };

  const scores = [
    { label: 'Resume Analysis', value: c.resumeScore, weight: '30%' },
    { label: 'Technical Assessment', value: c.technicalScore, weight: '40%' },
    { label: 'Psychometric Evaluation', value: c.psychometricScore, weight: '30%' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="gradient-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold text-primary-foreground mb-3">Evaluation Results</h1>
          <p className="text-primary-foreground/70">Your comprehensive recruitment assessment report</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4 space-y-8">
          {/* Candidate Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="grid gap-4 md:grid-cols-3">
              <div><span className="text-xs text-muted-foreground">Name</span><p className="font-semibold text-card-foreground">{sanitizedName}</p></div>
              <div><span className="text-xs text-muted-foreground">Email</span><p className="font-semibold text-card-foreground">{sanitizedEmail}</p></div>
              <div><span className="text-xs text-muted-foreground">Department</span><p className="font-semibold text-card-foreground">{sanitizedDepartment}</p></div>
            </div>
          </motion.div>

          {/* Score Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {scores.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-xl border border-border bg-card p-6 shadow-sm text-center">
                <p className="text-xs text-muted-foreground mb-1">{s.label} ({s.weight})</p>
                <div className="my-3 mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-primary">
                  <span className="font-display text-2xl font-bold text-primary">{s.value}</span>
                </div>
                <Progress value={s.value} className="h-2" />
              </motion.div>
            ))}
          </div>

          {/* Final Score */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
            className={`rounded-xl border-2 p-8 text-center shadow-lg ${c.recommended ? 'border-success bg-success/5' : 'border-destructive bg-destructive/5'}`}
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Final Score</h2>
            <div className="my-4 mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-primary bg-card">
              <span className="font-display text-4xl font-bold text-primary">{c.finalScore.toFixed(1)}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-lg font-semibold">
              {c.recommended ? (
                <>
                  <CheckCircle className="h-6 w-6 text-success" />
                  <span className="text-success">{recommendationText}</span>
                </>
              ) : (
                <>
                  <XCircle className="h-6 w-6 text-destructive" />
                  <span className="text-destructive">{recommendationText}</span>
                </>
              )}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Formula: (Resume x 0.30) + (Technical x 0.40) + (Psychometric x 0.30)
            </p>
          </motion.div>

          <div className="text-center">
            <Button onClick={handleDownload} size="lg" className="bg-primary text-primary-foreground hover:bg-navy-light px-8">
              <Download className="mr-2 h-4 w-4" /> Download Result PDF
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
