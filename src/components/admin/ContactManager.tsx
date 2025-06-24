
import React, { useState } from 'react';
import { Save, Edit, Phone, Mail, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactManager = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [contactData, setContactData] = useState({
    phone: '+62 85156321198',
    email: 'hello@fhdigital.com',
    operationalHours: 'Senin - Jumat: 09:00 - 21:00\nSabtu: 09:00 - 15:00 | Minggu: Libur',
    address: 'ANSAC (Anagata Sasmitaloka Consulting) Karangmiri, UH 7 Gg. Cinde Amoh No.317C, Giwangan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55163',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.7654321!2d110.3692!3d-7.8234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a572b6b6b6b6b%3A0x1234567890abcdef!2sANSAC%20(Anagata%20Sasmitaloka%20Consulting)!5e0!3m2!1sid!2sid!4v1701234567890!5m2!1sid!2sid'
  });

  const handleSave = () => {
    toast({
      title: "Informasi kontak berhasil diperbarui!",
      description: "Perubahan telah disimpan dan akan terlihat di halaman kontak.",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Management</h2>
        <div className="flex gap-3">
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              <span className="hidden sm:inline">Edit Kontak</span>
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm: inline">Simpan</span>
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
              >
                Batal
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                <Phone className="w-4 h-4 inline mr-2" />
                Nomor Telepon & WhatsApp *
              </label>
              <Input
                type="text"
                value={contactData.phone}
                onChange={(e) => setContactData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+62 85156321198"
                disabled={!isEditing}
                className="h-12 rounded-xl border-2 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Bisnis *
              </label>
              <Input
                type="email"
                value={contactData.email}
                onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="hello@fhdigital.com"
                disabled={!isEditing}
                className="h-12 rounded-xl border-2 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                <Clock className="w-4 h-4 inline mr-2" />
                Jam Operasional *
              </label>
              <Textarea
                value={contactData.operationalHours}
                onChange={(e) => setContactData(prev => ({ ...prev, operationalHours: e.target.value }))}
                placeholder="Senin - Jumat: 09:00 - 21:00"
                rows={4}
                disabled={!isEditing}
                className="rounded-xl border-2 focus:border-primary resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                <MapPin className="w-4 h-4 inline mr-2" />
                Alamat Lengkap *
              </label>
              <Textarea
                value={contactData.address}
                onChange={(e) => setContactData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Alamat lengkap kantor..."
                rows={4}
                disabled={!isEditing}
                className="rounded-xl border-2 focus:border-primary resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Google Maps Embed URL *
              </label>
              <Textarea
                value={contactData.mapEmbedUrl}
                onChange={(e) => setContactData(prev => ({ ...prev, mapEmbedUrl: e.target.value }))}
                placeholder="https://www.google.com/maps/embed?pb=..."
                rows={3}
                disabled={!isEditing}
                className="rounded-xl border-2 focus:border-primary resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Salin URL embed dari Google Maps → Share → Embed a map
              </p>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:border-l lg:border-gray-200 dark:lg:border-gray-700 lg:pl-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview Kontak</h3>
            
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800/30">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Telepon & WhatsApp</h4>
                    <p className="text-gray-700 dark:text-gray-300">{contactData.phone}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800/30">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Email Bisnis</h4>
                    <p className="text-gray-700 dark:text-gray-300">{contactData.email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800/30">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Jam Operasional</h4>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {contactData.operationalHours}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800/30">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Alamat</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {contactData.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Preview */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Preview Google Maps</h4>
              <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600">
                {contactData.mapEmbedUrl ? (
                  <iframe
                    src={contactData.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                    Masukkan URL Google Maps untuk preview
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactManager;
