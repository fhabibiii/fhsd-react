
import React, { useState } from 'react';
import { ExternalLink, Globe, ChevronLeft, ChevronRight, FolderOpen } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useBackendData } from '../hooks/useBackendData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Projects = () => {
  const { projects, loading } = useBackendData();
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
        setCurrentPage(0);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerPage]);
  
  const selectedProjectData = projects.find(p => p.id === selectedProject);

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const currentProjects = projects.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  // Function to get appropriate grid classes based on number of items
  const getGridClasses = () => {
    const count = currentProjects.length;
    if (count === 1) {
      return 'flex justify-center';
    } else if (count === 2) {
      return 'flex justify-center gap-8';
    } else {
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center';
    }
  };

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
        className={`group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-xl hover:shadow-gray-900/10 dark:hover:shadow-white/20 transform flex flex-col max-w-sm w-full ${
          cardVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        }`}
        style={{ 
          transitionDelay: cardVisible ? `${index * 150}ms` : '0ms',
          animationFillMode: 'both'
        }}
      >
        <div className="relative overflow-hidden rounded-t-xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm line-clamp-4 flex-1">
            {project.description}
          </p>

          <button
            onClick={handleViewProject}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white dark:text-gray-900 px-4 py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 text-sm font-medium hover:shadow-lg hover:shadow-primary/25 mt-auto"
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
    );
  };

  const NoDataCard = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16">
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <FolderOpen className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Belum Ada Project
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Project portfolio sedang dalam tahap pengembangan. Silakan kembali lagi nanti untuk melihat karya-karya terbaru kami.
        </p>
      </div>
    </div>
  );

  return (
    <section id="projects" className="py-32 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-20 transform transition-all duration-1000 ${
            titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6 relative">
              Portfolio
              <span className="font-bold block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Website Kami
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-full"></div>
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Koleksi website dan aplikasi web yang telah kami kembangkan untuk berbagai klien dari berbagai industri. 
            Setiap project dibuat dengan kualitas terbaik dan desain yang menarik.
          </p>
        </div>

        {loading.projects ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className={`${getGridClasses()} mb-12`}>
              {projects.length === 0 ? (
                <NoDataCard />
              ) : (
                currentProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))
              )}
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
        <DialogContent className="max-w-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
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
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {selectedProjectData?.description}
            </p>
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
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
