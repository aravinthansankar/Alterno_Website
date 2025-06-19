"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";
import { useSignOutMutation } from "@/lib/store/services/authApi";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Users,
  Link,
  CreditCard,
  Settings,
  Facebook,
  Instagram,
  MessageCircle,
  Mic,
  Menu,
  LogOut,
  Store,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { nullable } from "zod";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const [signOut] = useSignOutMutation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      badge: null,
    },
  ];

  const serviceItems = [
    {
      title: "Service Link",
      icon: Link,
      href: "/dashboard/services",
      badge: null,
    },
    {
      title: "Facebook",
      icon: Facebook,
      href: "/dashboard/services/facebook",
      badge: null,
      connected: false,
    },
    {
      title: "Instagram",
      icon: Instagram,
      href: "/dashboard/services/instagram",
      badge: null,
      connected: false,
    },
    {
      title: "WhatsApp",
      icon: MessageCircle,
      href: "/dashboard/services/whatsapp",
      badge: null,
      connected: false,
    },
    {
      title: "Voice AI",
      icon: Mic,
      href: "/dashboard/services/voice-ai",
      badge: null,
      connected: false,
    },
    {
      title: "YourMenu",
      icon: Menu,
      href: "/dashboard/services/yourmenu",
      badge: null,
      connected: false,
    },
  ];

  const managementItems = [
    {
      title: "Users",
      icon: Users,
      href: "/dashboard/users",
      badge: null,
    },
    {
      title: "Stores",
      icon: Store,
      href: "/dashboard/stores",
      badge: null,
    },
    {
      title: "Subscriptions",
      icon: CreditCard,
      href: "/dashboard/subscriptions",
      badge: null,
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      badge: null,
    },
  ];

  const handleLogout = async () => {
    try {
      await signOut().unwrap();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="group-data-[collapsible=icon]:hidden">
          <div className="flex items-center gap-3 px-2 py-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || "User"} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {user?.displayName || "User"}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        <SidebarContent className="space-y-0">
          <div className="group-data-[collapsible=icon]:block hidden p-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarTrigger />
              </TooltipTrigger>
              <TooltipContent side="right" align="center">
                Open
              </TooltipContent>
            </Tooltip>
          </div>
          <SidebarMenu className="space-y-0">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={{ children: item.title, side: "right", align: "center" }}
                  isActive={false}
                  className="h-10 px-3 hover:bg-accent hover:text-accent-foreground transition-colors justify-start"
                >
                  <a href={item.href} className="flex items-center justify-start w-full">
                    <div className="flex items-center justify-center w-4 h-4 mr-3">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

          <SidebarMenu className="space-y-0">
            {serviceItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={{ children: item.title, side: "right", align: "center" }}
                  isActive={false}
                  className="h-10 px-3 hover:bg-accent hover:text-accent-foreground transition-colors justify-start"
                >
                  <a href={item.href} className="flex items-center justify-start w-full">
                    <div className="flex items-center justify-center w-4 h-4 mr-3">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge 
                        variant={item.badge === "New" ? "default" : "secondary"} 
                        className="ml-auto"
                      >
                        {item.badge}
                      </Badge>
                    )}
                    {item.connected !== undefined && (
                      <div className={`ml-auto w-2 h-2 rounded-full ${
                        item.connected ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                    )}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

          <SidebarMenu className="space-y-0">
            {managementItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={{ children: item.title, side: "right", align: "center" }}
                  isActive={false}
                  className="h-10 px-3 hover:bg-accent hover:text-accent-foreground transition-colors justify-start"
                >
                  <a href={item.href} className="flex items-center justify-start w-full">
                    <div className="flex items-center justify-center w-4 h-4 mr-3">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
          <SidebarMenuButton
            tooltip={{ children: "Sign Out", side: "right", align: "center" }}
            onClick={handleLogout}
            className="h-10 px-3 w-full hover:bg-accent hover:text-accent-foreground transition-colors justify-start"
          >
            <div className="flex items-center justify-start w-full ">
              <div className="flex items-center justify-center w-4 h-4 mr-3">
                <LogOut className="h-4 w-4" />
              </div>
              <span>Sign Out</span>
            </div>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
} 