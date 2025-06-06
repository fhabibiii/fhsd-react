
import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Briefcase } from 'lucide-react';

const Experience = () => {
  const { data } = usePortfolio();

  return (
    <section id="experience" className="py-32 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6 relative">
              Work
              <span className="font-bold block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Experience
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary/60 to-transparent rounded-full"></div>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            My professional journey and the impact I've made
          </p>
        </div>

        <div className="space-y-8">
          {data.experience.map((exp, index) => (
            <div
              key={exp.id}
              className="relative group animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Timeline line */}
              {index !== data.experience.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-primary/30 to-transparent"></div>
              )}

              <div className="flex items-start gap-8">
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Briefcase className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>

                <div className="flex-1 bg-card/60 backdrop-blur-sm p-8 rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group-hover:bg-card/80">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {exp.position}
                    </h3>
                    <span className="text-primary font-medium bg-primary/10 px-3 py-1 rounded-full text-sm border border-primary/20">
                      {exp.period}
                    </span>
                  </div>
                  <h4 className="text-lg text-muted-foreground mb-4 font-medium">{exp.company}</h4>
                  <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
