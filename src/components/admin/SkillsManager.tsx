
import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { usePortfolio, Skill } from '../../context/PortfolioContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const SkillsManager = () => {
  const { data, updateSkills } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    category: '',
    technologies: '',
  });
  const { toast } = useToast();

  const handleOpenModal = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData({
        category: skill.category,
        technologies: skill.technologies.join(', '),
      });
    } else {
      setEditingSkill(null);
      setFormData({
        category: '',
        technologies: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const skillData: Skill = {
      id: editingSkill?.id || Date.now().toString(),
      category: formData.category,
      technologies: formData.technologies.split(',').map(tech => tech.trim()),
    };

    if (editingSkill) {
      const updatedSkills = data.skills.map(s => 
        s.id === editingSkill.id ? skillData : s
      );
      updateSkills(updatedSkills);
      toast({
        title: "Skill updated!",
        description: "Skill has been successfully updated.",
      });
    } else {
      updateSkills([...data.skills, skillData]);
      toast({
        title: "Skill added!",
        description: "New skill has been successfully added.",
      });
    }

    setIsModalOpen(false);
    setEditingSkill(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this skill category?')) {
      const updatedSkills = data.skills.filter(s => s.id !== id);
      updateSkills(updatedSkills);
      toast({
        title: "Skill deleted!",
        description: "Skill has been successfully deleted.",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Skills</h2>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Skill Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.skills.map((skill) => (
          <div
            key={skill.id}
            className="bg-gray-50 rounded-lg p-4 border hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900">{skill.category}</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenModal(skill)}
                  className="flex items-center gap-1"
                >
                  <Edit className="w-3 h-3" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(skill.id)}
                  className="flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {skill.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSkill ? 'Edit Skill Category' : 'Add New Skill Category'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category Name</label>
              <Input
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                placeholder="e.g., Frontend, Backend"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Technologies (comma separated)</label>
              <Input
                value={formData.technologies}
                onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
                placeholder="React, Vue.js, Angular"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                {editingSkill ? 'Update Skill' : 'Add Skill'}
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

export default SkillsManager;
