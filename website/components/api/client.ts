// API Client for frontend-backend communication
export class ApiClient {
  private baseUrl: string = '';
  private csrfToken: string | null = null;

  constructor() {
    this.baseUrl = ApiClient.getBaseUrl();
  }

  static getBaseUrl(): string {
    if (typeof window !== 'undefined') {
      // Client-side - use current origin for API calls
      return window.location.origin;
    }
    // Server-side - use environment variable or localhost
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:6354';
  }

  async fetchCsrfToken(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/api/csrf-token`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        this.csrfToken = data.token;
      }
    } catch (error) {
      console.error('Failed to fetch CSRF token:', error);
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const url = endpoint.startsWith('http') 
      ? endpoint 
      : `${this.baseUrl}${endpoint}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.csrfToken) {
      headers['X-CSRF-Token'] = this.csrfToken;
    }

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    return response;
  }

  async get<T>(endpoint: string): Promise<Response> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<Response> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<Response> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<Response> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create singleton instance
export const api = new ApiClient();

// Proxy function for Next.js API routes
export async function proxyAdminRequest(request: Request, targetPath: string): Promise<Response> {
  try {
    const backendUrl = process.env.ADMIN_BACKEND_URL || 'http://localhost:6354';
    const target = `${backendUrl}/api/${targetPath}`;
    
    const headers: Record<string, string> = {};
    
    // Copy headers but filter out problematic ones
    request.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'host' && 
          key.toLowerCase() !== 'connection') {
        headers[key] = value;
      }
    });

    // Add proper Origin header for CORS
    headers['Origin'] = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const init: RequestInit = {
      method: request.method,
      headers,
      credentials: 'include',
      redirect: "manual",
    };

    if (request.method !== "GET" && request.method !== "HEAD") {
      init.body = await request.arrayBuffer();
    }

    const response = await fetch(target, init);
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    });
  } catch (error) {
    console.error(`Proxy error for ${targetPath}:`, error);
    return new Response(
      JSON.stringify({ error: "Failed to connect to backend", message: error instanceof Error ? error.message : "Unknown error" }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
}
