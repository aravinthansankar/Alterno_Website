interface SquareTokens {
  access_token: string;
  refresh_token: string;
  merchant_id: string;
  expires_at: string;
}

export class SquareTokenManager {
  private static readonly TOKEN_KEY = 'square_access_token';
  private static readonly REFRESH_TOKEN_KEY = 'square_refresh_token';
  private static readonly MERCHANT_ID_KEY = 'square_merchant_id';
  private static readonly EXPIRES_AT_KEY = 'square_expires_at';

  static getTokens(): SquareTokens | null {
    if (typeof window === 'undefined') return null;

    const access_token = localStorage.getItem(this.TOKEN_KEY);
    const refresh_token = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    const merchant_id = localStorage.getItem(this.MERCHANT_ID_KEY);
    const expires_at = localStorage.getItem(this.EXPIRES_AT_KEY);

    if (!access_token || !refresh_token || !merchant_id || !expires_at) {
      return null;
    }

    return {
      access_token,
      refresh_token,
      merchant_id,
      expires_at,
    };
  }

  static setTokens(tokens: SquareTokens): void {
    if (typeof window === 'undefined') return;

    localStorage.setItem(this.TOKEN_KEY, tokens.access_token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refresh_token);
    localStorage.setItem(this.MERCHANT_ID_KEY, tokens.merchant_id);
    localStorage.setItem(this.EXPIRES_AT_KEY, tokens.expires_at);
  }

  static clearTokens(): void {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.MERCHANT_ID_KEY);
    localStorage.removeItem(this.EXPIRES_AT_KEY);
  }

  static isTokenExpired(): boolean {
    const tokens = this.getTokens();
    if (!tokens) return true;

    const expiresAt = new Date(tokens.expires_at);
    const now = new Date();
    
    // Consider token expired if it expires within the next 5 minutes
    return expiresAt.getTime() <= now.getTime() + 5 * 60 * 1000;
  }

  static async refreshToken(): Promise<SquareTokens | null> {
    const tokens = this.getTokens();
    if (!tokens) return null;

    try {
      const response = await fetch('/api/square/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token: tokens.refresh_token,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const newTokens = await response.json();
      this.setTokens(newTokens);
      return newTokens;
    } catch (error) {
      console.error('Error refreshing Square token:', error);
      this.clearTokens();
      return null;
    }
  }

  static async getValidAccessToken(): Promise<string | null> {
    if (this.isTokenExpired()) {
      const refreshedTokens = await this.refreshToken();
      return refreshedTokens?.access_token || null;
    }

    const tokens = this.getTokens();
    return tokens?.access_token || null;
  }

  static isConnected(): boolean {
    const tokens = this.getTokens();
    return tokens !== null && !this.isTokenExpired();
  }
} 