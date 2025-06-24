
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

interface Service {
  id: string;
  title: string;
  duration: string;
  description: string;
  features: string[];
  price: string;
  whatsappMessage: string;
}

const ServicesManager = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      title: 'Basic Website',
      duration: '5–7 hari',
      description: 'Landing page interaktif dengan kontak dan animasi ringan yang sempurna untuk memperkenalkan bisnis Anda.',
      features: ['Landing page interaktif', 'Form kontak terintegrasi', 'Animasi ringan & smooth', 'Responsive design', 'SEO friendly'],
      price: 'Rp 2.500.000',
      whatsappMessage: 'Halo! Saya tertarik dengan paket Basic Website. Bisakah kita diskusi lebih lanjut mengenai pembuatan website?'
    },
    {
      id: '2',
      title: 'Web App Dasar',
      duration: '10–15 hari',
      description: 'Aplikasi web dengan fitur login, dashboard user, dan manajemen data dasar untuk kebutuhan bisnis kecil.',
      features: ['Sistem login & registrasi', 'Dashboard user', 'Input data (CRUD)', 'Validasi form', 'Pagination data'],
      price: 'Rp 7.000.000',
      whatsappMessage: 'Halo! Saya tertarik dengan paket Web App Dasar. Bisakah kita diskusi lebih lanjut mengenai pembuatan website?'
    }
  ]);

  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingServiceId, setDeletingServiceId] = useState<string | null>(null);

  const handleAddService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      title: '',
      duration: '',
      description: '',
      features: [],
      price: '',
      whatsappMessage: ''
    };
    setEditingService(newService);
    setIsAddingNew(true);
  };

  const handleSaveService = () => {
    if (!editingService) return;

    if (isAddingNew) {
      setServices(prev => [...prev, editingService]);
      toast({
        title: "Layanan baru berhasil ditambahkan!",
        description: "Layanan telah disimpan dan akan muncul di halaman services.",
      });
    } else {
      setServices(prev => prev.map(service => 
        service.id === editingService.id ? editingService : service
      ));
      toast({
        title: "Layanan berhasil diperbarui!",
        description: "Perubahan telah disimpan.",
      });
    }

    setEditingService(null);
    setIsAddingNew(false);
  };

  const handleDeleteClick = (id: string) => {
    setDeletingServiceId(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingServiceId) {
      setServices(prev => prev.filter(service => service.id !== deletingServiceId));
      toast({
        title: "Layanan berhasil dihapus!",
        description: "Layanan telah dihapus dari daftar.",
        variant: "destructive",
      });
    }
    setDeleteConfirmOpen(false);
    setDeletingServiceId(null);
  };

  const handleAddFeature = () => {
    if (!editingService || !newFeature.trim()) return;
    
    setEditingService({
      ...editingService,
      features: [...editingService.features, newFeature.trim()]
    });
    setNewFeature('');
  };

  const handleRemoveFeature = (index: number) => {
    if (!editingService) return;
    
    setEditingService({
      ...editingService,
      features: editingService.features.filter((_, i) => i !== index)
    });
  };

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
                  onClick={() => setEditingService(service)}
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
                <div key={index} className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  {feature}
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
      {editingService && (
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
                    value={editingService.title}
                    onChange={(e) => setEditingService({...editingService, title: e.target.value})}
                    placeholder="Basic Website"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Waktu Pengerjaan *
                  </label>
                  <Input
                    value={editingService.duration}
                    onChange={(e) => setEditingService({...editingService, duration: e.target.value})}
                    placeholder="5–7 hari"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Deskripsi Singkat *
                </label>
                <Textarea
                  value={editingService.description}
                  onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                  placeholder="Deskripsi layanan..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Fitur-fitur
                </label>
                <div className="space-y-2 mb-3">
                  {editingService.features.map((feature, index) => (
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
                  value={editingService.price}
                  onChange={(e) => setEditingService({...editingService, price: e.target.value})}
                  placeholder="Rp 2.500.000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Pesan WhatsApp *
                </label>
                <Textarea
                  value={editingService.whatsappMessage}
                  onChange={(e) => setEditingService({...editingService, whatsappMessage: e.target.value})}
                  placeholder="Pesan yang akan dikirim ketika tombol dipencet..."
                  rows={3}
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingService(null);
                  setIsAddingNew(false);
                }}
              >
                Batal
              </Button>
              <Button onClick={handleSaveService}>
                <Save className="w-4 h-4 mr-2" />
                Simpan
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
