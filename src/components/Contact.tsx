
import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Contact = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [formRef, formVisible] = useScrollAnimation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleWhatsAppClick = () => {
    const whatsappNumber = "085156321198";
    const message = "Halo! Saya ingin menghubungi FH Digital Solutions untuk konsultasi pembuatan website.";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-primary/5 to-transparent rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transform transition-all duration-1000 ${
            titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Mari <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">Berkolaborasi</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Siap untuk mengembangkan bisnis Anda? Hubungi kami sekarang untuk konsultasi gratis 
            dan wujudkan website impian Anda!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Phone,
                  title: "Telepon & WhatsApp",
                  content: "+62 851-5632-1198",
                  action: handleWhatsAppClick
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: "hello@fhdigital.com",
                  action: () => window.location.href = 'mailto:hello@fhdigital.com'
                },
                {
                  icon: MapPin,
                  title: "Lokasi",
                  content: "Yogyakarta, Indonesia",
                  action: () => {}
                },
                {
                  icon: Clock,
                  title: "Jam Operasional",
                  content: "Sen-Jum 9:00-17:00",
                  action: () => {}
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-105 cursor-pointer group"
                  onClick={item.action}
                >
                  <item.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.content}</p>
                </div>
              ))}
            </div>

            {/* Google Maps */}
            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-border/50">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Lokasi Kami
              </h3>
              <div className="rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31525.07543296743!2d110.37063807431643!3d-7.797068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5787bd5b6bc5%3A0x6b1e9e0b6b6b6b6b!2sYogyakarta%2C%20Special%20Region%20of%20Yogyakarta%2C%20Indonesia!5e0!3m2!1sen!2sid!4v1732122000000!5m2!1sen!2sid" 
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div 
            ref={formRef}
            className={`transform transition-all duration-1000 ${
              formVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-8 border border-border/50">
              <h3 className="text-2xl font-bold text-foreground mb-6">Kirim Pesan</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="nama@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    No. WhatsApp
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="08xx-xxxx-xxxx"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Jenis Layanan
                  </label>
                  <select className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors">
                    <option value="">Pilih jenis layanan</option>
                    <option value="basic">Basic Website</option>
                    <option value="web-app-basic">Web App Dasar</option>
                    <option value="web-app-medium">Web App Menengah</option>
                    <option value="web-app-complex">Web App Kompleks</option>
                    <option value="konsultasi">Konsultasi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Pesan
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                    placeholder="Ceritakan kebutuhan website atau aplikasi Anda..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary/90 text-white dark:text-gray-900 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 font-semibold"
                  >
                    💌 Kirim Pesan
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsAppClick}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white dark:text-gray-900 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 font-semibold"
                  >
                    💬 Chat WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
