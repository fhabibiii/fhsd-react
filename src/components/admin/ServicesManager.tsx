import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { apiService, Service, ServiceCreateRequest, ServiceUpdateRequest } from '../../services/api';
import FeaturesList from './FeaturesList';

interface ServiceFormData {
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
}

const ServicesManager = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingServiceId, setDeletingServiceId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<ServiceFormData>({
    title: '',
    description: '',
    price: '',
    duration: '',
    features: ['']
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getAllServices();
      if (response.success && response.data) {
        setServices(response.data);
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to fetch services",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch services",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddService = () => {
    setEditingService(null);
    setFormData({
      title: '',
      description: '',
      price: '',
      duration: '',
      features: ['']
    });
    setIsModalOpen(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price,
      duration: service.duration,
      features: service.features.map(f => f.feature)
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description || !formData.price || !formData.duration) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const filteredFeatures = formData.features.filter(f => f.trim() !== '');
    
    setIsSaving(true);
    try {
      const serviceData = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        duration: formData.duration,
        features: filteredFeatures
      };

      let response;
      if (editingService) {
        response = await apiService.updateService(editingService.id, serviceData);
      } else {
        response = await apiService.createService(serviceData);
      }

      if (response.success) {
        await fetchServices();
        setIsModalOpen(false);
        toast({
          title: "Berhasil!",
          description: editingService ? "Service berhasil diperbarui." : "Service berhasil ditambahkan.",
        });
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to save service",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save service",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeletingServiceId(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletingServiceId) {
      try {
        const response = await apiService.deleteService(deletingServiceId);
        if (response.success) {
          await fetchServices();
          toast({
            title: "Berhasil!",
            description: "Service berhasil dihapus.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: response.message || "Failed to delete service",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete service",
          variant: "destructive",
        });
      }
    }
    setDeleteConfirmOpen(false);
    setDeletingServiceId(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingService(null);
    setFormData({
      title: '',
      description: '',
      price: '',
      duration: '',
      features: ['']
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

  return (
    <div className="p-4 md:p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Services Management</h2>
        <Button
          onClick={handleAddService}
          className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Tambah Service</span>
        </Button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500 dark:text-gray-400">
              <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Belum ada service yang dibuat.</p>
            </div>
          </div>
        ) : (
          services.map((service, index) => (
            <div
              key={service.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                  {service.title}
                </h3>
                <div className="flex gap-2 ml-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditService(service)}
                    className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    <Edit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteClick(service.id)}
                    className="hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </Button>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                {service.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-primary">{service.price}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{service.duration}</span>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Fitur:</h4>
                <ul className="space-y-1">
                  {service.features.slice(0, 3).map((feature, featureIndex) => (
                    <li key={feature.id} className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {feature.feature}
                    </li>
                  ))}
                  {service.features.length > 3 && (
                    <li className="text-sm text-gray-500 dark:text-gray-400">
                      +{service.features.length - 3} fitur lainnya
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Service Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">
              {editingService ? 'Edit Service' : 'Tambah Service Baru'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                Nama Service *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Contoh: Website Development"
                className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                Deskripsi Service *
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Deskripsi lengkap tentang service ini..."
                rows={4}
                className="w-full resize-none bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Harga *
                </label>
                <Input
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="Contoh: Rp 5.000.000"
                  className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Durasi *
                </label>
                <Input
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="Contoh: 2-3 minggu"
                  className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                Fitur-fitur Service
              </label>
              <FeaturesList
                features={formData.features}
                onChange={(features) => setFormData(prev => ({ ...prev, features }))}
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={handleCancel} 
              disabled={isSaving}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Batal
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900 dark:text-white">Hapus Service</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
              Apakah Anda yakin ingin menghapus service ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600">Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ServicesManager;
