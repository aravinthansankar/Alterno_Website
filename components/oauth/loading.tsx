import { Loader2 } from "lucide-react";

export default function OAuthLoading() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-purple-500 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">
            Connecting...
          </h2>
          <p className="text-slate-400">
            Please wait while we process your request.
          </p>
        </div>
      </div>
    </div>
  );
} 