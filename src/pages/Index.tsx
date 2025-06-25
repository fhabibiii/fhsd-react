
import React, { Suspense } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';

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
  return (
    <div className="min-h-screen overflow-x-hidden">
      <style jsx global>{`
        html, body {
          overflow-x: hidden;
        }
        
        /* Hide scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        body {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <Navigation />
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
  );
};

export default Index;
