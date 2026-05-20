import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, FileSearch, ClipboardCheck, BarChart3, GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  { icon: FileSearch, title: 'AI Resume Analysis', desc: 'NLP-powered resume parsing that extracts skills and matches job requirements automatically.' },
  { icon: ClipboardCheck, title: 'Technical Assessment', desc: 'Comprehensive MCQ-based tests across 7+ subjects with timer and auto-grading.' },
  { icon: Brain, title: 'Psychometric Evaluation', desc: 'Professor mindset assessment covering teaching psychology, leadership, and ethics.' },
  { icon: BarChart3, title: 'Smart Ranking', desc: 'Weighted scoring algorithm that combines all assessments for fair candidate ranking.' },
];

const steps = [
  { num: '01', title: 'Apply Online', desc: 'Submit your application with resume' },
  { num: '02', title: 'AI Analysis', desc: 'Resume scored by AI engine' },
  { num: '03', title: 'Take Tests', desc: 'Complete technical & psychometric tests' },
  { num: '04', title: 'Get Results', desc: 'Receive your evaluation report' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-navy relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-gold blur-3xl" />
          <div className="absolute bottom-10 right-20 h-96 w-96 rounded-full bg-gold-light blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-primary/30 px-4 py-2">
              <GraduationCap className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-gold">AI-Powered Faculty Recruitment</span>
            </div>
            <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-primary-foreground md:text-6xl">
              Recruit the <span className="text-gold">Best Faculty</span><br />
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/70">
              Our intelligent recruitment platform uses NLP resume analysis, comprehensive assessments, and data-driven evaluation to help universities find exceptional educators.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-gold text-primary hover:bg-gold-light font-semibold px-8">
                <Link to="/careers">View Open Positions <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary/30">
                <Link to="/apply">Apply Now</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Intelligent Recruitment Platform</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">A complete AI-driven solution for evaluating faculty candidates objectively and efficiently.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-card-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-display text-3xl font-bold text-foreground md:text-4xl mb-14">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-xl font-bold">
                  {s.num}
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">Ready to Find Your Next Faculty Member?</h2>
          <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">Start the recruitment process today and let AI help you identify the best candidates.</p>
          <Button asChild size="lg" className="bg-gold text-primary hover:bg-gold-light font-semibold px-8">
            <Link to="/apply">Start Application <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted">© 2026 FacultyAI Recruitment System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
