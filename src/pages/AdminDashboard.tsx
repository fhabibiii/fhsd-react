
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, LogOut, Home, Mail, Menu, User, Code } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import AdminLogin from '../components/AdminLogin';
import ProjectsManager from '../components/admin/ProjectsManager';
import ThemeToggle from '../components/admin/ThemeToggle';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { isAdmin, logout, login } = usePortfolio();
  const [activeTab, setActiveTab] = useState('projects');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const { toast } = useToast();

  // Session management
  useEffect(() => {
    if (isAdmin) {
      // Set session timeout for 24 hours
      const sessionTimeout = setTimeout(() => {
        setSessionExpired(true);
        logout();
        toast({
          title: "Session expired",
          description: "Your session has expired. Please login again.",
          variant: "destructive",
        });
      }, 24 * 60 * 60 * 1000); // 24 hours

      // Refresh token every hour
      const refreshInterval = setInterval(() => {
        // Simulate token refresh
        console.log('Refreshing session token...');
      }, 60 * 60 * 1000); // 1 hour

      return () => {
        clearTimeout(sessionTimeout);
        clearInterval(refreshInterval);
      };
    }
  }, [isAdmin, logout, toast]);

  if (!isAdmin || sessionExpired) {
    return <AdminLogin onLogin={() => {
      setActiveTab('projects');
      setSessionExpired(false);
    }} />;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout berhasil",
      description: "Anda telah keluar dari dashboard admin.",
    });
  };

  const menuItems = [
    { id: 'projects', label: 'Portfolio', icon: FileText },
    { id: 'hero', label: 'Hero Section', icon: Home },
    { id: 'services', label: 'Services', icon: Code },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return <ProjectsManager />;
      case 'hero':
        return (
          <div className="p-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Hero Section Management</h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800/30">
                <p className="text-blue-700 dark:text-blue-300 text-center">
                  🚧 Hero section management akan segera tersedia
                </p>
              </div>
            </div>
          </div>
        );
      case 'services':
        return (
          <div className="p-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Services Management</h2>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800/30">
                <p className="text-green-700 dark:text-green-300 text-center">
                  🚧 Services management akan segera tersedia
                </p>
              </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="p-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Management</h2>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800/30">
                <p className="text-purple-700 dark:text-purple-300 text-center">
                  🚧 Contact management akan segera tersedia
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return <ProjectsManager />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col fixed h-full z-30`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">FH Admin</span>
            </div>
          ) : (
            <LayoutDashboard className="w-8 h-8 text-primary" />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'gap-3 px-3'} py-3 rounded-lg text-left transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-primary text-white dark:text-gray-900 shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Logout Button at Bottom */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'gap-3 px-3'} py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200`}
            title={sidebarCollapsed ? 'Logout' : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && (
              <span className="font-medium">Logout</span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${sidebarCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        {/* Navbar */}
        <header className={`h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 fixed right-0 z-20 ${sidebarCollapsed ? 'left-16' : 'left-64'} transition-all duration-300`}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {/* Admin Greeting */}
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white dark:text-gray-900" />
              </div>
              <div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Welcome, Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto pt-16">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
