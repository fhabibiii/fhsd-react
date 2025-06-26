import { config } from '../config/env';

const BASE_URL = config.apiBaseUrl;

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface LoginResponse {
  user: {
    id: string;
    username: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ContactInfo {
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

export interface ContactUpdateRequest {
  phone: string;
  email: string;
  address: string;
  map: string;
  instagram: string;
  whatsApp: string;
  workHours: string;
}

export interface ServiceFeature {
  id: string;
  serviceId: string;
  feature: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  createdAt: string;
  updatedAt: string;
  features: ServiceFeature[];
}

export interface ServiceCreateRequest {
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
}

export interface ServiceUpdateRequest {
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
}

export interface Message {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  type: string;
  budget: string;
  detail?: string;
  isRead: boolean;
  createdAt: string;
}

export interface MessageDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  budget: string;
  detail: string;
  isRead: boolean;
  createdAt: string;
}

export interface MessageSendRequest {
  name: string;
  email: string;
  phone: string;
  type: string;
  budget: string;
  detail: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectCreateRequest {
  title: string;
  description: string;
  image: string;
  link?: string;
}

export interface ProjectUpdateRequest {
  title: string;
  description: string;
  image: string;
  link?: string;
}

export interface ImageUploadResponse {
  filename: string;
  url: string;
}

class ApiService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private refreshTokenPromise: Promise<string> | null = null;

  constructor() {
    // Load tokens from localStorage on initialization
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
    
    // Start automatic token refresh if we have tokens
    if (this.accessToken && this.refreshToken) {
      this.startTokenRefresh();
    }
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        ...options.headers,
      },
    };

    // Add auth header if we have a token and it's not a public endpoint
    if (this.accessToken && !endpoint.includes('/auth/login') && !endpoint.includes('/contact-info') || (endpoint.includes('/contact-info') && options.method !== 'GET')) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${this.accessToken}`,
      };
    }

    try {
      const response = await fetch(url, config);
      
      // Handle token expiration
      if (response.status === 401 && this.refreshToken && !endpoint.includes('/auth/')) {
        try {
          await this.handleTokenRefresh();
          // Retry the original request with new token
          config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${this.accessToken}`,
          };
          const retryResponse = await fetch(url, config);
          const result = await retryResponse.json();
          return result;
        } catch (error) {
          // If refresh fails, logout
          this.logout();
          throw new Error('Session expired. Please login again.');
        }
      }

      const result = await response.json();
      return result;
    } catch (error) {
      // Only log critical errors and only in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Critical API Error:', error);
      }
      throw error;
    }
  }

  private async handleTokenRefresh(): Promise<string> {
    // Prevent multiple simultaneous refresh requests
    if (this.refreshTokenPromise) {
      return this.refreshTokenPromise;
    }

    this.refreshTokenPromise = this.refreshTokenInternal();
    
    try {
      const newAccessToken = await this.refreshTokenPromise;
      return newAccessToken;
    } finally {
      this.refreshTokenPromise = null;
    }
  }

  private async refreshTokenInternal(): Promise<string> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${BASE_URL}/api/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify({
        refreshToken: this.refreshToken,
      }),
    });

    const result: ApiResponse<RefreshTokenResponse> = await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.message || 'Failed to refresh token');
    }

    this.setTokens(result.data.accessToken, result.data.refreshToken);
    return result.data.accessToken;
  }

  private startTokenRefresh() {
    // Refresh token every 7 seconds (before 15 second expiry)
    setInterval(() => {
      if (this.refreshToken) {
        this.handleTokenRefresh().catch((error) => {
          // Silent fail in production
          if (process.env.NODE_ENV === 'development') {
            console.error('Auto token refresh failed:', error);
          }
          this.logout();
        });
      }
    }, 7000);
  }

  private setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  private clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  async login(username: string, password: string): Promise<ApiResponse<LoginResponse>> {
    const response = await this.makeRequest<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if (response.success && response.data) {
      this.setTokens(response.data.accessToken, response.data.refreshToken);
      this.startTokenRefresh();
    }

    return response;
  }

  async logout(): Promise<void> {
    try {
      if (this.refreshToken) {
        await this.makeRequest('/api/auth/logout', {
          method: 'POST',
          body: JSON.stringify({
            refreshToken: this.refreshToken,
          }),
        });
      }
    } catch (error) {
      // Silent fail for logout
    } finally {
      this.clearTokens();
    }
  }

  async getContactInfo(): Promise<ApiResponse<ContactInfo>> {
    return this.makeRequest<ContactInfo>('/api/contact-info', {
      method: 'GET',
    });
  }

  async updateContactInfo(data: ContactUpdateRequest): Promise<ApiResponse<ContactInfo>> {
    return this.makeRequest<ContactInfo>('/api/contact-info', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getAllServices(): Promise<ApiResponse<Service[]>> {
    return this.makeRequest<Service[]>('/api/services', {
      method: 'GET',
    });
  }

  async getServiceById(id: string): Promise<ApiResponse<Service>> {
    return this.makeRequest<Service>(`/api/services/${id}`, {
      method: 'GET',
    });
  }

  async createService(data: ServiceCreateRequest): Promise<ApiResponse<Service>> {
    return this.makeRequest<Service>('/api/services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateService(id: string, data: ServiceUpdateRequest): Promise<ApiResponse<Service>> {
    return this.makeRequest<Service>(`/api/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteService(id: string): Promise<ApiResponse<null>> {
    return this.makeRequest<null>(`/api/services/${id}`, {
      method: 'DELETE',
    });
  }

  async getAllMessages(): Promise<ApiResponse<Message[]>> {
    return this.makeRequest<Message[]>('/api/messages', {
      method: 'GET',
    });
  }

  async getMessageById(id: string): Promise<ApiResponse<MessageDetail>> {
    return this.makeRequest<MessageDetail>(`/api/messages/${id}`, {
      method: 'GET',
    });
  }

  async markMessageAsRead(id: string): Promise<ApiResponse<MessageDetail>> {
    return this.makeRequest<MessageDetail>(`/api/messages/${id}/read`, {
      method: 'PATCH',
    });
  }

  async deleteMessage(id: string): Promise<ApiResponse<null>> {
    return this.makeRequest<null>(`/api/messages/${id}`, {
      method: 'DELETE',
    });
  }

  async getAllProjects(): Promise<ApiResponse<Project[]>> {
    return this.makeRequest<Project[]>('/api/projects', {
      method: 'GET',
    });
  }

  async getProjectById(id: string): Promise<ApiResponse<Project>> {
    return this.makeRequest<Project>(`/api/projects/${id}`, {
      method: 'GET',
    });
  }

  async uploadImage(file: File): Promise<ApiResponse<ImageUploadResponse>> {
    const formData = new FormData();
    formData.append('image', file);

    const config: RequestInit = {
      method: 'POST',
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Authorization': `Bearer ${this.accessToken}`,
      },
      body: formData,
    };

    const url = `${BASE_URL}/api/upload/image`;
    
    try {
      const response = await fetch(url, config);
      const result = await response.json();
      return result;
    } catch (error) {
      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Upload failed:', error);
      }
      throw error;
    }
  }

  async createProject(data: ProjectCreateRequest): Promise<ApiResponse<Project>> {
    return this.makeRequest<Project>('/api/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProject(id: string, data: ProjectUpdateRequest): Promise<ApiResponse<Project>> {
    return this.makeRequest<Project>(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProject(id: string): Promise<ApiResponse<null>> {
    return this.makeRequest<null>(`/api/projects/${id}`, {
      method: 'DELETE',
    });
  }

  async sendMessage(data: MessageSendRequest): Promise<ApiResponse<MessageDetail>> {
    return this.makeRequest<MessageDetail>('/api/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  isAuthenticated(): boolean {
    return !!(this.accessToken && this.refreshToken);
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }
}

export const apiService = new ApiService();
