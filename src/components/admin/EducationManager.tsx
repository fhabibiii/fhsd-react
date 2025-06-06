
import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { usePortfolio, Education } from '../../context/PortfolioContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const EducationManager = () => {
  const { data, updateEducation } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field: '',
    year: '',
  });
  const { toast } = useToast();

  const handleOpenModal = (education?: Education) => {
    if (education) {
      setEditingEducation(education);
      setFormData({
        institution: education.institution,
        degree: education.degree,
        field: education.field,
        year: education.year,
      });
    } else {
      setEditingEducation(null);
      setFormData({
        institution: '',
        degree: '',
        field: '',
        year: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const educationData: Education = {
      id: editingEducation?.id || Date.now().toString(),
      institution: formData.institution,
      degree: formData.degree,
      field: formData.field,
      year: formData.year,
    };

    if (editingEducation) {
      const updatedEducation = data.education.map(e => 
        e.id === editingEducation.id ? educationData : e
      );
      updateEducation(updatedEducation);
      toast({
        title: "Education updated!",
        description: "Education has been successfully updated.",
      });
    } else {
      updateEducation([...data.education, educationData]);
      toast({
        title: "Education added!",
        description: "New education has been successfully added.",
      });
    }

    setIsModalOpen(false);
    setEditingEducation(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this education?')) {
      const updatedEducation = data.education.filter(e => e.id !== id);
      updateEducation(updatedEducation);
      toast({
        title: "Education deleted!",
        description: "Education has been successfully deleted.",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Manage Education</h2>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      </div>

      <div className="space-y-4">
        {data.education.map((education) => (
          <div
            key={education.id}
            className="bg-card text-card-foreground rounded-lg p-4 border border-border hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{education.institution}</h3>
                <p className="text-muted-foreground mb-1">{education.degree} - {education.field}</p>
                <p className="text-primary font-medium">{education.year}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenModal(education)}
                  className="flex items-center gap-1"
                >
                  <Edit className="w-3 h-3" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(education.id)}
                  className="flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingEducation ? 'Edit Education' : 'Add New Education'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Institution</label>
              <Input
                value={formData.institution}
                onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Degree</label>
              <Input
                value={formData.degree}
                onChange={(e) => setFormData(prev => ({ ...prev, degree: e.target.value }))}
                placeholder="e.g., Sarjana, Magister"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Field of Study</label>
              <Input
                value={formData.field}
                onChange={(e) => setFormData(prev => ({ ...prev, field: e.target.value }))}
                placeholder="e.g., Teknik Informatika"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Year/Period</label>
              <Input
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                placeholder="e.g., 2018 - 2022"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                {editingEducation ? 'Update Education' : 'Add Education'}
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
    </div>
  );
};

export default EducationManager;
