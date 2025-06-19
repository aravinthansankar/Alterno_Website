"use client";

import { useEffect } from "react";
import ProtectedRoute from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/store/hooks";
import { useGetUserStoresQuery } from "@/lib/store/services/onboardingApi";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import { 
  Instagram, 
  Facebook, 
  MessageCircle, 
  CreditCard,
  CheckCircle2,
  ExternalLink,
  Plus
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const { data: stores, isLoading } = useGetUserStoresQuery(user?.uid || "");

  useEffect(() => {
    if (!isLoading && stores && stores.length === 0) {
      router.push("/onboarding");
    }
  }, [stores, isLoading, router]);

  const platforms = [
    {
      name: "Instagram",
      description: "Connect your Instagram business account to manage messages and posts.",
      icon: Instagram,
      color: "from-pink-500 to-purple-500",
      connected: false,
    },
    {
      name: "Facebook",
      description: "Link your Facebook page to handle customer messages and interactions.",
      icon: Facebook,
      color: "from-blue-500 to-blue-600",
      connected: false,
    },
    {
      name: "WhatsApp",
      description: "Enable WhatsApp business integration for customer communication.",
      icon: MessageCircle,
      color: "from-green-500 to-green-600",
      connected: false,
    },
    {
      name: "Square",
      description: "Integrate with Square for payment processing and invoicing.",
      icon: CreditCard,
      color: "from-slate-600 to-slate-700",
      connected: false,
    },
  ];

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-900 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-slate-400 mt-1">
                Welcome back, {user?.displayName || "User"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => router.push("/onboarding")}
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Store
              </Button>
              <LogoutButton />
            </div>
          </div>

          {/* Stores Overview */}
          {stores && stores.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">
                Your Stores ({stores.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stores.map((store) => (
                  <div
                    key={store.id}
                    className="bg-slate-800 rounded-xl p-6 border border-slate-700"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {store.storeData.storeName}
                    </h3>
                    <p className="text-sm text-slate-400 mb-4">
                      {store.storeData.description}
                    </p>
                    <div className="space-y-2">
                      {Array.isArray(store.storeData.selectedServices) 
                        ? store.storeData.selectedServices.map((service, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              <span className="text-sm text-slate-300">
                                {service.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                              </span>
                            </div>
                          ))
                        : (
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              <span className="text-sm text-slate-400">No services configured</span>
                            </div>
                          )
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Platform Connections */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Platform Connections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {platforms.map((platform) => (
                <div
                  key={platform.name}
                  className="bg-slate-800 rounded-xl p-6 border border-slate-700"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${platform.color}`}>
                        <platform.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {platform.name}
                        </h3>
                        <p className="text-sm text-slate-400 mt-1">
                          {platform.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button
                      className={`w-full ${
                        platform.connected
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
                      }`}
                    >
                      {platform.connected ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 mr-2" />
                          Connected
                        </>
                      ) : (
                        <>
                          <ExternalLink className="w-5 h-5 mr-2" />
                          Connect {platform.name}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 