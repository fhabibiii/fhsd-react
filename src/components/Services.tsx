import React from 'react';
import { Globe, Code, Zap, Rocket, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Services = () => {
  const [titleRef, titleVisible] = useScrollAnimation();

  const services = [
    {
      id: 'basic-website',
      icon: Globe,
      title: 'Basic Website',
      duration: '5–7 hari',
      description: 'Landing page interaktif dengan kontak dan animasi ringan yang sempurna untuk memperkenalkan bisnis Anda.',
      features: ['Landing page interaktif', 'Form kontak terintegrasi', 'Animasi ringan & smooth', 'Responsive design', 'SEO friendly'],
      price: 'Mulai dari Rp 2.500.000',
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20'
    },
    {
      id: 'web-app-basic',
      icon: Code,
      title: 'Web App Dasar',
      duration: '10–15 hari',
      description: 'Aplikasi web dengan fitur login, dashboard user, dan manajemen data dasar untuk kebutuhan bisnis kecil.',
      features: ['Sistem login & registrasi', 'Dashboard user', 'Input data (CRUD)', 'Validasi form', 'Pagination data'],
      price: 'Mulai dari Rp 7.000.000',
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20'
    },
    {
      id: 'web-app-medium',
      icon: Zap,
      title: 'Web App Menengah',
      duration: '20–30 hari',
      description: 'Solusi lengkap dengan admin panel, multi-role user, dan fitur advanced untuk bisnis yang berkembang.',
      features: ['Admin panel lengkap', 'Multi-role management', 'Upload & manajemen file', 'Grafik & analisis data', 'Notifikasi email otomatis'],
      price: 'Mulai dari Rp 15.000.000',
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20'
    },
    {
      id: 'web-app-complex',
      icon: Rocket,
      title: 'Web App Kompleks',
      duration: '30–60 hari',
      description: 'Sistem besar dan kompleks dengan integrasi API, keamanan tinggi untuk enterprise dan skala besar.',
      features: ['Sistem enterprise-grade', 'E-commerce & afiliasi', 'Integrasi API eksternal', 'Keamanan tingkat tinggi', 'Arsitektur scalable'],
      price: 'Mulai dari Rp 30.000.000',
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20'
    }
  ];

  const ServiceCard = ({ service, index }: { service: any; index: number }) => {
    const [cardRef, cardVisible] = useScrollAnimation();

    return (
      <div
        ref={cardRef}
        className={`group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 transform ${
          cardVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        }`}
        style={{ 
          transitionDelay: cardVisible ? `${index * 150}ms` : '0ms',
          animationFillMode: 'both'
        }}
      >
        <div className={`h-1 bg-gradient-to-r ${service.gradient}`}></div>
        
        <div className="p-5">
          <div className={`inline-flex p-2.5 rounded-lg ${service.bgColor} mb-3 group-hover:scale-105 transition-transform duration-300`}>
            <service.icon className={`w-5 h-5 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`} />
          </div>

          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              {service.title}
            </h3>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full">
              <Clock className="w-3 h-3 text-gray-600 dark:text-gray-400" />
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{service.duration}</span>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-3 leading-relaxed text-xs">
            {service.description}
          </p>

          <div className="space-y-1.5 mb-4">
            {service.features.map((feature: string, featureIndex: number) => (
              <div key={featureIndex} className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 text-xs">{feature}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
            <div className="text-center mb-3">
              <span className="text-sm font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                {service.price}
              </span>
            </div>
            <button className={`w-full bg-gradient-to-r ${service.gradient} text-white px-3 py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium hover:shadow-md transform hover:scale-[1.02] text-xs`}>
              Pilih Paket Ini
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/8 to-primary/4 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transform transition-all duration-1000 ${
            titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Paket <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">Layanan Kami</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Pilih paket yang sesuai dengan kebutuhan bisnis Anda. Semua paket sudah termasuk konsultasi gratis, 
            revisi unlimited, dan garansi 1 tahun.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-sm rounded-2xl p-8 border border-primary/10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Masih Bingung Pilih Paket?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
              Tim ahli kami siap membantu menentukan solusi terbaik untuk kebutuhan bisnis Anda. 
              Konsultasi gratis tanpa komitmen!
            </p>
            <button className="bg-gradient-to-r from-primary to-primary/80 text-white dark:text-gray-900 px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105 font-semibold">
              💬 Konsultasi Gratis Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
