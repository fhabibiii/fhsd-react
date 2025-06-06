
import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Skills = () => {
  const { data } = usePortfolio();
  const [titleRef, titleVisible] = useScrollAnimation();

  const SkillCard = ({ skillCategory, index }: { skillCategory: any; index: number }) => {
    const [cardRef, cardVisible] = useScrollAnimation();
    
    const colorVariants = [
      'border-blue-500/30 hover:border-blue-500/50 bg-gradient-to-br from-blue-500/5 to-blue-500/10',
      'border-purple-500/30 hover:border-purple-500/50 bg-gradient-to-br from-purple-500/5 to-purple-500/10',
      'border-green-500/30 hover:border-green-500/50 bg-gradient-to-br from-green-500/5 to-green-500/10',
      'border-orange-500/30 hover:border-orange-500/50 bg-gradient-to-br from-orange-500/5 to-orange-500/10',
      'border-pink-500/30 hover:border-pink-500/50 bg-gradient-to-br from-pink-500/5 to-pink-500/10',
      'border-cyan-500/30 hover:border-cyan-500/50 bg-gradient-to-br from-cyan-500/5 to-cyan-500/10',
    ];

    const titleColors = [
      'group-hover:text-blue-500',
      'group-hover:text-purple-500',
      'group-hover:text-green-500',
      'group-hover:text-orange-500',
      'group-hover:text-pink-500',
      'group-hover:text-cyan-500',
    ];

    const cardVariant = colorVariants[index % colorVariants.length];
    const titleColor = titleColors[index % titleColors.length];

    return (
      <div
        ref={cardRef}
        className={`group p-6 rounded-xl border ${cardVariant} transition-all duration-500 hover:scale-105 hover:-translate-y-2 transform ${
          cardVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        }`}
        style={{ 
          transitionDelay: cardVisible ? `${index * 100}ms` : '0ms',
          animationFillMode: 'both'
        }}
      >
        <h3 className={`text-lg font-medium text-foreground mb-6 transition-colors duration-300 ${titleColor}`}>
          {skillCategory.category}
        </h3>
        <div className="space-y-3">
          {skillCategory.technologies.map((tech: string, techIndex: number) => (
            <div
              key={techIndex}
              className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 py-2 px-3 rounded-lg hover:bg-card/50 cursor-default"
              style={{ 
                transitionDelay: cardVisible ? `${(index * 100) + (techIndex * 50)}ms` : '0ms'
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-tr from-pink-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transform transition-all duration-1000 ${
            titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
            Technical
            <span className="font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Skills</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies I work with to build modern applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.skills.map((skillCategory, index) => (
            <SkillCard key={skillCategory.id} skillCategory={skillCategory} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
