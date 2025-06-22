
import React, { useState } from 'react';
import { ExternalLink, Globe } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Projects = () => {
  const { data } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [titleRef, titleVisible] = useScrollAnimation();
  
  const selectedProjectData = data.projects.find(p => p.id === selectedProject);

  // Sample additional projects for demo
  const additionalProjects = [
    {
      id: 'demo-1',
      title: 'E-Commerce Fashion',
      description: 'Platform jual beli fashion online dengan sistem pembayaran terintegrasi dan manajemen inventory.',
      details: 'Website e-commerce lengkap dengan fitur keranjang belanja, checkout, payment gateway, dan admin dashboard untuk mengelola produk dan pesanan.',
      image: '/placeholder.svg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: ''
    },
    {
      id: 'demo-2',
      title: 'Company Profile Tech',
      description: 'Website company profile untuk perusahaan teknologi dengan desain modern dan responsif.',
      details: 'Website corporate yang menampilkan profil perusahaan, layanan, tim, dan portofolio dengan design yang clean dan professional.',
      image: '/placeholder.svg',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
      link: ''
    },
    {
      id: 'demo-3',
      title: 'Restaurant App',
      description: 'Aplikasi pemesanan makanan online dengan fitur real-time tracking dan notifikasi.',
      details: 'Aplikasi web untuk restoran dengan sistem pemesanan online, tracking pesanan real-time, dan integrasi dengan sistem POS.',
      image: '/placeholder.svg',
      technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
      link: ''
    },
    {
      id: 'demo-4',
      title: 'Learning Management System',
      description: 'Platform pembelajaran online dengan video streaming dan sistem quiz interaktif.',
      details: 'LMS lengkap dengan fitur course management, video player, quiz system, progress tracking, dan sertifikat.',
      image: '/placeholder.svg',
      technologies: ['React', 'Node.js', 'MySQL', 'AWS'],
      link: ''
    },
    {
      id: 'demo-5',
      title: 'Real Estate Portal',
      description: 'Platform properti dengan pencarian advanced dan virtual tour 360 derajat.',
      details: 'Website properti dengan fitur pencarian berdasarkan lokasi, harga, tipe, virtual tour, dan sistem CRM untuk agent.',
      image: '/placeholder.svg',
      technologies: ['React', 'Google Maps API', 'Firebase'],
      link: ''
    },
    {
      id: 'demo-6',
      title: 'Healthcare Dashboard',
      description: 'Sistem manajemen pasien dan jadwal dokter untuk klinik dan rumah sakit.',
      details: 'Aplikasi manajemen rumah sakit dengan fitur registrasi pasien, jadwal dokter, rekam medis, dan sistem pembayaran.',
      image: '/placeholder.svg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
      link: ''
    }
  ];

  const allProjects = [...data.projects, ...additionalProjects];

  const ProjectCard = ({ project, index }: { project: any; index: number }) => {
    const [cardRef, cardVisible] = useScrollAnimation();

    const handleViewProject = () => {
      if (project.link && project.link.trim() !== '') {
        window.open(project.link, '_blank', 'noopener,noreferrer');
      } else {
        setSelectedProject(project.id);
      }
    };

    return (
      <div
        ref={cardRef}
        className={`group bg-card/80 dark:bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 dark:border-border/30 overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:-translate-y-3 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 relative transform ${
          cardVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        }`}
        style={{ 
          transitionDelay: cardVisible ? `${index * 150}ms` : '0ms',
          animationFillMode: 'both'
        }}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
        
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        <div className="p-8 relative z-10">
          <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
              <span
                key={techIndex}
                className="px-3 py-1.5 bg-primary/10 text-primary text-xs rounded-full font-medium border border-primary/20 hover:bg-primary/20 transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-3 py-1.5 bg-muted/20 text-muted-foreground text-xs rounded-full">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleViewProject}
              className="flex-1 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transform hover:scale-105"
            >
              {project.link && project.link.trim() !== '' ? (
                <>
                  <Globe className="w-4 h-4" />
                  Kunjungi Website
                </>
              ) : (
                <>
                  <ExternalLink className="w-4 h-4" />
                  Lihat Detail
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-32 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/8 to-primary/4 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-20 transform transition-all duration-1000 ${
            titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6 relative">
              Portfolio
              <span className="font-bold block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Website Kami
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-full"></div>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Koleksi website dan aplikasi web yang telah kami kembangkan untuk berbagai klien dari berbagai industri. 
            Setiap project dibuat dengan teknologi terdepan dan desain yang user-friendly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-md border border-border/50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">
              {selectedProjectData?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={selectedProjectData?.image}
                alt={selectedProjectData?.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {selectedProjectData?.details}
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedProjectData?.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full font-medium border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="bg-muted/20 rounded-xl p-4 border border-border/30">
              <p className="text-sm text-muted-foreground text-center">
                🚧 Website ini sedang dalam tahap development dan akan segera dapat diakses
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
