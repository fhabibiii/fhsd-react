
import React, { Suspense } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import { Helmet } from 'react-helmet-async';

// Lazy load components for better performance
const Projects = React.lazy(() => import('../components/Projects'));
const Services = React.lazy(() => import('../components/Services'));
const Contact = React.lazy(() => import('../components/Contact'));
const Footer = React.lazy(() => import('../components/Footer'));
const WhatsAppButton = React.lazy(() => import('../components/WhatsAppButton'));

// Optimized loading fallback component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20" role="status" aria-label="Loading">
    <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

const Index = () => {
  return (
    <>
      <Helmet>
        <title>FH Digital Solutions - Jasa Pembuatan Website Profesional Indonesia</title>
        <meta name="description" content="FH Digital Solutions menyediakan jasa pembuatan website profesional, aplikasi web, dan solusi digital terpercaya di Indonesia. Konsultasi gratis untuk kebutuhan digital bisnis Anda." />
        <meta name="keywords" content="jasa website jakarta, pembuatan website profesional, web development indonesia, aplikasi web custom, website bisnis, toko online, landing page, web design modern" />
        <link rel="canonical" href="https://fh-digital.com" />
        
        {/* Open Graph optimized */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="id_ID" />
        <meta property="og:site_name" content="FH Digital Solutions" />
        
        {/* Structured data for better SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "FH Digital Solutions",
            "url": "https://fh-digital.com",
            "description": "Jasa pembuatan website profesional dan solusi digital terpercaya",
            "publisher": {
              "@type": "Organization",
              "name": "FH Digital Solutions"
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://fh-digital.com/?s={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen overflow-x-hidden">
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
    </>
  );
};

export default Index;
