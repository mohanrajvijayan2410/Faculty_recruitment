import { useEffect, useState } from 'react';
import { useLocation, useNavigate, type Location } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export default function AdminLoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const from = ((location.state as { from?: Location })?.from as { pathname?: string } | undefined)?.pathname || '/admin';

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (login(username.trim(), password)) {
      navigate(from, { replace: true });
      return;
    }

    setError('Invalid admin credentials');
  };

  return (
    <div className="min-h-screen bg-slate-950/90 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/95 p-8 shadow-2xl ring-1 ring-white/10">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Admin Login</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-950">Secure Admin Access</h1>
          <p className="mt-2 text-sm text-slate-600">Sign in using your admin credentials to view the dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="admin-username" className="mb-2 block text-sm font-medium text-slate-700">
              Username
            </label>
            <input
              id="admin-username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="admin"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {error && (
            <div className="rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground">
            Login
          </Button>

          <p className="text-center text-sm text-slate-500">
            Use <strong>admin</strong> / <strong>admin123</strong>
          </p>
        </form>
      </div>
    </div>
  );
}
