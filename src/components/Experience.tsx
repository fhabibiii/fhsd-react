
import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Briefcase } from 'lucide-react';

const Experience = () => {
  const { data } = usePortfolio();
  const [titleRef, titleVisible] = useScrollAnimation();

  const ExperienceCard = ({ exp, index }: { exp: any; index: number }) => {
    const [cardRef, cardVisible] = useScrollAnimation();
    
    const iconColors = [
      'from-blue-500 to-cyan-600 shadow-blue-500/25',
      'from-purple-500 to-pink-600 shadow-purple-500/25',
      'from-green-500 to-emerald-600 shadow-green-500/25',
      'from-orange-500 to-red-600 shadow-orange-500/25',
      'from-indigo-500 to-blue-600 shadow-indigo-500/25',
    ];

    const cardColors = [
      'hover:border-blue-500/30 hover:shadow-blue-500/10',
      'hover:border-purple-500/30 hover:shadow-purple-500/10',
      'hover:border-green-500/30 hover:shadow-green-500/10',
      'hover:border-orange-500/30 hover:shadow-orange-500/10',
      'hover:border-indigo-500/30 hover:shadow-indigo-500/10',
    ];

    const iconColor = iconColors[index % iconColors.length];
    const cardColor = cardColors[index % cardColors.length];

    return (
      <div
        ref={cardRef}
        className={`relative group transform transition-all duration-700 ${
          cardVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-12 opacity-0'
        }`}
        style={{ 
          transitionDelay: cardVisible ? `${index * 200}ms` : '0ms',
          animationFillMode: 'both'
        }}
      >
        {/* Timeline line */}
        {index !== data.experience.length - 1 && (
          <div className="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-primary/30 to-transparent"></div>
        )}

        <div className="flex items-start gap-8">
          <div className="flex-shrink-0 relative z-10">
            <div className={`w-16 h-16 bg-gradient-to-br ${iconColor} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
              <Briefcase className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className={`flex-1 bg-card/60 backdrop-blur-sm p-8 rounded-2xl border border-border/50 ${cardColor} hover:shadow-lg transition-all duration-500 group-hover:bg-card/80 hover:scale-[1.02] hover:-translate-y-1`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                {exp.position}
              </h3>
              <span className="text-primary font-medium bg-primary/10 px-3 py-1 rounded-full text-sm border border-primary/20 hover:bg-primary/20 transition-colors duration-200">
                {exp.period}
              </span>
            </div>
            <h4 className="text-lg text-muted-foreground mb-4 font-medium">{exp.company}</h4>
            <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="experience" className="py-32 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-full blur-3xl transform translate-x-1/2 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl transform -translate-x-1/2 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-20 transform transition-all duration-1000 ${
            titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6 relative">
              Work
              <span className="font-bold block bg-gradient-to-r from-violet-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                Experience
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-emerald-500 rounded-full"></div>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            My professional journey and the impact I've made
          </p>
        </div>

        <div className="space-y-8">
          {data.experience.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
