
import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { GraduationCap } from 'lucide-react';

const Education = () => {
  const { data } = usePortfolio();

  return (
    <section id="education" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Education</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            My academic background and learning journey
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-6">
          {data.education.map((edu, index) => (
            <div
              key={edu.id}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{edu.institution}</h3>
                    <span className="text-blue-600 font-medium">{edu.year}</span>
                  </div>
                  <p className="text-lg text-gray-700 mb-1">{edu.degree} - {edu.field}</p>
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
