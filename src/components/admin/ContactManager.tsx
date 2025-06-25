
import React, { useState, useEffect } from 'react';
import { Edit, Phone, Mail, Clock, MapPin } from 'lucide-react';
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
          className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
        >
          <Edit className="w-4 h-4" />
          <span className="hidden sm:inline">Edit Kontak</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Telepon</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{contactData.phone}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Email</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{contactData.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Jam Kerja</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{contactData.workHours}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Alamat</h4>
                <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">{contactData.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Google Maps</h3>
          <div className="h-80 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
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
