import { NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, ClipboardList, BarChart3, Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/subjects', icon: BookOpen, label: 'Subjects' },
  { to: '/progress', icon: BarChart3, label: 'Progress' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

// Desktop Header Navigation
export const HeaderNav = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2" data-testid="header-logo">
            <div className="w-8 h-8 bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-sm">EP</span>
            </div>
            <span className="font-heading font-bold text-xl hidden sm:block">EngiPrep PH</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                data-testid={`nav-${item.label.toLowerCase()}`}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-150',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            data-testid="theme-toggle"
            className="ml-2"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

// Mobile Bottom Navigation
export const MobileNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              data-testid={`mobile-nav-${item.label.toLowerCase()}`}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center gap-1 px-3 py-2 text-xs font-medium transition-colors duration-150 min-w-[60px]',
                  isActive
                    ? 'text-accent'
                    : 'text-muted-foreground'
                )
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
