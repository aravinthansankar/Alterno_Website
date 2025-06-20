import { SquareTokenManager } from './tokenManager';

interface SquareApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
}

export class SquareApi {
  private static readonly BASE_URL = 'https://connect.squareupsandbox.com';

  static async request<T = any>(
    endpoint: string,
    options: SquareApiOptions = {}
  ): Promise<T> {
    const accessToken = await SquareTokenManager.getValidAccessToken();
    
    if (!accessToken) {
      throw new Error('No valid Square access token available');
    }

    const { method = 'GET', body, headers = {} } = options;

    const requestOptions: RequestInit = {
      method,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Square-Version': '2024-01-17',
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (body && method !== 'GET') {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.BASE_URL}${endpoint}`, requestOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Square API error: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }

  // Merchant information
  static async getMerchant(): Promise<any> {
    return this.request('/merchants/me');
  }

  // Locations
  static async getLocations(): Promise<any> {
    return this.request('/locations');
  }

  // Catalog items
  static async getCatalogItems(): Promise<any> {
    return this.request('/catalog/search', {
      method: 'POST',
      body: {
        object_types: ['ITEM'],
        include_deleted_objects: false,
        include_related_objects: true,
      },
    });
  }

  // Orders
  static async getOrders(): Promise<any> {
    return this.request('/orders/search', {
      method: 'POST',
      body: {
        location_ids: [], // Will be populated with actual location IDs
        query: {
          filter: {
            date_time_filter: {
              created_at: {
                start_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // Last 30 days
              },
            },
          },
        },
      },
    });
  }

  // Payments
  static async getPayments(): Promise<any> {
    return this.request('/payments', {
      method: 'POST',
      body: {
        begin_time: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // Last 30 days
        end_time: new Date().toISOString(),
      },
    });
  }

  // Inventory
  static async getInventoryCounts(): Promise<any> {
    return this.request('/inventory/counts/batch-retrieve', {
      method: 'POST',
      body: {
        location_ids: [], // Will be populated with actual location IDs
        updated_after: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // Last 7 days
      },
    });
  }

  // Test connection
  static async testConnection(): Promise<boolean> {
    try {
      await this.getMerchant();
      return true;
    } catch (error) {
      console.error('Square connection test failed:', error);
      return false;
    }
  }
} 