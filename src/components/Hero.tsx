
import React from 'react';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 relative">
      {/* Minimal background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground tracking-tight">
              Faqihuddin
              <span className="block font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Habibi
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Senior Software Engineer crafting digital experiences with modern technologies
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Available for projects</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <span>Jakarta, Indonesia</span>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <a
              href="https://linkedin.com/in/faqihuddin-habibi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://github.com/faqihuddin-habibi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
            >
              <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="mailto:faqihuddin.habibi@email.com"
              className="p-3 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
            >
              <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>

          <div className="pt-16">
            <div className="flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
              <span className="text-xs font-medium">Scroll to explore</span>
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
