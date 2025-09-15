import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Crown, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { resortData } from '@/data/resortData';

const Login = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate authentication (replace with actual authentication logic)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Demo credentials for testing
      if (loginData.email === 'admin@kiritara.com' && loginData.password === 'admin123') {
        // Store auth state in localStorage (in production, use proper auth tokens)
        localStorage.setItem('kiritara_auth', JSON.stringify({
          user: { email: loginData.email, role: 'admin' },
          token: 'demo_token_' + Date.now(),
          loginTime: new Date().toISOString()
        }));

        toast({
          title: "Login Successful!",
          description: "Welcome to Kiritara Resort Admin Panel.",
        });

        // Redirect to admin panel (placeholder)
        window.location.href = '/admin-panel';
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Try admin@kiritara.com / admin123 for demo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Crown className="h-10 w-10 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-luxury">{resortData.name}</h1>
                <p className="text-sm text-muted-foreground">Admin Portal</p>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Welcome Back
            </h2>
            <p className="text-muted-foreground">
              Sign in to access your admin dashboard
            </p>
          </div>

          {/* Login Form */}
          <div className="card-luxury p-8 mb-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-12 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="Enter your password"
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-muted-foreground">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                variant="luxury"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Demo Credentials */}
          <div className="p-6 rounded-lg glass border border-primary/20 mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center">
              <Shield className="h-4 w-4 mr-2 text-primary" />
              Demo Access Credentials
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="text-foreground font-mono">admin@kiritara.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Password:</span>
                <span className="text-foreground font-mono">admin123</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Use these credentials to explore the admin panel functionality.
            </p>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Need help? {' '}
              <Link to="/contact" className="text-primary hover:text-primary/80 transition-colors">
                Contact Support
              </Link>
            </p>
            <div className="mt-4">
              <Link
                to="/"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                ← Back to Resort Website
              </Link>
            </div>
          </div>

          {/* Security Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-lg glass border border-border">
              <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Secure Login</p>
            </div>
            <div className="p-4 rounded-lg glass border border-border">
              <Lock className="h-6 w-6 text-secondary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Encrypted Data</p>
            </div>
            <div className="p-4 rounded-lg glass border border-border">
              <Crown className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Admin Access</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;