
import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { usePortfolio, Certificate } from '../../context/PortfolioContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const CertificatesManager = () => {
  const { data, updateCertificates } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    year: '',
  });
  const { toast } = useToast();

  const handleOpenModal = (certificate?: Certificate) => {
    if (certificate) {
      setEditingCertificate(certificate);
      setFormData({
        name: certificate.name,
        institution: certificate.institution,
        year: certificate.year,
      });
    } else {
      setEditingCertificate(null);
      setFormData({
        name: '',
        institution: '',
        year: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const certificateData: Certificate = {
      id: editingCertificate?.id || Date.now().toString(),
      name: formData.name,
      institution: formData.institution,
      year: formData.year,
    };

    if (editingCertificate) {
      const updatedCertificates = data.certificates.map(c => 
        c.id === editingCertificate.id ? certificateData : c
      );
      updateCertificates(updatedCertificates);
      toast({
        title: "Certificate updated!",
        description: "Certificate has been successfully updated.",
      });
    } else {
      updateCertificates([...data.certificates, certificateData]);
      toast({
        title: "Certificate added!",
        description: "New certificate has been successfully added.",
      });
    }

    setIsModalOpen(false);
    setEditingCertificate(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this certificate?')) {
      const updatedCertificates = data.certificates.filter(c => c.id !== id);
      updateCertificates(updatedCertificates);
      toast({
        title: "Certificate deleted!",
        description: "Certificate has been successfully deleted.",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Manage Certificates</h2>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Certificate
        </Button>
      </div>

      <div className="space-y-4">
        {data.certificates.map((certificate) => (
          <div
            key={certificate.id}
            className="bg-card text-card-foreground rounded-lg p-4 border border-border hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{certificate.name}</h3>
                <p className="text-muted-foreground mb-1">{certificate.institution}</p>
                <p className="text-primary font-medium">{certificate.year}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenModal(certificate)}
                  className="flex items-center gap-1"
                >
                  <Edit className="w-3 h-3" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(certificate.id)}
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
              {editingCertificate ? 'Edit Certificate' : 'Add New Certificate'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Certificate Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Institution</label>
              <Input
                value={formData.institution}
                onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Year</label>
              <Input
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                placeholder="2023"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                {editingCertificate ? 'Update Certificate' : 'Add Certificate'}
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

export default CertificatesManager;
