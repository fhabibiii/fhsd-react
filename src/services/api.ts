
const BASE_URL = 'https://344c-2001-448a-4040-9470-4ced-ae75-7340-4c94.ngrok-free.app';

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
        return await retryResponse.json();
      } catch (error) {
        // If refresh fails, logout
        this.logout();
        throw new Error('Session expired. Please login again.');
      }
    }

    return await response.json();
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
          console.error('Auto token refresh failed:', error);
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
      console.error('Logout API call failed:', error);
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

  isAuthenticated(): boolean {
    return !!(this.accessToken && this.refreshToken);
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }
}

export const apiService = new ApiService();
