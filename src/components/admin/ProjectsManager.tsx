
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiService, Project, ProjectCreateRequest, ProjectUpdateRequest } from '../../services/api';

const ProjectsManager = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getAllProjects();
      if (response.success && response.data) {
        setProjects(response.data);
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to fetch projects",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File terlalu besar",
          description: "Ukuran file maksimal 10MB",
          variant: "destructive",
        });
        return;
      }
      
      setImageFile(file);
      setIsUploading(true);
      
      try {
        const response = await apiService.uploadImage(file);
        if (response.success && response.data) {
          const imageUrl = response.data.url;
          setImagePreview(imageUrl);
          setFormData(prev => ({ ...prev, image: imageUrl }));
          toast({
            title: "Berhasil!",
            description: "Gambar berhasil diupload",
          });
        } else {
          toast({
            title: "Error",
            description: response.message || "Failed to upload image",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to upload image",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.image) {
      toast({
        title: "Gambar wajib diisi",
        description: "Silakan upload gambar untuk project",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      const projectData: ProjectCreateRequest | ProjectUpdateRequest = {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        link: formData.link || undefined,
      };

      if (editingProject) {
        const response = await apiService.updateProject(editingProject.id, projectData);
        if (response.success && response.data) {
          setProjects(prev => prev.map(p => 
            p.id === editingProject.id ? response.data! : p
          ));
          toast({
            title: "Project berhasil diupdate!",
            description: "Project telah berhasil diperbarui.",
          });
        } else {
          toast({
            title: "Error",
            description: response.message || "Failed to update project",
            variant: "destructive",
          });
          return;
        }
      } else {
        const response = await apiService.createProject(projectData);
        if (response.success && response.data) {
          setProjects(prev => [...prev, response.data!]);
          toast({
            title: "Project berhasil ditambahkan!",
            description: "Project baru telah berhasil ditambahkan.",
          });
        } else {
          toast({
            title: "Error",
            description: response.message || "Failed to create project",
            variant: "destructive",
          });
          return;
        }
      }

      setIsModalOpen(false);
      setEditingProject(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeletingProjectId(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletingProjectId) {
      try {
        const response = await apiService.deleteProject(deletingProjectId);
        if (response.success) {
          setProjects(prev => prev.filter(p => p.id !== deletingProjectId));
          toast({
            title: "Project berhasil dihapus!",
            description: "Project telah berhasil dihapus.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: response.message || "Failed to delete project",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete project",
          variant: "destructive",
        });
      }
    }
    setDeleteConfirmOpen(false);
    setDeletingProjectId(null);
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="bg-gray-50 dark:bg-gray-700 text-card-foreground rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-32 object-cover rounded-lg mb-4 transition-transform duration-300 hover:scale-110"
            />
            <h3 className="font-semibold text-foreground mb-2">{project.title}</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenModal(project)}
                className="flex items-center gap-1 hover:shadow-md transition-all duration-200 border-gray-300 dark:border-gray-500"
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

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[70vh] scrollbar-hide">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
                className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Description *</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                required
                className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Project Image *</label>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Input
                    id="project-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex-1 bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-gray-100"
                    required={!editingProject}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const fileInput = document.getElementById('project-image-upload') as HTMLInputElement;
                      fileInput?.click();
                    }}
                    disabled={isUploading}
                    className="flex items-center gap-2 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    {isUploading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    {isUploading ? 'Uploading...' : 'Upload'}
                  </Button>
                </div>
                {imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-500"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Project Link</label>
              <Input
                value={formData.link}
                onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                placeholder="https://github.com/username/project"
                className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1" disabled={isSaving || isUploading}>
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {editingProject ? 'Updating...' : 'Adding...'}
                  </>
                ) : (
                  editingProject ? 'Update Project' : 'Add Project'
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600"
                disabled={isSaving || isUploading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent className="max-w-md bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900 dark:text-gray-100">Hapus Project</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
              Apakah Anda yakin ingin menghapus project ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300 dark:border-gray-500 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600">Batal</AlertDialogCancel>
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
