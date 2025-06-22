
import React from 'react';
import { Globe, Smartphone, ShoppingCart, Zap, Code, Palette, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Services = () => {
  const [titleRef, titleVisible] = useScrollAnimation();

  const services = [
    {
      id: 'static-website',
      icon: Globe,
      title: 'Website Statis',
      description: 'Website company profile, landing page, dan portofolio dengan performa tinggi dan SEO optimal.',
      features: ['Responsive Design', 'SEO Friendly', 'Loading Cepat', 'Mobile Optimized'],
      price: 'Mulai dari Rp 2.500.000',
      popular: false,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'web-app',
      icon: Code,
      title: 'Aplikasi Web',
      description: 'Sistem manajemen, dashboard admin, dan aplikasi bisnis dengan fitur lengkap dan database terintegrasi.',
      features: ['Database Integration', 'User Management', 'Real-time Updates', 'Admin Dashboard'],
      price: 'Mulai dari Rp 8.000.000',
      popular: true,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'ecommerce',
      icon: ShoppingCart,
      title: 'E-Commerce',
      description: 'Toko online lengkap dengan sistem pembayaran, manajemen produk, dan laporan penjualan.',
      features: ['Payment Gateway', 'Inventory System', 'Order Management', 'Analytics'],
      price: 'Mulai dari Rp 12.000.000',
      popular: false,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 'mobile-app',
      icon: Smartphone,
      title: 'Mobile App (PWA)',
      description: 'Aplikasi mobile yang dapat diinstall di smartphone dengan performa seperti native app.',
      features: ['Offline Support', 'Push Notifications', 'App Install', 'Cross Platform'],
      price: 'Mulai dari Rp 15.000.000',
      popular: false,
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 'custom',
      icon: Zap,
      title: 'Solusi Custom',
      description: 'Pengembangan khusus sesuai kebutuhan bisnis Anda dengan teknologi terdepan.',
      features: ['Custom Features', 'API Integration', 'Third-party Services', 'Scalable Architecture'],
      price: 'Harga Negosiasi',
      popular: false,
      gradient: 'from-violet-500 to-purple-500'
    },
    {
      id: 'ui-ux',
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Desain antarmuka yang menarik dan user experience yang optimal untuk website atau aplikasi Anda.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design System'],
      price: 'Mulai dari Rp 5.000.000',
      popular: false,
      gradient: 'from-pink-500 to-rose-500'
    }
  ];

  const ServiceCard = ({ service, index }: { service: any; index: number }) => {
    const [cardRef, cardVisible] = useScrollAnimation();

    return (
      <div
        ref={cardRef}
        className={`group relative bg-card/80 dark:bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 dark:border-border/30 overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:-translate-y-3 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transform ${
          cardVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        } ${service.popular ? 'ring-2 ring-primary/50' : ''}`}
        style={{ 
          transitionDelay: cardVisible ? `${index * 150}ms` : '0ms',
          animationFillMode: 'both'
        }}
      >
        {service.popular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
              Paling Populer
            </div>
          </div>
        )}

        {/* Animated gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-all duration-500 rounded-2xl`}></div>
        
        <div className="p-8 relative z-10">
          <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <service.icon className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
            {service.title}
          </h3>
          
          <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
            {service.description}
          </p>

          <div className="space-y-3 mb-6">
            {service.features.map((feature: string, featureIndex: number) => (
              <div key={featureIndex} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} shadow-sm`}></div>
                <span className="text-sm text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-border/50 pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold text-primary">{service.price}</span>
            </div>
            <button className={`w-full bg-gradient-to-r ${service.gradient} text-white px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium hover:shadow-lg transform hover:scale-105 group`}>
              Pilih Paket
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="services" className="py-32 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/8 to-primary/4 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-20 transform transition-all duration-1000 ${
            titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6 relative">
              Layanan
              <span className="font-bold block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Profesional Kami
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-full"></div>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Solusi digital lengkap untuk mengembangkan bisnis Anda. Dari website sederhana hingga aplikasi kompleks, 
            kami siap mewujudkan kebutuhan digital Anda dengan kualitas terbaik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Tidak yakin paket mana yang cocok?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Konsultasikan kebutuhan Anda dengan tim ahli kami. Kami akan membantu menentukan solusi terbaik untuk bisnis Anda.
            </p>
            <button className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105 font-medium">
              Konsultasi Gratis Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
