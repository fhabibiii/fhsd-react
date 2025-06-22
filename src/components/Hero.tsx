
import React from 'react';
import { ArrowRight, Star, Users, Award } from 'lucide-react';

const Hero = () => {
  const scrollToServices = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Enhanced background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/15 to-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-pink-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-primary/8 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        <div className="space-y-8 animate-fade-in">
          {/* Company Stats */}
          <div className="flex justify-center gap-8 mb-8">
            {[
              { icon: Users, label: "50+ Klien", color: "text-blue-500" },
              { icon: Award, label: "3+ Tahun", color: "text-green-500" },
              { icon: Star, label: "5.0 Rating", color: "text-yellow-500" }
            ].map(({ icon: Icon, label, color }, index) => (
              <div 
                key={label}
                className="flex flex-col items-center gap-2 opacity-80"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <Icon className={`w-6 h-6 ${color}`} />
                <span className="text-sm text-muted-foreground font-medium">{label}</span>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="relative">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-tight leading-tight">
                <span className="block font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  FH Digital Solutions
                </span>
              </h1>
              <p className="text-2xl md:text-3xl font-light text-foreground/90 mb-4">
                Partner Digital Terpercaya Anda
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed">
                Kami membantu bisnis Anda berkembang dengan solusi website profesional, aplikasi web modern, dan strategi digital yang efektif. 
                <span className="block mt-2 text-primary font-medium">
                  Dari konsep hingga implementasi, kami siap mewujudkan visi digital Anda!
                </span>
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-sm border border-border/50 shadow-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                  <span className="text-muted-foreground font-medium">Siap melayani 24/7</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/40 backdrop-blur-sm border border-border/30">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-muted-foreground/80">Konsultasi Gratis</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/40 backdrop-blur-sm border border-border/30">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-muted-foreground/80">Garansi 1 Tahun</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
            <button
              onClick={scrollToServices}
              className="group relative px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 font-medium flex items-center justify-center gap-2"
            >
              Lihat Layanan Kami
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToContact}
              className="group px-8 py-4 bg-card/50 backdrop-blur-sm border border-border/50 text-foreground rounded-xl hover:bg-card/70 hover:border-primary/30 transition-all duration-500 hover:scale-105 font-medium"
            >
              Konsultasi Gratis
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 border-t border-border/30 mt-12">
            <p className="text-sm text-muted-foreground mb-4">Dipercaya oleh berbagai perusahaan</p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <div className="px-4 py-2 bg-muted/20 rounded-lg">
                <span className="text-sm font-medium">Startup</span>
              </div>
              <div className="px-4 py-2 bg-muted/20 rounded-lg">
                <span className="text-sm font-medium">UKM</span>
              </div>
              <div className="px-4 py-2 bg-muted/20 rounded-lg">
                <span className="text-sm font-medium">Korporat</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
