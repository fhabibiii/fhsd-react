
import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Award } from 'lucide-react';

const Certificates = () => {
  const { data } = usePortfolio();
  const [titleRef, titleVisible] = useScrollAnimation();

  const CertificateCard = ({ cert, index }: { cert: any; index: number }) => {
    const [cardRef, cardVisible] = useScrollAnimation();
    
    const cardColors = [
      'border-yellow-500/30 hover:border-yellow-500/50 bg-gradient-to-br from-yellow-500/5 to-orange-500/10 hover:shadow-yellow-500/10',
      'border-blue-500/30 hover:border-blue-500/50 bg-gradient-to-br from-blue-500/5 to-indigo-500/10 hover:shadow-blue-500/10',
      'border-green-500/30 hover:border-green-500/50 bg-gradient-to-br from-green-500/5 to-emerald-500/10 hover:shadow-green-500/10',
      'border-purple-500/30 hover:border-purple-500/50 bg-gradient-to-br from-purple-500/5 to-pink-500/10 hover:shadow-purple-500/10',
      'border-red-500/30 hover:border-red-500/50 bg-gradient-to-br from-red-500/5 to-orange-500/10 hover:shadow-red-500/10',
      'border-cyan-500/30 hover:border-cyan-500/50 bg-gradient-to-br from-cyan-500/5 to-blue-500/10 hover:shadow-cyan-500/10',
    ];

    const iconColors = [
      'bg-gradient-to-br from-yellow-500 to-orange-600 group-hover:from-yellow-600 group-hover:to-orange-700',
      'bg-gradient-to-br from-blue-500 to-indigo-600 group-hover:from-blue-600 group-hover:to-indigo-700',
      'bg-gradient-to-br from-green-500 to-emerald-600 group-hover:from-green-600 group-hover:to-emerald-700',
      'bg-gradient-to-br from-purple-500 to-pink-600 group-hover:from-purple-600 group-hover:to-pink-700',
      'bg-gradient-to-br from-red-500 to-orange-600 group-hover:from-red-600 group-hover:to-orange-700',
      'bg-gradient-to-br from-cyan-500 to-blue-600 group-hover:from-cyan-600 group-hover:to-blue-700',
    ];

    const titleColors = [
      'group-hover:text-yellow-500',
      'group-hover:text-blue-500',
      'group-hover:text-green-500',
      'group-hover:text-purple-500',
      'group-hover:text-red-500',
      'group-hover:text-cyan-500',
    ];

    const cardColor = cardColors[index % cardColors.length];
    const iconColor = iconColors[index % iconColors.length];
    const titleColor = titleColors[index % titleColors.length];

    return (
      <div
        ref={cardRef}
        className={`group p-6 rounded-xl border ${cardColor} hover:shadow-lg transition-all duration-500 hover:scale-105 hover:-translate-y-2 transform ${
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
          <div className={`flex-shrink-0 w-10 h-10 rounded-full ${iconColor} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}>
            <Award className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`text-base font-medium text-foreground mb-1 transition-colors duration-300 ${titleColor}`}>
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
    <section id="certificates" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-tr from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
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
            <span className="font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent"> Achievements</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 rounded-full mx-auto mb-4"></div>
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
