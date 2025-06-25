

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

class ApiService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private refreshTokenPromise: Promise<string> | null = null;
  private refreshInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Load tokens from localStorage on initialization
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
    
    console.log('ApiService initialized with tokens:', {
      hasAccessToken: !!this.accessToken,
      hasRefreshToken: !!this.refreshToken
    });
    
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
    if (this.accessToken && !endpoint.includes('/auth/login')) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${this.accessToken}`,
      };
    }

    console.log('Making request to:', endpoint, {
      hasAuthHeader: !!(config.headers as any)?.Authorization,
      method: config.method || 'GET'
    });

    const response = await fetch(url, config);
    
    // Handle token expiration
    if (response.status === 401 && this.refreshToken && !endpoint.includes('/auth/')) {
      console.log('Token expired, attempting refresh...');
      try {
        await this.handleTokenRefresh();
        // Retry the original request with new token
        config.headers = {
          ...config.headers,
          'Authorization': `Bearer ${this.accessToken}`,
        };
        console.log('Retrying request with new token...');
        const retryResponse = await fetch(url, config);
        return await retryResponse.json();
      } catch (error) {
        console.error('Token refresh failed during request:', error);
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
      console.log('Using existing refresh promise...');
      return this.refreshTokenPromise;
    }

    console.log('Starting new token refresh...');
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

    console.log('Refreshing token with refresh token:', this.refreshToken.substring(0, 20) + '...');

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
    console.log('Refresh token response:', { success: result.success, message: result.message });

    if (!result.success || !result.data) {
      throw new Error(result.message || 'Failed to refresh token');
    }

    // Important: Update tokens immediately after successful refresh
    const newAccessToken = result.data.accessToken;
    const newRefreshToken = result.data.refreshToken;
    
    console.log('Setting new tokens after refresh:', {
      newAccessToken: newAccessToken.substring(0, 20) + '...',
      newRefreshToken: newRefreshToken.substring(0, 20) + '...'
    });

    this.setTokens(newAccessToken, newRefreshToken);
    return newAccessToken;
  }

  private startTokenRefresh() {
    // Clear existing interval if any
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }

    console.log('Starting token refresh interval (every 7 seconds)...');
    
    // Refresh token every 7 seconds (before 15 second expiry)
    this.refreshInterval = setInterval(() => {
      if (this.refreshToken) {
        console.log('Auto refresh token triggered...');
        this.handleTokenRefresh().catch((error) => {
          console.error('Auto token refresh failed:', error);
          this.logout();
        });
      } else {
        console.log('No refresh token available, stopping auto refresh');
        if (this.refreshInterval) {
          clearInterval(this.refreshInterval);
          this.refreshInterval = null;
        }
      }
    }, 7000); // Changed to 7 seconds
  }

  private stopTokenRefresh() {
    if (this.refreshInterval) {
      console.log('Stopping token refresh interval...');
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }

  private setTokens(accessToken: string, refreshToken: string) {
    console.log('Setting tokens:', {
      accessToken: accessToken.substring(0, 20) + '...',
      refreshToken: refreshToken.substring(0, 20) + '...'
    });
    
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  private clearTokens() {
    console.log('Clearing tokens...');
    this.stopTokenRefresh();
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  async login(username: string, password: string): Promise<ApiResponse<LoginResponse>> {
    console.log('Attempting login for username:', username);
    
    const response = await this.makeRequest<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    console.log('Login response:', { success: response.success, message: response.message });

    if (response.success && response.data) {
      this.setTokens(response.data.accessToken, response.data.refreshToken);
      this.startTokenRefresh();
    }

    return response;
  }

  async logout(): Promise<void> {
    console.log('Attempting logout...');
    
    try {
      if (this.refreshToken) {
        await this.makeRequest('/api/auth/logout', {
          method: 'POST',
          body: JSON.stringify({
            refreshToken: this.refreshToken,
          }),
        });
        console.log('Logout API call successful');
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      this.clearTokens();
    }
  }

  isAuthenticated(): boolean {
    const isAuth = !!(this.accessToken && this.refreshToken);
    console.log('Is authenticated:', isAuth);
    return isAuth;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }
}

export const apiService = new ApiService();

