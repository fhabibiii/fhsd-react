
import React, { Suspense } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Breadcrumb from '../components/Breadcrumb';

// Lazy load components for better performance
const Projects = React.lazy(() => import('../components/Projects'));
const Services = React.lazy(() => import('../components/Services'));
const Contact = React.lazy(() => import('../components/Contact'));
const Footer = React.lazy(() => import('../components/Footer'));
const WhatsAppButton = React.lazy(() => import('../components/WhatsAppButton'));

// Loading fallback component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
  </div>
);

const Index = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#home', active: true }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />
      
      {/* Breadcrumb Navigation */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      
      <div className="pt-12">
        <Hero />
        
        <Suspense fallback={<LoadingSpinner />}>
          <Projects />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <Services />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <Contact />
        </Suspense>
        
        <Suspense fallback={<LoadingSpinner />}>
          <Footer />
        </Suspense>
        
        <Suspense fallback={null}>
          <WhatsAppButton />
        </Suspense>
      </div>
    </div>
  );
};

export default Index;
