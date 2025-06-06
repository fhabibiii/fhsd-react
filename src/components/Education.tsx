
import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { GraduationCap } from 'lucide-react';

const Education = () => {
  const { data } = usePortfolio();

  return (
    <section id="education" className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
            Educational
            <span className="font-bold"> Background</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic journey and learning path
          </p>
        </div>

        <div className="space-y-6">
          {data.education.map((edu, index) => (
            <div
              key={edu.id}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                      {edu.institution}
                    </h3>
                    <span className="text-sm text-primary font-medium">{edu.year}</span>
                  </div>
                  <p className="text-muted-foreground">
                    {edu.degree} • {edu.field}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
