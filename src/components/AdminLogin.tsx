
import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useToast } from '@/hooks/use-toast';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = usePortfolio();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        login();
        onLogin();
        toast({
          title: "Login berhasil!",
          description: "Selamat datang di dashboard admin.",
        });
      } else {
        toast({
          title: "Login gagal",
          description: "Username atau password salah.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center px-4">
      <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md border border-border animate-scale-in shadow-xl hover:shadow-2xl transition-all duration-300 hover: -translate-y-1">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Admin Login</h2>
          <p className="text-muted-foreground">Masuk ke dashboard admin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                placeholder="Masukkan username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="w-full pl-10 pr-12 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                placeholder="Masukkan password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 disabled:scale-100"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin"></div>
            ) : (
              'Masuk'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
