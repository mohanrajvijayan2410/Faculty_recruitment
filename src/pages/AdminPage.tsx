import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Trophy, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useRecruitment } from '@/context/RecruitmentContext';
import { useAuth } from '@/context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['hsl(213, 52%, 24%)', 'hsl(40, 52%, 55%)', 'hsl(142, 60%, 40%)', 'hsl(0, 72%, 51%)'];

export default function AdminPage() {
  const { candidates, clearHistory } = useRecruitment();

  const historyRecords = useMemo(
    () => [...candidates].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    [candidates],
  );

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const stats = useMemo(() => {
    if (candidates.length === 0) return { total: 0, recommended: 0, avgScore: 0, topScore: 0 };
    const recommended = candidates.filter(c => c.recommended).length;
    const avg = candidates.reduce((s, c) => s + c.finalScore, 0) / candidates.length;
    const top = Math.max(...candidates.map(c => c.finalScore));
    return { total: candidates.length, recommended, avgScore: avg, topScore: top };
  }, [candidates]);

  const chartData = historyRecords.slice(0, 10).map(c => ({
    name: c.name.split(' ')[0],
    Resume: c.resumeScore,
    Technical: c.technicalScore,
    Psychometric: c.psychometricScore,
  }));

  const pieData = [
    { name: 'Recommended', value: stats.recommended },
    { name: 'Not Recommended', value: stats.total - stats.recommended },
  ];

  const statCards = [
    { icon: Users, label: 'Total Candidates', value: stats.total },
    { icon: Trophy, label: 'Recommended', value: stats.recommended },
    { icon: TrendingUp, label: 'Average Score', value: stats.avgScore.toFixed(1) },
    { icon: Award, label: 'Top Score', value: stats.topScore.toFixed(1) },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="gradient-navy py-16">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:text-left">
          <div>
            <h1 className="font-display text-4xl font-bold text-primary-foreground mb-3">Admin Dashboard</h1>
            <p className="text-primary-foreground/70">Overview of all candidate evaluations</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
            <Button variant="outline" size="sm" className="px-5" onClick={clearHistory}>
              Clear History
            </Button>
            <Button onClick={handleLogout} variant="outline" size="sm" className="px-6">
              Logout
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 space-y-8">
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            {statCards.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2"><s.icon className="h-5 w-5 text-primary" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="font-display text-2xl font-bold text-card-foreground">{s.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {candidates.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-16 text-center shadow-sm">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-display text-xl font-semibold text-card-foreground mb-2">No Candidate History Available</h3>
              <p className="text-muted-foreground">New candidate records will appear here automatically after assessment completion.</p>
            </div>
          ) : (
            <>
              {/* Charts */}
              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 rounded-xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="font-display text-lg font-semibold text-card-foreground mb-4">Latest Candidate Scores</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="Resume" fill={COLORS[0]} />
                      <Bar dataKey="Technical" fill={COLORS[1]} />
                      <Bar dataKey="Psychometric" fill={COLORS[2]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="font-display text-lg font-semibold text-card-foreground mb-4">Recommendation</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label>
                        {pieData.map((_, i) => <Cell key={i} fill={i === 0 ? COLORS[2] : COLORS[3]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Ranking Table */}
              <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h3 className="font-display text-lg font-semibold text-card-foreground">Candidate Rankings</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Rank</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Department</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase">Resume</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase">Technical</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase">Psychometric</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase">Final</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {historyRecords.map((c, i) => (
                        <tr key={c.id} className="hover:bg-muted/50">
                          <td className="px-4 py-3">
                            <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                              i === 0 ? 'bg-gold text-primary' : i < 3 ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                            }`}>{i + 1}</span>
                          </td>
                          <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{c.department}</td>
                          <td className="px-4 py-3 text-center text-sm">{c.resumeScore}</td>
                          <td className="px-4 py-3 text-center text-sm">{c.technicalScore}</td>
                          <td className="px-4 py-3 text-center text-sm">{c.psychometricScore}</td>
                          <td className="px-4 py-3 text-center font-bold text-foreground">{c.finalScore.toFixed(1)}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              c.recommended ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                            }`}>
                              {c.recommended ? 'Recommended' : 'Not Recommended'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
