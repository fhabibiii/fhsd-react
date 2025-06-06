
import React, { useState } from 'react';
import { LayoutDashboard, FileText, Award, GraduationCap, Briefcase, Code, LogOut, Plus } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import AdminLogin from '../components/AdminLogin';
import ProjectsManager from '../components/admin/ProjectsManager';
import CertificatesManager from '../components/admin/CertificatesManager';
import EducationManager from '../components/admin/EducationManager';
import ExperienceManager from '../components/admin/ExperienceManager';
import SkillsManager from '../components/admin/SkillsManager';
import ThemeToggle from '../components/admin/ThemeToggle';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { isAdmin, logout } = usePortfolio();
  const [activeTab, setActiveTab] = useState('projects');
  const { toast } = useToast();

  if (!isAdmin) {
    return <AdminLogin onLogin={() => setActiveTab('projects')} />;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout berhasil",
      description: "Anda telah keluar dari dashboard admin.",
    });
  };

  const tabs = [
    { id: 'projects', label: 'Projects', icon: FileText, color: 'bg-blue-500 dark:bg-blue-600' },
    { id: 'certificates', label: 'Certificates', icon: Award, color: 'bg-yellow-500 dark:bg-yellow-600' },
    { id: 'education', label: 'Education', icon: GraduationCap, color: 'bg-green-500 dark:bg-green-600' },
    { id: 'experience', label: 'Experience', icon: Briefcase, color: 'bg-purple-500 dark:bg-purple-600' },
    { id: 'skills', label: 'Skills', icon: Code, color: 'bg-pink-500 dark:bg-pink-600' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return <ProjectsManager />;
      case 'certificates':
        return <CertificatesManager />;
      case 'education':
        return <EducationManager />;
      case 'experience':
        return <ExperienceManager />;
      case 'skills':
        return <SkillsManager />;
      default:
        return <ProjectsManager />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <LayoutDashboard className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <a
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                View Portfolio
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="bg-card rounded-lg shadow-sm p-4 border border-border">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 relative overflow-hidden ${
                        activeTab === tab.id
                          ? `${tab.color} text-white shadow-lg`
                          : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      <Icon className="w-5 h-5 relative z-10" />
                      <span className="relative z-10 font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-card rounded-lg shadow-sm p-6 animate-fade-in border border-border">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
