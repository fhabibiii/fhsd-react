
import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { GraduationCap } from 'lucide-react';

const Education = () => {
  const { data } = usePortfolio();
  const [titleRef, titleVisible] = useScrollAnimation();

  const EducationCard = ({ edu, index }: { edu: any; index: number }) => {
    const [cardRef, cardVisible] = useScrollAnimation();
    
    return (
      <div
        ref={cardRef}
        className={`group p-6 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm hover:bg-card/80 hover:border-primary/30 hover:shadow-lg transition-all duration-500 hover:scale-105 hover:-translate-y-2 transform ${
          cardVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        }`}
        style={{ 
          transitionDelay: cardVisible ? `${index * 150}ms` : '0ms',
          animationFillMode: 'both'
        }}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-3">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <h3 className="text-xl font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
                {edu.institution}
              </h3>
              <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full border border-primary/20 hover:bg-primary/20 transition-colors duration-200">
                {edu.year}
              </span>
            </div>
            <p className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              {edu.degree} • {edu.field}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="education" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/8 to-primary/4 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-tr from-primary/6 to-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transform transition-all duration-1000 ${
            titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
            Educational
            <span className="font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"> Background</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic journey and learning path
          </p>
        </div>

        <div className="space-y-6">
          {data.education.map((edu, index) => (
            <EducationCard key={edu.id} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
