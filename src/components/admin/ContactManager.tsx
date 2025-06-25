
import React, { useState, useEffect } from 'react';
import { Edit, Phone, Mail, Clock, MapPin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { apiService, ContactInfo, ContactUpdateRequest } from '../../services/api';

const ContactManager = () => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [contactData, setContactData] = useState<ContactInfo | null>(null);
  const [editData, setEditData] = useState<ContactUpdateRequest>({
    phone: '',
    email: '',
    address: '',
    map: '',
    instagram: '',
    whatsApp: '',
    workHours: ''
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getContactInfo();
      if (response.success && response.data) {
        setContactData(response.data);
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to fetch contact information",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch contact information",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    if (contactData) {
      setEditData({
        phone: contactData.phone,
        email: contactData.email,
        address: contactData.address,
        map: contactData.map,
        instagram: contactData.instagram,
        whatsApp: contactData.whatsApp,
        workHours: contactData.workHours
      });
      setIsModalOpen(true);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await apiService.updateContactInfo(editData);
      if (response.success && response.data) {
        setContactData(response.data);
        setIsModalOpen(false);
        toast({
          title: "Berhasil!",
          description: "Informasi kontak berhasil diperbarui.",
        });
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to update contact information",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update contact information",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditData({
      phone: '',
      email: '',
      address: '',
      map: '',
      instagram: '',
      whatsApp: '',
      workHours: ''
    });
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!contactData) {
    return (
      <div className="p-4 md:p-8">
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No contact information found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Information</h2>
        <Button
          onClick={handleEditClick}
          className="flex items-center gap-2"
        >
          <Edit className="w-4 h-4" />
          <span className="hidden sm:inline">Edit Kontak</span>
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information Cards */}
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800/30">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-600" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Nomor Telepon</h4>
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
                  <p className="text-gray-700 dark:text-gray-300">{contactData.workHours}</p>
                </div>
              </div>
            </div>

            <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-4 border border-pink-200 dark:border-pink-800/30">
              <div className="flex items-start gap-3">
                <Instagram className="w-5 h-5 text-pink-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Instagram</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm break-all">{contactData.instagram}</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800/30">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Alamat</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{contactData.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Preview */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Google Maps</h3>
            <div className="h-80 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600">
              {contactData.map ? (
                <iframe
                  src={contactData.map}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  No map available
                </div>
              )}
            </div>
            
            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              <p>Last updated: {new Date(contactData.updatedAt).toLocaleString('id-ID')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Contact Information</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Nomor Telepon *
              </label>
              <Input
                type="text"
                value={editData.phone}
                onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="081225510099"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Email Bisnis *
              </label>
              <Input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="hello@fhdigital.com"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Jam Operasional *
              </label>
              <Input
                type="text"
                value={editData.workHours}
                onChange={(e) => setEditData(prev => ({ ...prev, workHours: e.target.value }))}
                placeholder="Senin - Jumat: 09:00 - 21:00"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Link Instagram *
              </label>
              <Input
                type="url"
                value={editData.instagram}
                onChange={(e) => setEditData(prev => ({ ...prev, instagram: e.target.value }))}
                placeholder="https://www.instagram.com/username"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Link WhatsApp *
              </label>
              <Input
                type="url"
                value={editData.whatsApp}
                onChange={(e) => setEditData(prev => ({ ...prev, whatsApp: e.target.value }))}
                placeholder="https://wa.me/6281225510099"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Alamat Lengkap *
              </label>
              <Textarea
                value={editData.address}
                onChange={(e) => setEditData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Alamat lengkap kantor..."
                rows={3}
                className="w-full resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Google Maps Embed URL *
              </label>
              <Textarea
                value={editData.map}
                onChange={(e) => setEditData(prev => ({ ...prev, map: e.target.value }))}
                placeholder="https://www.google.com/maps/embed?pb=..."
                rows={3}
                className="w-full resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Salin URL embed dari Google Maps → Share → Embed a map
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
              Batal
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactManager;
