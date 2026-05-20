import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRecruitment } from '@/context/RecruitmentContext';
import { extractTextFromPDF, analyzeResume } from '@/lib/resumeAnalyzer';
import { jobOpenings } from '@/data/questions';
import { toast } from 'sonner';

export default function ApplyPage() {
  const navigate = useNavigate();
  const { setCurrentCandidate } = useRecruitment();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', department: '' });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) { toast.error('Please upload your resume'); return; }
    if (!form.department) { toast.error('Please select a department'); return; }

    setLoading(true);
    try {
      const text = await extractTextFromPDF(file);
      const job = jobOpenings.find(j => j.department === form.department);
      const analysis = analyzeResume(text, job?.skills || []);

      const candidate = {
        id: crypto.randomUUID(),
        ...form,
        resumeFile: file,
        resumeAnalysis: analysis,
        resumeScore: analysis.score,
        technicalScore: 0,
        technicalSubjects: [],
        technicalAnswers: {},
        psychometricScore: 0,
        psychometricAnswers: [],
        finalScore: 0,
        recommended: false,
        completedSteps: 1,
        timestamp: new Date().toISOString(),
      };

      setCurrentCandidate(candidate);
      toast.success('Application submitted! Analyzing resume...');
      navigate('/resume-analysis');
    } catch (err) {
      toast.error('Error processing resume. Please ensure it is a valid PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="gradient-navy py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold text-primary-foreground mb-3">Apply for Faculty Position</h1>
          <p className="text-primary-foreground/70">Fill in your details and upload your resume for AI-powered evaluation.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-2xl px-4">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="rounded-xl border border-border bg-card p-8 shadow-sm space-y-6"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Dr. John Smith" />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="john@university.edu" />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" required value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+1 234 567 8900" />
              </div>
              <div>
                <Label>Department</Label>
                <Select value={form.department} onValueChange={v => setForm(p => ({ ...p, department: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                  <SelectContent>
                    {jobOpenings.map(j => (
                      <SelectItem key={j.id} value={j.department}>{j.department}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Upload Resume (PDF)</Label>
              <div className="mt-2 flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 p-8 transition-colors hover:border-primary/50">
                <label className="cursor-pointer text-center">
                  <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground">{file ? file.name : 'Click to upload PDF'}</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF format, max 10MB</p>
                  <input type="file" accept=".pdf" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
                </label>
              </div>
            </div>

            <Button type="submit" disabled={loading} size="lg" className="w-full bg-primary text-primary-foreground hover:bg-navy-light">
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Analyzing Resume...</> : 'Submit Application'}
            </Button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
