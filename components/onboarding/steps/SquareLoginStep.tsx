"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CreditCard, ExternalLink } from "lucide-react";

export default function SquareLoginStep() {
  const { setValue, watch } = useFormContext();
  const squareConnected = watch("squareIntegration");

  const handleSquareLogin = () => {
    // TODO: Implement Square OAuth flow
    // This would typically redirect to Square's OAuth endpoint
    console.log("Connecting to Square...");
    
    // For now, we'll simulate a successful connection
    setValue("squareIntegration", true);
  };

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
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-400 text-sm font-medium">Connected</span>
            </div>
          ) : (
            <Button
              onClick={handleSquareLogin}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Login with Square
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