import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from './firebaseAdmin';

export async function verifyAuthToken(request: NextRequest): Promise<{ userId: string | null; error?: string }> {
  try {
    // Get the Authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { userId: null, error: 'No authorization token provided' };
    }

    // Extract the token (remove 'Bearer ' prefix)
    const token = authHeader.substring(7);
    
    // Verify the token with Firebase Admin
    const decodedToken = await adminAuth.verifyIdToken(token);
    
    return { userId: decodedToken.uid };
  } catch (error) {
    console.error('Token verification error:', error);
    return { userId: null, error: 'Invalid or expired token' };
  }
}

export async function withAuth(
  request: NextRequest,
  handler: (request: NextRequest, userId: string) => Promise<NextResponse>
): Promise<NextResponse> {
  const { userId, error } = await verifyAuthToken(request);
  
  if (!userId) {
    return NextResponse.json(
      { error: error || 'Authentication required' },
      { status: 401 }
    );
  }
  
  return handler(request, userId);
} 