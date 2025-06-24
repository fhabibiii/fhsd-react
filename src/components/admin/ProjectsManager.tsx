
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Project } from '../../services/api';

const ProjectsManager = () => {
  const { state, fetchProjects, createProject, updateProject, deleteProject, uploadImage } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        image: project.image,
        link: project.link || '',
      });
      setImagePreview(project.image);
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        image: '',
        link: '',
      });
      setImagePreview('');
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File terlalu besar",
          description: "Ukuran file maksimal 5MB",
          variant: "destructive",
        });
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = formData.image;

      // Upload new image if selected
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile);
        if (!uploadedUrl) {
          toast({
            title: "Gagal upload gambar",
            description: "Silakan coba lagi",
            variant: "destructive",
          });
          return;
        }
        imageUrl = uploadedUrl;
      }

      if (!imageUrl) {
        toast({
          title: "Gambar wajib diisi",
          description: "Silakan upload gambar untuk project",
          variant: "destructive",
        });
        return;
      }

      const projectData = {
        title: formData.title,
        description: formData.description,
        image: imageUrl,
        link: formData.link,
      };

      let result;
      if (editingProject) {
        result = await updateProject(editingProject.id, projectData);
        if (result) {
          toast({
            title: "Project berhasil diupdate!",
            description: "Project telah berhasil diperbarui.",
          });
        }
      } else {
        result = await createProject(projectData);
        if (result) {
          toast({
            title: "Project berhasil ditambahkan!",
            description: "Project baru telah berhasil ditambahkan.",
          });
        }
      }

      if (result) {
        setIsModalOpen(false);
        setEditingProject(null);
      } else {
        toast({
          title: "Gagal menyimpan project",
          description: state.error || "Terjadi kesalahan saat menyimpan project",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Gagal menyimpan project",
        description: "Terjadi kesalahan jaringan",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeletingProjectId(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletingProjectId) {
      const success = await deleteProject(deletingProjectId);
      if (success) {
        toast({
          title: "Project berhasil dihapus!",
          description: "Project telah berhasil dihapus.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Gagal menghapus project",
          description: state.error || "Terjadi kesalahan saat menghapus project",
          variant: "destructive",
        });
      }
    }
    setDeleteConfirmOpen(false);
    setDeletingProjectId(null);
  };

  if (state.loading) {
    return (
      <div className="p-4 md:p-8 animate-fade-in">
        <div className="text-center py-20">
          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Manage Projects</h2>
        <Button 
          onClick={() => handleOpenModal()} 
          className="flex items-center gap-2 hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </div>

      {state.projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">Belum ada project. Tambahkan project pertama Anda!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.projects.map((project, index) => (
            <div
              key={project.id}
              className="bg-card text-card-foreground rounded-lg p-4 border border-border hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-32 object-cover rounded-lg mb-4 transition-transform duration-300 hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
              <h3 className="font-semibold text-foreground mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenModal(project)}
                  className="flex items-center gap-1 hover:shadow-md transition-all duration-200"
                >
                  <Edit className="w-3 h-3" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteClick(project.id)}
                  className="flex items-center gap-1 hover:shadow-md transition-all duration-200"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Description *</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Project Image *</label>
              <div className="space-y-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required={!editingProject}
                />
                {imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Project Link</label>
              <Input
                value={formData.link}
                onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                placeholder="https://example.com"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Menyimpan...' : (editingProject ? 'Update Project' : 'Add Project')}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Project</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus project ini? Tindakan ini tidak dapat dibatalkan.
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

export default ProjectsManager;
