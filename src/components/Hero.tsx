import React from 'react';
import { ArrowRight, Star, Target, Coffee, Heart, Zap } from 'lucide-react';
import { useBackendData } from '../hooks/useBackendData';

const Hero = () => {
  const { contactInfo } = useBackendData();

  const scrollToServices = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConsultationClick = () => {
    if (contactInfo?.whatsApp) {
      const message = "Halo! Saya ingin konsultasi dalam pembuatan website. Bisakah kita diskusi lebih lanjut?";
      const url = `${contactInfo.whatsApp}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    } else {
      // Fallback to default WhatsApp number
      const whatsappNumber = "085156321198";
      const message = "Halo! Saya ingin konsultasi dalam pembuatan website. Bisakah kita diskusi lebih lanjut?";
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    }
  };

  const highlights = [
    { icon: Target, title: "Fokus Quality", description: "Setiap project dikerjakan dengan detail dan kualitas terbaik", color: "text-blue-500" },
    { icon: Coffee, title: "Konsultasi Gratis", description: "Diskusi tanpa batas untuk hasil yang sempurna", color: "text-green-500" },
    { icon: Heart, title: "After Sales", description: "Support dan maintenance berkelanjutan", color: "text-purple-500" },
    { icon: Zap, title: "Fast Response", description: "Respon cepat untuk setiap kebutuhan Anda", color: "text-yellow-500" }
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tr from-purple-500/15 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-sm">🔥 Partner Digital Terpercaya</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              <span className="block mb-2">Wujudkan</span>
              <span className="block bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Website Impian
              </span>
              <span className="block text-3xl md:text-4xl lg:text-5xl">Bisnis Anda!</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Dari <strong>website sederhana</strong> hingga <strong>aplikasi web kompleks</strong> - 
              Kami siap mengubah ide bisnis Anda menjadi solusi digital yang menguntungkan!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToServices}
                className="group px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white dark:text-gray-900 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold flex items-center justify-center gap-2"
              >
                🚀 Lihat Paket Layanan
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={handleConsultationClick}
                className="px-8 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-primary/30 text-gray-900 dark:text-white rounded-xl hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 font-semibold"
              >
                💬 Konsultasi Gratis
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
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
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {highlights.map(({ icon: Icon, title, description, color }, index) => (
                <div 
                  key={title}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Icon className={`w-8 h-8 ${color} mb-3`} />
                  <div className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</div>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">Siap Melayani Berbagai Bisnis</h3>
              <div className="grid grid-cols-2 gap-3">
                {["🏢 Startup", "🏪 UKM", "🏬 Korporat", "🛒 E-Commerce"].map((type, index) => (
                  <div key={index} className="text-center py-2 px-3 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{type}</span>
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
