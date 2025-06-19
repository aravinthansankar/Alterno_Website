"use client";

import { Button } from "@/components/ui/button";
import { useSignOutMutation } from "@/lib/store/services/authApi";
import { useAppDispatch } from "@/lib/store/hooks";
import { logout } from "@/lib/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

export default function LogoutButton() {
  const [signOut, { isLoading }] = useSignOutMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut().unwrap();
      dispatch(logout());
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error("Failed to log out");
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      variant="outline"
      className="border-slate-600 text-white hover:bg-slate-700"
    >
      <LogOut className="w-4 h-4 mr-2" />
      {isLoading ? "Logging out..." : "Logout"}
    </Button>
  );
} 