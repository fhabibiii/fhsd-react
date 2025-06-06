
import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Projects = () => {
  const { data } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const selectedProjectData = data.projects.find(p => p.id === selectedProject);

  return (
    <section id="projects" className="py-32 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6 relative">
              Featured
              <span className="font-bold block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Projects
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary/60 to-transparent rounded-full"></div>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A collection of projects that showcase my skills and experience in software development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.projects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 animate-fade-in relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Hover gradient overlay */}
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
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1.5 bg-primary/10 text-primary text-xs rounded-full font-medium border border-primary/20"
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
                    className="flex-1 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-3 rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium hover:shadow-lg hover:shadow-primary/25"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Lihat Detail
                  </button>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                    >
                      <Github className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                    </a>
                  )}
                </div>
              </div>
            </div>
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
