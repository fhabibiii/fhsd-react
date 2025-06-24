import React, { useEffect } from 'react';
import { Globe, Code, Zap, Rocket, Clock, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { usePortfolio } from '../context/PortfolioContext';

const Services = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const { state, fetchServices } = usePortfolio();

  useEffect(() => {
    fetchServices();
  }, []);

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

  const getServiceIcon = (index: number) => {
    const icons = [Globe, Code, Zap, Rocket];
    return icons[index % icons.length];
  };

  const ServiceCard = ({ service, index }: { service: any; index: number }) => {
    const [cardRef, cardVisible] = useScrollAnimation();
    const ServiceIcon = getServiceIcon(index);

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
              <ServiceIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {service.title}
              </h3>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
            {service.description}
          </p>

          <div className="space-y-2 mb-6 flex-1">
            {service.features.map((feature: string, featureIndex: number) => (
              <div key={featureIndex} className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 text-xs">{feature}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={() => handlePackageClick(service.title)}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white dark:text-gray-900 px-4 py-3 rounded-lg transition-all duration-300 font-semibold text-sm hover:scale-[1.02] flex flex-col items-center gap-1 mt-auto"
          >
            <span>Pilih Paket Ini</span>
          </button>
        </div>
      </div>
    );
  };

  if (state.loading) {
    return (
      <section id="services" className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Memuat layanan...</p>
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

        {state.services.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">Belum ada layanan yang tersedia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {state.services.map((service, index) => (
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
