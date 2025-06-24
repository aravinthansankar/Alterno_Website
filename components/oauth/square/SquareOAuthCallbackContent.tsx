"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useAppSelector } from '@/lib/store/hooks';
import { ClientSessionManager } from '@/lib/square/clientSessionManager';

export default function SquareOAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAppSelector((state) => state.auth);
  const [status, setStatus] = useState<'loading' | 'verifying' | 'success' | 'unsupported' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');

        // Check for OAuth errors
        if (error) {
          setStatus('error');
          setErrorMessage(`OAuth error: ${error}`);
          return;
        }

        // Validate required parameters
        if (!code || !state) {
          setStatus('error');
          setErrorMessage('Missing required OAuth parameters');
          return;
        }

        // Wait until Firebase auth has provided a user object
        if (!user?.uid) {
          // user not yet loaded, keep waiting
          return;
        }

        // Verify CSRF state
        const storedState = sessionStorage.getItem('square_oauth_state');
        if (state !== storedState) {
          setStatus('error');
          setErrorMessage('Invalid state parameter - possible CSRF attack');
          return;
        }

        // Clear the stored state
        sessionStorage.removeItem('square_oauth_state');

        // Get the current user's ID token for authentication
        const { auth } = await import('@/lib/firebase');
        const idToken = await auth.currentUser?.getIdToken();
        
        if (!idToken) {
          setStatus('error');
          setErrorMessage('Failed to get authentication token');
          return;
        }

        // Exchange code for tokens (server-side)
        setStatus('verifying');
        const response = await fetch('/api/square/exchange-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`,
          },
          body: JSON.stringify({ 
            code,
            // userId is now extracted from the JWT token on the server
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to exchange token');
        }

        const data = await response.json();
        console.log('Token exchange response:', data);

        if (data.supported === false) {
          // Business type not supported
          setStatus('unsupported');
          return;
        }

        // Store connection info on client (NO TOKENS)
        ClientSessionManager.setSquareConnection(data.merchant_id);

        setStatus('success');

        // No auto redirect; user can proceed via button

      } catch (error) {
        console.error('OAuth callback error:', error);
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      }
    };

    handleOAuthCallback();
  }, [searchParams, router, user]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="text-center">
          {status === 'loading' && (
            <>
              <Loader2 className="h-12 w-12 text-purple-500 animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">
                Connecting to Square...
              </h2>
              <p className="text-slate-400">
                Please wait while we complete your Square integration.
              </p>
            </>
          )}

          {status === 'verifying' && (
            <>
              <Loader2 className="h-12 w-12 text-purple-500 animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">
                Validating your business...
              </h2>
              <p className="text-slate-400">
                Hang tight while we confirm your business type.
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">
                Auth complete
              </h2>
              <p className="text-slate-400 mb-4">
                Your Square account is now connected.
              </p>
              <button
                onClick={() => router.push('/dashboard')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Go to Dashboard
              </button>
            </>
          )}

          {status === 'unsupported' && (
            <>
              <XCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">
                Unsupported Business Type
              </h2>
              <p className="text-slate-400 mb-4">
                We do not currently support this type of business.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => window.location.href = 'mailto:support@voice.ai?subject=Unsupported%20Business%20Type'}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Contact Support
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Exit
                </button>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">
                Connection Failed
              </h2>
              <p className="text-slate-400 mb-4">
                {errorMessage}
              </p>
              <button
                onClick={() => router.push('/onboarding')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Return to Onboarding
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 