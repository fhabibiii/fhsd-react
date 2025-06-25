
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Calendar } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useBackendData } from '../hooks/useBackendData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const { contactInfo, loading, sendMessage } = useBackendData();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const messageData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: formData.projectType,
        budget: formData.budget,
        detail: formData.message
      };

      const response = await sendMessage(messageData);
      
      if (response.success) {
        toast({
          title: "Konsultasi berhasil dikirim!",
          description: "Tim kami akan segera menghubungi Anda dalam 24 jam ke depan.",
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          budget: '',
          message: ''
        });
      } else {
        throw new Error(response.message || 'Gagal mengirim pesan');
      }
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        title: "Gagal mengirim pesan",
        description: error.message || "Terjadi kesalahan, silakan coba lagi.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Use backend contact info or fallback to default values
  const displayContactInfo = [
    {
      icon: Phone,
      title: 'Telepon & WhatsApp',
      details: contactInfo?.phone ? `+62 ${contactInfo.phone}` : '+62 85156321198',
      subdescription: 'Respon cepat dalam 5 menit',
      action: contactInfo?.phone ? `tel:+62${contactInfo.phone}` : 'tel:+6285156321198',
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20'
    },
    {
      icon: Mail,
      title: 'Email Bisnis',
      details: contactInfo?.email || 'hello@fhdigital.com',
      subdescription: 'Untuk penawaran & konsultasi',
      action: contactInfo?.email ? `mailto:${contactInfo.email}` : 'mailto:hello@fhdigital.com',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20'
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      details: contactInfo?.workHours || 'Senin - Jumat: 09:00 - 21:00',
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
                {displayContactInfo.map((item, index) => (
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
                      className="h-12 rounded-xl border-2 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Jenis Project *</label>
                    <select 
                      value={formData.projectType}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
                      required
                      disabled={isSubmitting}
                      className="w-full h-12 px-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary disabled:opacity-50"
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
                    disabled={isSubmitting}
                    className="w-full h-12 px-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary disabled:opacity-50"
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
                    disabled={isSubmitting}
                    className="rounded-xl border-2 focus:border-primary resize-none disabled:opacity-50"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white dark:text-gray-900 py-4 px-8 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Kirim Konsultasi Gratis
                    </>
                  )}
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
              📍 {contactInfo?.address || 'ANSAC (Anagata Sasmitaloka Consulting) Karangmiri, UH 7 Gg. Cinde Amoh No.317C, Giwangan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55163'}
            </p>
          </div>
          <div className="h-80 relative">
            <iframe
              src={contactInfo?.map || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.7654321!2d110.3692!3d-7.8234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a572b6b6b6b6b%3A0x1234567890abcdef!2sANSAC%20(Anagata%20Sasmitaloka%20Consulting)!5e0!3m2!1sid!2sid!4v1701234567890!5m2!1sid!2sid"}
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
