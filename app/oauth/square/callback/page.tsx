"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { SquareTokenManager } from '@/lib/square/tokenManager';

export default function SquareOAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
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

        // Verify CSRF state
        const storedState = sessionStorage.getItem('square_oauth_state');
        if (state !== storedState) {
          setStatus('error');
          setErrorMessage('Invalid state parameter - possible CSRF attack');
          return;
        }

        // Clear the stored state
        sessionStorage.removeItem('square_oauth_state');

        // Exchange code for tokens
        const response = await fetch('/api/square/exchange-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to exchange token');
        }

        const data = await response.json();
        
        // Store tokens using the token manager
        SquareTokenManager.setTokens({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          merchant_id: data.merchant_id,
          expires_at: data.expires_at,
        });

        setStatus('success');

        // Redirect back to onboarding after a short delay
        setTimeout(() => {
          router.push('/onboarding?step=2&square_connected=true');
        }, 2000);

      } catch (error) {
        console.error('OAuth callback error:', error);
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      }
    };

    handleOAuthCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-slate-800 rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          {status === 'loading' && (
            <>
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">
                Connecting to Square...
              </h2>
              <p className="text-slate-400">
                Please wait while we complete your Square integration.
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">
                Successfully Connected!
              </h2>
              <p className="text-slate-400">
                Your Square account has been connected successfully. Redirecting you back...
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">
                Connection Failed
              </h2>
              <p className="text-slate-400 mb-4">
                {errorMessage}
              </p>
              <button
                onClick={() => router.push('/onboarding?step=2')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 