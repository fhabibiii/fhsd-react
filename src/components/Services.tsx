
import React from 'react';
import { Globe, Code, Zap, Rocket, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useBackendData } from '../hooks/useBackendData';

const Services = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const { services, loading, errors } = useBackendData();

  const handleConsultationClick = () => {
    const whatsappNumber = "085156321198";
    const message = "Halo! Saya ingin konsultasi dalam memilih paket pembuatan website. Bisakah kita diskusi lebih lanjut?";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handlePackageClick = (packageName: string) => {
    const whatsappNumber = "085156321198";
    const message = `Halo! Saya tertarik dengan paket ${packageName}. Bisakah kita diskusi lebih lanjut mengenai pembuatan website?`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Fallback services if no backend data
  const fallbackServices = [
    {
      id: 'basic-website',
      title: 'Basic Website',
      duration: '5–7 hari',
      description: 'Landing page interaktif dengan kontak dan animasi ringan yang sempurna untuk memperkenalkan bisnis Anda.',
      features: [
        { feature: 'Landing page interaktif' },
        { feature: 'Form kontak terintegrasi' },
        { feature: 'Animasi ringan & smooth' },
        { feature: 'Responsive design' },
        { feature: 'SEO friendly' }
      ],
      price: 'Rp 2.500.000'
    },
    {
      id: 'web-app-basic',
      title: 'Web App Dasar',
      duration: '10–15 hari',
      description: 'Aplikasi web dengan fitur login, dashboard user, dan manajemen data dasar untuk kebutuhan bisnis kecil.',
      features: [
        { feature: 'Sistem login & registrasi' },
        { feature: 'Dashboard user' },
        { feature: 'Input data (CRUD)' },
        { feature: 'Validasi form' },
        { feature: 'Pagination data' }
      ],
      price: 'Rp 7.000.000'
    },
    {
      id: 'web-app-medium',
      title: 'Web App Menengah',
      duration: '20–30 hari',
      description: 'Solusi lengkap dengan admin panel, multi-role user, dan fitur advanced untuk bisnis yang berkembang.',
      features: [
        { feature: 'Admin panel lengkap' },
        { feature: 'Multi-role management' },
        { feature: 'Upload & manajemen file' },
        { feature: 'Grafik & analisis data' },
        { feature: 'Notifikasi email otomatis' }
      ],
      price: 'Rp 15.000.000'
    },
    {
      id: 'web-app-complex',
      title: 'Web App Kompleks',
      duration: '30–60 hari',
      description: 'Sistem besar dan kompleks dengan integrasi API, keamanan tinggi untuk enterprise dan skala besar.',
      features: [
        { feature: 'Sistem enterprise-grade' },
        { feature: 'E-commerce & afiliasi' },
        { feature: 'Integrasi API eksternal' },
        { feature: 'Keamanan tingkat tinggi' },
        { feature: 'Arsitektur scalable' }
      ],
      price: 'Rp 30.000.000'
    }
  ];

  const displayServices = services.length > 0 ? services : fallbackServices;

  const getServiceIcon = (title: string) => {
    if (title.toLowerCase().includes('basic')) return Globe;
    if (title.toLowerCase().includes('dasar')) return Code;
    if (title.toLowerCase().includes('menengah')) return Zap;
    if (title.toLowerCase().includes('kompleks')) return Rocket;
    return Globe;
  };

  const ServiceCard = ({ service, index }: { service: any; index: number }) => {
    const [cardRef, cardVisible] = useScrollAnimation();
    const IconComponent = getServiceIcon(service.title);

    return (
      <div
        ref={cardRef}
        className={`group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-xl hover:shadow-gray-900/10 dark:hover:shadow-white/20 transform flex flex-col ${
          cardVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        }`}
        style={{ 
          transitionDelay: cardVisible ? `${index * 150}ms` : '0ms',
          animationFillMode: 'both'
        }}
      >
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <IconComponent className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {service.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3" />
                <span>{service.duration}</span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
            {service.description}
          </p>

          <div className="space-y-2 mb-6 flex-1">
            {service.features.map((featureObj: any, featureIndex: number) => (
              <div key={featureIndex} className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 text-xs">
                  {featureObj.feature || featureObj}
                </span>
              </div>
            ))}
          </div>

          <button 
            onClick={() => handlePackageClick(service.title)}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white dark:text-gray-900 px-4 py-3 rounded-lg transition-all duration-300 font-semibold text-sm hover:scale-[1.02] flex flex-col items-center gap-1 mt-auto"
          >
            <span className="text-lg font-bold">{service.price}</span>
            <span>Pilih Paket Ini</span>
          </button>
        </div>
      </div>
    );
  };

  // Loading state
  if (loading.services) {
    return (
      <section id="services" className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transform transition-all duration-1000 ${
            titleVisible ?'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Paket <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">Layanan Kami</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Pilih paket yang sesuai dengan kebutuhan bisnis Anda. Semua paket sudah termasuk konsultasi gratis, 
            revisi unlimited, dan garansi 1 tahun.
          </p>
        </div>

        {/* Error State */}
        {errors.services && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-destructive/20 shadow-xl text-center mb-16">
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Failed to Load Services
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
              {errors.services}
            </p>
          </div>
        )}

        {/* No Data State */}
        {!errors.services && displayServices.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl text-center mb-16">
            <Zap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              No Services Available
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
              Services will appear here once they are added to the database.
            </p>
          </div>
        )}

        {/* Services Grid */}
        {displayServices.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {displayServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Masih Bingung Pilih Paket?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
              Tim ahli kami siap membantu menentukan solusi terbaik untuk kebutuhan bisnis Anda. 
              Konsultasi gratis tanpa komitmen!
            </p>
            <button 
              onClick={handleConsultationClick}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white dark:text-gray-900 px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 font-semibold"
            >
              💬 Konsultasi Gratis Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
