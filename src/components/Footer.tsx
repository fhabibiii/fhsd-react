
import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Faqihuddin Habibi</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's connect and build something amazing together!
          </p>

          <div className="flex justify-center gap-6 mb-8">
            <a
              href="https://linkedin.com/in/faqihuddin-habibi"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-6 h-6 group-hover:text-white" />
            </a>
            <a
              href="https://github.com/faqihuddin-habibi"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 bg-gray-800 rounded-full hover:bg-purple-600 transition-all duration-300 hover:scale-110"
            >
              <Github className="w-6 h-6 group-hover:text-white" />
            </a>
            <a
              href="mailto:faqihuddin.habibi@email.com"
              className="group p-3 bg-gray-800 rounded-full hover:bg-indigo-600 transition-all duration-300 hover:scale-110"
            >
              <Mail className="w-6 h-6 group-hover:text-white" />
            </a>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400 flex items-center justify-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-500" /> by Faqihuddin Habibi
            </p>
            <p className="text-gray-500 text-sm mt-2">
              © 2024 All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
