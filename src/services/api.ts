
const API_BASE_URL = 'https://f83d-2404-c0-9aa0-00-3d6e-f0fe.ngrok-free.app';

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface User {
  id: string;
  username: string;
  role: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  createdAt: string;
  updatedAt: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ContactInfo {
  id: string;
  email: string;
  phone: string;
  whatsapp: string;
  instagram?: string;
  address?: string;
  mapUrl?: string;
  createdAt: string;
  updatedAt: string;
}

class ApiService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    this.loadTokensFromStorage();
  }

  private loadTokensFromStorage() {
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
  }

  private saveTokensToStorage(tokens: AuthTokens) {
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }

  private clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  private async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshToken) return false;

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      });

      const result: ApiResponse<AuthTokens> = await response.json();

      if (result.success) {
        this.saveTokensToStorage(result.data);
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }

    this.clearTokens();
    return false;
  }

  private async makeRequest<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    try {
      let response = await fetch(url, {
        ...options,
        headers,
      });

      // If token expired, try to refresh
      if (response.status === 401 && this.refreshToken) {
        const refreshed = await this.refreshAccessToken();
        if (refreshed) {
          headers['Authorization'] = `Bearer ${this.accessToken}`;
          response = await fetch(url, {
            ...options,
            headers,
          });
        }
      }

      const result: ApiResponse<T> = await response.json();
      return result;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        message: 'Network error occurred',
        data: null,
      };
    }
  }

  // Auth Methods
  async login(username: string, password: string): Promise<ApiResponse<{ user: User } & AuthTokens>> {
    const result = await this.makeRequest<{ user: User } & AuthTokens>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if (result.success) {
      this.saveTokensToStorage({
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
      });
    }

    return result;
  }

  async logout(): Promise<ApiResponse> {
    const result = await this.makeRequest('/api/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: this.refreshToken }),
    });

    this.clearTokens();
    return result;
  }

  async getProfile(): Promise<ApiResponse<User>> {
    return this.makeRequest<User>('/api/auth/me');
  }

  // Projects Methods
  async getProjects(): Promise<ApiResponse<Project[]>> {
    return this.makeRequest<Project[]>('/api/projects');
  }

  async getProjectById(id: string): Promise<ApiResponse<Project>> {
    return this.makeRequest<Project>(`/api/projects/${id}`);
  }

  async createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Project>> {
    return this.makeRequest<Project>('/api/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  async updateProject(id: string, projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Project>> {
    return this.makeRequest<Project>(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
  }

  async deleteProject(id: string): Promise<ApiResponse> {
    return this.makeRequest(`/api/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Services Methods
  async getServices(): Promise<ApiResponse<Service[]>> {
    return this.makeRequest<Service[]>('/api/services');
  }

  async getServiceById(id: string): Promise<ApiResponse<Service>> {
    return this.makeRequest<Service>(`/api/services/${id}`);
  }

  async createService(serviceData: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Service>> {
    return this.makeRequest<Service>('/api/services', {
      method: 'POST',
      body: JSON.stringify(serviceData),
    });
  }

  async updateService(id: string, serviceData: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Service>> {
    return this.makeRequest<Service>(`/api/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(serviceData),
    });
  }

  async deleteService(id: string): Promise<ApiResponse> {
    return this.makeRequest(`/api/services/${id}`, {
      method: 'DELETE',
    });
  }

  // Messages Methods
  async getMessages(): Promise<ApiResponse<Message[]>> {
    return this.makeRequest<Message[]>('/api/messages');
  }

  async getMessageById(id: string): Promise<ApiResponse<Message>> {
    return this.makeRequest<Message>(`/api/messages/${id}`);
  }

  async sendMessage(messageData: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }): Promise<ApiResponse<Message>> {
    return this.makeRequest<Message>('/api/messages', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  }

  async updateMessageReadStatus(id: string, isRead: boolean): Promise<ApiResponse<Message>> {
    return this.makeRequest<Message>(`/api/messages/${id}/read`, {
      method: 'PATCH',
      body: JSON.stringify({ isRead }),
    });
  }

  async deleteMessage(id: string): Promise<ApiResponse> {
    return this.makeRequest(`/api/messages/${id}`, {
      method: 'DELETE',
    });
  }

  // Contact Methods
  async getContactInfo(): Promise<ApiResponse<ContactInfo>> {
    return this.makeRequest<ContactInfo>('/api/contact');
  }

  async createContactInfo(contactData: Omit<ContactInfo, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<ContactInfo>> {
    return this.makeRequest<ContactInfo>('/api/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  async updateContactInfo(contactData: Omit<ContactInfo, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<ContactInfo>> {
    return this.makeRequest<ContactInfo>('/api/contact', {
      method: 'PUT',
      body: JSON.stringify(contactData),
    });
  }

  // Upload Methods
  async uploadImage(file: File): Promise<ApiResponse<{
    fileName: string;
    fileUrl: string;
    fileSize: number;
    mimeType: string;
    uploadedAt: string;
  }>> {
    const formData = new FormData();
    formData.append('image', file);

    return this.makeRequest('/api/upload/image', {
      method: 'POST',
      headers: {
        'Authorization': this.accessToken ? `Bearer ${this.accessToken}` : '',
      },
      body: formData,
    });
  }

  // Auth status
  isAuthenticated(): boolean {
    return !!this.accessToken;
  }
}

export const apiService = new ApiService();
export type { Project, Service, Message, ContactInfo, User, ApiResponse };
