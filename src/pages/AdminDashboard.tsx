
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  MessageSquare, 
  FolderOpen, 
  Settings, 
  LogOut,
  Menu,
  X,
  Home,
  Briefcase,
  Mail,
  Award,
  GraduationCap,
  Zap,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import AdminLogin from '../components/AdminLogin';
import HeroManager from '../components/admin/HeroManager';
import ProjectsManager from '../components/admin/ProjectsManager';
import ServicesManager from '../components/admin/ServicesManager';
import MessagesManager from '../components/admin/MessagesManager';
import ContactManager from '../components/admin/ContactManager';
import SkillsManager from '../components/admin/SkillsManager';
import ExperienceManager from '../components/admin/ExperienceManager';
import EducationManager from '../components/admin/EducationManager';
import CertificatesManager from '../components/admin/CertificatesManager';
import FeaturesList from '../components/admin/FeaturesList';
import ThemeToggle from '../components/admin/ThemeToggle';
import { apiService } from '../services/api';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Dummy state for FeaturesList component
  const [features, setFeatures] = useState<string[]>([]);

  const handleFeaturesChange = (newFeatures: string[]) => {
    setFeatures(newFeatures);
  };

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = () => {
      const isAuth = apiService.isAuthenticated();
      setIsAuthenticated(isAuth);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    toast({
      title: "Login Berhasil!",
      description: "Selamat datang di dashboard admin.",
    });
  };

  const handleLogout = async () => {
    try {
      await apiService.logout();
      setIsAuthenticated(false);
      toast({
        title: "Logout Berhasil!",
        description: "Anda telah keluar dari dashboard admin.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal logout. Silakan coba lagi.",
        variant: "destructive",
      });
    }
  };

  const menuItems = [
    { id: 'hero', name: 'Hero Section', icon: Home },
    { id: 'projects', name: 'Projects', icon: FolderOpen },
    { id: 'services', name: 'Services', icon: Briefcase },
    { id: 'messages', name: 'Messages', icon: MessageSquare },
    { id: 'contact', name: 'Contact Info', icon: Mail },
    { id: 'skills', name: 'Skills', icon: Zap },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'certificates', name: 'Certificates', icon: Award },
    { id: 'features', name: 'Features', icon: BookOpen },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'hero':
        return <HeroManager />;
      case 'projects':
        return <ProjectsManager />;
      case 'services':
        return <ServicesManager />;
      case 'messages':
        return <MessagesManager />;
      case 'contact':
        return <ContactManager />;
      case 'skills':
        return <SkillsManager />;
      case 'experience':
        return <ExperienceManager />;
      case 'education':
        return <EducationManager />;
      case 'certificates':
        return <CertificatesManager />;
      case 'features':
        return <FeaturesList features={features} onChange={handleFeaturesChange} />;
      default:
        return <HeroManager />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <h1 className="text-xl font-bold text-foreground">FHSD</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Button>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
          <Button
            variant="outline"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-card border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Admin Dashboard</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Content */}
        <main className="h-full lg:h-screen overflow-hidden">
          {renderContent()}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
