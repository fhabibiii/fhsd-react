
import React from 'react';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center text-white max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-scale-in">
              Faqihuddin Habibi
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in delay-300">
              Senior Software Engineer & Full-Stack Developer
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto animate-fade-in delay-500">
              Passionate about creating innovative web solutions with modern technologies. 
              Specialized in React, Node.js, Python, and cloud technologies.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-12 animate-fade-in delay-700">
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="w-5 h-5" />
              <span>Jakarta, Indonesia</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Mail className="w-5 h-5" />
              <span>faqihuddin.habibi@email.com</span>
            </div>
          </div>

          <div className="flex justify-center gap-6 animate-fade-in delay-1000">
            <a
              href="https://linkedin.com/in/faqihuddin-habibi"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" />
            </a>
            <a
              href="https://github.com/faqihuddin-habibi"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <Github className="w-6 h-6 text-white group-hover:text-purple-400 transition-colors" />
            </a>
            <a
              href="mailto:faqihuddin.habibi@email.com"
              className="group p-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <Mail className="w-6 h-6 text-white group-hover:text-indigo-400 transition-colors" />
            </a>
          </div>

          <div className="mt-16 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto relative">
              <div className="w-1 h-3 bg-white/50 rounded-full mx-auto mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
