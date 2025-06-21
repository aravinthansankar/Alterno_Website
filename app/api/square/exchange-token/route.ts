import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/authMiddleware';
import { ServerTokenManager } from '@/lib/square/serverTokenManager';

export async function POST(request: NextRequest) {
  return withAuth(request, async (request, userId) => {
    try {
      // Log the incoming request
      console.log('Exchange token request received for user:', userId);
      
      const body = await request.json();
      console.log('Request body:', body);
      
      const { code } = body;

      if (!code) {
        console.error('Missing authorization code in request');
        return NextResponse.json(
          { message: 'Authorization code is required' },
          { status: 400 }
        );
      }

      // Check environment variables  
      if (!process.env.NEXT_PUBLIC_SQUARE_CLIENT_ID || !process.env.SQUARE_CLIENT_SECRET) {
        console.error('Missing Square environment variables:', {
          hasClientId: !!process.env.NEXT_PUBLIC_SQUARE_CLIENT_ID,
          hasClientSecret: !!process.env.SQUARE_CLIENT_SECRET,
        });
        return NextResponse.json(
          { message: 'Square configuration is missing' },
          { status: 500 }
        );
      }

      console.log('Exchanging code for tokens...');
      console.log('Redirect URI:', `${process.env.NEXT_PUBLIC_APP_URL}/oauth/square/callback`);

      // Exchange the authorization code for tokens
      const tokenResponse = await fetch('https://connect.squareupsandbox.com/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Square-Version': '2024-01-17',
        },
        body: JSON.stringify({
          client_id: process.env.NEXT_PUBLIC_SQUARE_CLIENT_ID,
          client_secret: process.env.SQUARE_CLIENT_SECRET,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/oauth/square/callback`,
        }),
      });

      console.log('Square response status:', tokenResponse.status);

      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json();
        console.error('Square token exchange error:', errorData);
        console.error('Request body sent:', {
          client_id: process.env.NEXT_PUBLIC_SQUARE_CLIENT_ID ? 'present' : 'missing',
          client_secret: process.env.SQUARE_CLIENT_SECRET ? 'present' : 'missing',
          code: code ? 'present' : 'missing',
          grant_type: 'authorization_code',
          redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/oauth/square/callback`,
        });
        return NextResponse.json(
          { message: 'Failed to exchange authorization code for tokens', details: errorData },
          { status: 400 }
        );
      }

      const tokenData = await tokenResponse.json();
      console.log('Token exchange successful', tokenData);
      // ------------------------------------------------------------------
      // NEW: Fetch locations to get MCC and validate supported categories
      // ------------------------------------------------------------------
      let isSupportedBusiness = false;
      let detectedMcc: string | undefined;
      try {
        const locationsResp = await fetch('https://connect.squareupsandbox.com/v2/locations', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
            'Square-Version': '2024-01-17',
            'Content-Type': 'application/json',
          },
        });

        if (locationsResp.ok) {
          const locJson: any = await locationsResp.json();
          const mcc =
            locJson?.location?.mcc || // single location payload
            (Array.isArray(locJson?.locations) && locJson.locations.length > 0
              ? locJson.locations[0].mcc
              : undefined);
          detectedMcc = mcc;
          const supportedMcc = [
            '7230', // Beauty Shops
            '7297', // Massage Parlors
            '7298', // Health and Beauty Spas
            '7399', // Business Services (Misc.)
            '5812', // Restaurants
            '5814', // Fast Food Restaurants
            '7299'
          ];
          if (mcc && supportedMcc.includes(mcc)) {
            isSupportedBusiness = true;
          }
        } else {
          console.warn('Failed to fetch locations for MCC check', await locationsResp.text());
        }
      } catch (locErr) {
        console.error('Error while fetching locations:', locErr);
      }

      if (!isSupportedBusiness) {
        console.log('Unsupported MCC detected:', detectedMcc);
        // Do NOT store tokens; inform client
        return NextResponse.json({
          supported: false,
          mcc: detectedMcc,
        });
      }

      // Use Square's provided expires_at, with fallback if needed
      let expiresAt: string;
      if (tokenData.expires_at) {
        expiresAt = tokenData.expires_at;
      } else {
        console.warn('No expires_at provided by Square, using default 30 days');
        expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      }

      // Store tokens securely on server-side using ServerTokenManager
      try {
        await ServerTokenManager.storeTokens(userId, {
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          merchant_id: tokenData.merchant_id,
          expires_at: expiresAt,
        });
        
        console.log('Tokens saved to database successfully');
      } catch (firebaseError) {
        console.error('Error saving tokens to database:', firebaseError);
        return NextResponse.json(
          { message: 'Failed to save tokens to database' },
          { status: 500 }
        );
      }

      // Return ONLY non-sensitive data to client
      return NextResponse.json({
        success: true,
        supported: true,
        message: 'Square integration completed successfully',
        merchant_id: tokenData.merchant_id,
        // ❌ DON'T return tokens to client - they're stored server-side
      });

    } catch (error) {
      console.error('Error exchanging Square token:', error);
      return NextResponse.json(
        { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      );
    }
  });
} 