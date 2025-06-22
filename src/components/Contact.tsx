
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Globe, Calendar } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telepon & WhatsApp',
      details: '+62 812-3456-7890',
      subdescription: 'Respon cepat dalam 5 menit',
      action: 'tel:+6281234567890',
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20'
    },
    {
      icon: Mail,
      title: 'Email Bisnis',
      details: 'hello@fhdigital.com',
      subdescription: 'Untuk penawaran & konsultasi',
      action: 'mailto:hello@fhdigital.com',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20'
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      details: 'Senin - Jumat: 09:00 - 21:00',
      subdescription: 'Sabtu: 09:00 - 15:00 | Minggu: Libur',
      action: '#',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20'
    },
    {
      icon: Calendar,
      title: 'Meeting Online',
      details: 'Zoom / Google Meet',
      subdescription: 'Jadwalkan konsultasi gratis',
      action: '#',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20'
    }
  ];

  const projectTypes = [
    'Basic Website',
    'Web App Dasar', 
    'Web App Menengah',
    'Web App Kompleks',
    'Konsultasi'
  ];

  const budgetRanges = [
    'Di bawah Rp 5 juta',
    'Rp 5 - 15 juta',
    'Rp 15 - 30 juta', 
    'Di atas Rp 30 juta',
    'Diskusi lebih lanjut'
  ];

  return (
    <section id="contact" className="py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/15 to-primary/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tr from-purple-500/15 to-pink-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-20 transform transition-all duration-1000 ${
            titleVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Hubungi <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">Kami Sekarang</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Siap membantu mewujudkan visi digital Anda! Konsultasi gratis untuk menentukan solusi terbaik 
            bagi kebutuhan bisnis Anda. Tim ahli kami selalu standby untuk melayani.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <MessageCircle className="w-7 h-7 text-primary" />
                Kontak Langsung
              </h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className={`p-5 ${item.bgColor} rounded-2xl border border-gray-100 dark:border-gray-600 hover:shadow-lg transition-all duration-300`}>
                    <div className="flex items-start gap-4">
                      <item.icon className={`w-6 h-6 ${item.color} mt-1 flex-shrink-0`} />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                        <p className="text-gray-700 dark:text-gray-300 font-medium">{item.details}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.subdescription}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-4">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-105 font-semibold flex items-center justify-center gap-3 shadow-lg">
                <Phone className="w-5 h-5" />
                WhatsApp Sekarang
              </button>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-105 font-semibold flex items-center justify-center gap-3 shadow-lg">
                <Mail className="w-5 h-5" />
                Kirim Email
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <Send className="w-7 h-7 text-primary" />
                Formulir Konsultasi Gratis
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Nama Lengkap *</label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Masukkan nama lengkap Anda"
                      required
                      className="h-12 rounded-xl border-2 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Email Bisnis *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="email@perusahaan.com"
                      required
                      className="h-12 rounded-xl border-2 focus:border-primary"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Nomor WhatsApp *</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+62 812-3456-7890"
                      required
                      className="h-12 rounded-xl border-2 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Jenis Project *</label>
                    <select 
                      value={formData.projectType}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
                      required
                      className="w-full h-12 px-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary"
                    >
                      <option value="">Pilih jenis project</option>
                      {projectTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Estimasi Budget</label>
                  <select 
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                    className="w-full h-12 px-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary"
                  >
                    <option value="">Pilih range budget</option>
                    {budgetRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Detail Project *</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Ceritakan detail project yang ingin Anda kembangkan, fitur-fitur yang dibutuhkan, target waktu, dan informasi lain yang relevan..."
                    rows={6}
                    required
                    className="rounded-xl border-2 focus:border-primary resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white py-4 px-8 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105"
                >
                  <Send className="w-5 h-5" />
                  Kirim Konsultasi Gratis
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <MapPin className="w-7 h-7 text-primary" />
              Lokasi Kantor Kami
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              📍 Jakarta Selatan, DKI Jakarta - Strategis dan mudah dijangkau
            </p>
          </div>
          <div className="h-80 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63246.17829309715!2d106.74707207910156!3d-6.229386999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%20Selatan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1701234567890!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 rounded-b-3xl"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
