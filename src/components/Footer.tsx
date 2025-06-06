
import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-card via-card/95 to-card/80 border-t border-border/50 backdrop-blur-sm">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h3 className="text-3xl font-light text-foreground">
              Faqihuddin
              <span className="font-bold block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Habibi
              </span>
            </h3>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Let's connect and build something amazing together!
            </p>
          </div>

          <div className="flex justify-center gap-6">
            {[
              { icon: Linkedin, href: "https://linkedin.com/in/faqihuddin-habibi", color: "hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-500" },
              { icon: Github, href: "https://github.com/faqihuddin-habibi", color: "hover:bg-purple-500/10 hover:border-purple-500/30 hover:text-purple-500" },
              { icon: Mail, href: "mailto:faqihuddin.habibi@email.com", color: "hover:bg-green-500/10 hover:border-green-500/30 hover:text-green-500" }
            ].map(({ icon: Icon, href, color }, index) => (
              <a
                key={href}
                href={href}
                target={href.startsWith('mailto:') ? undefined : "_blank"}
                rel={href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                className={`group p-4 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${color}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon className="w-6 h-6 transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="border-t border-border/30 pt-8 space-y-4">
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> by Faqihuddin Habibi
            </p>
            <p className="text-muted-foreground/60 text-sm">
              © 2024 All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
