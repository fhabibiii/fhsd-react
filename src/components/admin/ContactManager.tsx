
import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin, Edit } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactManager = () => {
  const { data, updateContact } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    phone: data.contact?.phone || '',
    email: data.contact?.email || '',
    hours: data.contact?.hours || '',
    address: data.contact?.address || '',
    mapUrl: data.contact?.mapUrl || '',
  });
  const { toast } = useToast();

  const handleOpenModal = () => {
    setFormData({
      phone: data.contact?.phone || '',
      email: data.contact?.email || '',
      hours: data.contact?.hours || '',
      address: data.contact?.address || '',
      mapUrl: data.contact?.mapUrl || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateContact({
      phone: formData.phone,
      email: formData.email,
      hours: formData.hours,
      address: formData.address,
      mapUrl: formData.mapUrl,
    });

    toast({
      title: "Contact updated!",
      description: "Contact information has been successfully updated.",
    });

    setIsModalOpen(false);
  };

  return (
    <div className="p-4 md:p-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Manage Contact</h2>
        <Button 
          onClick={handleOpenModal} 
          className="flex items-center gap-2 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Edit className="w-4 h-4" />
          Edit Contact
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in">
          <div className="flex items-center gap-3 mb-3">
            <Phone className="w-6 h-6 text-primary" />
            <h3 className="font-semibold text-foreground">Phone</h3>
          </div>
          <p className="text-muted-foreground">{data.contact?.phone || 'Not set'}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in">
          <div className="flex items-center gap-3 mb-3">
            <Mail className="w-6 h-6 text-primary" />
            <h3 className="font-semibold text-foreground">Email</h3>
          </div>
          <p className="text-muted-foreground break-all">{data.contact?.email || 'Not set'}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-6 h-6 text-primary" />
            <h3 className="font-semibold text-foreground">Operational Hours</h3>
          </div>
          <p className="text-muted-foreground">{data.contact?.hours || 'Not set'}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="w-6 h-6 text-primary" />
            <h3 className="font-semibold text-foreground">Address</h3>
          </div>
          <p className="text-muted-foreground">{data.contact?.address || 'Not set'}</p>
        </div>
      </div>

      {data.contact?.mapUrl && (
        <div className="mt-6 animate-fade-in">
          <h3 className="text-lg font-semibold text-foreground mb-4">Location Map</h3>
          <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
            <iframe
              src={data.contact.mapUrl}
              width="100%"
              height="300"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Contact Information</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Phone Number *</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+62 812-3456-7890"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Email Address *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="contact@fhdigital.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Operational Hours *</label>
              <Input
                value={formData.hours}
                onChange={(e) => setFormData(prev => ({ ...prev, hours: e.target.value }))}
                placeholder="Senin - Jumat: 09:00 - 17:00 WIB"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Address *</label>
              <Textarea
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                rows={3}
                placeholder="Jl. Contoh No. 123, Jakarta, Indonesia"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Google Maps Embed URL</label>
              <Textarea
                value={formData.mapUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, mapUrl: e.target.value }))}
                rows={4}
                placeholder="https://www.google.com/maps/embed?pb=1!1m18!1m12..."
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Get embed URL from Google Maps: Share → Embed a map → Copy HTML
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                Update Contact
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

export default ContactManager;
