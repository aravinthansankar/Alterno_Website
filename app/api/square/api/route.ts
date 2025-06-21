import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/authMiddleware';
import { ServerTokenManager } from '@/lib/square/serverTokenManager';

export async function POST(request: NextRequest) {
  return withAuth(request, async (request, userId) => {
    try {
      const { merchantId, endpoint, method = 'GET', body } = await request.json();

      if (!merchantId) {
        return NextResponse.json(
          { error: 'Merchant ID is required' },
          { status: 400 }
        );
      }

      if (!endpoint) {
        return NextResponse.json(
          { error: 'API endpoint is required' },
          { status: 400 }
        );
      }

      // Make the Square API call server-side
      const response = await ServerTokenManager.makeSquareApiCall(
        userId,
        merchantId,
        endpoint,
        { method, body }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return NextResponse.json(
          { error: 'Square API error', details: errorData },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json(data);

    } catch (error) {
      console.error('Square API proxy error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  });
}

export async function GET(request: NextRequest) {
  return withAuth(request, async (request, userId) => {
    try {
      const { searchParams } = new URL(request.url);
      const merchantId = searchParams.get('merchantId');
      const endpoint = searchParams.get('endpoint');

      if (!merchantId) {
        return NextResponse.json(
          { error: 'Merchant ID is required' },
          { status: 400 }
        );
      }

      if (!endpoint) {
        return NextResponse.json(
          { error: 'API endpoint is required' },
          { status: 400 }
        );
      }

      // Make the Square API call server-side
      const response = await ServerTokenManager.makeSquareApiCall(
        userId,
        merchantId,
        endpoint
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return NextResponse.json(
          { error: 'Square API error', details: errorData },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json(data);

    } catch (error) {
      console.error('Square API proxy error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  });
} 