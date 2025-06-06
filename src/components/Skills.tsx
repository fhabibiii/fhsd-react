
import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const Skills = () => {
  const { data } = usePortfolio();

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Skills</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.skills.map((skillCategory, index) => (
            <div
              key={skillCategory.id}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                {skillCategory.category}
              </h3>
              <div className="space-y-3">
                {skillCategory.technologies.map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="bg-white px-4 py-2 rounded-lg text-center text-gray-700 border border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 hover:scale-105"
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
