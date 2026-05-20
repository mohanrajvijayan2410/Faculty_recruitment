import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Careers', path: '/careers' },
  { label: 'Apply', path: '/apply' },
  { label: 'Admin', path: '/admin' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <nav className="gradient-navy sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-gold" />
          <span className="font-display text-xl font-bold text-primary-foreground">FacultyAI</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-gold text-primary'
                  : 'text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/50'
              }`}
            >
              {item.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary-foreground/15"
            >
              Logout
            </button>
          ) : null}
        </div>
        <button className="md:hidden text-primary-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-primary/30 px-4 pb-4">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-gold text-primary'
                  : 'text-primary-foreground/80 hover:text-primary-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
          {isAuthenticated && (
            <button
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="mt-2 w-full rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-left text-sm font-medium text-primary-foreground transition hover:bg-primary-foreground/15"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
