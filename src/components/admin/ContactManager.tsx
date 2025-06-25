
import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiService, ContactInfo } from '../../services/api';

const ContactManager = () => {
  const { toast } = useToast();
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: '',
    description: '',
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
        setContactInfo(response.data);
        setFormData({
          email: response.data.email,
          phone: response.data.phone,
          address: response.data.address,
          description: response.data.description || '',
          map: response.data.map || '',
          instagram: response.data.instagram || '',
          whatsApp: response.data.whatsApp || '',
          workHours: response.data.workHours || ''
        });
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to fetch contact info",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch contact info",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (field: string) => {
    setEditingField(field);
  };

  const handleCancel = () => {
    if (contactInfo) {
      setFormData({
        email: contactInfo.email,
        phone: contactInfo.phone,
        address: contactInfo.address,
        description: contactInfo.description || '',
        map: contactInfo.map || '',
        instagram: contactInfo.instagram || '',
        whatsApp: contactInfo.whatsApp || '',
        workHours: contactInfo.workHours || ''
      });
    }
    setEditingField(null);
  };

  const handleSave = async (field: string) => {
    setIsSaving(true);
    try {
      const response = await apiService.updateContactInfo(formData);
      if (response.success && response.data) {
        setContactInfo(response.data);
        setEditingField(null);
        toast({
          title: "Berhasil!",
          description: "Informasi kontak berhasil diperbarui.",
        });
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to update contact info",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update contact info",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
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

  return (
    <div className="p-4 md:p-8 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Information</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Kelola informasi kontak yang ditampilkan di halaman utama
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email Card */}
        <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-500 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email</h3>
            </div>
            {editingField !== 'email' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit('email')}
                className="hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <Edit className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {editingField === 'email' ? (
            <div className="space-y-3">
              <Input
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                type="email"
                placeholder="contoh@email.com"
                className="bg-gray-50 dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleSave('email')}
                  disabled={isSaving}
                  className="flex items-center gap-1"
                >
                  <Save className="w-3 h-3" />
                  Simpan
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex items-center gap-1 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <X className="w-3 h-3" />
                  Batal
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">{contactInfo?.email || 'Belum diatur'}</p>
          )}
        </div>

        {/* Phone Card */}
        <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-500 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Phone</h3>
            </div>
            {editingField !== 'phone' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit('phone')}
                className="hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <Edit className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {editingField === 'phone' ? (
            <div className="space-y-3">
              <Input
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                type="tel"
                placeholder="+62 xxx-xxxx-xxxx"
                className="bg-gray-50 dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleSave('phone')}
                  disabled={isSaving}
                  className="flex items-center gap-1"
                >
                  <Save className="w-3 h-3" />
                  Simpan
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex items-center gap-1 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <X className="w-3 h-3" />
                  Batal
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">{contactInfo?.phone || 'Belum diatur'}</p>
          )}
        </div>

        {/* Address Card */}
        <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-500 hover:shadow-lg transition-all duration-300 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Address</h3>
            </div>
            {editingField !== 'address' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit('address')}
                className="hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <Edit className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {editingField === 'address' ? (
            <div className="space-y-3">
              <Textarea
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Alamat lengkap..."
                rows={3}
                className="bg-gray-50 dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleSave('address')}
                  disabled={isSaving}
                  className="flex items-center gap-1"
                >
                  <Save className="w-3 h-3" />
                  Simpan
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex items-center gap-1 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <X className="w-3 h-3" />
                  Batal
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">{contactInfo?.address || 'Belum diatur'}</p>
          )}
        </div>

        {/* Description Card */}
        <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-500 hover:shadow-lg transition-all duration-300 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Description</h3>
            {editingField !== 'description' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit('description')}
                className="hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <Edit className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {editingField === 'description' ? (
            <div className="space-y-3">
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Deskripsi singkat tentang Anda atau perusahaan..."
                rows={4}
                className="bg-gray-50 dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleSave('description')}
                  disabled={isSaving}
                  className="flex items-center gap-1"
                >
                  <Save className="w-3 h-3" />
                  Simpan
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex items-center gap-1 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <X className="w-3 h-3" />
                  Batal
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {contactInfo?.description || 'Belum diatur'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactManager;
