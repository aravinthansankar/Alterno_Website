"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
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
  Plus,
  CheckCircle2,
  AlertCircle,
  Facebook,
  Instagram,
  MessageSquare,
  Mic,
  Menu,
} from "lucide-react";
import { useAppSelector } from "@/lib/store/hooks";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
    { name: "Facebook", value: 35, color: "#1877F2", bookings: 70 },
    { name: "Instagram", value: 28, color: "#E4405F", bookings: 56 },
    { name: "WhatsApp", value: 22, color: "#25D366", bookings: 44 },
    { name: "Voice AI", value: 15, color: "#6366F1", bookings: 30 },
  ];

  const selectedStoreData = stores.find(store => store.id === selectedStore);

  const connectedServices = [
    { name: "Facebook", icon: Facebook, connected: true, color: "#1877F2" },
    { name: "Instagram", icon: Instagram, connected: true, color: "#E4405F" },
    { name: "WhatsApp", icon: MessageSquare, connected: false, color: "#25D366" },
    { name: "Voice AI", icon: Mic, connected: false, color: "#6366F1" },
    { name: "YourMenu", icon: Menu, connected: false, color: "#FF6B35" },
  ];

  return (
    <div className="space-y-6">
      {/* Modern Combined Store Card (No user info/avatar) */}
      {selectedStoreData && (
        <div className="sticky top-4 z-20">
          <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/60 dark:from-slate-800 dark:to-slate-900 hover:shadow-xl duration-200">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                {/* Left: Store Info */}
                <div className="flex items-center gap-6 flex-1 min-w-0">
                  {/* Store Icon/Avatar */}
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-tr from-purple-500 to-cyan-500 text-white font-bold text-xl shadow">
                    {selectedStoreData.storeData.storeName?.charAt(0)?.toUpperCase() || 'S'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold truncate mb-1">
                      {selectedStoreData.storeData.storeName}
                    </h2>
                    <p className="text-base text-muted-foreground truncate">
                      {selectedStoreData.storeData.description}
                    </p>
                  </div>
                </div>
                {/* Divider for desktop */}
                <div className="hidden md:block h-20 w-px bg-gradient-to-b from-slate-700/60 to-slate-700/10 mx-2 rounded-full" />
                {/* Right: Actions */}
                <div className="flex flex-col md:items-end gap-2 min-w-[200px]">
                  {stores.length > 1 && (
                    <Select value={selectedStore || ''} onValueChange={onStoreChange}>
                      <SelectTrigger className="w-[200px] border-0 bg-slate-700/60 text-white font-medium rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors">
                        <SelectValue placeholder="Select store" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 text-white border-0 shadow-lg rounded-lg">
                        {stores.map((store) => (
                          <SelectItem key={store.id} value={store.id} className="hover:bg-cyan-600/20 focus:bg-cyan-600/30">
                            {store.storeData.storeName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <Button onClick={() => router.push('/onboarding')} className="mt-1 w-full md:w-auto bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-lg shadow-sm hover:from-purple-600 hover:to-cyan-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Store
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">198</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Traffic</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+23%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Daily Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Activity</CardTitle>
            <CardDescription>
              Bookings and traffic breakdown by platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                bookings: { color: "hsl(var(--chart-1))" },
                traffic: { color: "hsl(var(--chart-2))" },
                facebook: { color: "#1877F2" },
                instagram: { color: "#E4405F" },
                whatsapp: { color: "#25D366" },
                voice: { color: "#6366F1" },
              }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dailyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="bookings" 
                    stackId="1"
                    stroke="hsl(var(--chart-1))" 
                    fill="hsl(var(--chart-1))" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="traffic" 
                    stackId="2"
                    stroke="hsl(var(--chart-2))" 
                    fill="hsl(var(--chart-2))" 
                    fillOpacity={0.4}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Distribution</CardTitle>
            <CardDescription>
              User engagement and bookings by platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="grid grid-cols-2 gap-4">
                {platformData.map((platform) => (
                  <div key={platform.name} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: platform.color }}
                      />
                      <span className="text-sm font-medium">{platform.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{platform.bookings}</div>
                      <div className="text-xs text-muted-foreground">bookings</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 