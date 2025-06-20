import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Log the incoming request
    console.log('Exchange token request received');
    
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
    console.log('Token data received:', {
      hasAccessToken: !!tokenData.access_token,
      hasRefreshToken: !!tokenData.refresh_token,
      hasMerchantId: !!tokenData.merchant_id,
      expiresAt: tokenData.expires_at,
    });

    // Use Square's provided expires_at, with fallback if needed
    let expiresAt: string;
    if (tokenData.expires_at) {
      expiresAt = tokenData.expires_at;
    } else {
      console.warn('No expires_at provided by Square, using default 30 days');
      expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    }

    // Store tokens securely in your database
    // For now, we'll return them to the frontend, but in production,
    // you should store them in your backend database
    const tokens = {
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      merchant_id: tokenData.merchant_id,
      expires_at: expiresAt,
    };

    // TODO: Store tokens in your database associated with the user
    // await storeTokensInDatabase(userId, tokens);

    return NextResponse.json({
      success: true,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      merchant_id: tokens.merchant_id,
      expires_at: tokens.expires_at,
    });

  } catch (error) {
    console.error('Error exchanging Square token:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 