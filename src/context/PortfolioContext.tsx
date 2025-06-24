
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { apiService, Project, Service, User } from '../services/api';

interface PortfolioState {
  projects: Project[];
  services: Service[];
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

type PortfolioAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PROJECTS'; payload: Project[] }
  | { type: 'SET_SERVICES'; payload: Service[] }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'ADD_SERVICE'; payload: Service }
  | { type: 'UPDATE_SERVICE'; payload: Service }
  | { type: 'DELETE_SERVICE'; payload: string };

const initialState: PortfolioState = {
  projects: [],
  services: [],
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

function portfolioReducer(state: PortfolioState, action: PortfolioAction): PortfolioState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };
    case 'SET_SERVICES':
      return { ...state, services: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(p => p.id !== action.payload),
      };
    case 'ADD_SERVICE':
      return { ...state, services: [...state.services, action.payload] };
    case 'UPDATE_SERVICE':
      return {
        ...state,
        services: state.services.map(s =>
          s.id === action.payload.id ? action.payload : s
        ),
      };
    case 'DELETE_SERVICE':
      return {
        ...state,
        services: state.services.filter(s => s.id !== action.payload),
      };
    default:
      return state;
  }
}

interface PortfolioContextType {
  state: PortfolioState;
  // Auth actions
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  // Data actions
  fetchProjects: () => Promise<void>;
  fetchServices: () => Promise<void>;
  // Project actions
  createProject: (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Project | null>;
  updateProject: (id: string, projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Project | null>;
  deleteProject: (id: string) => Promise<boolean>;
  // Service actions
  createService: (serviceData: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Service | null>;
  updateService: (id: string, serviceData: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Service | null>;
  deleteService: (id: string) => Promise<boolean>;
  // Upload action
  uploadImage: (file: File) => Promise<string | null>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);

  // Auth actions
  const login = async (username: string, password: string): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const result = await apiService.login(username, password);
      
      if (result.success) {
        dispatch({ type: 'SET_USER', payload: result.data.user });
        dispatch({ type: 'SET_AUTHENTICATED', payload: true });
        return true;
      } else {
        dispatch({ type: 'SET_ERROR', payload: result.message });
        return false;
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Login failed' });
      return false;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = async (): Promise<void> => {
    await apiService.logout();
    dispatch({ type: 'SET_USER', payload: null });
    dispatch({ type: 'SET_AUTHENTICATED', payload: false });
  };

  const checkAuth = async (): Promise<void> => {
    if (!apiService.isAuthenticated()) {
      dispatch({ type: 'SET_AUTHENTICATED', payload: false });
      return;
    }

    try {
      const result = await apiService.getProfile();
      if (result.success) {
        dispatch({ type: 'SET_USER', payload: result.data });
        dispatch({ type: 'SET_AUTHENTICATED', payload: true });
      } else {
        dispatch({ type: 'SET_AUTHENTICATED', payload: false });
      }
    } catch (error) {
      dispatch({ type: 'SET_AUTHENTICATED', payload: false });
    }
  };

  // Data fetching
  const fetchProjects = async (): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const result = await apiService.getProjects();
      if (result.success) {
        dispatch({ type: 'SET_PROJECTS', payload: result.data || [] });
      } else {
        dispatch({ type: 'SET_ERROR', payload: result.message });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch projects' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const fetchServices = async (): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const result = await apiService.getServices();
      if (result.success) {
        dispatch({ type: 'SET_SERVICES', payload: result.data || [] });
      } else {
        dispatch({ type: 'SET_ERROR', payload: result.message });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch services' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Project actions
  const createProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project | null> => {
    try {
      const result = await apiService.createProject(projectData);
      if (result.success) {
        dispatch({ type: 'ADD_PROJECT', payload: result.data });
        return result.data;
      } else {
        dispatch({ type: 'SET_ERROR', payload: result.message });
        return null;
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to create project' });
      return null;
    }
  };

  const updateProject = async (id: string, projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project | null> => {
    try {
      const result = await apiService.updateProject(id, projectData);
      if (result.success) {
        dispatch({ type: 'UPDATE_PROJECT', payload: result.data });
        return result.data;
      } else {
        dispatch({ type: 'SET_ERROR', payload: result.message });
        return null;
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update project' });
      return null;
    }
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    try {
      const result = await apiService.deleteProject(id);
      if (result.success) {
        dispatch({ type: 'DELETE_PROJECT', payload: id });
        return true;
      } else {
        dispatch({ type: 'SET_ERROR', payload: result.message });
        return false;
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete project' });
      return false;
    }
  };

  // Service actions
  const createService = async (serviceData: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service | null> => {
    try {
      const result = await apiService.createService(serviceData);
      if (result.success) {
        dispatch({ type: 'ADD_SERVICE', payload: result.data });
        return result.data;
      } else {
        dispatch({ type: 'SET_ERROR', payload: result.message });
        return null;
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to create service' });
      return null;
    }
  };

  const updateService = async (id: string, serviceData: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service | null> => {
    try {
      const result = await apiService.updateService(id, serviceData);
      if (result.success) {
        dispatch({ type: 'UPDATE_SERVICE', payload: result.data });
        return result.data;
      } else {
        dispatch({ type: 'SET_ERROR', payload: result.message });
        return null;
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update service' });
      return null;
    }
  };

  const deleteService = async (id: string): Promise<boolean> => {
    try {
      const result = await apiService.deleteService(id);
      if (result.success) {
        dispatch({ type: 'DELETE_SERVICE', payload: id });
        return true;
      } else {
        dispatch({ type: 'SET_ERROR', payload: result.message });
        return false;
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete service' });
      return false;
    }
  };

  // Upload action
  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const result = await apiService.uploadImage(file);
      if (result.success) {
        return result.data.fileUrl;
      } else {
        dispatch({ type: 'SET_ERROR', payload: result.message });
        return null;
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to upload image' });
      return null;
    }
  };

  // Initialize data on mount
  useEffect(() => {
    checkAuth();
    fetchProjects();
    fetchServices();
  }, []);

  const contextValue: PortfolioContextType = {
    state,
    login,
    logout,
    checkAuth,
    fetchProjects,
    fetchServices,
    createProject,
    updateProject,
    deleteProject,
    createService,
    updateService,
    deleteService,
    uploadImage,
  };

  return (
    <PortfolioContext.Provider value={contextValue}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}

export type { Project, Service, User };
