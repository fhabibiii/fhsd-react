
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, LogOut, Mail, Menu, User, Code, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import AdminLogin from '../components/AdminLogin';
import ProjectsManager from '../components/admin/ProjectsManager';
import ServicesManager from '../components/admin/ServicesManager';
import ContactManager from '../components/admin/ContactManager';
import MessagesManager from '../components/admin/MessagesManager';
import ThemeToggle from '../components/admin/ThemeToggle';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminDashboard = () => {
  const { isAdmin, logout, login } = usePortfolio();
  const [activeTab, setActiveTab] = useState('projects');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { toast } = useToast();

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
        setSidebarMobileOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Session management
  useEffect(() => {
    if (isAdmin) {
      const sessionTimeout = setTimeout(() => {
        setSessionExpired(true);
        logout();
        toast({
          title: "Session expired",
          description: "Your session has expired. Please login again.",
          variant: "destructive",
        });
      }, 24 * 60 * 60 * 1000);

      const refreshInterval = setInterval(() => {
        console.log('Refreshing session token...');
      }, 60 * 60 * 1000);

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
      toast({
        title: "Login successful!",
        description: "Welcome to FH Admin Dashboard.",
        variant: "default",
      });
    }} />;
  }

  const handleLogout = () => {
    logout();
    setShowLogoutDialog(false);
    toast({
      title: "Logout successful",
      description: "You have been logged out from admin dashboard.",
      variant: "default",
    });
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex w-full overflow-hidden">
      {/* Mobile Overlay */}
      {isMobile && sidebarMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
          onClick={() => setSidebarMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${
        isMobile 
          ? `fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ${sidebarMobileOpen ? 'translate-x-0' : '-translate-x-full'} w-64`
          : `${sidebarCollapsed ? 'w-0' : 'w-64'} transition-all duration-300 fixed h-full z-30 overflow-hidden`
      } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col animate-fade-in`}>
        
        {/* Sidebar Area - clickable to toggle */}
        <div 
          className="flex-1 cursor-pointer" 
          onClick={handleSidebarAreaClick}
        >
          {/* Logo */}
          <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700 flex-shrink-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">FH Admin</span>
            </div>
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
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 hover:scale-105 ${
                      activeTab === item.id
                        ? 'bg-primary text-white dark:text-gray-900 shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Logout Button at Bottom */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
            <AlertDialogTrigger asChild>
              <button
                onClick={(e) => e.stopPropagation()}
                className="w-full flex items-center gap-3 px-3 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-105"
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">Logout</span>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to logout from the admin dashboard?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      {!isMobile && (
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="fixed top-1/2 transform -translate-y-1/2 z-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 animate-fade-in"
          style={{ 
            left: sidebarCollapsed ? '8px' : '240px',
            transition: 'left 0.3s ease, transform 0.2s ease'
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
      <div className={`flex-1 flex flex-col ${isMobile ? 'ml-0' : (sidebarCollapsed ? 'ml-0' : 'ml-64')} transition-all duration-300 min-w-0`}>
        {/* Navbar */}
        <header className={`h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 md:px-6 fixed right-0 z-20 ${isMobile ? 'left-0' : (sidebarCollapsed ? 'left-0' : 'left-64')} transition-all duration-300 animate-fade-in`}>
          <div className="flex items-center gap-4">
            {isMobile && (
              <button
                onClick={() => setSidebarMobileOpen(!sidebarMobileOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hover:shadow-md"
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
            <ThemeToggle />
            
            {/* Admin User Menu */}
            {isMobile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:shadow-md transition-all duration-200 hover:scale-110">
                    <User className="w-4 h-4 text-white dark:text-gray-900" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setShowLogoutDialog(true)} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:shadow-md transition-all duration-200 hover:scale-105">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white dark:text-gray-900" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Welcome, Admin</span>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setShowLogoutDialog(true)} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 pt-16 overflow-x-hidden min-w-0">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
