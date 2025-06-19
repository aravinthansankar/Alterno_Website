"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Instagram,
  MessageSquare,
  Mic,
  Menu,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Settings,
  Link,
} from "lucide-react";

export default function ServiceLinkPage() {
  const [services, setServices] = useState([
    {
      name: "Facebook",
      icon: Facebook,
      description: "Connect your Facebook page to handle customer messages and interactions",
      connected: false,
      color: "from-blue-500 to-blue-600",
      features: ["Direct messaging", "Page management", "Customer insights"],
    },
    {
      name: "Instagram",
      icon: Instagram,
      description: "Link your Instagram business account for direct messaging and story interactions",
      connected: false,
      color: "from-pink-500 to-purple-500",
      features: ["Direct messaging", "Story replies", "Business insights"],
    },
    {
      name: "WhatsApp",
      icon: MessageSquare,
      description: "Enable WhatsApp Business API for customer communication and automated responses",
      connected: false,
      color: "from-green-500 to-green-600",
      features: ["Business messaging", "Automated replies", "Contact management"],
    },
    {
      name: "Voice AI",
      icon: Mic,
      description: "AI-powered voice agents for phone calls, bookings, and customer support",
      connected: false,
      color: "from-purple-500 to-indigo-600",
      features: ["Voice calls", "Automated bookings", "24/7 support"],
    },
    {
      name: "YourMenu",
      icon: Menu,
      description: "Digital menu and ordering system integration for restaurants and cafes",
      connected: false,
      color: "from-orange-500 to-red-500",
      features: ["Digital menus", "Online ordering", "Payment processing"],
    },
  ]);

  const handleConnect = (serviceName: string) => {
    setServices(prev => 
      prev.map(service => 
        service.name === serviceName 
          ? { ...service, connected: !service.connected }
          : service
      )
    );
  };

  const connectedCount = services.filter(s => s.connected).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Service Link</h1>
        <p className="text-muted-foreground">
          Connect your business to multiple platforms for seamless customer communication
        </p>
      </div>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Connection Status
          </CardTitle>
          <CardDescription>
            Overview of your connected services and integration status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg border">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-lg font-semibold">{connectedCount}</div>
                <div className="text-sm text-muted-foreground">Connected</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg border">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900">
                <AlertCircle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-lg font-semibold">{services.length - connectedCount}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg border">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                <Link className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-lg font-semibold">{services.length}</div>
                <div className="text-sm text-muted-foreground">Total Available</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.name} className="relative overflow-hidden">
            {service.connected && (
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
              </div>
            )}
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${service.color}`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <CardDescription className="text-sm mt-1">
                    {service.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Features:</h4>
                <ul className="space-y-1">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {service.connected ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600 font-medium">Connected</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                      <span className="text-sm text-orange-600 font-medium">Not Connected</span>
                    </>
                  )}
                </div>
                <Button
                  variant={service.connected ? "outline" : "default"}
                  size="sm"
                  onClick={() => handleConnect(service.name)}
                >
                  {service.connected ? (
                    <>
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </>
                  ) : (
                    <>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Connect
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Integration Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Tips</CardTitle>
          <CardDescription>
            Best practices for connecting and managing your services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium">Before Connecting</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  Ensure you have admin access to your business accounts
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  Verify your business information is up to date
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  Review platform-specific requirements and permissions
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">After Connecting</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  Test your integrations to ensure they're working properly
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  Configure automated responses and workflows
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  Monitor your dashboard for incoming messages and bookings
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 