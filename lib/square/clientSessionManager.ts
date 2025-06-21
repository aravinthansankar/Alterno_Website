interface SquareConnection {
  merchantId: string;
  isConnected: boolean;
  connectedAt: string;
}

export class ClientSessionManager {
  private static readonly CONNECTION_KEY = 'square_connection';

  /**
   * Store Square connection info (NO TOKENS)
   */
  static setSquareConnection(merchantId: string): void {
    if (typeof window === 'undefined') return;

    const connection: SquareConnection = {
      merchantId,
      isConnected: true,
      connectedAt: new Date().toISOString(),
    };

    localStorage.setItem(this.CONNECTION_KEY, JSON.stringify(connection));
  }

  /**
   * Get Square connection info
   */
  static getSquareConnection(): SquareConnection | null {
    if (typeof window === 'undefined') return null;

    const connectionStr = localStorage.getItem(this.CONNECTION_KEY);
    if (!connectionStr) return null;

    try {
      return JSON.parse(connectionStr);
    } catch (error) {
      console.error('Error parsing Square connection:', error);
      return null;
    }
  }

  /**
   * Check if Square is connected
   */
  static isSquareConnected(): boolean {
    const connection = this.getSquareConnection();
    return connection?.isConnected === true;
  }

  /**
   * Get merchant ID
   */
  static getMerchantId(): string | null {
    const connection = this.getSquareConnection();
    return connection?.merchantId || null;
  }

  /**
   * Clear Square connection
   */
  static clearSquareConnection(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.CONNECTION_KEY);
  }

  /**
   * Make authenticated Square API call through server proxy
   */
  static async makeSquareApiCall(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const connection = this.getSquareConnection();
    
    if (!connection?.merchantId) {
      throw new Error('Square not connected');
    }

    // Get the current user's ID token for authentication
    const { auth } = await import('@/lib/firebase');
    const idToken = await auth.currentUser?.getIdToken();
    
    if (!idToken) {
      throw new Error('User not authenticated');
    }

    const { method = 'GET', body } = options;

    const response = await fetch('/api/square/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        merchantId: connection.merchantId,
        endpoint,
        method,
        body,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Square API call failed');
    }

    return response;
  }

  /**
   * Get Square merchant info
   */
  static async getMerchantInfo(): Promise<any> {
    const response = await this.makeSquareApiCall('/v2/merchants/me');
    return response.json();
  }

  /**
   * Get Square locations
   */
  static async getLocations(): Promise<any> {
    const response = await this.makeSquareApiCall('/v2/locations');
    return response.json();
  }

  /**
   * Test Square connection
   */
  static async testConnection(): Promise<boolean> {
    try {
      await this.getMerchantInfo();
      return true;
    } catch (error) {
      console.error('Square connection test failed:', error);
      return false;
    }
  }
} 