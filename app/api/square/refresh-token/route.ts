import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { refresh_token } = await request.json();

    if (!refresh_token) {
      return NextResponse.json(
        { message: 'Refresh token is required' },
        { status: 400 }
      );
    }

    // Exchange the refresh token for new tokens
    const tokenResponse = await fetch('https://connect.squareupsandbox.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Square-Version': '2024-01-17',
      },
      body: JSON.stringify({
        client_id: process.env.SQUARE_CLIENT_ID,
        client_secret: process.env.SQUARE_CLIENT_SECRET,
        refresh_token: refresh_token,
        grant_type: 'refresh_token',
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error('Square refresh token error:', errorData);
      return NextResponse.json(
        { message: 'Failed to refresh token' },
        { status: 400 }
      );
    }

    const tokenData = await tokenResponse.json();

    // Create new token object
    const tokens = {
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token || refresh_token, // Use new refresh token if provided, otherwise keep the old one
      merchant_id: tokenData.merchant_id,
      expires_at: new Date(Date.now() + tokenData.expires_in * 1000).toISOString(),
    };

    // TODO: Update tokens in your database
    // await updateTokensInDatabase(userId, tokens);

    return NextResponse.json({
      success: true,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      merchant_id: tokens.merchant_id,
      expires_at: tokens.expires_at,
    });

  } catch (error) {
    console.error('Error refreshing Square token:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 