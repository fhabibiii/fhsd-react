
import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Award } from 'lucide-react';

const Certificates = () => {
  const { data } = usePortfolio();
  const [titleRef, titleVisible] = useScrollAnimation();

  const CertificateCard = ({ cert, index }: { cert: any; index: number }) => {
    const [cardRef, cardVisible] = useScrollAnimation();
    
    return (
      <div
        ref={cardRef}
        className={`group p-6 rounded-xl border border-border/50 dark:border-border/30 bg-card/80 dark:bg-card/60 backdrop-blur-sm hover:bg-card/90 dark:hover:bg-card/80 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2 transform ${
          cardVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        }`}
        style={{ 
          transitionDelay: cardVisible ? `${index * 100}ms` : '0ms',
          animationFillMode: 'both'
        }}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-medium text-foreground mb-1 transition-colors duration-300 group-hover:text-primary">
              {cert.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-1 hover:text-foreground transition-colors duration-200">{cert.institution}</p>
            <p className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full inline-block border border-primary/20 hover:bg-primary/20 transition-colors duration-200">{cert.year}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="certificates" className="py-24 bg-muted/30 dark:bg-muted/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-tr from-primary/8 to-primary/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transform transition-all duration-1000 ${
            titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
            Certificates &
            <span className="font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"> Achievements</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and recognitions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.certificates.map((cert, index) => (
            <CertificateCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
