
import React, { useState } from 'react';
import { ExternalLink, Globe, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { useBackendData } from '../hooks/useBackendData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Projects = () => {
  const { projects, loading, errors } = useBackendData();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [titleRef, titleVisible] = useScrollAnimation();
  
  // Responsive items per page
  const getItemsPerPage = () => {
    if (typeof window === 'undefined') return 6;
    return window.innerWidth < 768 ? 3 : 6;
  };
  
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
  
  React.useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = getItemsPerPage();
      if (newItemsPerPage !== itemsPerPage) {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(0); // Reset to first page when items per page changes
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerPage]);
  
  const selectedProjectData = projects.find((p: any) => p.id === selectedProject);

  // Sample additional projects for demo (only if no backend data)
  const additionalProjects = projects.length === 0 ? [
    {
      id: 'demo-1',
      title: 'E-Commerce Fashion',
      description: 'Platform jual beli fashion online lengkap dengan sistem pembayaran yang aman dan terintegrasi. Website ini memiliki fitur keranjang belanja yang mudah digunakan, sistem checkout yang simpel, dan berbagai pilihan metode pembayaran. Dilengkapi juga dengan fitur wishlist untuk menyimpan produk favorit dan sistem review untuk membantu pembeli lain. Selain itu, terdapat fitur rekomendasi produk berdasarkan riwayat pembelian dan preferensi pengguna.',
      details: 'Website e-commerce lengkap dengan fitur keranjang belanja, checkout, payment gateway, dan admin dashboard untuk mengelola produk dan pesanan.',
      image: '/placeholder.svg',
      link: ''
    },
    {
      id: 'demo-2',
      title: 'Company Profile Tech',
      description: 'Website company profile untuk perusahaan teknologi dengan desain yang modern, responsif, dan profesional. Menampilkan informasi lengkap tentang perusahaan, visi misi, tim profesional, dan portfolio produk. Dilengkapi dengan halaman blog untuk sharing knowledge dan contact form yang terintegrasi dengan email marketing. Website ini juga memiliki fitur live chat untuk komunikasi langsung dengan tim sales dan support.',
      details: 'Website corporate yang menampilkan profil perusahaan, layanan, tim, dan portofolio dengan design yang clean dan professional.',
      image: '/placeholder.svg',
      link: ''
    },
    {
      id: 'demo-3',
      title: 'Restaurant App',
      description: 'Aplikasi pemesanan makanan online dengan fitur tracking pesanan secara real-time dan sistem notifikasi otomatis. Pelanggan dapat melihat menu lengkap dengan foto menarik, melakukan pemesanan dengan mudah, dan memantau status pesanan mereka. Dilengkapi juga dengan sistem rating dan review untuk membantu meningkatkan kualitas layanan. Aplikasi ini juga terintegrasi dengan sistem POS restoran untuk efisiensi operasional.',
      details: 'Aplikasi web untuk restoran dengan sistem pemesanan online, tracking pesanan real-time, dan integrasi dengan sistem POS.',
      image: '/placeholder.svg',
      link: ''
    }
  ] : [];

  const allProjects = projects.length > 0 ? projects : additionalProjects;
  const totalPages = Math.ceil(allProjects.length / itemsPerPage);
  const currentProjects = allProjects.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

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
          <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-muted-foreground mb-6 leading-relaxed text-sm line-clamp-4">
            {project.description}
          </p>

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

  // Loading state
  if (loading.projects) {
    return (
      <section id="projects" className="py-32 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

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
            Setiap project dibuat dengan kualitas terbaik dan desain yang menarik.
          </p>
        </div>

        {/* Error State */}
        {errors.projects && (
          <div className="bg-card rounded-xl p-12 border border-destructive/20 text-center mb-12">
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Failed to Load Projects</h3>
            <p className="text-muted-foreground">
              {errors.projects}
            </p>
          </div>
        )}

        {/* No Data State */}
        {!errors.projects && allProjects.length === 0 && (
          <div className="bg-card rounded-xl p-12 border border-border text-center mb-12">
            <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Projects Available</h3>
            <p className="text-muted-foreground">
              Projects will appear here once they are added to the database.
            </p>
          </div>
        )}

        {/* Projects Grid */}
        {allProjects.length > 0 && (
          <>
            <div className={`grid ${itemsPerPage === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-8 mb-12`}>
              {currentProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium">
                  {currentPage + 1}/{totalPages}
                </div>
                
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1}
                  className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
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
              {selectedProjectData?.description}
            </p>
            {projects.length === 0 && (
              <div className="bg-muted/20 rounded-xl p-4 border border-border/30">
                <p className="text-sm text-muted-foreground text-center">
                  🚧 Website ini sedang dalam tahap development dan akan segera dapat diakses
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
