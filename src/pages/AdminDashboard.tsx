import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, LogOut, Mail, Menu, User, Code, MessageSquare, ChevronLeft, ChevronRight, ChevronDown, Home, Sun, Moon } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../components/ThemeProvider';
import AdminLogin from '../components/AdminLogin';
import ProjectsManager from '../components/admin/ProjectsManager';
import ServicesManager from '../components/admin/ServicesManager';
import ContactManager from '../components/admin/ContactManager';
import MessagesManager from '../components/admin/MessagesManager';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { isAdmin, logout, isLoading } = usePortfolio();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('projects');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const { toast } = useToast();

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.user-dropdown-container')) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (!isAdmin) {
    return <AdminLogin onLogin={() => {
      setActiveTab('projects');
    }} />;
  }

  const handleLogoutClick = () => {
    setLogoutConfirmOpen(true);
    setUserDropdownOpen(false);
  };

  const handleLogoutConfirm = async () => {
    try {
      await logout();
      toast({
        title: "Logout berhasil",
        description: "Anda telah keluar dari dashboard admin.",
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat logout.",
        variant: "destructive",
      });
    } finally {
      setLogoutConfirmOpen(false);
    }
  };

  const handleGoToMainPage = () => {
    window.open('/', '_blank');
    setUserDropdownOpen(false);
  };

  const menuItems = [
    { id: 'projects', label: 'Portfolio', icon: FileText },
    { id: 'services', label: 'Services', icon: Code },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'messages', label: 'Messages', icon: MessageSquare }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return <ProjectsManager />;
      case 'services':
        return <ServicesManager />;
      case 'contact':
        return <ContactManager />;
      case 'messages':
        return <MessagesManager />;
      default:
        return <ProjectsManager />;
    }
  };

  const handleSidebarAreaClick = () => {
    if (isMobile) {
      setSidebarMobileOpen(!sidebarMobileOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <span className="text-foreground">Processing...</span>
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      {isMobile && sidebarMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${
        isMobile 
          ? `fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ${sidebarMobileOpen ? 'translate-x-0' : '-translate-x-full'} w-64`
          : `${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 fixed h-full z-30`
      } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col`}>
        
        {/* Sidebar Area - clickable to toggle */}
        <div 
          className="flex-1 cursor-pointer" 
          onClick={handleSidebarAreaClick}
        >
          {/* Logo */}
          <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            {!sidebarCollapsed || isMobile ? (
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">FHSD</span>
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab(item.id);
                      if (isMobile) setSidebarMobileOpen(false);
                    }}
                    className={`w-full flex items-center ${(sidebarCollapsed && !isMobile) ? 'justify-center px-2' : 'gap-3 px-3'} py-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-primary to-primary/80 text-white dark:text-gray-900 shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    title={(sidebarCollapsed && !isMobile) ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {(!sidebarCollapsed || isMobile) && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Logout Button at Bottom */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLogoutClick();
            }}
            className={`w-full flex items-center ${(sidebarCollapsed && !isMobile) ? 'justify-center px-2' : 'gap-3 px-3'} py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200`}
            title={(sidebarCollapsed && !isMobile) ? 'Logout' : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {(!sidebarCollapsed || isMobile) && (
              <span className="font-medium">Logout</span>
            )}
          </button>
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      {!isMobile && (
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="fixed top-1/2 transform -translate-y-1/2 z-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
          style={{ 
            left: sidebarCollapsed ? '48px' : '240px',
            transition: 'left 0.3s ease'
          }}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          )}
        </button>
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${isMobile ? 'ml-0' : (sidebarCollapsed ? 'ml-16' : 'ml-64')} transition-all duration-300`}>
        {/* Navbar */}
        <header className={`h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 md:px-6 fixed right-0 z-20 ${isMobile ? 'left-0' : (sidebarCollapsed ? 'left-16' : 'left-64')} transition-all duration-300`}>
          <div className="flex items-center gap-4">
            {isMobile && (
              <button
                onClick={() => setSidebarMobileOpen(!sidebarMobileOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            )}
            {!isMobile && (
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h1>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-blue-600" />
              )}
            </button>
            
            {/* Admin Greeting with Dropdown */}
            <div className="relative user-dropdown-container">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white dark:text-gray-900" />
                </div>
                {!isMobile && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Welcome, Admin</span>
                    <ChevronDown className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                )}
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl dark:shadow-white/20 z-50 animate-fade-in overflow-hidden">
                  <button
                    onClick={handleGoToMainPage}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Home className="w-4 h-4" />
                    <span className="font-medium">Halaman Utama</span>
                  </button>
                  <button
                    onClick={handleLogoutClick}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 pt-16 overflow-x-hidden">
          {renderContent()}
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      <AlertDialog open={logoutConfirmOpen} onOpenChange={setLogoutConfirmOpen}>
        <AlertDialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900 dark:text-white">Konfirmasi Logout</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
              Apakah Anda yakin ingin keluar dari dashboard admin?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600">Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogoutConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
