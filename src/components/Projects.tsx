
import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Projects = () => {
  const { data } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [titleRef, titleVisible] = useScrollAnimation();
  
  const selectedProjectData = data.projects.find(p => p.id === selectedProject);

  const ProjectCard = ({ project, index }: { project: any; index: number }) => {
    const [cardRef, cardVisible] = useScrollAnimation();
    
    // Color variations for cards
    const colorVariants = [
      'from-blue-500/10 to-cyan-500/10 border-blue-500/20',
      'from-purple-500/10 to-pink-500/10 border-purple-500/20',
      'from-green-500/10 to-emerald-500/10 border-green-500/20',
      'from-orange-500/10 to-red-500/10 border-orange-500/20',
      'from-indigo-500/10 to-blue-500/10 border-indigo-500/20',
      'from-pink-500/10 to-rose-500/10 border-pink-500/20',
    ];
    
    const buttonVariants = [
      'from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 shadow-blue-500/25',
      'from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-purple-500/25',
      'from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-green-500/25',
      'from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-orange-500/25',
      'from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 shadow-indigo-500/25',
      'from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-pink-500/25',
    ];
    
    const cardColor = colorVariants[index % colorVariants.length];
    const buttonColor = buttonVariants[index % buttonVariants.length];

    return (
      <div
        ref={cardRef}
        className={`group bg-gradient-to-br ${cardColor} backdrop-blur-sm rounded-2xl border overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:-translate-y-3 relative transform ${
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
              onClick={() => setSelectedProject(project.id)}
              className={`flex-1 bg-gradient-to-r ${buttonColor} text-white px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium hover:shadow-lg transform hover:scale-105`}
            >
              <ExternalLink className="w-4 h-4" />
              Lihat Detail
            </button>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card/80 border border-border rounded-xl hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 hover:rotate-3"
              >
                <Github className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-32 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-500/10 to-cyan-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl"></div>
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
              Featured
              <span className="font-bold block bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Projects
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full"></div>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A collection of projects that showcase my skills and experience in software development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-md border border-border/50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
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
            {selectedProjectData?.link && (
              <a
                href={selectedProjectData.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-3 rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
