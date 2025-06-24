
import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface ContactInfo {
  phone: string;
  email: string;
  hours: string;
  address: string;
  mapsEmbedUrl: string;
}

const ContactManager = () => {
  const { toast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: '+62 851-5632-1198',
    email: 'hello@fhdigital.com',
    hours: 'Senin - Jumat: 09:00 - 17:00',
    address: 'Yogyakarta, Indonesia',
    mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.0419!2d110.3695!3d-7.7956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDcnNDQuMSJTIDExMMKwMjInMTAuMiJF!5e0!3m2!1sen!2sid!4v1234567890!5m2!1sen!2sid'
  });

  const [formData, setFormData] = useState<ContactInfo>(contactInfo);

  const handleEdit = () => {
    setFormData(contactInfo);
    setIsEditModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactInfo(formData);
    setIsEditModalOpen(false);
    toast({
      title: "Contact information updated!",
      description: "Contact details have been successfully updated.",
      variant: "default",
    });
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Contact Information</h2>
        <Button 
          onClick={handleEdit} 
          className="flex items-center gap-2 hover:shadow-lg transition-all duration-200 hover:scale-105"
        >
          <Edit className="w-4 h-4" />
          Edit Contact Info
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Details */}
        <div className="space-y-4">
          <div className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-all duration-200 animate-fade-in">
            <div className="flex items-center gap-3 mb-3">
              <Phone className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Phone Number</h3>
            </div>
            <p className="text-muted-foreground">{contactInfo.phone}</p>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-all duration-200 animate-fade-in">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Email Address</h3>
            </div>
            <p className="text-muted-foreground">{contactInfo.email}</p>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-all duration-200 animate-fade-in">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Operating Hours</h3>
            </div>
            <p className="text-muted-foreground">{contactInfo.hours}</p>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-all duration-200 animate-fade-in">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Address</h3>
            </div>
            <p className="text-muted-foreground">{contactInfo.address}</p>
          </div>
        </div>

        {/* Google Maps */}
        <div className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-all duration-200 animate-fade-in">
          <h3 className="font-semibold text-foreground mb-4">Location</h3>
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              src={contactInfo.mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            />
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Contact Information</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Phone Number</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+62 xxx-xxxx-xxxx"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Email Address</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@domain.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Operating Hours</label>
              <Input
                value={formData.hours}
                onChange={(e) => setFormData(prev => ({ ...prev, hours: e.target.value }))}
                placeholder="Senin - Jumat: 09:00 - 17:00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Address</label>
              <Textarea
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                rows={2}
                placeholder="Full address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Google Maps Embed URL</label>
              <Textarea
                value={formData.mapsEmbedUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, mapsEmbedUrl: e.target.value }))}
                rows={4}
                placeholder="https://www.google.com/maps/embed?pb=..."
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Get embed URL from Google Maps → Share → Embed a map
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1 hover:shadow-md transition-all duration-200">
                Save Changes
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 hover:shadow-md transition-all duration-200"
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
