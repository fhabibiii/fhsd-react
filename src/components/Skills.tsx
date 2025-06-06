
import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Code, Globe, Server } from 'lucide-react';

const Skills = () => {
  const { data } = usePortfolio();
  const [titleRef, titleVisible] = useScrollAnimation();

  // Filter out database skills and limit to 3 categories
  const filteredSkills = data.skills
    .filter(skillCategory => !skillCategory.category.toLowerCase().includes('database') && !skillCategory.category.toLowerCase().includes('db'))
    .slice(0, 3);

  const getIconForCategory = (category: string) => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('frontend') || lowerCategory.includes('front')) return Globe;
    if (lowerCategory.includes('backend') || lowerCategory.includes('back')) return Server;
    return Code;
  };

  const SkillCard = ({ skillCategory, index }: { skillCategory: any; index: number }) => {
    const [cardRef, cardVisible] = useScrollAnimation();
    const IconComponent = getIconForCategory(skillCategory.category);
    
    return (
      <div
        ref={cardRef}
        className={`group relative p-8 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transform ${
          cardVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        }`}
        style={{ 
          transitionDelay: cardVisible ? `${index * 150}ms` : '0ms',
          animationFillMode: 'both'
        }}
      >
        {/* Gradient background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Icon and title */}
        <div className="relative z-10 mb-6 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors duration-300">
            <IconComponent className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {skillCategory.category}
          </h3>
        </div>
        
        {/* Technologies grid */}
        <div className="relative z-10 grid grid-cols-1 gap-3">
          {skillCategory.technologies.map((tech: string, techIndex: number) => (
            <div
              key={techIndex}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 border border-border/30 hover:border-primary/30 transition-all duration-300 group/tech cursor-default"
              style={{ 
                transitionDelay: cardVisible ? `${(index * 150) + (techIndex * 50)}ms` : '0ms'
              }}
            >
              <div className="w-2 h-2 rounded-full bg-primary/60 group-hover/tech:bg-primary transition-colors duration-200"></div>
              <span className="text-sm font-medium text-muted-foreground group-hover/tech:text-foreground transition-colors duration-200">
                {tech}
              </span>
            </div>
          ))}
        </div>

        {/* Decorative corner element */}
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-300"></div>
      </div>
    );
  };

  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-primary/8 to-primary/4 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-tr from-primary/6 to-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-20 transform transition-all duration-1000 ${
            titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6">
            Technical
            <span className="font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"> Expertise</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Crafting digital experiences with cutting-edge technologies and modern development practices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSkills.map((skillCategory, index) => (
            <SkillCard key={skillCategory.id} skillCategory={skillCategory} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
