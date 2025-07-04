
import React from 'react';
import { Github, Mail, Phone, MapPin, Globe, Instagram } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useBackendData } from '../hooks/useBackendData';

const Footer = () => {
  const [footerRef, footerVisible] = useScrollAnimation();
  const { contactInfo } = useBackendData();

  const services = [
    'Basic Website',
    'Web App Dasar',
    'Web App Menengah', 
    'Web App Kompleks'
  ];

  const quickLinks = [
    { name: 'Beranda', href: '#home' },
    { name: 'Portfolio', href: '#projects' },
    { name: 'Layanan', href: '#services' },
    { name: 'Kontak', href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <footer 
      ref={footerRef}
      className={`relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 transform transition-all duration-1000 ${
        footerVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-tr from-pink-500/10 to-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                FH Solusi Digital
              </h3>
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Partner digital terpercaya untuk mengembangkan bisnis Anda. Kami menyediakan solusi website, 
                aplikasi web, dan strategi digital yang inovatif dan berkualitas tinggi.
              </p>
              
              {/* Social Media moved here */}
              <div>
                <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Ikuti Kami</h5>
                <div className="flex gap-3">
                  {[
                    { 
                      icon: Phone, 
                      href: contactInfo?.whatsApp || "https://wa.me/085156321198", 
                      color: "hover:bg-green-500/10 hover:border-green-500/30 hover:text-green-500",
                      label: "WhatsApp"
                    },
                    { 
                      icon: Instagram, 
                      href: contactInfo?.instagram || "#", 
                      color: "hover:bg-pink-500/10 hover:border-pink-500/30 hover:text-pink-500",
                      label: "Instagram" 
                    },
                    { 
                      icon: Mail, 
                      href: contactInfo?.email ? `mailto:${contactInfo.email}` : "mailto:hello@fhdigital.com", 
                      color: "hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-500",
                      label: "Email"
                    }
                  ].map(({ icon: Icon, href, color, label }, index) => (
                    <a
                      key={index}
                      href={href}
                      target={href.startsWith('mailto:') ? undefined : "_blank"}
                      rel={href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                      className={`group p-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 hover:scale-110 ${color} transform ${
                        footerVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}
                      style={{ 
                        transitionDelay: footerVisible ? `${index * 100}ms` : '0ms',
                        animationFillMode: 'both'
                      }}
                    >
                      <Icon className="w-4 h-4 transition-all duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Layanan Kami</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('#services');
                    }}
                    className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200 cursor-pointer text-sm flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-primary rounded-full group-hover:w-2 transition-all duration-200"></div>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Menu Cepat</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200 cursor-pointer text-sm flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-primary rounded-full group-hover:w-2 transition-all duration-200"></div>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                © 2024 FH Solusi Digital. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>Indonesia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
