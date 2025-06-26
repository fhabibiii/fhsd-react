
import React from 'react';
import { ArrowRight, Star, Target, Coffee, Heart, Zap } from 'lucide-react';
import { useBackendData } from '../hooks/useBackendData';
import Breadcrumb from './Breadcrumb';

const Hero = () => {
  const { contactInfo } = useBackendData();

  const scrollToServices = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConsultationClick = () => {
    const whatsappUrl = contactInfo?.whatsApp || "https://wa.me/6281225510099";
    const message = "Halo! Saya ingin konsultasi dalam pembuatan website. Bisakah kita diskusi lebih lanjut?";
    const url = `${whatsappUrl}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const highlights = [
    { icon: Target, title: "Fokus Quality", description: "Setiap project dikerjakan dengan detail dan kualitas terbaik", color: "text-blue-500" },
    { icon: Coffee, title: "Konsultasi Gratis", description: "Diskusi tanpa batas untuk hasil yang sempurna", color: "text-green-500" },
    { icon: Heart, title: "After Sales", description: "Support dan maintenance berkelanjutan", color: "text-purple-500" },
    { icon: Zap, title: "Fast Response", description: "Respon cepat untuk setiap kebutuhan Anda", color: "text-yellow-500" }
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '#home', active: true }
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center hero-bg relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full blur-3xl animate-pulse" style={{ willChange: 'transform' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-tr from-purple-500/15 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', willChange: 'transform' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20">
              <Star className="w-4 h-4 text-primary" aria-hidden="true" />
              <span className="text-primary font-semibold text-sm">🔥 Partner Digital Terpercaya</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              <span className="block mb-2">Wujudkan</span>
              <span className="block bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Website Impian
              </span>
              <span className="block text-2xl md:text-3xl lg:text-4xl">Bisnis Anda!</span>
            </h1>
            
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Dari <strong>website sederhana</strong> hingga <strong>aplikasi web kompleks</strong> - 
              Kami siap mengubah ide bisnis Anda menjadi solusi digital yang menguntungkan!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={scrollToServices}
                className="group btn-primary px-6 py-3 font-semibold flex items-center justify-center gap-2"
                aria-label="Lihat paket layanan FH Solusi Digital"
              >
                🚀 Lihat Paket Layanan
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
              <button
                onClick={handleConsultationClick}
                className="px-6 py-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-primary/30 text-gray-900 dark:text-white rounded-xl hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 font-semibold"
                aria-label="Konsultasi gratis dengan FH Solusi Digital"
              >
                💬 Konsultasi Gratis
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3">
              {[
                "✅ Konsultasi & Revisi Unlimited",
                "🛡️ Garansi 1 Tahun Full Support",
                "⚡ Pengerjaan Tepat Waktu", 
                "💰 Harga Transparan No Hidden Cost"
              ].map((guarantee, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                  <span>{guarantee}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Business Highlights */}
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              {highlights.map(({ icon: Icon, title, description, color }, index) => (
                <div 
                  key={title}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 will-change-transform"
                >
                  <Icon 
                    className={`w-6 h-6 ${color} mb-2`} 
                    aria-hidden="true"
                  />
                  <div className="text-base font-bold text-gray-900 dark:text-white mb-1">{title}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{description}</div>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-lg">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 text-center">Siap Melayani Berbagai Bisnis</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { type: "🏢 Startup", alt: "Layanan website untuk perusahaan startup" },
                  { type: "🏪 UKM", alt: "Jasa website untuk usaha kecil menengah" }, 
                  { type: "🏬 Korporat", alt: "Solusi website untuk perusahaan korporat" },
                  { type: "🛒 E-Commerce", alt: "Pembuatan website toko online e-commerce" }
                ].map(({ type, alt }, index) => (
                  <div key={index} className="text-center py-2 px-2 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-lg">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300" title={alt}>{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
