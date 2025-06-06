
import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { usePortfolio, Experience } from '../../context/PortfolioContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ExperienceManager = () => {
  const { data, updateExperience } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [formData, setFormData] = useState({
    position: '',
    company: '',
    period: '',
    description: '',
  });
  const { toast } = useToast();

  const handleOpenModal = (experience?: Experience) => {
    if (experience) {
      setEditingExperience(experience);
      setFormData({
        position: experience.position,
        company: experience.company,
        period: experience.period,
        description: experience.description,
      });
    } else {
      setEditingExperience(null);
      setFormData({
        position: '',
        company: '',
        period: '',
        description: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const experienceData: Experience = {
      id: editingExperience?.id || Date.now().toString(),
      position: formData.position,
      company: formData.company,
      period: formData.period,
      description: formData.description,
    };

    if (editingExperience) {
      const updatedExperience = data.experience.map(e => 
        e.id === editingExperience.id ? experienceData : e
      );
      updateExperience(updatedExperience);
      toast({
        title: "Experience updated!",
        description: "Experience has been successfully updated.",
      });
    } else {
      updateExperience([...data.experience, experienceData]);
      toast({
        title: "Experience added!",
        description: "New experience has been successfully added.",
      });
    }

    setIsModalOpen(false);
    setEditingExperience(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      const updatedExperience = data.experience.filter(e => e.id !== id);
      updateExperience(updatedExperience);
      toast({
        title: "Experience deleted!",
        description: "Experience has been successfully deleted.",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Manage Experience</h2>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        {data.experience.map((experience) => (
          <div
            key={experience.id}
            className="bg-card text-card-foreground rounded-lg p-4 border border-border hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{experience.position}</h3>
                <p className="text-muted-foreground mb-1">{experience.company}</p>
                <p className="text-primary font-medium mb-2">{experience.period}</p>
                <p className="text-muted-foreground text-sm">{experience.description}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenModal(experience)}
                  className="flex items-center gap-1"
                >
                  <Edit className="w-3 h-3" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(experience.id)}
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
              {editingExperience ? 'Edit Experience' : 'Add New Experience'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Position</label>
              <Input
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Company</label>
              <Input
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Period</label>
              <Input
                value={formData.period}
                onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
                placeholder="e.g., 2022 - Sekarang"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                {editingExperience ? 'Update Experience' : 'Add Experience'}
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

export default ExperienceManager;
