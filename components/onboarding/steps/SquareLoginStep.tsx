"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CreditCard, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function SquareLoginStep() {
  const { setValue, watch } = useFormContext();
  const { user } = useAppSelector((state) => state.auth);
  const squareConnected = watch("squareIntegration");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // Check for existing Square connection on component mount
  useEffect(() => {
    const checkExistingConnection = async () => {
      try {
        if (user?.uid) {
          // Check if user has any Square merchant documents
          const storesRef = collection(db, 'users', user.uid, 'stores');
          const squareQuery = query(storesRef, where('merchant_id', '!=', null));
          const querySnapshot = await getDocs(squareQuery);
          
          if (!querySnapshot.empty) {
            setValue("squareIntegration", true);
          }
        }
      } catch (error) {
        console.error('Error checking Square connection:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkExistingConnection();
  }, [setValue, user]);

  const handleSquareLogin = async () => {
    setIsConnecting(true);
    
    try {
      if (!user?.uid) {
        throw new Error('User not authenticated');
      }

      // Generate a random state for CSRF protection
      const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      // Store state in sessionStorage for verification
      sessionStorage.setItem('square_oauth_state', state);
      
      // Square OAuth parameters
      const params = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.NEXT_PUBLIC_SQUARE_CLIENT_ID || '',
        redirect_uri: `${window.location.origin}/oauth/square/callback`,
        scope: scopes.join(' '),
        state: state,
      });
      
      // Redirect to Square's OAuth endpoint
      window.location.href = `https://connect.squareupsandbox.com/oauth2/authorize?${params.toString()}`;
    } catch (error) {
      console.error('Error initiating Square OAuth:', error);
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      if (user?.uid) {
        // Find and delete all Square merchant documents
        const storesRef = collection(db, 'users', user.uid, 'stores');
        const squareQuery = query(storesRef, where('merchant_id', '!=', null));
        const querySnapshot = await getDocs(squareQuery);
        
        // Delete each Square merchant document
        const deletePromises = querySnapshot.docs.map(doc => doc.ref.delete());
        await Promise.all(deletePromises);
      }
      setValue("squareIntegration", false);
    } catch (error) {
      console.error('Error disconnecting Square:', error);
    }
  };

  const scopes = [
    "APPOINTMENTS_READ",
    "APPOINTMENTS_WRITE",
    "APPOINTMENTS_ALL_READ",
    "APPOINTMENTS_BUSINESS_SETTINGS_READ",
    "CUSTOMERS_READ",
    "CUSTOMERS_WRITE"
  ];

  if (isChecking) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">
            Checking Square Connection...
          </h3>
          <p className="text-slate-400">
            Please wait while we verify your Square integration status.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-2">
          Connect Your Square Account
        </h3>
        <p className="text-slate-400">
          Connect your Square account to sync your business data and enable seamless payment processing
        </p>
      </div>

      <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Square Integration</h4>
              <p className="text-sm text-slate-400">
                {squareConnected 
                  ? "Connected successfully" 
                  : "Connect your Square account to get started"
                }
              </p>
            </div>
          </div>
          
          {squareConnected ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-400 text-sm font-medium">Connected</span>
              </div>
              <Button
                onClick={handleDisconnect}
                variant="outline"
                size="sm"
                className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleSquareLogin}
              disabled={isConnecting}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {isConnecting ? "Connecting..." : "Login with Square"}
            </Button>
          )}
        </div>
      </div>

      {squareConnected && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <p className="text-green-400 text-sm">
            ✓ Square account connected successfully! Your business data will be synced automatically.
          </p>
        </div>
      )}

      <div className="bg-slate-700/50 rounded-lg p-4">
        <h5 className="font-medium text-white mb-2">What you'll get with Square integration:</h5>
        <ul className="text-sm text-slate-400 space-y-1">
          <li>• Automatic sync of your business information</li>
          <li>• Seamless payment processing</li>
          <li>• Inventory and sales data integration</li>
          <li>• Customer management tools</li>
        </ul>
      </div>
    </div>
  );
} 