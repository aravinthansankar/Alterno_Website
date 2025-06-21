import { adminDb } from '../firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

interface SquareTokens {
  access_token: string;
  refresh_token: string;
  merchant_id: string;
  expires_at: string;
  created_at: any;
  updated_at: any;
}

export class ServerTokenManager {
  /**
   * Get Square tokens for a user and merchant
   */
  static async getTokens(userId: string, merchantId: string): Promise<SquareTokens | null> {
    try {
      const storeRef = adminDb.collection('users').doc(userId).collection('stores').doc(`merchant_${merchantId}`);
      const storeDoc = await storeRef.get();
      
      if (!storeDoc.exists) {
        return null;
      }
      
      const data = storeDoc.data();
      return {
        access_token: data?.access_token,
        refresh_token: data?.refresh_token,
        merchant_id: data?.merchant_id,
        expires_at: data?.expires_at,
        created_at: data?.created_at,
        updated_at: data?.updated_at,
      };
    } catch (error) {
      console.error('Error getting tokens:', error);
      return null;
    }
  }

  /**
   * Store Square tokens for a user and merchant
   */
  static async storeTokens(userId: string, tokens: Omit<SquareTokens, 'created_at' | 'updated_at'>): Promise<void> {
    try {
      const storeRef = adminDb.collection('users').doc(userId).collection('stores').doc(`merchant_${tokens.merchant_id}`);
      await storeRef.set({
        ...tokens,
        created_at: FieldValue.serverTimestamp(),
        updated_at: FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error('Error storing tokens:', error);
      throw error;
    }
  }

  /**
   * Update Square tokens (for refresh)
   */
  static async updateTokens(userId: string, merchantId: string, tokens: Partial<SquareTokens>): Promise<void> {
    try {
      const storeRef = adminDb.collection('users').doc(userId).collection('stores').doc(`merchant_${merchantId}`);
      await storeRef.update({
        ...tokens,
        updated_at: FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating tokens:', error);
      throw error;
    }
  }

  /**
   * Check if tokens are expired
   */
  static isTokenExpired(expiresAt: string): boolean {
    const expiresDate = new Date(expiresAt);
    const now = new Date();
    
    // Consider token expired if it expires within the next 5 minutes
    return expiresDate.getTime() <= now.getTime() + 5 * 60 * 1000;
  }

  /**
   * Get valid access token (refresh if needed)
   */
  static async getValidAccessToken(userId: string, merchantId: string): Promise<string | null> {
    try {
      const tokens = await this.getTokens(userId, merchantId);
      
      if (!tokens) {
        return null;
      }

      if (this.isTokenExpired(tokens.expires_at)) {
        // Token is expired, need to refresh
        const newTokens = await this.refreshToken(userId, merchantId, tokens.refresh_token);
        return newTokens?.access_token || null;
      }

      return tokens.access_token;
    } catch (error) {
      console.error('Error getting valid access token:', error);
      return null;
    }
  }

  /**
   * Refresh Square tokens
   */
  static async refreshToken(userId: string, merchantId: string, refreshToken: string): Promise<SquareTokens | null> {
    try {
      const response = await fetch('https://connect.squareupsandbox.com/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Square-Version': '2024-01-17',
        },
        body: JSON.stringify({
          client_id: process.env.NEXT_PUBLIC_SQUARE_CLIENT_ID,
          client_secret: process.env.SQUARE_CLIENT_SECRET,
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const tokenData = await response.json();
      
      const newTokens: Omit<SquareTokens, 'created_at' | 'updated_at'> = {
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token || refreshToken,
        merchant_id: merchantId,
        expires_at: tokenData.expires_at || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      };

      // Update tokens in database
      await this.updateTokens(userId, merchantId, newTokens);
      
      return {
        ...newTokens,
        created_at: new Date(),
        updated_at: new Date(),
      };
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  }

  /**
   * Make authenticated Square API call
   */
  static async makeSquareApiCall(
    userId: string, 
    merchantId: string, 
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<Response> {
    const accessToken = await this.getValidAccessToken(userId, merchantId);
    
    if (!accessToken) {
      throw new Error('No valid access token available');
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

    return fetch(`https://connect.squareupsandbox.com${endpoint}`, requestOptions);
  }

  /**
   * Delete tokens (for disconnection)
   */
  static async deleteTokens(userId: string, merchantId: string): Promise<void> {
    try {
      const storeRef = adminDb.collection('users').doc(userId).collection('stores').doc(`merchant_${merchantId}`);
      await storeRef.delete();
    } catch (error) {
      console.error('Error deleting tokens:', error);
      throw error;
    }
  }
} 