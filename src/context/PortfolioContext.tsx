
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  details: string;
}

export interface Certificate {
  id: string;
  name: string;
  institution: string;
  year: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  year: string;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  period: string;
  description: string;
}

export interface Skill {
  id: string;
  category: string;
  technologies: string[];
}

interface PortfolioData {
  projects: Project[];
  certificates: Certificate[];
  education: Education[];
  experience: Experience[];
  skills: Skill[];
}

interface PortfolioContextType {
  data: PortfolioData;
  updateProjects: (projects: Project[]) => void;
  updateCertificates: (certificates: Certificate[]) => void;
  updateEducation: (education: Education[]) => void;
  updateExperience: (experience: Experience[]) => void;
  updateSkills: (skills: Skill[]) => void;
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Mock data
const initialData: PortfolioData = {
  projects: [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution dengan React dan Node.js',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      link: '#',
      details: 'Platform e-commerce lengkap dengan sistem pembayaran, manajemen produk, dan dashboard admin. Menggunakan teknologi modern untuk performa optimal.'
    },
    {
      id: '2',
      title: 'Data Analytics Dashboard',
      description: 'Dashboard visualisasi data menggunakan Python dan Flask',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500',
      technologies: ['Python', 'Flask', 'Pandas', 'Chart.js'],
      link: '#',
      details: 'Dashboard interaktif untuk analisis data dengan berbagai visualisasi dan filter dinamis.'
    },
    {
      id: '3',
      title: 'Task Management App',
      description: 'Aplikasi manajemen tugas dengan fitur kolaborasi tim',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'Socket.io'],
      link: '#',
      details: 'Aplikasi manajemen proyek dan tugas dengan fitur real-time collaboration dan notifikasi.'
    }
  ],
  certificates: [
    {
      id: '1',
      name: 'AWS Certified Developer',
      institution: 'Amazon Web Services',
      year: '2023'
    },
    {
      id: '2',
      name: 'Google Cloud Professional',
      institution: 'Google Cloud',
      year: '2023'
    },
    {
      id: '3',
      name: 'Meta Frontend Developer',
      institution: 'Meta',
      year: '2022'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'Universitas Indonesia',
      degree: 'Sarjana',
      field: 'Teknik Informatika',
      year: '2018 - 2022'
    },
    {
      id: '2',
      institution: 'SMA Negeri 1 Jakarta',
      degree: 'SMA',
      field: 'IPA',
      year: '2015 - 2018'
    }
  ],
  experience: [
    {
      id: '1',
      position: 'Senior Software Engineer',
      company: 'Tech Innovate Indonesia',
      period: '2022 - Sekarang',
      description: 'Memimpin pengembangan aplikasi web menggunakan React dan Node.js. Bertanggung jawab atas arsitektur sistem dan mentoring junior developer.'
    },
    {
      id: '2',
      position: 'Frontend Developer',
      company: 'Digital Solutions',
      period: '2021 - 2022',
      description: 'Mengembangkan antarmuka pengguna yang responsif dan interaktif menggunakan Vue.js dan React.'
    }
  ],
  skills: [
    {
      id: '1',
      category: 'Frontend',
      technologies: ['React', 'Vue.js', 'Angular', 'TypeScript', 'Tailwind CSS']
    },
    {
      id: '2',
      category: 'Backend',
      technologies: ['Node.js', 'Express', 'Python', 'Flask', 'PHP', 'Laravel']
    },
    {
      id: '3',
      category: 'Database',
      technologies: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis']
    },
    {
      id: '4',
      category: 'Tools & Platform',
      technologies: ['Docker', 'AWS', 'Git', 'Jenkins', 'Kubernetes']
    }
  ]
};

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [isAdmin, setIsAdmin] = useState(false);

  const updateProjects = (projects: Project[]) => {
    setData(prev => ({ ...prev, projects }));
  };

  const updateCertificates = (certificates: Certificate[]) => {
    setData(prev => ({ ...prev, certificates }));
  };

  const updateEducation = (education: Education[]) => {
    setData(prev => ({ ...prev, education }));
  };

  const updateExperience = (experience: Experience[]) => {
    setData(prev => ({ ...prev, experience }));
  };

  const updateSkills = (skills: Skill[]) => {
    setData(prev => ({ ...prev, skills }));
  };

  const login = () => {
    setIsAdmin(true);
  };

  const logout = () => {
    setIsAdmin(false);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateProjects,
        updateCertificates,
        updateEducation,
        updateExperience,
        updateSkills,
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
