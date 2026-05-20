import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useRecruitment } from '@/context/RecruitmentContext';

export default function ResumeAnalysisPage() {
  const navigate = useNavigate();
  const { currentCandidate, updateCandidate } = useRecruitment();

  if (!currentCandidate?.resumeAnalysis) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">No Resume Data Found</h2>
          <Button onClick={() => navigate('/apply')} className="bg-primary text-primary-foreground">Go to Application</Button>
        </div>
      </div>
    );
  }

  const analysis = currentCandidate.resumeAnalysis;

  const handleContinue = () => {
    updateCandidate({ completedSteps: 2 });
    navigate('/technical-test');
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="gradient-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold text-primary-foreground mb-3">AI Resume Analysis</h1>
          <p className="text-primary-foreground/70">Your resume has been analyzed using NLP technology</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4 space-y-8">
          {/* Score Card */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-xl border border-border bg-card p-8 text-center shadow-sm">
            <h2 className="font-display text-2xl font-bold text-card-foreground mb-4">Resume Score</h2>
            <div className="relative mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full border-4 border-primary">
              <span className="font-display text-4xl font-bold text-primary">{analysis.score}</span>
            </div>
            <Progress value={analysis.score} className="mx-auto max-w-xs h-3" />
            <p className="mt-3 text-sm text-muted-foreground">
              {analysis.score >= 70 ? 'Excellent resume match!' : analysis.score >= 50 ? 'Good resume with room for improvement' : 'Resume needs more relevant experience'}
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" /> Skills Detected ({analysis.detectedSkills.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysis.detectedSkills.map(skill => (
                  <span key={skill} className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">{skill}</span>
                ))}
                {analysis.detectedSkills.length === 0 && <p className="text-sm text-muted-foreground">No skills detected. Ensure your resume contains relevant keywords.</p>}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
                <XCircle className="h-5 w-5 text-destructive" /> Missing Skills ({analysis.missingSkills.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysis.missingSkills.map(skill => (
                  <span key={skill} className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">{skill}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Categories */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-display text-lg font-semibold text-card-foreground mb-4">Skill Categories Breakdown</h3>
            <div className="space-y-4">
              {analysis.categories.map(cat => {
                const total = cat.found.length + cat.missing.length;
                const pct = total > 0 ? (cat.found.length / total) * 100 : 0;
                return (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{cat.name}</span>
                      <span className="text-xs text-muted-foreground">{cat.found.length}/{total}</span>
                    </div>
                    <Progress value={pct} className="h-2" />
                  </div>
                );
              })}
            </div>
          </motion.div>

          <div className="text-center">
            <Button onClick={handleContinue} size="lg" className="bg-primary text-primary-foreground hover:bg-navy-light px-8">
              Proceed to Technical Test <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
