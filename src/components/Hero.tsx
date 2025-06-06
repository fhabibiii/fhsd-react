
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Enhanced background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/15 to-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-pink-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-primary/8 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-32">
        <div className="space-y-12 animate-fade-in">
          <div className="space-y-8">
            <div className="relative">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-foreground tracking-tight leading-tight">
                Faqihuddin
                <span className="block font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent relative mt-2">
                  Habibi
                </span>
              </h1>
            </div>
            
            <div className="space-y-6">
              <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed">
                Senior Software Engineer crafting digital experiences with modern technologies
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-base">
                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-card/60 backdrop-blur-sm border border-border/50 shadow-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                  <span className="text-muted-foreground font-medium">Available for projects</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-card/40 backdrop-blur-sm border border-border/30">
                  <div className="w-2 h-2 bg-muted-foreground/60 rounded-full"></div>
                  <span className="text-muted-foreground/80">Jakarta, Indonesia</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-8">
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
                className="group relative p-5 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/70 hover:border-primary/30 transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
