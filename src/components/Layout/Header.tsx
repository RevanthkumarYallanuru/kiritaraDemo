import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Crown, Sparkles } from 'lucide-react';
import { resortData } from '@/data/resortData';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Memberships', href: '/memberships' },
    { name: 'Progress', href: '/progress' },
    { name: 'Virtual Tour', href: '/virtual-tour' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'nav-glass shadow-luxury' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Crown className="h-8 w-8 text-primary group-hover:text-secondary transition-colors duration-300" />
              <Sparkles className="h-3 w-3 text-accent absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-luxury">{resortData.name}</h1>
              <p className="text-xs text-muted-foreground -mt-1">{resortData.tagline}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:text-primary ${
                  isActive(item.href) 
                    ? 'text-primary bg-primary/10 shadow-luxury' 
                    : 'text-muted-foreground hover:bg-primary/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="glass" 
              size="sm" 
              asChild
              className="hidden md:inline-flex"
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button 
              variant="luxury" 
              size="sm"
              asChild
            >
              <Link to="/memberships">Invest Now</Link>
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 glass border-t border-border/50 animate-slide-up">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'text-primary bg-primary/10 shadow-luxury'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-border/30">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-300"
                >
                  Login
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;