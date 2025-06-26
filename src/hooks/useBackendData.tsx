
import { useState, useEffect, useCallback, useMemo } from 'react';
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

// Simple cache to prevent multiple API calls
const cache = {
  projects: null as BackendProject[] | null,
  services: null as BackendService[] | null,
  contactInfo: null as BackendContactInfo | null,
  timestamps: {
    projects: 0,
    services: 0,
    contactInfo: 0,
  }
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useBackendData = () => {
  const [projects, setProjects] = useState<BackendProject[]>([]);
  const [services, setServices] = useState<BackendService[]>([]);
  const [contactInfo, setContactInfo] = useState<BackendContactInfo | null>(null);
  const [loading, setLoading] = useState({
    projects: true,
    services: true,
    contact: true
  });

  const isCacheValid = useCallback((key: keyof typeof cache.timestamps) => {
    return Date.now() - cache.timestamps[key] < CACHE_DURATION;
  }, []);

  const fetchProjects = useCallback(async () => {
    if (cache.projects && isCacheValid('projects')) {
      setProjects(cache.projects);
      setLoading(prev => ({ ...prev, projects: false }));
      return;
    }

    try {
      const response = await apiService.getAllProjects();
      if (response.success && response.data) {
        cache.projects = response.data;
        cache.timestamps.projects = Date.now();
        setProjects(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(prev => ({ ...prev, projects: false }));
    }
  }, [isCacheValid]);

  const fetchServices = useCallback(async () => {
    if (cache.services && isCacheValid('services')) {
      setServices(cache.services);
      setLoading(prev => ({ ...prev, services: false }));
      return;
    }

    try {
      const response = await apiService.getAllServices();
      if (response.success && response.data) {
        cache.services = response.data;
        cache.timestamps.services = Date.now();
        setServices(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(prev => ({ ...prev, services: false }));
    }
  }, [isCacheValid]);

  const fetchContactInfo = useCallback(async () => {
    if (cache.contactInfo && isCacheValid('contactInfo')) {
      setContactInfo(cache.contactInfo);
      setLoading(prev => ({ ...prev, contact: false }));
      return;
    }

    try {
      const response = await apiService.getContactInfo();
      if (response.success && response.data) {
        cache.contactInfo = response.data;
        cache.timestamps.contactInfo = Date.now();
        setContactInfo(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch contact info:', error);
    } finally {
      setLoading(prev => ({ ...prev, contact: false }));
    }
  }, [isCacheValid]);

  useEffect(() => {
    fetchProjects();
    fetchServices();
    fetchContactInfo();
  }, [fetchProjects, fetchServices, fetchContactInfo]);

  const sendMessage = useCallback(async (messageData: {
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
  }, []);

  // Memoize return value to prevent unnecessary re-renders
  const returnValue = useMemo(() => ({
    projects,
    services,
    contactInfo,
    loading,
    sendMessage
  }), [projects, services, contactInfo, loading, sendMessage]);

  return returnValue;
};
