
import React from 'react';
import { Globe, Code, Zap, Rocket, Clock, CheckCircle, Settings } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useBackendData } from '../hooks/useBackendData';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

const Services = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const { services, contactInfo, loading } = useBackendData();

  const handleConsultationClick = () => {
    const whatsappUrl = contactInfo?.whatsApp || "https://wa.me/085156321198";
    const message = "Halo! Saya ingin konsultasi dalam memilih paket pembuatan website. Bisakah kita diskusi lebih lanjut?";
    const url = `${whatsappUrl}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handlePackageClick = (packageName: string) => {
    const whatsappUrl = contactInfo?.whatsApp || "https://wa.me/085156321198";
    const message = `Halo! Saya tertarik dengan paket ${packageName}. Bisakah kita diskusi lebih lanjut mengenai pembuatan website?`;
    const url = `${whatsappUrl}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const getServiceIcon = (title: string) => {
    if (title.toLowerCase().includes('basic') || title.toLowerCase().includes('website')) return Globe;
    if (title.toLowerCase().includes('dasar')) return Code;
    if (title.toLowerCase().includes('menengah')) return Zap;
    if (title.toLowerCase().includes('kompleks')) return Rocket;
    return Settings;
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
                <span className="text-gray-700 dark:text-gray-300 text-xs">{featureObj.feature}</span>
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

  const NoDataCard = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16">
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Settings className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Layanan Sedang Dipersiapkan
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Paket layanan kami sedang dalam tahap finalisasi. Silakan hubungi kami untuk konsultasi dan penawaran khusus.
        </p>
      </div>
    </div>
  );

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

        {loading.services ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Desktop/Large Tablet Grid */}
            <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
              {services.length === 0 ? (
                <NoDataCard />
              ) : (
                services.map((service, index) => (
                  <ServiceCard key={service.id} service={service} index={index} />
                ))
              )}
            </div>

            {/* Mobile/Small Tablet Carousel */}
            <div className="lg:hidden mb-16">
              {services.length === 0 ? (
                <NoDataCard />
              ) : (
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {services.map((service, index) => (
                      <CarouselItem key={service.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3">
                        <ServiceCard service={service} index={index} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
                </Carousel>
              )}
            </div>
          </>
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
