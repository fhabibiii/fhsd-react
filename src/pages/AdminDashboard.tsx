
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, 
  MessageSquare, 
  Briefcase, 
  Award, 
  GraduationCap, 
  Wrench, 
  Star, 
  Phone, 
  Users,
  TrendingUp,
  Mail,
  Calendar,
  Settings
} from 'lucide-react';

// Import managers
import HeroManager from '../components/admin/HeroManager';
import ProjectsManager from '../components/admin/ProjectsManager';
import SkillsManager from '../components/admin/SkillsManager';
import ExperienceManager from '../components/admin/ExperienceManager';
import EducationManager from '../components/admin/EducationManager';
import CertificatesManager from '../components/admin/CertificatesManager';
import ServicesManager from '../components/admin/ServicesManager';
import ContactManager from '../components/admin/ContactManager';
import MessagesManager from '../components/admin/MessagesManager';
import FeaturesList from '../components/admin/FeaturesList';
import ThemeToggle from '../components/admin/ThemeToggle';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [availableFeatures, setAvailableFeatures] = useState([
    'Hero Section',
    'Projects Portfolio',
    'Skills & Technologies',
    'Work Experience',
    'Education',
    'Certificates',
    'Services Offered',
    'Contact Information'
  ]);

  const stats = [
    { title: 'Total Messages', value: '156', icon: MessageSquare, trend: '+12%' },
    { title: 'Projects', value: '24', icon: Briefcase, trend: '+5%' },
    { title: 'Skills', value: '18', icon: Star, trend: '+2%' },
    { title: 'Experience', value: '5', icon: Users, trend: 'Stable' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">FHSD</h1>
            <p className="text-muted-foreground">Manage your portfolio content and settings</p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Badge variant="outline" className="text-xs">
              <Calendar className="w-3 h-3 mr-1" />
              Last updated: {new Date().toLocaleDateString()}
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-1">
            <TabsTrigger value="overview" className="flex items-center gap-2 text-xs">
              <TrendingUp className="w-3 h-3" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="hero" className="flex items-center gap-2 text-xs">
              <User className="w-3 h-3" />
              Hero
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2 text-xs">
              <Briefcase className="w-3 h-3" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2 text-xs">
              <Star className="w-3 h-3" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-2 text-xs">
              <Users className="w-3 h-3" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2 text-xs">
              <GraduationCap className="w-3 h-3" />
              Education
            </TabsTrigger>
            <TabsTrigger value="certificates" className="flex items-center gap-2 text-xs">
              <Award className="w-3 h-3" />
              Certificates
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2 text-xs">
              <Wrench className="w-3 h-3" />
              Services
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2 text-xs">
              <Phone className="w-3 h-3" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2 text-xs">
              <Mail className="w-3 h-3" />
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className={stat.trend.includes('+') ? 'text-green-600' : 'text-muted-foreground'}>
                        {stat.trend}
                      </span> from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Available Features
                </CardTitle>
                <CardDescription>
                  Manage different sections of your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FeaturesList 
                  features={availableFeatures}
                  onChange={setAvailableFeatures}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hero">
            <HeroManager />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsManager />
          </TabsContent>

          <TabsContent value="experience">
            <ExperienceManager />
          </TabsContent>

          <TabsContent value="education">
            <EducationManager />
          </TabsContent>

          <TabsContent value="certificates">
            <CertificatesManager />
          </TabsContent>

          <TabsContent value="services">
            <ServicesManager />
          </TabsContent>

          <TabsContent value="contact">
            <ContactManager />
          </TabsContent>

          <TabsContent value="messages">
            <MessagesManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
