
import React from 'react';
import { ArrowRight, Star, Users, Award, CheckCircle, Trophy, Clock } from 'lucide-react';

const Hero = () => {
  const scrollToServices = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const achievements = [
    { icon: Users, number: "50+", label: "Klien Puas", color: "text-blue-500" },
    { icon: Trophy, number: "100+", label: "Project Selesai", color: "text-green-500" },
    { icon: Clock, number: "3+", label: "Tahun Pengalaman", color: "text-purple-500" },
    { icon: Award, number: "5.0", label: "Rating Client", color: "text-yellow-500" }
  ];

  const guarantees = [
    "✅ Konsultasi & Revisi Unlimited",
    "🛡️ Garansi 1 Tahun Full Support", 
    "⚡ Pengerjaan Tepat Waktu",
    "💰 Harga Transparan No Hidden Cost"
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tr from-purple-500/15 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto pt-20">
        <div className="space-y-12 animate-fade-in">
          {/* Main Hero Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20">
                <Star className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold">🔥 Partner Digital Terpercaya #1 di Indonesia</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                <span className="block mb-4">Wujudkan</span>
                <span className="block bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  Website Impian
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl">Bisnis Anda!</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Dari <strong>website sederhana</strong> hingga <strong>aplikasi web kompleks</strong> - 
                Kami siap mengubah ide bisnis Anda menjadi solusi digital yang menguntungkan!
              </p>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {achievements.map(({ icon: Icon, number, label, color }, index) => (
                <div 
                  key={label}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <Icon className={`w-8 h-8 ${color} mx-auto mb-3`} />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{number}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{label}</div>
                </div>
              ))}
            </div>

            {/* Guarantees */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🎯 Mengapa Memilih FH Digital Solutions?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guarantees.map((guarantee, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-lg">{guarantee}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
            <button
              onClick={scrollToServices}
              className="group relative px-12 py-5 bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 font-bold text-lg flex items-center justify-center gap-3"
            >
              🚀 Lihat Paket Layanan
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            <button
              onClick={scrollToContact}
              className="group px-12 py-5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-primary/30 text-gray-900 dark:text-white rounded-2xl hover:bg-primary/5 hover:border-primary/50 transition-all duration-500 hover:scale-105 font-bold text-lg flex items-center justify-center gap-3"
            >
              💬 Konsultasi Gratis
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">Dipercaya oleh berbagai jenis bisnis</p>
            <div className="flex justify-center items-center gap-8">
              {["🏢 Startup", "🏪 UKM", "🏬 Korporat", "🛒 E-Commerce", "🎓 Edukasi"].map((type, index) => (
                <div key={index} className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-md">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
    </section>
  );
};

export default Hero;
