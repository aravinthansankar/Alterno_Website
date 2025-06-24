"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import {
  Users,
  Calendar,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Facebook,
  Instagram,
  MessageSquare,
  Mic,
  Menu,
  Phone,
  Clock,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from "lucide-react";
import { useAppSelector } from "@/lib/store/hooks";
import { useGetSquareLocationsQuery } from '@/lib/store/services/squareApi'

interface Store {
  id: string;
  storeData: {
    storeName: string;
    description: string;
    selectedServices?: string[];
  };
}

interface DashboardContentProps {
  stores: Store[];
  selectedStore: string | null;
  onStoreChange: (storeId: string) => void;
}

export default function DashboardContent({ 
  stores, 
  selectedStore, 
  onStoreChange 
}: DashboardContentProps) {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: locData, isFetching: locLoading, error: locError } = useGetSquareLocationsQuery();
  const location = locData?.location || locData?.locations?.[0];

  // Mock data for charts
  const dailyActivityData = [
    { day: "Mon", bookings: 23, traffic: 145, facebook: 8, instagram: 6, whatsapp: 5, voice: 4 },
    { day: "Tue", bookings: 28, traffic: 167, facebook: 10, instagram: 8, whatsapp: 6, voice: 4 },
    { day: "Wed", bookings: 19, traffic: 134, facebook: 6, instagram: 5, whatsapp: 4, voice: 4 },
    { day: "Thu", bookings: 32, traffic: 189, facebook: 12, instagram: 9, whatsapp: 7, voice: 4 },
    { day: "Fri", bookings: 26, traffic: 156, facebook: 9, instagram: 7, whatsapp: 6, voice: 4 },
    { day: "Sat", bookings: 41, traffic: 234, facebook: 15, instagram: 12, whatsapp: 9, voice: 5 },
    { day: "Sun", bookings: 29, traffic: 178, facebook: 10, instagram: 8, whatsapp: 7, voice: 4 },
  ];

  const platformData = [
    { name: "Facebook", value: 35, color: "#60A5FA", bookings: 70 },
    { name: "Instagram", value: 28, color: "#F472B6", bookings: 56 },
    { name: "WhatsApp", value: 22, color: "#34D399", bookings: 44 },
    { name: "Voice AI", value: 15, color: "#A78BFA", bookings: 30 },
  ];

  const connectedServices = [
    { name: "Facebook", icon: Facebook, connected: true, color: "#1877F2" },
    { name: "Instagram", icon: Instagram, connected: true, color: "#E4405F" },
    { name: "WhatsApp", icon: MessageSquare, connected: false, color: "#25D366" },
    { name: "Voice AI", icon: Mic, connected: false, color: "#6366F1" },
    { name: "YourMenu", icon: Menu, connected: false, color: "#FF6B35" },
  ];

  // Supported MCC categories (titles only)
  const supportedMccCategories = [
    { code: "7297", title: "Massage Parlors", color: "from-pink-500 to-rose-500" },
    { code: "7298", title: "Health and Beauty Spas", color: "from-purple-500 to-indigo-500" },
    { code: "7399", title: "Business Services", color: "from-blue-500 to-cyan-500" },
    { code: "5812", title: "Restaurants", color: "from-orange-500 to-red-500" },
    { code: "5814", title: "Fast Food Restaurants", color: "from-yellow-500 to-orange-500" },
    { code: "7299", title: "Dog Shop", color: "from-green-500 to-emerald-500" },
  ];

  // Get current business category based on MCC
  const getBusinessCategory = (mcc?: string) => {
    if (!mcc) return null;
    return supportedMccCategories.find(cat => cat.code === mcc);
  };

  const currentCategory = getBusinessCategory(location?.mcc);

  // Utility helpers
  const formatTime = (t?: string) => {
    if (!t) return "";
    const [h, m] = t.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m);
    return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await router.refresh();
    } finally {
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Business Overview Card */}
      {locLoading && (
        <div className="flex justify-center py-12">
          <div className="flex items-center gap-3 text-slate-400">
            <div className="animate-spin h-5 w-5 border-2 border-purple-500 border-t-transparent rounded-full"></div>
            <span>Loading business data...</span>
          </div>
        </div>
      )}
      
      {location ? (
        <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-700 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 border-b border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-sm">
                  {(location.name?.charAt(0) || 'B').toUpperCase()}
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-white">{location.name}</h1>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  location.status === 'ACTIVE' 
                    ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-700' 
                    : 'bg-amber-900/50 text-amber-300 border border-amber-700'
                }`}>
                  {location.status}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'Refreshing...' : 'Refresh'}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="text-slate-300 hover:bg-slate-800 hover:text-white p-2"
                >
                  {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Content Section - Collapsible */}
          <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[1000px] opacity-100'
          }`}>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Business Details */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Address & Contact */}
                  <div className="space-y-4">
                    {location.address && (
                      <div className="flex items-start gap-3 p-4 bg-slate-800 rounded-xl border border-slate-700">
                        <div className="h-8 w-8 bg-indigo-900/50 rounded-lg flex items-center justify-center border border-indigo-700">
                          <svg className="h-4 w-4 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-white mb-1">Address</h3>
                          <p className="text-sm text-slate-300 leading-relaxed">
                            {location.address.address_line_1} {location.address.address_line_2 && (', ' + location.address.address_line_2)}, {location.address.locality}, {location.address.administrative_district_level_1} {location.address.postal_code}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {location.phone_number && (
                        <div className="flex items-center gap-3 p-4 bg-slate-800 rounded-xl border border-slate-700">
                          <div className="h-8 w-8 bg-emerald-900/50 rounded-lg flex items-center justify-center border border-emerald-700">
                            <Phone className="h-4 w-4 text-emerald-300" />
                          </div>
                          <div>
                            <h3 className="font-medium text-white mb-1">Phone</h3>
                            <p className="text-sm text-slate-300">{location.phone_number}</p>
                          </div>
                        </div>
                      )}

                      {location.timezone && (
                        <div className="flex items-center gap-3 p-4 bg-slate-800 rounded-xl border border-slate-700">
                          <div className="h-8 w-8 bg-purple-900/50 rounded-lg flex items-center justify-center border border-purple-700">
                            <Clock className="h-4 w-4 text-purple-300" />
                          </div>
                          <div>
                            <h3 className="font-medium text-white mb-1">Timezone</h3>
                            <p className="text-sm text-slate-300">{location.timezone}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Business Hours */}
                  {location.business_hours?.periods?.length ? (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Clock className="h-5 w-5 text-slate-400" />
                        Business Hours
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {location.business_hours.periods.map((p, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg border border-slate-700">
                            <span className="font-medium text-white">{capitalize(p.day_of_week || '')}</span>
                            <span className="text-sm text-slate-300">{formatTime(p.start_local_time)} - {formatTime(p.end_local_time)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Right Column - Business Category & Stats */}
                <div className="space-y-6">
                  {/* Business Category */}
                  {location.mcc && currentCategory && (
                    <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-slate-700">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">🏪</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">Business Type</h3>
                          <p className="text-sm text-slate-300">MCC: {currentCategory.code}</p>
                        </div>
                      </div>
                      <div className="inline-flex items-center px-3 py-2 rounded-lg bg-indigo-900/30 border border-indigo-700">
                        <span className="text-sm font-medium text-indigo-300">
                          {currentCategory.title}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {Boolean(locError) && (
        <div className="bg-red-900/50 border border-red-700 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-red-900/50 rounded-lg flex items-center justify-center border border-red-700">
              <AlertCircle className="h-4 w-4 text-red-300" />
            </div>
            <div>
              <h3 className="font-medium text-red-200">Failed to load business data</h3>
              <p className="text-sm text-red-300">Please try refreshing the page or contact support.</p>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-0 shadow-lg bg-slate-900 border border-slate-700">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-300">Total Bookings</CardTitle>
              <div className="h-8 w-8 bg-indigo-900/50 rounded-lg flex items-center justify-center border border-indigo-700">
                <Calendar className="h-4 w-4 text-indigo-300" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">198</div>
            <p className="text-xs text-slate-400 mt-1">
              <span className="text-emerald-400 font-medium">+15%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-slate-900 border border-slate-700">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-300">User Traffic</CardTitle>
              <div className="h-8 w-8 bg-emerald-900/50 rounded-lg flex items-center justify-center border border-emerald-700">
                <Users className="h-4 w-4 text-emerald-300" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2,847</div>
            <p className="text-xs text-slate-400 mt-1">
              <span className="text-emerald-400 font-medium">+12%</span> this month
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-slate-900 border border-slate-700">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-300">Growth Rate</CardTitle>
              <div className="h-8 w-8 bg-purple-900/50 rounded-lg flex items-center justify-center border border-purple-700">
                <TrendingUp className="h-4 w-4 text-purple-300" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+23%</div>
            <p className="text-xs text-slate-400 mt-1">
              <span className="text-emerald-400 font-medium">+5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section - Streamlined */}
      <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-2">Analytics Overview</h2>
          <p className="text-slate-400">Performance metrics and platform insights</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Daily Activity Chart */}
          <div className="p-6 border-r border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Daily Activity</h3>
            <ChartContainer
              config={{
                bookings: { color: "#3B82F6" },
                traffic: { color: "#10B981" },
                facebook: { color: "#60A5FA" },
                instagram: { color: "#F472B6" },
                whatsapp: { color: "#34D399" },
                voice: { color: "#A78BFA" },
              }}
            >
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={dailyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
                      color: '#f9fafb'
                    }}
                    labelStyle={{
                      color: '#f9fafb',
                      fontWeight: '600'
                    }}
                    itemStyle={{
                      color: '#f9fafb'
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="bookings" 
                    stackId="1"
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="traffic" 
                    stackId="2"
                    stroke="#10B981" 
                    fill="#10B981" 
                    fillOpacity={0.4}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

        {/* Platform Distribution */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Platform Distribution</h3>
            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
                      color: '#f9fafb'
                    }}
                    labelStyle={{
                      color: '#f9fafb',
                      fontWeight: '600'
                    }}
                    itemStyle={{
                      color: '#f9fafb'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-2">
                {platformData.map((platform) => (
                  <div key={platform.name} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: platform.color }}
                      />
                      <span className="text-sm font-medium text-slate-300">{platform.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-white">{platform.bookings}</div>
                      <div className="text-xs text-slate-400">bookings</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 