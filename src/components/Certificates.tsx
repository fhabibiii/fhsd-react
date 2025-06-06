
import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award } from 'lucide-react';

const Certificates = () => {
  const { data } = usePortfolio();

  return (
    <section id="certificates" className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
            Certificates &
            <span className="font-bold"> Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and recognitions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.certificates.map((cert, index) => (
            <div
              key={cert.id}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">{cert.institution}</p>
                  <p className="text-xs text-primary font-medium">{cert.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
