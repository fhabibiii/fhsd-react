
import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const Skills = () => {
  const { data } = usePortfolio();

  return (
    <section id="skills" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
            Technical
            <span className="font-bold"> Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies I work with to build modern applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.skills.map((skillCategory, index) => (
            <div
              key={skillCategory.id}
              className="group p-6 rounded-xl border border-border hover:border-primary/20 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-lg font-medium text-foreground mb-6 group-hover:text-primary transition-colors">
                {skillCategory.category}
              </h3>
              <div className="space-y-3">
                {skillCategory.technologies.map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 py-1"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
