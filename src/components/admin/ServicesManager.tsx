
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { apiService, Service, ServiceCreateRequest, ServiceUpdateRequest } from '../../services/api';

const ServicesManager = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingServiceId, setDeletingServiceId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [editData, setEditData] = useState<ServiceCreateRequest>({
    title: '',
    description: '',
    price: '',
    duration: '',
    features: []
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
    setEditData({
      title: '',
      description: '',
      price: '',
      duration: '',
      features: []
    });
    setEditingService(null);
    setIsAddingNew(true);
  };

  const handleEditService = (service: Service) => {
    setEditData({
      title: service.title,
      description: service.description,
      price: service.price,
      duration: service.duration,
      features: service.features.map(f => f.feature)
    });
    setEditingService(service);
    setIsAddingNew(false);
  };

  const handleSaveService = async () => {
    if (!editData.title || !editData.description || !editData.price || !editData.duration) {
      toast({
        title: "Error",
        description: "Semua field wajib diisi",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      let response;
      if (isAddingNew) {
        response = await apiService.createService(editData);
      } else if (editingService) {
        response = await apiService.updateService(editingService.id, editData);
      }

      if (response?.success) {
        await fetchServices(); // Refresh the list
        setEditingService(null);
        setIsAddingNew(false);
        setEditData({
          title: '',
          description: '',
          price: '',
          duration: '',
          features: []
        });
        toast({
          title: "Berhasil!",
          description: isAddingNew ? "Layanan baru berhasil ditambahkan!" : "Layanan berhasil diperbarui!",
        });
      } else {
        toast({
          title: "Error",
          description: response?.message || "Failed to save service",
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
    if (!deletingServiceId) return;

    try {
      const response = await apiService.deleteService(deletingServiceId);
      if (response.success) {
        await fetchServices(); // Refresh the list
        toast({
          title: "Berhasil!",
          description: "Layanan berhasil dihapus!",
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
    } finally {
      setDeleteConfirmOpen(false);
      setDeletingServiceId(null);
    }
  };

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    
    setEditData({
      ...editData,
      features: [...editData.features, newFeature.trim()]
    });
    setNewFeature('');
  };

  const handleRemoveFeature = (index: number) => {
    setEditData({
      ...editData,
      features: editData.features.filter((_, i) => i !== index)
    });
  };

  const handleCancel = () => {
    setEditingService(null);
    setIsAddingNew(false);
    setEditData({
      title: '',
      description: '',
      price: '',
      duration: '',
      features: []
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
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Services Management</h2>
        <Button
          onClick={handleAddService}
          className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Tambah Layanan</span>
        </Button>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {services.map((service, index) => (
          <div 
            key={service.id} 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 transform animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{service.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <Clock className="w-3 h-3" />
                  <span>{service.duration}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditService(service)}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteClick(service.id)}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
            
            <div className="space-y-2 mb-4">
              {service.features.map((feature, index) => (
                <div key={feature.id} className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  {feature.feature}
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-2 text-primary font-bold">
              {service.price}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {(editingService || isAddingNew) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {isAddingNew ? 'Tambah Layanan Baru' : 'Edit Layanan'}
              </h3>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Nama Layanan *
                  </label>
                  <Input
                    value={editData.title}
                    onChange={(e) => setEditData({...editData, title: e.target.value})}
                    placeholder="Basic Website"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Waktu Pengerjaan *
                  </label>
                  <Input
                    value={editData.duration}
                    onChange={(e) => setEditData({...editData, duration: e.target.value})}
                    placeholder="5–7 hari"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Deskripsi Singkat *
                </label>
                <Textarea
                  value={editData.description}
                  onChange={(e) => setEditData({...editData, description: e.target.value})}
                  placeholder="Deskripsi layanan..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Fitur-fitur
                </label>
                <div className="space-y-2 mb-3">
                  {editData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <span className="flex-1 text-sm">{feature}</span>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemoveFeature(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Tambah fitur baru..."
                    onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                  />
                  <Button onClick={handleAddFeature}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Harga *
                </label>
                <Input
                  value={editData.price}
                  onChange={(e) => setEditData({...editData, price: e.target.value})}
                  placeholder="Rp 2.500.000"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
              >
                Batal
              </Button>
              <Button onClick={handleSaveService} disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Layanan</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus layanan ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
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
