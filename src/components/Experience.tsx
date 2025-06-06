
import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Briefcase } from 'lucide-react';

const Experience = () => {
  const { data } = usePortfolio();

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Work Experience</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            My professional journey and the impact I've made
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {data.experience.map((exp, index) => (
            <div
              key={exp.id}
              className="relative mb-8 last:mb-0 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Timeline line */}
              {index !== data.experience.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-full bg-blue-200"></div>
              )}

              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center relative z-10">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                    <span className="text-blue-600 font-medium">{exp.period}</span>
                  </div>
                  <h4 className="text-lg text-gray-700 mb-3">{exp.company}</h4>
                  <p className="text-gray-600 leading-relaxed">{exp.description}</p>
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
