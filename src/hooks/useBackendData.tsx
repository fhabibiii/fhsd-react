
import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export const useBackendData = () => {
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState({
    projects: true,
    services: true,
    contact: true
  });
  const [errors, setErrors] = useState({
    projects: null,
    services: null,
    contact: null
  });

  const fetchProjects = async () => {
    try {
      const response = await apiService.getAllProjects();
      if (response.success) {
        setProjects(response.data || []);
      } else {
        setErrors(prev => ({ ...prev, projects: response.message }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, projects: 'Failed to fetch projects' }));
    } finally {
      setLoading(prev => ({ ...prev, projects: false }));
    }
  };

  const fetchServices = async () => {
    try {
      const response = await apiService.getAllServices();
      if (response.success) {
        setServices(response.data || []);
      } else {
        setErrors(prev => ({ ...prev, services: response.message }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, services: 'Failed to fetch services' }));
    } finally {
      setLoading(prev => ({ ...prev, services: false }));
    }
  };

  const fetchContactInfo = async () => {
    try {
      const response = await apiService.getContactInfo();
      if (response.success) {
        setContactInfo(response.data);
      } else {
        setErrors(prev => ({ ...prev, contact: response.message }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, contact: 'Failed to fetch contact info' }));
    } finally {
      setLoading(prev => ({ ...prev, contact: false }));
    }
  };

  const sendMessage = async (messageData: any) => {
    try {
      const response = await apiService.makeRequest('/api/messages', {
        method: 'POST',
        body: JSON.stringify({
          name: messageData.name,
          email: messageData.email,
          phone: messageData.phone,
          type: messageData.projectType,
          budget: messageData.budget,
          detail: messageData.message
        }),
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchServices();
    fetchContactInfo();
  }, []);

  return {
    projects,
    services,
    contactInfo,
    loading,
    errors,
    sendMessage,
    refetch: {
      projects: fetchProjects,
      services: fetchServices,
      contact: fetchContactInfo
    }
  };
};
