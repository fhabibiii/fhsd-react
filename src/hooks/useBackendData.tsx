
import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export interface BackendProject {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BackendService {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  createdAt: string;
  updatedAt: string;
  features: {
    id: string;
    serviceId: string;
    feature: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface BackendContactInfo {
  id: string;
  phone: string;
  email: string;
  address: string;
  map: string;
  instagram: string;
  whatsApp: string;
  workHours: string;
  updatedAt: string;
}

export const useBackendData = () => {
  const [projects, setProjects] = useState<BackendProject[]>([]);
  const [services, setServices] = useState<BackendService[]>([]);
  const [contactInfo, setContactInfo] = useState<BackendContactInfo | null>(null);
  const [loading, setLoading] = useState({
    projects: true,
    services: true,
    contact: true
  });

  useEffect(() => {
    fetchProjects();
    fetchServices();
    fetchContactInfo();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await apiService.getAllProjects();
      if (response.success && response.data) {
        setProjects(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(prev => ({ ...prev, projects: false }));
    }
  };

  const fetchServices = async () => {
    try {
      const response = await apiService.getAllServices();
      if (response.success && response.data) {
        setServices(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(prev => ({ ...prev, services: false }));
    }
  };

  const fetchContactInfo = async () => {
    try {
      const response = await apiService.getContactInfo();
      if (response.success && response.data) {
        setContactInfo(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch contact info:', error);
    } finally {
      setLoading(prev => ({ ...prev, contact: false }));
    }
  };

  const sendMessage = async (messageData: {
    name: string;
    email: string;
    phone: string;
    type: string;
    budget: string;
    detail: string;
  }) => {
    try {
      const response = await apiService.sendMessage(messageData);
      return response;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  };

  return {
    projects,
    services,
    contactInfo,
    loading,
    sendMessage
  };
};
