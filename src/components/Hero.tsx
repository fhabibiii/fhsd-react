
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Enhanced background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        <div className="space-y-10 animate-fade-in">
          <div className="space-y-8">
            <div className="relative">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-foreground tracking-tight leading-tight">
                Faqihuddin
                <span className="block font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent relative">
                  Habibi
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary/50 to-transparent rounded-full"></div>
                </span>
              </h1>
            </div>
            
            <div className="space-y-4">
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                Senior Software Engineer crafting digital experiences with modern technologies
              </p>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-muted-foreground">Available for projects</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-card/30 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full"></div>
              <span className="text-muted-foreground/80">Jakarta, Indonesia</span>
            </div>
          </div>

          <div className="flex justify-center gap-6">
            {[
              { icon: Linkedin, href: "https://linkedin.com/in/faqihuddin-habibi", label: "LinkedIn" },
              { icon: Github, href: "https://github.com/faqihuddin-habibi", label: "GitHub" },
              { icon: Mail, href: "mailto:faqihuddin.habibi@email.com", label: "Email" }
            ].map(({ icon: Icon, href, label }, index) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : "_blank"}
                rel={href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                className="group relative p-4 rounded-2xl bg-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/40 hover:bg-card/60 transition-all duration-500 hover:scale-110 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
